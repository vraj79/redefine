import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
// import DataTable from 'react-data-table-component';
// import Checkbox from '@mui/icons-material/CheckBox';
// import ArrowDownward from '@mui/icons-material/ArrowDownward';


export const GenerateEstimate = () => {

 

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

          <h4 className='ps-0 pe-0'>Generate Estimate</h4>
                <hr />

             


          </div>


      </>

  )
}

