import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from '../../../../config';


export const CreateCountries = () => {
    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    const [data1, setData1] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [ddata, setddata] = useState([])

    const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])
    const [errMsg, setErrmsg] = useState([])


    useEffect(() => {
        getallData();
    }, [])


    const getallData = async () => {
        const { data } = await axiosInstance.get(`mastercountries/view`)
        setData1(data);

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
            validation(true, element, "Enter country name", pElement);
        }
        if (!ddata.iso_code) {
            let element = "iso_code";
            let pElement = document.getElementById("iso_code").nextSibling;
            validation(true, element, "Enter country ISO Code", pElement);
        }
        if (!ddata.name || !ddata.iso_code) {
            err = true;
        }
        else {
            err = false;
        }

        try {
            console.log(ddata);
            console.log(err);
            if (!err) {
                const { result } = await axiosInstance.post(`mastercountries/`, ddata
                )
                swal("Yeah", "Country Added", "success");
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
                        <h3 className="my-2">Create country</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to="/master/countries" className="btn btn-warning" >View All countries</Link>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Name:*</label>

                                <input type="text" className="form-control" id="name" value={ddata.name} onChange={(e) => handle(e)} placeholder="Name" />
                                <small className='badge bg-danger d-none'>{errMsg.name}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Slug:*</label>

                                <input type="text" className="form-control" id="iso_code" value={ddata.iso_code} onChange={(e) => handle(e)} placeholder="ISO Code"/>
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
