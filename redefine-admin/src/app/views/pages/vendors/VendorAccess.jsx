import React, { useState, useEffect } from 'react'
import { axiosInstance } from "../../../config"
import swal from 'sweetalert'
import { Link, useParams } from 'react-router-dom'


export const VendorAccess = () => {

    const params = useParams();
    const Id = params.id;

    const [departments, setDepartments] = useState([]);
    const [pteam, setpteam] = useState([]);
    const [data, setdata] = useState({})
    const [tdata, settdata] = useState([])
    const [projectTeam, setProjectTeam] = useState([])
    const [errMsg, setErrmsg] = useState([])
    const [removeAccess, setRemoveAccess] = useState([])
    console.log(removeAccess);

    useEffect(() => {

        getTeamData();
        getTeam();



    }, [])

    const getTeamData = async () => {
        const { data } = await axiosInstance.get(`projectcreateproject/team/view`)
        setpteam(data);
        console.log(data);
        console.log(departments)
    }
    const getTeam = async () => {
        // console.log(pid);
        const { data } = await axiosInstance.get(`clients/access/view/${Id}`)
        setProjectTeam(data);
        console.log(projectTeam);
        console.log("departments")
    }

    const handleRemove = async (e) => {
        const newdata = [...removeAccess];
        if (!newdata.includes(e)) {
            newdata.push(e)
        }
        console.log(newdata);
        setRemoveAccess(newdata);

        try {
            if (window.confirm("This will permanently delete the Access for this user")) {
                const { result } = await axiosInstance.delete(`clients/access/delete/${newdata[0]}`)
                getTeam();
            }

        }
        catch (error) {
            alert(error);
        }
    }

    // var errmsg = '';
    var validationErr = [];

    const validation = (err, element, value, pElement) => {
        if (err) {

            if (element == "dateError") {
                document.getElementById("err").classList.remove("d-none");
                window.location.href = "#top";
            }
            if (element != "dateError") {
                console.log("en")
                document.getElementById(element).classList.add("border-danger");
                pElement.classList.remove("d-none")
            }
            validationErr[element] = value;

            // msg.push(value);

            // errmsg += value;
            // msg = `<ul>${errmsg}</ul>`;
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

    var err = true;

    const handleTeam = (e) => {
        // console.log(projectId);
        const newdata = { ...tdata }

        newdata["customer_id"] = Id;
        newdata[e.target.id] = e.target.value;
        let pElement = e.target.nextSibling;

        validation(false, e.target.id, "", pElement);
        settdata(newdata)
        console.log(newdata);
    }


    // Submit Team Data
    const SubmitTeam = async (e) => {
        e.preventDefault();


        console.log("submit Customer");

        if (!tdata.user_id) {
            let element = "user_id";
            let pElement = document.querySelector(".manager_class").nextSibling;
            validation(true, element, "Select a customer", pElement);
        }


        if (!tdata.user_id || tdata.user_id == "") {
            err = true;
        }
        else {
            err = false;
        }


        console.log("state good");
        try {
            console.log(data);
            if (!err) {
                console.log(tdata);
                const { result } = await axiosInstance.post(`clients/access/`, tdata
                )
                // swal("Yeah", "Project Status updated", "success");
                settdata({ user_id: "" })
                // console.log(projectId);
                getTeam();

                // document.getElementById("pills-contact-tab").click();
            }
        }
        catch (error) {
            alert(error);
        }
    }



    return (
        <>
            <div className="row px-3">
                <div className="col-md-12">
                    <div className="shadow p-3 mb-3 bg-light border">
                        <h4 className='mb-3'>Team Added</h4>
                        {projectTeam && projectTeam.map((value, index) => (
                            // console.log(value.name);
                            <>
                                <p className='badge p-2 bg-info me-2'>{value.name}
                                    <a id={value.id} className="removeButton" onClick={(e) => handleRemove(value.id)}>
                                        <i className="fa-solid fa-square-xmark ms-3 text-danger fs-5"></i>
                                    </a>
                                </p>
                            </>
                        ))}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Project Team:*</label>
                        <select className='manager_class form-select' id='user_id' name="user_id" value={data.user_id} onChange={(e) => handleTeam(e)}>
                            <option value="0" selected disabled>Select Team Member</option>
                            {pteam && pteam.map(team => (

                                <>
                                    <option value={team.id}>{team.name}</option>
                                </>

                            )
                            )}
                        </select>
                        <small className='badge bg-danger d-none'>{errMsg.user_id}</small>
                    </div>
                </div>

                <div className="col-md-12 text-start">
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label" style={{ visibility: "hidden" }}>Project:*</label><br />
                        <button className="btn btn-primary me-3" id='addmember' onClick={(e) => SubmitTeam(e)}>Save</button>
                    </div>
                </div>
            </div>

        </>
    )
}