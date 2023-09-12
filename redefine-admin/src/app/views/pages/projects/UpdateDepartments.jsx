import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';



export const UpdateDepartments = () => {

  // Get id from the url and then fetch data from api
  const params = useParams();
  const projectId = params.projectId;

 const [data, setdata] = useState({})
 
 const handle = (e) => {
     const newdata = { ...data }
     newdata[e.target.id] = e.target.value
     setdata(newdata)
     console.log(newdata);
 }

 const submit = async (e) => {
     e.preventDefault();
     try {
     // const {result} = await axiosInstance.put(`projectdepartments/update/${projectId}`, data)
     // swal("Yeah", "File is uploaded Successfully", "success");
     // e.target.reset();
 }
 catch (error) {
     alert(error);
 }

 }


 return (
     <>
     <div className="container mt-4">

         <div className="col-sm-12 col-xs-12 col-md-12 container pull-left table-bordered-new mb-3 p-5">
             <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                 {/* <div className='d-none'>
                     <input type="hidden" name="project_id" id='project_id' value={projectId} />
                 </div> */}
                 <div className="panel panel-body">
                     <div className="head">
                         <h5 className="iList">
                             Update Department
                         </h5>
                         <hr className='mb-3 border-bottom' />
                     </div>
                     <label className='mb-3'>Caution: Removing any previously added department will also remove its progress.</label>
                     <br/>
                     <div className="form-group mb-3">

                         <label>Department:</label>
                         <select className="form-control" id='department_id' name="department_id" value={data.name} onChange={(e) => handle(e)}>
                             <option value="received">Project</option>
                             <option value="awaited" selected="selected">Creative</option>
                             <option value="nopo">Accounts</option>
                             <option value="0">Database</option>
                             <option value="0">Call Center</option>
                             <option value="0">Human Resources</option>
                         </select>
                     </div>
                    
                     
                     <input type="submit" className="btn btn-success" value="Submit" name="submit" />
                 </div>
                 <div className="fix"></div>
             </form>
         </div>

         </div>

     </>

 )
}

