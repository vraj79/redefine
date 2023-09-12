import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import {ExcelRenderer, OutTable} from 'react-excel-renderer';



import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
// import DataTable from 'react-data-table-component';
// import Checkbox from '@mui/icons-material/CheckBox';
// import ArrowDownward from '@mui/icons-material/ArrowDownward';


export const ExcelEstimator = () => {
    const params = useParams();
    const projectId = params.projectId;

    useEffect(() => {
        //   getdata();
    }, [])

    //   const getdata = async () => {
    //       const { data } = await axiosInstance.get(`project/view`)
    //       // setProjects(data)
    //       console.log(data);
    //       console.log("res.data")
    //   }

    // const fileHandler = (event) => {
    //     let fileObj = event.target.files[0];
    //     //just pass the fileObj as parameter
    //     ExcelRenderer(fileObj, (err, resp) => {
    //       if(err){
    //         console.log(err);            
    //       }
    //       else{
    //         this.setState({
    //           cols: resp.cols,
    //           rows: resp.rows
    //         });
    //       }
    //     });               
    //   }



    return (
        <>

            <ProjectHeader />



            <div className="row container">

                <h4 className='ps-0 pe-0 text-center mb-4'>How would you like to go ahead?<br /><b className='text-success mt-4'>Choose an Option</b></h4>
                <hr />

                <div className='text-center mt-3'>
                {/* <input type="file" onChange={(e) => e.fileHandler.bind(e)} style={{"padding":"10px"}} />

                <OutTable data={e.state.rows} columns={e.state.cols} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" /> */}
                </div>


            </div>


        </>

    )
}

