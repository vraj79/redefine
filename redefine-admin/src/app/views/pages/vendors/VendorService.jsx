import React, { useState, useEffect } from 'react'
import { axiosInstance } from "../../../config"
import swal from 'sweetalert'
import { Link, useParams, useNavigate } from 'react-router-dom'


export const VendorService = () => {

    const params = useParams();
    const projectId = params.id;
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [pteam, setpteam] = useState([]);
    const [data, setdata] = useState({})
    const [tdata, settdata] = useState([])
    const [projectTeam, setProjectTeam] = useState([])
    const [errMsg, setErrmsg] = useState([])
    const [removeAccess, setRemoveAccess] = useState([])
    const [services, setServices] = useState([])
    console.log(removeAccess);

    useEffect(() => {

        getTeam();
        Services();


    }, [])

    const getTeam = async () => {
        // console.log(pid);
        const { data } = await axiosInstance.get(`vendors/services/view/${projectId}`)
        setProjectTeam(data);
        console.log(projectTeam);
    }
    const Services = async () => {
        const { data } = await axiosInstance.get(`services/view`)
        setServices(data)
        console.log(data);
        console.log("res.data")
    }

    const handleRemove = async (e) => {
        const newdata = [...removeAccess];
        if (!newdata.includes(e)) {
            newdata.push(e)
        }
        console.log(newdata);
        setRemoveAccess(newdata);

        try {
            if (window.confirm("This will permanently delete the service for this particular client")) {
                const { result } = await axiosInstance.delete(`vendors/services/delete/${newdata[0]}`)
                getTeam();
            }

        }
        catch (error) {
            alert(error);
        }
    }


    const handleTeam = (e) => {
        console.log(projectId);
        const newdata = { ...tdata }

        newdata["vendor_id"] = projectId;
        newdata[e.target.id] = e.target.value;
     
        settdata(newdata)
        console.log(newdata);
    }


    // Submit Team Data
    const SubmitTeam = async (e) => {
        e.preventDefault();

        try {
            console.log(data);
                console.log(tdata);
                const { result } = await axiosInstance.post(`vendors/services/`, tdata
                )
                // swal("Yeah", "Project Status updated", "success");
                settdata({ manager_id: "" })
                getTeam();

        }
        catch (error) {
            alert(error);
        }
    }



    return (
        <>

<div className="row align-items-center mb-3">
                    <div className="col-md-6">
                        <h3 className="my-2">Add Service</h3>
                    </div>
                    <div className="col-md-6 text-end">
                    <button className="btn btn-success" onClick={()=>navigate(-1)}>Go Back</button>
                    <button className="btn btn-warning ms-2" onClick={()=>navigate(`/vendors`)}>View All Vendors</button>
                    </div>
                </div>


            <div className="row px-3">
                <div className="col-md-12">
                    <div className="shadow p-3 mb-3 bg-light border">
                        <h4 className='mb-3'>Services Added</h4>
                        {projectTeam && projectTeam.map((value) => (
                            <div key={value.id}>
                                <p className='badge p-2 bg-info me-2 position-relative'>{value.name}
                                    <a id={value.id} className="removeButton" onClick={(e) => handleRemove(value.id)}>
                                        <i className="fa-solid fa-square-xmark ms-3 text-danger fs-5"></i>
                                    </a>
                                </p>
                            </div>
                        ))}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Vendor Service:*</label>
                        <select className='manager_class form-select' id='service_id' name="service_id" value={data.service_id} onChange={(e) => handleTeam(e)} required="required">
                            <option value="0" selected disabled>Select Service</option>
                            {services && services.map(value => (

                                <>
                                    <option value={value.id}>{value.name}</option>
                                </>

                            )
                            )}
                        </select>
                    </div>
                   
                </div>

                <div className="col-md-12 text-start">
                    <div className="mb-3">
                        <button className="btn btn-primary me-3" id='addmember' onClick={(e) => SubmitTeam(e)}>Save</button>
                    </div>
                </div>
            </div>

        </>
    )
}