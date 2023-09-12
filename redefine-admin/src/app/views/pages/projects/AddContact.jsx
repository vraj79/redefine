import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"


export const AddContact = () => {

    const params = useParams();
    const projectId = params.projectId;
    const user = localStorage.getItem("user");

    const [customers, setCustomers] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [ddata, setddata] = useState([])





    const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getallCustomers();
        getallContacts();
    }, [])


    const getallCustomers = async () => {
        const { data } = await axiosInstance.get(`projectcustomers/view/${projectId}`)
        setCustomers(data);

    }
    const getallContacts = async () => {
        const { data } = await axiosInstance.get(`projectcustomers/contact/view/${projectId}`)
        setContacts(data);

    }


    // Handle the input values
    const handle = (e) => {
        const newdata = { ...ddata }
        newdata["project_id"] = projectId;
        newdata[e.target.id] = e.target.value;

        setddata(newdata)
        console.log(newdata);
    }



    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(data);
            // const { result } = await axiosInstance.post(`projectcustomers/contact/`, ddata
            // )
            swal("Yeah", "Contact Added", "success");
            document.querySelector("form").reset();
        }
        catch (error) {
            alert(error);
        }
    }


    return (

        <>

            <ProjectHeader />

            <div className="row container">

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                        <div className="panel panel-body">




                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Customer:*</label>
                                <select required className="form-select" id='customer_id' name="customer_id" value={data.customer_id} onChange={(e) => handle(e)}>
                                    <option value="" selected disabled>Select a customer</option>
                                    {customers && customers.map(value => (

                                            <option key={value.id} value={value.id}>{value.name}</option>

                                    )
                                    )}
                                </select>
                                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Contact:*</label>
                                        <input required type="text" className="form-control" />
                                {/* <select required className="form-select" id='customer_contact_id' name="customer_contact_id" value={data.customer_contact_id} onChange={(e) => handle(e)}>
                                    <option value="" selected disabled>Select a Contact</option>
                                    {contacts && contacts?.map(value => (

                                        <>
                                            <option value={value.id}>{`${value.firstname} ${value.lastname}`}</option>
                                        </>

                                    )
                                    )}
                                </select> */}
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
