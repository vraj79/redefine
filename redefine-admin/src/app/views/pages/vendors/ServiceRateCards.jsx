import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import {axiosInstance} from '../../../config';
// import { Filters } from './project/Filters';
// 
export const ServiceRateCards = () => {
    const sortIcon = <ArrowDownward />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [projects, setProjects] = useState([]);
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
    const [del, setdel] = useState(false);


    const sType = ["Per Item", "Per Hour", "Per LBH"]

    useEffect(() => {
        getdata();
    }, [!del])

    const getdata = async () => {
        const { data } = await axiosInstance.get(`vendors/ratecard/view`)
        setProjects(data)
        console.log(data);
        console.log("res.data")
    }

    
    const removeRow = (e) => {
      console.log(e);
      let row_id = e;
      try {
          const deleteData = axiosInstance.delete(`vendors/ratecard/delete/${row_id}`)
          console.log("deleted")
          getdata();
        setdel(!del);
        
        //   const { notification } =  axiosInstance.post(`notifications/`, {title:"Service", subtitle:"Rate Card Deleted", path:"/vendors/rate-cards"}).then(resp => {
        //     if(resp.data){
        //         console.log("ye", resp.data);
        //         window.localStorage.setItem("notification", JSON.stringify(resp.data));
        //         window.dispatchEvent(new Event("notification"));
        //     }
        // }) 
      }
      catch (error) {
          alert(error);
      }
  }

    const columns = [
        {
            name: 'Service',
            selector: row => row.service,
            sortable: true,
        },
        {
            name: 'Vendor',
            selector: row => row.vendor,
            sortable: true,
        },
        {
            name: 'City',
            selector: row => row.city,
            sortable: true,
        },
        {
            name: 'Service Element',
            selector: row => row.element,
            sortable: true,
        },
        {
            name: 'Service Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Rate Type',
            selector: row => sType[row.rate_type],
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.rate,
            sortable: true,
        },

        {
            name: 'Action',
            cell: (row) => <><Link to={`/vendors/update-rate-card/${row.id}`} title='Edit' className="btn btn-primary mr-1" ><i className="fa-solid fa-pen-to-square"></i></Link><button type="button" className="btn btn-danger btn-sm remJS ms-2" onClick={(e) => removeRow(row.id)}><i className="fa fa-trash" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button></>,
        },
       
    ];

    return (
        <>
            <div className='container project-main-mod'>
               


                <DataTable title="Service Rate Cards" pagination   columns={columns} data={projects} expandableRowsComponent={ExpandedComponent} fixedHeader  selectableRowsHighlight highlightOnHover actions={<div className="input-group text-end has_append  d-flex justify-content-end align-items-center" >
                    <Link to="/vendors/rate-cards/create" className="btn btn-sm btn-success me-3 text-white">
                    <i className="fa-solid fa-plus"></i> Create</Link>




                </div>} />



            </div>
        </>
    );
};
