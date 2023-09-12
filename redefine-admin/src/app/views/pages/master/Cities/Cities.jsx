import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { axiosInstance } from '../../../../config';


export const Cities = () => {

    const sortIcon = <ArrowDownward />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [projects, setProjects] = useState([]);
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        const { data } = await axiosInstance.get(`mastercities/view`)
        setProjects(data)
        console.log(data);
        console.log("res.data")
    }


    const removeRow = (e) => {
        console.log(e);
        let row_id = e;
        try {
            const deleteData = axiosInstance.delete(`mastercities/delete/${row_id}`)
            getdata();
        }
        catch (error) {
            alert(error);
        }
    }


    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'State',
            selector: row => row.state,
            sortable: true,
        },
        {
            name: 'Country',
            selector: row => row.country,
            sortable: true,
        },

        {
            name: 'Action',
            cell: (row) => <><Link to={`/master/cities/update/${row.id}`} title='Edit' className="btn btn-primary mr-1" ><i className="fa-solid fa-pen-to-square"></i></Link><button type="button" className="btn btn-danger btn-sm ms-2" onClick={(e) => removeRow(row.id)}><i className="fa fa-trash" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button></>,
        },
    ];



    return (
        <>
            <div className='container project-main-mod'>
               
            <DataTable title="Cities" pagination   columns={columns} data={projects} expandableRowsComponent={ExpandedComponent} fixedHeader  selectableRowsHighlight highlightOnHover actions={<div className="input-group text-end has_append  d-flex justify-content-end align-items-center" >
                   <Link to="/master/cities/create" className="btn btn-sm btn-success me-3 text-white">
                   <i className="fa-solid fa-plus"></i> Create</Link>

               </div>} />

           </div>
        </>
    );
};