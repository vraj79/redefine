import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from '../../../../config';
import { ToastBar, ToastIcon, Toaster, toast } from 'react-hot-toast';


export const UpdatePrivilege = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dataId = params.id;

    const [data, setdata] = useState([])

    const [errMsg, setErrmsg] = useState([])


    useEffect(() => {
        getOneData();
    }, [])

    const getOneData = async () => {
        const { data } = await axiosInstance.get(`masterprivileges/view/${dataId}`);
        setdata(data[0]);
    }

    var err = true;

    var validationErr = [];

    const validation = (err, element, value, pElement) => {
        if (err) {
            document.getElementById(element).classList.add("border-danger");
            pElement.classList.remove("d-none")
            validationErr[element] = value;
            setErrmsg(validationErr);
        }
        else {
            document.getElementById(element).classList.remove("border-danger");
            pElement.classList.add("d-none")
        }

    }


    // Handle the input values
    const handle = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value;
        if (e.target.id != "description") {
            let pElement = e.target.nextSibling;
            validation(false, e.target.id, "", pElement);
        }

        setdata(newdata)
    }



    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        if (!data.name) {
            let element = "name";
            let pElement = document.getElementById("name").nextSibling;
            validation(true, element, "Enter Privilege name", pElement);
        }
        if (!data.slug) {
            let element = "slug";
            let pElement = document.getElementById("slug").nextSibling;
            validation(true, element, "Enter Privilege slug", pElement);
        }
        if (!data.name || !data.slug) {
            err = true;
        }
        else {
            err = false;
        }
        try {
            if (!err) {
            const res = await axiosInstance.put(`masterprivileges/update/${dataId}`, data)
            if (res?.status === 200) {
                toast.success("Privilege Updated");
                document.querySelector("form").reset();
                navigate(-1);
              }
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
                        <h3 className="my-2">Update Privileges</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to="/master/privileges" title='Edit' className="btn btn-warning" >View All Privileges</Link>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">


                        <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Name:*</label>

                                <input required type="text" className="form-control" id="name" value={data.name} onChange={(e) => handle(e)} placeholder="Name"/>
                                <small className='badge bg-danger d-none'>{errMsg.name}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Slug:*</label>

                                <input required type="text" className="form-control" id="slug" value={data.slug} onChange={(e) => handle(e)} placeholder="Slug"/>
                                <small className='badge bg-danger d-none'>{errMsg.slug}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Description:*</label>

                                <input required type="text" className="form-control" id="description" value={data.description} onChange={(e) => handle(e)} placeholder="Ranges from 10-100"/>
                                {/* <small className='badge bg-danger d-none'>{errMsg.description}</small> */}


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
