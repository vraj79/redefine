import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import {axiosInstance} from '../../../config';
// import { Filters } from './project/Filters';
// 
export const Clients = () => {
    const sortIcon = <ArrowDownward />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [projects, setProjects] = useState([]);
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        const { data } = await axiosInstance.get(`clients/view`)
        setProjects(data)
        console.log(data);
        console.log("res.data")
    }

    const removeRow = (e) => {
        console.log(e);
        let row_id = e;
        try {
            const deleteData = axiosInstance.delete(`clients/delete/${row_id}`)
            console.log("deleted")
            getdata();
        }
        catch (error) {
            alert(error);
        }
    }

    const columns = [
        {
            name: 'Client Code',
            cell: (row) => <Link to={`/customers/customer-info/${row.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }}>{row.code}</Link>,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Phone Number',
            selector: row => row.phone_number_1,
            sortable: true,
        },
        {
            name: 'Client Access',
            cell: (row) => <Link to={`/customers/customer-access/${row.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn text-primary mr-1"><i className="fa-solid fa-pen-to-square"></i> Edit</Link>,
        },
        {
            name: 'Date',
            selector: row => row.created ,
            // selector: row => row.created ,
        },
        {
          name: 'Actions',
          cell: (row) => <><Link to={`/customers/update/${row.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn mr-1"><i className="fa-solid fa-pen text-primary"></i></Link><button className='btn' onClick={(e)=>removeRow(row.id)}><i className="fa-solid fa-trash-can text-danger"></i></button></>,
      },
        // {
        //     name: 'Start Date',
        //     // selector: row => row.start_date.split("T")[0],
        //     selector: row => row.start_date,
        //     sortable: true,
        // },
    ];

    return (
        <>
            <div className='container project-main-mod'>
                <div className="row">
                    <div className="col-md-12 p-1">
                        {/* <div className="white px-4 py-4 min-height-90 filter-box"> */}

                        {/* <Filters/> */}                               


                        {/* </div> */}
                    </div>
                </div>


                <DataTable title="Customers" pagination   columns={columns} data={projects} selectableRows expandableRowsComponent={ExpandedComponent} fixedHeader selectableRowsHighlight highlightOnHover actions={<div className="input-group text-end has_append  d-flex justify-content-end align-items-center" >
                    <Link to="/customers/create" className="btn btn-sm btn-success me-3 text-white">
                    <i className="fa-solid fa-plus"></i> Create</Link>

                    <button className="btn btn-sm btn-info me-3"><i className="fa-solid fa-download"></i> Export</button>
                    <button className="btn btn-sm btn-warning me-3"><i className="fa-solid fa-filter"></i> Filters</button>



                </div>} />



            </div>
        </>
    );
};
