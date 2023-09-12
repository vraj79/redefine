import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"


export const ManageDepartment = () => {

  const params = useParams();
  const projectId = params.projectId;
  const user = localStorage.getItem("user");

  const [departments, setDepartments] = useState([]);
  const [errMsg, setErrmsg] = useState([])
  const [ddata, setddata] = useState([])





  const [data, setdata] = useState({})
  const [myData, setMyData] = useState([])

  useEffect(() => {
    getdepartmentList();
  }, [])



  const getdepartmentList = async () => {
    const { data } = await axiosInstance.get(`projectdepartments/view`)
    setDepartments(data);
    console.log(data);
    console.log(departments)
}


// Handle the input values
const handleDepartment = (e) => {
    const newdata = { ...ddata }
    newdata[e.target.id] = e.target.value;

    setddata(newdata)
    console.log(newdata);
}



// Submit the form and send data to api
  const submit = async (e) => {
      e.preventDefault();
      try {
          console.log(data);
      const {result} = await axiosInstance.put(`projectdepartments/update/${projectId}`, ddata
      )
      swal("Yeah", "Department updated", "success");
      document.querySelector("form").reset();
      }
      catch(error){
          alert(error);
      }
  }


  return (
    
    <>

    <ProjectHeader />

    <div className="row container">

        <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
            <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                <div className="panel panel-body">

                <label className='mb-3 badge bg-warning text-dark'>Caution: Removing any previously added department will also remove its progress.</label>

                   
                  
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Project Department:*</label>
                                                    <select className="form-select" id='department_id' name="department_id" value={data.department_id} onChange={(e) => handleDepartment(e)}>
                                                        <option value="0" selected disabled>Select a Department</option>
                                                        {departments && departments.map(department => (

                                                            <>
                                                                <option value={department.id}>{department.name}</option>
                                                            </>

                                                        )
                                                        )}
                                                    </select>
                                                    {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
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
