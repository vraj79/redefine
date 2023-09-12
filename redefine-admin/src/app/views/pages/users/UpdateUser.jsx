import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import { Toaster, toast } from 'react-hot-toast'



export const UpdateUser = () => {

    const navigate = useNavigate();

    const params = useParams();
    const id = params.id;
    console.log(params.id)
    const user = localStorage.getItem("user");

    const [groups, setGroups] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [data, setdata] = useState([])

    // const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])

    useEffect(() => {
        getOneService();
        getGroups();

    }, [])

    const getGroups = async () => {
        const { data } = await axiosInstance.get(`mastergroups/view`)
        setGroups(data);
    }

    const getOneService = async () => {
        const { data } = await axiosInstance.get(`users/view/${id}`)
        console.log(data[0]);
        console.log(data);

        setdata(data[0]);

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
            const res = await axiosInstance.put(`users/update/${id}`, data)
            toast.success(res.data?.message)
            // const { notification } = axiosInstance.post(`notifications/`, { title: "Service", subtitle: "Rate Card Updated", path: "/service/rate-cards" }).then(resp => {
            //     if (resp.data) {
            //         console.log("ye", resp.data);
            //         window.localStorage.setItem("notification", JSON.stringify(resp.data));
            //         window.dispatchEvent(new Event("notification"));
            //     }
            // })
            // document.querySelector("form").reset();
            // navigate(-1)
            navigate('/users')
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
                        <h3 className="my-2">Update User</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to="/users" title='Edit' className="btn btn-warning" >View All Users</Link>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Group:*</label>
                                <select className="form-select" id='group_id' name="groups" value={data?.group_id} onChange={(e) => handle(e)}>
                                    <option value="0" selected disabled>Select Service</option>
                                    {groups && groups?.map(group => (

                                        <>
                                            <option value={group.id}>{group.name}</option>
                                        </>

                                    )
                                    )}
                                </select>
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">First Name:*</label>

                                <input type="text" name="firstname" className="form-control datepicker" id="firstname" value={data?.firstname} onChange={(e) => handle(e)} />
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Last Name:*</label>

                                <input type="text" name="lastname" className="form-control datepicker" id="lastname" value={data?.lastname} onChange={(e) => handle(e)} />
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email:*</label>

                                <input type="email" name="email" className="form-control" id="email" value={data?.email} onChange={(e) => handle(e)} />
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Mobile:*</label>

                                <input type="number" name="phone" className="form-control" id="phone" value={data?.phone} onChange={(e) => handle(e)} />
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Password:*</label>

                                <input type="password" name="password" className="form-control datepicker" id="password" value={data?.password} onChange={(e) => handle(e)} />
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
