import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import axios from 'axios';
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export const AddFile = () => {
    // Get id from the url and then fetch data from api
    const params = useParams();
    const projectId = params.projectId;

    const [file, setFile] = useState();
    const [fileType, setFileType] = useState();


    const handleDataSubmit = async (e) => {
        e.preventDefault();
        // gather all the data and add to the array i.e. Data
        const data = new FormData();
        data.append("file", file)
        data.append("file_type", fileType)
        // data.append("flag","1")
        data.append("project_id", projectId)

        try {
            const { result } = await axiosInstance.post(`projectaddfile/`, data, {
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




        // try {
        //     const { result } = await axios.get(`https://www.zohoapis.in/crm/v2/Contacts/`, {
        //         headers: {
        //             "accept":"application/json",
        //             "Content-Type": "application/json",
        //             'Authorization': 'Zoho-oauthtoken 1000.d741df5e93df2a7579b53fb5851d64f5.6ef6984370198703600daeffa3aba738'
        //         }
        //     })
            
        // }
        // catch (error) {
        //     alert(error);
        // }





    }


    return (
        <>
            <ProjectHeader />
            <h4 className='ps-0 pe-0'>Add File</h4>
            <hr />
            {/* Form section start */}

            <div className="col-sm-12 col-xs-12 col-md-12 container">
                <div className="the-box table-bordered-new mb-3">

                  


                  
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={handleDataSubmit}>
                        <div className='d-none'>
                            <input type="hidden" name="project_id" value="3414" />
                            <input type="hidden" name="redirect_url" value="" />
                        </div>
                      
                        <div className="form-group mb-3">
                            <label>File:</label>
                            <div className="input-group">
                                {/* <input type="text" className="form-control" readonly="" /> */}
                                <div className="my-3">

                                    <input className="form-control" type="file" id="formFile" onChange={e => setFile(e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group mb-3 col-md-4">

                            <label>File Type:</label>
                            <select name="file_type" className="form-select" value={fileType} onChange={e => setFileType(e.target.value)}>
                                <option value="pif">Project Information Form</option>
                                <option value="photo">Photograph</option>
                                <option value="document">General Document</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                      
                        <input type="submit" className="btn btn-success" value="Submit" name="submit" />
                    </form>
                </div>
            </div>

            {/* Form section end */}

        </>
    )

}
