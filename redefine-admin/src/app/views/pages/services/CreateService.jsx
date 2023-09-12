import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import useSound from 'use-sound'
import { Toaster, toast } from 'react-hot-toast'


export const CreateService = () => {
    const navigate = useNavigate();

    // const playSound = () => {
        const [play] = useSound("./assets/music/notification.mp3", { volume: 0.25 });
    //     return play;
    // }

    // const params = useParams();
    // const serviceId = params.serviceId;
    const user = localStorage.getItem("user");

    const [services, setServices] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [name, setName] = useState([])

    const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])

    useEffect(() => {
        getAllServices();
    }, [])

    // const update = async () => {
    //     const { data } = await axiosInstance.get(`services/update/${serviceId}`)
    // }
    const getAllServices = async () => {
        const { data } = await axiosInstance.get(`services/view`)
        setServices(data);

    }


    const submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(`services/`, {name})
            if(data?.success){
                toast.success(data.msg);
                    navigate('/service/home')
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
                <h3 className="my-2">Create Service</h3>
                </div>
                <div className="col-md-6 text-end">
                <Link to="/service/home" className="btn btn-warning" >View All Service</Link>
                </div>
            </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">

                          
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Service Title:*</label>

                                <input type="text" name="name" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
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
