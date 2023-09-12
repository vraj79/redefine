import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"


export const UpdateService = () => {

    const navigate = useNavigate();

    const params = useParams();
    const serviceId = params.id;
    console.log(params.id)
    const user = localStorage.getItem("user");

    const [services, setServices] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [data, setdata] = useState([])

    // const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])

    useEffect(() => {
        getallServices();
        getOneService();
    }, [])

    // const update = async () => {
    //     const { data } = await axiosInstance.get(`services/update/${serviceId}`)
    // }
    const getOneService = async () => {
        const { data } = await axiosInstance.get(`services/view/${serviceId}`)
        console.log(data[0]);
        console.log(data);

        setdata(data[0]);

    }

    const getallServices = async () => {
        const { data } = await axiosInstance.get(`services/view`)
        setServices(data);

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
            const { result } = await axiosInstance.put(`services/update/${serviceId}`, data
            )
            swal("Yeah", "Service Updated", "success");
            const { notification } =  axiosInstance.post(`notifications/`, {title:"Service", subtitle:"Service Updated", path:"/service/home"}).then(resp => {
                if(resp.data){
                    console.log("ye", resp.data);
                    window.localStorage.setItem("notification", JSON.stringify(resp.data));
                    window.dispatchEvent(new Event("notification"));
                }
            }) 
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
                        <h3 className="my-2">Create Service</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to="/service/home" title='Edit' className="btn btn-warning" >View All Services</Link>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">


                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Service Title:*</label>

                                <input type="text" name="name" className="form-control" id="name" value={data.name} onChange={(e) => handle(e)} />
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
