import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from '../../../../config';


export const UpdateCities = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dataId = params.id;
    console.log(params.id)
    const user = localStorage.getItem("user");

    //   const [errMsg, setErrmsg] = useState([])
    const [data, setdata] = useState([])
    const [ddata, setddata] = useState([])

    // const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])
    const [errMsg, setErrmsg] = useState([])


    useEffect(() => {
        getOneData();
        getdata();
    }, [])

    // const update = async () => {
    //     const { data } = await axiosInstance.get(`mastergroupsupdate/${serviceId}`)
    // }
    const getOneData = async () => {
        const { data } = await axiosInstance.get(`mastercities/view/${dataId}`)
        console.log(data[0]);
        console.log(data);

        setddata(data[0]);

    }
    
    const getdata = async () => {
        const { data } = await axiosInstance.get(`masterstates/view`)
        setdata(data)
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
            validation(true, element, "Enter name", pElement);
        }
        if (!ddata.state) {
            let element = "state";
            let pElement = document.getElementById("state").nextSibling;
            validation(true, element, "Enter State", pElement);
        }
        if (!ddata.name || !ddata.state) {
            err = true;
        }
        else {
            err = false;
        }
        try {
            console.log(data);
            if (!err) {
            const { result } = await axiosInstance.put(`mastercities/update/${dataId}`, ddata
            )
            swal("Yeah", "City Updated", "success");
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
                        <h3 className="my-2">Update City</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to="/master/cities" title='Edit' className="btn btn-warning" >View All Cities</Link>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">


                        <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Name:*</label>

                                <input type="text" className="form-control" id="name" value={ddata.name} onChange={(e) => handle(e)}/>
                                <small className='badge bg-danger d-none'>{errMsg.name}</small>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">State:*</label>

                                <select className="form-select" id='state' value={ddata.state} onChange={(e) => handle(e)}>
                                <option value="" selected>select</option>

                                    {data && data.map(value => (

                                        <>
                                            <option value={value.id}>{value.state}</option>
                                        </>

                                    )
                                    )}
                                    </select>
                                <small className='badge bg-danger d-none'>{errMsg.state}</small>
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
