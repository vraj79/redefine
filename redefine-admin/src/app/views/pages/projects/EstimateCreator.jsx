import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';

import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
// import DataTable from 'react-data-table-component';
// import Checkbox from '@mui/icons-material/CheckBox';
// import ArrowDownward from '@mui/icons-material/ArrowDownward';


export const EstimateCreator = () => {

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



  return (
      <>

          <ProjectHeader />



          <div className="row container">

          <h4 className='ps-0 pe-0 text-center mb-4'>How would you like to go ahead?<br/><b className='text-success mt-4'>Choose an Option</b></h4>
                <hr />

             <div className='text-center mt-3'>
                <Link to={`/projects/excel-estimator/${projectId}`} className="btn p-5 me-4 btn-outline-success shadow">
                    <h3 className=''>
                        <img src="/assets/images/icons/excel.png" alt="" className='img-fluid ms-3' width="50" />
                    Upload Excel File
                    </h3>
                    </Link>
                <Link to="/" className="btn p-5 btn-outline-success shadow">
                    <h3>
                    <img src="/assets/images/icons/estimate.png" alt="" className='img-fluid ms-3' width="50" />
                        Launch Estimate Creator

                    </h3>
                    </Link>
             </div>


          </div>


      </>

  )
}

