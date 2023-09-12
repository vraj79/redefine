import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { axiosInstance } from "../../../config"
import useSound from 'use-sound'
import { Toaster, toast } from 'react-hot-toast'


export const CreateBranch = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();
    const user = localStorage.getItem("user");

    const [services, setServices] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [ddata, setddata] = useState([])
    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])
    const [countries, setCountries] = useState([])

    const [data, setdata] = useState({})

    useEffect(() => {
        getCities();
        getStates();
        getCountries();
    }, [])



    const getCities = async () => {
        const { data } = await axiosInstance.get(`mastercities/view`)
        setCities(data)
        console.log(data);
        console.log("res.data")
    }

    const getCountries = async () => {
        const { data } = await axiosInstance.get(`mastercountries/view`)
        setCountries(data)
        console.log(data);
        console.log("res.data")
    }

    const getStates = async () => {
        const { data } = await axiosInstance.get(`masterstates/view`)
        setStates(data)
        console.log(data);
        console.log("res.data")
    }



    // Handle the input values
    const handle = (e) => {
        const newdata = { ...ddata }
        newdata[e.target.id] = e.target.value;
        newdata["vendor_id"] = id;

        setddata(newdata)
        console.log(newdata);
    }




    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(data);
            const res = await axiosInstance.post(`vendors/branch/`, ddata);
            console.log(res)
            if(res.data?.error){
                return toast.error(res.data?.error?.sqlMessage.toUpperCase())
            }
            if(res.data?.success){
                toast.success(res.data?.msg);
                document.querySelector("form").reset();
                navigate(`/vendors/vendor-info/${id}`)
                // const result =await axiosInstance.post(`/notifications`, { title: "Vendor", subtitle: "New Vendor Branch Created", path: "/vendors" });
                // console.log(res)
                // window.localStorage.setItem("notification", JSON.stringify(result.data));
                // window.dispatchEvent(new Event("notification"));
            }
        }
        catch (error) {
            toast.error(error);
        }
    }

    return (

        <>
<Toaster/>

            <div className="row container ">
                <div className="row align-items-center mb-3">
                    <div className="col-md-6">
                        <h3 className="my-2">Create Branch</h3>
                    </div>
                    <div className="col-md-6 text-end">
                    <button onClick={()=>navigate('/vendors')} className="btn btn-success">Skip</button>
                    <button className="btn btn-warning m-3" onClick={()=>navigate(-1)}>Go Back</button>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form onSubmit={(e) => submit(e)} className="d-flex flex-wrap">
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Office Type:<span className="req">*</span></label>

                            <select name="type" id='type' className="form-select" value={ddata.type} onChange={(e) => handle(e)}>
                                <option value="">Select Office Type</option>
                                <option value="head">Head Office</option>
                                <option value="corporate">Corporate Office</option>
                                <option value="branch">Branch Office</option>
                                <option value="regional">Regional Office</option>
                                <option value="factory">Factory Office</option>
                                <option value="registered">Registered Office</option>
                                <option value="sales">Sales Office</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Name:<span className="req">*</span></label>
                            <input type="text" name="name" className="form-control datepicker" id="name" value={ddata.name} onChange={(e) => handle(e)} />

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Address Line 1:<span className="req">*</span></label>

                            <input type="text" name="address_line_1" className="form-control" id="address_line_1" value={ddata.address_line_1} onChange={(e) => handle(e)} />

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Address Line 2:<span className="req">*</span></label>

                            <input type="text" name="address_line_2" className="form-control" id="address_line_2" value={ddata.address_line_2} onChange={(e) => handle(e)} />

                        </div>

                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Address Line 3:<span className="req">*</span></label>

                            <input type="text" name="address_line_3" className="form-control" id="address_line_3" value={ddata.address_line_3} onChange={(e) => handle(e)} />

                        </div>

                        
                        
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Country:*</label>
                            <select name="country_id" className="form-select" id="country_id" value={ddata.country_id} onChange={(e) => handle(e)}>
                                <option value="1" selected>Select</option>

                                {countries && countries.map(val => (

                                    <>
                                        <option value={val.id}>{val.name}</option>

                                    </>
                                ))}
                                {/* <option value="external">Outbound</option> */}
                            </select>

                        </div>
                        
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">State:*</label>
                            <select name="state_id" className="form-select" id="state_id" value={ddata.state_id} onChange={(e) => handle(e)}>
                                <option value="1" selected>Select</option>

                                {states && states.map(val => (
                                        <option key={val.id} value={val.id}>{val.state}</option>
                                ))}
                                {/* <option value="external">Outbound</option> */}
                            </select>

                        </div>
                        
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">City:*</label>
                            <select name="city_id" className="form-select" id="city_id" value={ddata.city_id} onChange={(e) => handle(e)}>
                                <option value="1" selected>Select</option>

                                {cities && cities.map(val => (
                                        <option key={val.id} value={val.id}>{val.name}</option>
                                ))}
                                {/* <option value="external">Outbound</option> */}
                            </select>

                        </div>
                    
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Zipcode:*</label>
                            <input type="text" name="zipcode" className="form-control datepicker" id="zipcode" value={ddata.zipcode} onChange={(e) => handle(e)} />
                        </div>
                        <div className="form-group col-md-6 px-2 mb-3">
                            <label className="mb-1">Phone:*</label>
                            <input type="text" name="phone" className="form-control datepicker" id="phone" value={ddata.phone} onChange={(e) => handle(e)} />
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
