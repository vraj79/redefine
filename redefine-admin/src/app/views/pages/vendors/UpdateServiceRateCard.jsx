import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"



export const UpdateServiceRateCard = () => {

    const navigate = useNavigate();

    const params = useParams();
    const serviceId = params.id;
    console.log(params.id)
    const user = localStorage.getItem("user");

    const [services, setServices] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [data, setdata] = useState([])
    const [vendors, setVendors] = useState([])
    const [cities, setCities] = useState([])

    // const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])

    useEffect(() => {
        getallServices();
        getOneService();
        getallVendors();
        getallCities();
    }, [])

    // const update = async () => {
    //     const { data } = await axiosInstance.get(`services/update/${serviceId}`)
    // }
    const getOneService = async () => {
        const { data } = await axiosInstance.get(`vendors/ratecard/view/${serviceId}`)
        console.log(data[0]);
        console.log(data);

        setdata(data[0]);

    }

    const getallServices = async () => {
        const { data } = await axiosInstance.get(`services/view`)
        setServices(data);

    }
    const getallVendors = async () => {
        const { data } = await axiosInstance.get(`vendors/view`)
        setVendors(data);

    }
    const getallCities = async () => {
        const { data } = await axiosInstance.get(`mastercities/view`)
        setCities(data);

    }


    // Handle the input values
    const handle = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value;

        setdata(newdata)
        console.log(newdata);
    }



    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(data);
            const { result } = await axiosInstance.put(`vendors/ratecard/update/${serviceId}`, data
            )
            swal("Yeah", "Rate Card Updated", "success");
            // const { notification } =  axiosInstance.post(`notifications/`, {title:"Service", subtitle:"Rate Card Updated", path:"/service/rate-cards"}).then(resp => {
            //     if(resp.data){
            //         console.log("ye", resp.data);
            //         window.localStorage.setItem("notification", JSON.stringify(resp.data));
            //         window.dispatchEvent(new Event("notification"));
            //     }
            // }) 
            document.querySelector("form").reset();
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
                <h3 className="my-2">Update Vendor Rate Card</h3>
                </div>
                <div className="col-md-6 text-end">
                <Link to="/vendors/rate-cards" title='Edit' className="btn btn-warning" >View All Rate Cards</Link>
                </div>
            </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Service Vendor:*</label>
                                <select className="form-select" id='vendor_id' name="vendor_id" value={data.vendor_id} onChange={(e) => handle(e)}>
                                    <option value="0" selected disabled>Select Vendor</option>
                                    {vendors && vendors.map(city => (

                                        <>
                                            <option value={city.id}>{city.name}</option>
                                        </>

                                    )
                                    )}
                                </select>
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Service City:*</label>
                                <select className="form-select" id='city_id' name="city_id" value={data.city_id} onChange={(e) => handle(e)}>
                                    <option value="0" selected disabled>Select City</option>
                                    {cities && cities.map(city => (

                                        <>
                                            <option value={city.id}>{city.name}</option>
                                        </>

                                    )
                                    )}
                                </select>
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Select Service:*</label>
                                <select className="form-select" id='service_id' name="service_id" value={data.service_id} onChange={(e) => handle(e)}>
                                    <option value="0" selected disabled>Select Service</option>
                                    {services && services.map(city => (

                                        <>
                                            <option value={city.id}>{city.name}</option>
                                        </>

                                    )
                                    )}
                                </select>
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Service Element:*</label>

                                <input type="text" name="element" className="form-control datepicker" id="element" value={data.element} onChange={(e) => handle(e)} />
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Service Description:*</label>

                                <input type="text" name="description" className="form-control datepicker" id="description" value={data.description} onChange={(e) => handle(e)} />
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Rate Type:*</label>

                                <select className="form-select" id='rate_type' name="rate_type" value={data.rate_type} onChange={(e) => handle(e)}>
                                    <option value="00" selected disabled>Select Rate Type</option>
                                    <option value="0">Per Item</option>
                                    <option value="1">Per Hours</option>
                                    <option value="2">Per LBH</option>
                                </select>
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Enter Service Rate:*</label>

                                <input type="number" name="rate" className="form-control datepicker" id="rate" value={data.rate} onChange={(e) => handle(e)} />
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
