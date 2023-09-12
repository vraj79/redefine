import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import useSound from 'use-sound'


export const UpdateContact = () => {
    const params = useParams();
    const id = params.id;
    const cid = params.cid;
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    const [services, setServices] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [ddata, setddata] = useState([])
    const [level, setLevel] = useState([])
    const [branches, setBranches] = useState([])

    const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])

    useEffect(() => {
        getData();
        getBranches();
        getLevel();

    }, [])



    const getData = async () => {
        const { data } = await axiosInstance.get(`vendors/contact/view/${cid}/${id}`)
        setddata(data[0])
        console.log(data);
        console.log("res.data")
        console.log("ddata", ddata)

    }


    const getBranches = async () => {
        const { data } = await axiosInstance.get(`vendors/branch/viewall/${cid}`)
        setBranches(data);

    }

    const getLevel = async () => {
        const { data } = await axiosInstance.get(`masterdesignations/view`)
        setLevel(data)
        console.log(data);
        console.log("res.data")
    }




    // Handle the input values
    const handle = (e) => {
        const newdata = { ...ddata }
        console.log(newdata);
        newdata[e.target.id] = e.target.value;

        setddata(newdata)
        console.log("newdata", newdata);
    }




    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(data);
            const { result } = await axiosInstance.put(`vendors/contact/update/${id}`, ddata
            )
            swal("Yeah", "Contact Updated", "success");
            // const { notification } = axiosInstance.post(`notifications/`, { title: "Service", subtitle: "New Service Created", path: "/service/home" }).then(resp => {
            //     if (resp.data) {
            //         console.log("ye", resp.data);
            //         window.localStorage.setItem("notification", JSON.stringify(resp.data));
            //         window.dispatchEvent(new Event("notification"));
            //     }
            // })
            document.querySelector("form").reset();
            getData();
            navigate(-1)
        }
        catch (error) {
            alert(error);
        }
    }

    return (

        <>


            <div className="row container ">
                <div className="row align-items-center mb-3">
                    <div className="col-md-6">
                        <h3 className="my-2">Update Contact</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <button className="btn btn-warning" onClick={() => navigate(-1)}>Go Back</button>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form onSubmit={(e) => submit(e)} className="d-flex flex-wrap">
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Salutation:<span className="req">*</span></label>

                            <select name="type" id='type' className="form-select" value={ddata.type} onChange={(e) => handle(e)}>
                                <option value="0" selected disabled>Select</option>
                                <option value="mr">Mr.</option>
                                <option value="ms">Ms.</option>
                                <option value="mrs">Mrs.</option>
                                <option value="dr">Dr.</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">First Name:<span className="req">*</span></label>
                            <input type="text" name="name" className="form-control datepicker" id="firstname" value={ddata.firstname} onChange={(e) => handle(e)} />

                        </div>
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Last Name:<span className="req">*</span></label>
                            <input type="text" name="name" className="form-control datepicker" id="lastname" value={ddata.lastname} onChange={(e) => handle(e)} />

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Date of Birth:<span className="req">*</span></label>

                            <input type="date" name="address_line_1" className="form-control" id="dob" value={ddata.dob} onChange={(e) => handle(e)} />

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Designation Level:*</label>
                            <select name="designation_level_id" className="form-select" id="designation_level_id" value={ddata.designation_level_id} onChange={(e) => handle(e)}>
                                <option value="0" selected disabled>Select</option>

                                {level && level.map(val => (

                                    <>
                                        <option value={val.id}>{val.name}</option>

                                    </>
                                ))}
                                {/* <option value="external">Outbound</option> */}
                            </select>

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Designation:<span className="req">*</span></label>

                            <input type="text" name="designation" className="form-control" id="designation" value={ddata.designation} onChange={(e) => handle(e)} />

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Landline Number:<span className="req">*</span></label>

                            <input type="text" name="landline_number" className="form-control" id="landline_number" value={ddata.landline_number} onChange={(e) => handle(e)} />

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Phone Number 1:<span className="req">*</span></label>

                            <input type="text" name="quotation" value={ddata.mobile_number_1} onChange={(e) => handle(e)} className="form-control" id="mobile_number_1" />

                        </div>
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Phone Number 2:<span className="req">*</span></label>

                            <input type="text" name="quotation" value={ddata.mobile_number_2} onChange={(e) => handle(e)} className="form-control" id="mobile_number_2" />

                        </div>
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Official Email:<span className="req">*</span></label>

                            <input type="email" name="quotation" value={ddata.official_email} onChange={(e) => handle(e)} className="form-control" id="official_email" />

                        </div>
                        


                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Gender:*</label>
                            <select name="gender" className="form-select" id="gender" value={ddata.gender} onChange={(e) => handle(e)}>
                                <option value="0" selected disabled>Select</option>

                                <option value="m">Male</option>
                                <option value="f">Female</option>
                                <option value="n">Rather Not Say</option>
                            </select>

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Official Address:*</label>
                            <select name="customer_branch_id" className="form-select" id="customer_branch_id" value={ddata.customer_branch_id} onChange={(e) => handle(e)}>
                                <option value="0" selected disabled>Select</option>
                                {branches && branches.map(value => (
                                    <>
                                        <option value={value.id}>{value.name}</option>

                                    </>
                                ))}

                            </select>

                        </div>


                        <div className="container text-start">
                            <button className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>

            </div>

        </>

    )
}
