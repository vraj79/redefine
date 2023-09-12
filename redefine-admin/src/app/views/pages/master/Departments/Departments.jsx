import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { axiosInstance } from '../../../../config';
import { Toaster, toast } from 'react-hot-toast';


export const Departments = () => {

    const sortIcon = <ArrowDownward />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [departments, setDepartments] = useState([]);
    const [groups, setGroups] = useState([]);
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const { data } = await axiosInstance.get(`masterdepartments/view`)
            setDepartments(data?.departmentsData)
            setGroups(data?.groupsData)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }


    const removeRow = async(e) => {
        console.log(e);
        let row_id = e;
        try {
            const res =await axiosInstance.delete(`masterdepartments/delete/${row_id}`);
            if(res.data?.success){
                toast.success(res.data?.msg)
                getData();
            }
        }
        catch (error) {
            toast.error(error);
        }
    }

    const findSomething=(manager_group_id)=>{
        const findName=groups.length > 0 && groups?.find((ele)=>ele.id===manager_group_id);
        return findName?.name || "N/A"
    }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Slug',
            selector: row => row.slug,
            sortable: true,
        },
        {
            name: 'Manager',
            selector: row => row.manager_group_id?findSomething(row.manager_group_id) : "N/A",
            sortable: true,
        },

        {
            name: 'Action',
            cell: (row) => <><Link to={`/master/departments/update/${row.id}`} title='Edit' className="btn btn-primary mr-1" ><i className="fa-solid fa-pen-to-square"></i></Link><button type="button" className="btn btn-danger btn-sm ms-2" onClick={(e) => removeRow(row.id)}><i className="fa fa-trash" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button></>,
        },
    ];

    return (
        <>
        <Toaster/>
            <div className='container project-main-mod'>
               
               <DataTable title="Departments" pagination   columns={columns} data={departments.length>0?departments:[]} expandableRowsComponent={ExpandedComponent} fixedHeader  selectableRowsHighlight highlightOnHover actions={<div className="input-group text-end has_append  d-flex justify-content-end align-items-center" >
                   <Link to="/master/departments/create" className="btn btn-sm btn-success me-3 text-white">
                   <i className="fa-solid fa-plus"></i> Create</Link>

               </div>} />

           </div>
        </>
    );
};