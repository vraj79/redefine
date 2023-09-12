import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';


export const UpdateProjectStatus = () => {

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
          console.log(data);
      const {result} = await axiosInstance.put(`projectstatus/update/${projectId}`, data
      )
      swal("Yeah", "Project Status updated", "success");
      document.querySelector("form").reset();
      }
      catch(error){
          alert(error);
      }
  }


  return (
      <>
          <ProjectHeader />
          {/* Form section start */}

          <div className="col-sm-12 col-xs-12 col-md-12 container">
              <div className="the-box table-bordered-new mb-3">
                <h4>Project Status</h4>
                <hr />


                  {/* <div className="form-group col-12">
                      <label>File: </label>
                  </div> */}
                  <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                      {/* <div className='d-none'>
                          <input type="hidden" name="project_id" value="3414" />
                          <input type="hidden" name="redirect_url" value="" />
                      </div> */}

                      <div className="form-group mb-3 col-md-6">

                          <label>Project Status:</label>
                          <select name="status" id='status' className="form-select" value={data.status} onChange={(e) => handle(e)}>
                            <option selected value="0">Select Project Status</option>
                            <option value="1">Yet to Start</option>
                            <option value="2">In Progress</option>
                            <option value="3">Postponed</option>
                            <option value="4">Cancelled</option>
                            <option value="5">Closed</option>
                            <option value="6">Partly Executed</option>
                            <option value="7">Executed</option>
                              {/* <option value="0">Yet to start</option>
                              <option value="1">In Progress</option>
                              <option value="2" selected="selected">Postponed</option>
                              <option value="3">Cancelled</option>
                              <option value="4">Closed</option>
                              <option value="5">Partly Executed</option>
                              <option value="6">Executed</option>
                              <option value="7">Lost to Competition</option> */}
                          </select>
                      </div>

                      <div className="form-group mb-3 col-md-6">
                          <label>Comments</label>
                          <input type="text" name="comment" className="form-control" id="status_comments"   value={data.status_comments} onChange={(e) => handle(e)}/>

                      </div>
                      <input type="submit" className="btn btn-success" value="Submit" name="submit" />
                  </form>
              </div>
          </div>

          {/* Form section end */}

      </>
  )

}