import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export const ManageQuotation = () => {

  const params = useParams();
  const projectId = params.projectId;

  const [file, setFile] = useState();
  const [fileType, setFileType] = useState();

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    // gather all the data and add to the array i.e. Data
    if(file==null){
      swal("Oops", "Please upload the file", "error");
    }
    else{
    const data = new FormData();
    data.append("file", file)
    data.append("file_type", fileType)
    data.append("flag", "1")
    data.append("project_id", projectId)

    try {
      const { result } = await axiosInstance.post(`projectaddquotation/`, data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      swal("Yeah", "File is uploaded Successfully", "success");
      e.target.reset();
    }
    catch (error) {
      alert(error);
    }
  }
  }



  return (
    <>
      <ProjectHeader />

      {/* Form section start */}

      <div className="col-sm-12 col-xs-12 col-md-12 container">
        <div className="the-box table-bordered-new mb-3">
          <h5 className="iList">Upload Quotation</h5>
          <hr className='mb-3 border-bottom' />
          <div className="form-group col-12">
            <label>Note : It will replace any existing quotation file.</label>
          </div>
          <form className="mainForm" onSubmit={handleDataSubmit}>

            <div className="form-group">
              {/* <label>File:</label> */}
              <div className="input-group">
                {/* <input type="text" className="form-control" readonly="" /> */}
                <div className="my-3">

                  <input className="form-control" type="file" id="formFile" onChange={e => setFile(e.target.files[0])} />
                </div>
              </div>
            </div>
            <input type="submit" className="btn btn-success" value="Submit" name="submit" />
          </form>
        </div>
      </div>

      {/* Form section end */}

    </>
  )
}
