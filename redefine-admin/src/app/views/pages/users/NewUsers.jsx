import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Export from "react-data-table-component"
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { axiosInstance } from '../../../config';
// import { Filters } from './project/Filters';
// 
export const NewUsers = () => {
    const sortIcon = <ArrowDownward />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [projects, setProjects] = useState([]);
    const [groups, setGroups] = useState([]);
    const [backup, setBackup] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

    useEffect(() => {
        getGroups();
        getdata();
    }, [])

    const getGroups = async () => {
        const { data } = await axiosInstance.get(`mastergroups/view`)
        setGroups(data)
        console.log(data);
        console.log("res.data")
    }

    const getdata = async () => {
        const { data } = await axiosInstance.get(`users/new`)
        setProjects(data)
        setBackup(data);
        console.log(data);
        console.log("res.data")
    }

    const changeStatus = (id) => {
        // console.log(id, other);
        let row_id = id;

        try {
                const deleteData = axiosInstance.put(`users/activate/${row_id}`)
            getdata(); 
         
        }
        catch (error) {
            alert(error);
        }
    }

    const columns = [

        {
            name: 'Name',
            selector: row => row.firstname + " " + row.lastname,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },

        {
            name: 'Actions',
            cell: (row) => <><button className='btn' id='activate' onClick={(e) => changeStatus(row.id)}><i className="fa-solid fa-circle-check text-success"></i></button></>,
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


                <DataTable title="Unapproved Users" pagination  columns={columns} data={projects} selectableRows expandableRowsComponent={ExpandedComponent} fixedHeader selectableRowsHighlight highlightOnHover actions={<div className="input-group text-end has_append  d-flex justify-content-end align-items-center" >

                    



                </div>} />



            </div>
        </>
    );
};
