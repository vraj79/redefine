import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from '../../../../config';


export const UpdateCountries = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dataId = params.id;
    console.log(params.id)
    const user = localStorage.getItem("user");

    const [ddata, setDdata] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [data, setdata] = useState([])

    // const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])
    const [errMsg, setErrmsg] = useState([])


    useEffect(() => {
        getallData();
        getOneData();
    }, [])

    // const update = async () => {
    //     const { data } = await axiosInstance.get(`mastercountriesupdate/${serviceId}`)
    // }
    const getOneData = async () => {
        const { data } = await axiosInstance.get(`mastercountries/view/${dataId}`)
        console.log(data[0]);
        console.log(data);

        setdata(data[0]);

    }

    const getallData = async () => {
        const { data } = await axiosInstance.get(`mastercountries/view`)
        setDdata(data);
    }
    var err = true;
    console.log(err);

    // var errmsg = '';
    var validationErr = [];

    const validation = (err, element, value, pElement) => {
        if (err) {


            document.getElementById(element).classList.add("border-danger");
            pElement.classList.remove("d-none")
            validationErr[element] = value;
            console.log(validationErr);
            console.log(pElement);
            setErrmsg(validationErr);
            console.log(errMsg);
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
        let pElement = e.target.nextSibling;
            validation(false, e.target.id, "", pElement);
            console.log(pElement);

        setdata(newdata)
        console.log(newdata);
    }



    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        if (!data.name) {
            let element = "name";
            let pElement = document.getElementById("name").nextSibling;
            validation(true, element, "Enter Country name", pElement);
        }
        if (!data.iso_code) {
            let element = "iso_code";
            let pElement = document.getElementById("iso_code").nextSibling;
            validation(true, element, "Enter ISO Code", pElement);
        }
       
        if (!data.name || !data.iso_code) {
            err = true;
        }
        else {
            err = false;
        }
        try {
            console.log(data);
            if (!err) {
            const { result } = await axiosInstance.put(`mastercountries/update/${dataId}`, data
            )
            swal("Yeah", "Country Updated", "success");
            document.querySelector("form").reset();
            navigate(-1)
            }

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
                        <h3 className="my-2">Update Country</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to="/master/Countries" title='Edit' className="btn btn-warning" >View All Countries</Link>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">


                        <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Name:*</label>

                                <input type="text" className="form-control" id="name" value={data.name} onChange={(e) => handle(e)} placeholder="Name"/>
                                <small className='badge bg-danger d-none'>{errMsg.name}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Slug:*</label>

                                <input type="text" className="form-control" id="iso_code" value={data.iso_code} onChange={(e) => handle(e)} placeholder="ISO Code"/>
                                <small className='badge bg-danger d-none'>{errMsg.iso_code}</small>
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
