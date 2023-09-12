import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from '../../../../config';


export const CreateStates = () => {
    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    const [data1, setData1] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [ddata, setddata] = useState([])
    const [countries, setCountries] = useState([])

    const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])
    const [errMsg, setErrmsg] = useState([])


    useEffect(() => {
        getallData();
        getdata();
    }, [])


    const getallData = async () => {
        const { data } = await axiosInstance.get(`masterstates/view`)
        setData1(data);

    }

    const getdata = async () => {
        const { data } = await axiosInstance.get(`mastercountries/view`)
        setCountries(data)
        console.log(data);
        console.log("res.data")
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
        const newdata = { ...ddata }
        newdata[e.target.id] = e.target.value;
            let pElement = e.target.nextSibling;
            validation(false, e.target.id, "", pElement);
            console.log(pElement);

        
        setddata(newdata)
        console.log(newdata);
    }



    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        if (!ddata.name) {
            let element = "name";
            let pElement = document.getElementById("name").nextSibling;
            validation(true, element, "Enter Name", pElement);
        }
        if (!ddata.iso_code) {
            let element = "iso_code";
            let pElement = document.getElementById("iso_code").nextSibling;
            validation(true, element, "Enter ISO Code", pElement);
        }
        if (!ddata.zone) {
            let element = "zone";
            let pElement = document.getElementById("zone").nextSibling;
            validation(true, element, "Enter Zone", pElement);
        }
        if (!ddata.country) {
            let element = "country";
            let pElement = document.getElementById("country").nextSibling;
            validation(true, element, "Enter Country", pElement);
        }
        if (!ddata.name || !ddata.iso_code || !ddata.zone || !ddata.country) {
            err = true;
        }
        else {
            err = false;
        }

        try {
            console.log(ddata);
            console.log(err);
            if (!err) {
                const { result } = await axiosInstance.post(`masterstates/`, ddata
                )
                swal("Yeah", "State Added", "success");
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
                        <h3 className="my-2">Create State</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to="/master/states" className="btn btn-warning" >View All States</Link>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Name:*</label>

                                <input type="text" className="form-control" id="name" value={ddata.name} onChange={(e) => handle(e)} />
                                <small className='badge bg-danger d-none'>{errMsg.name}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">ISO Code:*</label>

                                <input type="text" className="form-control" id="iso_code" value={ddata.iso_code} onChange={(e) => handle(e)}/>
                                <small className='badge bg-danger d-none'>{errMsg.iso_code}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Zone:*</label>
                            <select className="form-select" id='zone' value={ddata.zone} onChange={(e) => handle(e)}>                                   
                                            <option value="" selected>select</option>
                                            <option value="E">East</option>
                                            <option value="W">West</option>
                                            <option value="N">North</option>
                                            <option value="S">South</option>
                                            <option value="C">Center</option>
                                      
                                </select>
                                <small className='badge bg-danger d-none'>{errMsg.zone}</small>

                                </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Country:*</label>

                                <select className="form-select" id='country' value={ddata.country} onChange={(e) => handle(e)}>
                                <option value="" selected>select</option>

                                    {countries && countries.map(value => (

                                        <>
                                            <option value={value.id}>{value.name}</option>
                                        </>

                                    )
                                    )}
                                    </select>
                                    <small className='badge bg-danger d-none'>{errMsg.country}</small>


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
