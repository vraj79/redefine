import ContinuousSlider from 'app/views/material-kit/slider/ContinuousSlider';
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from '../../../../config';


export const ManageGroupPrivilege = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dataId = params.id;
    console.log(params.id)
    const user = localStorage.getItem("user");

    const [ddata, setDdata] = useState([]);
    //   const [errMsg, setErrmsg] = useState([])
    const [data, setdata] = useState([])
    const [deletedata, setdeletedata] = useState([])

    // const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])
    const [errMsg, setErrmsg] = useState([])


    useEffect(() => {
        getallData();
        getOneData();
    }, [])

    // const update = async () => {
    //     const { data } = await axiosInstance.get(`masterprivilegesupdate/${serviceId}`)
    // }
    const getOneData = async () => {
        const { data } = await axiosInstance.get(`masterprivileges/group/view/${dataId}`)
        console.log(data[0]);
        console.log(data);

        setdata(data);

    }

    const getallData = async () => {
        const { data } = await axiosInstance.get(`masterprivileges/view`)
        console.log(data)
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
    const handle = (value) => {
        console.log("yes")

        // console.log(value);
        // console.log(e);
        const newdata = [ ...data ]
        const newdeletedata = [ ...deletedata ]
        const newarr = {"privilege": value}
        console.log("newdata.includes(newarr)", newdata.includes(newarr));
        console.log("newdeletedata.includes(newarr)", newdeletedata.includes(newarr));
        if(!newdata?.includes(newarr)){
            console.log("yup");
            newdata[newdata.length] = newarr;
            // newdeletedata = newdeletedata.indexOf(newarr) == -1 ? newdeletedata : newdeletedata.splice(newarr, 1);
            setdeletedata(newdeletedata.filter(i => i.privilege !== newarr.privilege));
            setdata(newdata)
            console.log("newdeletedata", newdeletedata);
            console.log("newdata", newdata);
        }
        else if(!newdeletedata?.includes(newarr)) {
            console.log("yup 2");

            newdeletedata[newdeletedata.length] = newarr;
            // newdata = newdata.indexOf(newarr) == -1 ? newdata : newdata.splice(newarr, 1);
            setdata(newdata.filter(i => i.privilege !== newarr.privilege));
            setdeletedata(newdeletedata);
            console.log("newdeletedata", newdeletedata);
            console.log("newdata", newdata);
            
        }
        

        // console.log(typeof(newdata.length))
        // newdata[newdata.length] = newarr;
        // newdata.push(newarr)
        // newdata.push()
        //   console.log(e.id + "clicked");


        // console.log(newdata);
    }



    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        // if (!data.name) {
        //     let element = "name";
        //     let pElement = document.getElementById("name").nextSibling;
        //     validation(true, element, "Enter Privilege name", pElement);
        //     err = true;

        // }

        // else {
        //     err = false;
        // }
        try {
            console.log(data);
            // if (!err) {
            const { result } = await axiosInstance.put(`masterprivileges/group/update/${dataId}`, data
            )
            swal("Yeah", "Privilege Updated", "success");
            // navigate(-1)
            // }

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
                        <h3 className="my-2">Manage Privileges</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <button onClick={() => navigate(-1)} className="btn btn-warning">Go Back</button>
                    </div>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
                    <div className="table-responsive">
                        <table className="table table-th-block">
                            <thead className="the-box dark full">
                                <tr>
                                    <td width="50%">Name</td>
                                    <td width="35%">Slug</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {ddata && ddata.map((value, index) => {
                                    // console.log("data.privilege", data?.privilege)
                                    // console.log("value.id", value.id)
                                    data && data.map(info => {
                                        // console.log("info.privilege", info?.privilege)
                                    if(info?.privilege==value.id){
                                        document.getElementById(`privilege[${index}]`).setAttribute("checked","checked")
                                    }
                                })

                                     return <>
                                    
                                        <tr>
                                            <td>{value.name}</td>
                                            <td>{value.slug}</td>
                                            <td align="center">
                                                <input type="checkbox" id={`privilege[${index}]`} name={`privilege[${index}]`} 
                                                value={data[index]?.privilege == value.id ? 0 :1} onChange={(e) =>handle(value.id)} />
                                            </td>
                                        </tr>
                                    </>
                                    // ))

})}


                                <tr><td align="right" colspan="4"><input type="submit" className="btn btn-success" value="Submit" name="submit" onClick={(e) => submit(e)} />
                                </td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>


        </>

    )
}
