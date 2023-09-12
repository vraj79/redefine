import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../config";
import {useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export const CreateProject = () => {
  const [customers, setCustomers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [pcustomers, setpcustomers] = useState([]);
  const [pteam, setpteam] = useState([]);
  const [data, setdata] = useState({});
  const [cdata, setcdata] = useState([]);
  const [ddata, setddata] = useState([]);
  const [tdata, settdata] = useState([]);
  const [projectTeam, setProjectTeam] = useState([]);
  const [errMsg, setErrmsg] = useState([]);
  const [project_id, setProject_id] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getdata();
    getdepartmentList();
    document.getElementById("step3").onclick = function () {
      document.getElementById("pills-contact-tab").click();
    };
    // document.getElementById("skip").onclick = function () {
    //     document.getElementById("pills-contact-tab").setAttribute("data-bs-toggle", "pill")
    //     document.getElementById("pills-contact-tab").setAttribute("data-bs-target", "#pills-contact")
    //     document.getElementById("pills-contact-tab").click();
    // }

    getTeamData();
  }, []);

  const getdata = async () => {
    const { data } = await axiosInstance.get(`projectcustomers/view`);
    setCustomers(data);
  };
  const getcustomers = async (pid) => {
    const { data } = await axiosInstance.get(`projectcustomers/view/${pid}`);
    setpcustomers(data);
  };
  const getdepartmentList = async () => {
    const { data } = await axiosInstance.get(`projectdepartments/view`);
    setDepartments(data);
  };
  const getTeamData = async () => {
    const { data } = await axiosInstance.get(`projectcreateproject/team/view`);
    setpteam(data);
  };

  const getTeam = async (pid) => {
    const { data } = await axiosInstance.get(
      `projectcreateproject/team/view/${pid}`
    );
    setProjectTeam(data);
  };

  // var errmsg = '';
  var validationErr = [];

  const validation = (err, element, value, pElement) => {
    if (err) {
      if (element == "dateError") {
        document.getElementById("err").classList.remove("d-none");
        window.location.href = "#top";
      }
      if (element != "dateError") {
        document.getElementById(element).classList.add("border-danger");
        pElement.classList.remove("d-none");
      }
      validationErr[element] = value;

      // msg.push(value);

      // errmsg += value;
      // msg = `<ul>${errmsg}</ul>`;
      setErrmsg(validationErr);
    } else {
      document.getElementById(element).classList.remove("border-danger");
      pElement.classList.add("d-none");
    }
  };

  var err = true;

  const handle = (e) => {
    const newdata = { ...data };
    const newdata2 = { ...data };
    let pElement = e.target.nextSibling;
    if (e.target.id == "expected_revenue" || e.target.id == "quotation") {
      pElement = e.target.parentNode.nextSibling;
    }
    if (e.target.id == "likely_end_date") {
      newdata["actual_end_date"] = e.target.value;
      newdata2["actual_end_date"] = e.target.value;
    }
    // if(e.target.id == "expected_revenue"){
    //     // newdata["expected_revenue"] = e.target.value;
    //     newdata["expected_revenue"] = Number(e.target.value.split(',').join('')).toLocaleString();
    //     // newdata2["expected_revenue"] = e.target.value.split(',').join('');
    //     pElement = e.target.parentNode.nextSibling;

    // }
    // else if(e.target.id == "quotation"){
    //     // newdata["quotation"] = e.target.value;
    //     newdata["quotation"] = Number(e.target.value.split(',').join('')).toLocaleString();
    //     // newdata2["quotation"] = e.target.value.split(',').join('');
    //     pElement = e.target.parentNode.nextSibling;

    // }
    // else{
    newdata[e.target.id] = e.target.value;
    newdata["created"] = sessionStorage.getItem("id");
    newdata2[e.target.id] = e.target.value;
    // }

    // if(e.target.id == 'description' && e.target.value.length <= 19){
    //     let myElement = document.getElementById("description");
    //     validation(true, "description", "", myElement);
    // }
    // else
    // {

    validation(false, e.target.id, "", pElement);
    // }

    setdata(newdata2);
  };

  const handleCustomer = (e) => {
    const newdata = { ...cdata };
    newdata["project_id"] = document.getElementById("project_id").value;
    newdata[e.target.id] = e.target.value;
    let pElement = e.target.nextSibling;
    // if(e.target.id == 'description' && e.target.value.length <= 19){
    //     let myElement = document.getElementById("description");
    //     validation(true, "description", "", myElement);
    // }
    // else
    // {
    validation(false, e.target.id, "", pElement);
    // }

    setcdata(newdata);
  };
  const handleDepartment = (e) => {
    const newdata = { ...ddata };
    newdata["project_id"] = document.getElementById("project_id").value;
    newdata[e.target.id] = e.target.value;
    let pElement = e.target.nextSibling;
    // if(e.target.id == 'description' && e.target.value.length <= 19){
    //     let myElement = document.getElementById("description");
    //     validation(true, "description", "", myElement);
    // }
    // else
    // {
    validation(false, e.target.id, "", pElement);
    // }

    setddata(newdata);
  };

  const handleTeam = (e) => {
    const newdata = { ...tdata };
    newdata["project_id"] = document.getElementById("project_id").value;
    newdata[e.target.id] = e.target.value;
    let pElement = e.target.nextSibling;
    // if(e.target.id == 'description' && e.target.value.length <= 19){
    //     let myElement = document.getElementById("description");
    //     validation(true, "description", "", myElement);
    // }
    // else
    // {
    validation(false, e.target.id, "", pElement);
    // }

    settdata(newdata);
  };

  const submit = async (e) => {
    e.preventDefault();


    if (!data.category || data.category === "0") {
      let element = "category";
      let pElement = document.getElementById("category").nextSibling;
      validation(true, element, "Select a category", pElement);
    }
    if (!data.project_classification || data.project_classification === "0") {
      let element = "project_classification";
      let pElement = document.getElementById(
        "project_classification"
      ).nextSibling;
      validation(true, element, "Select a Project Classification", pElement);
    }
    if (!data.title) {
      let element = "title";
      let pElement = document.getElementById("title").nextSibling;
      validation(true, element, "Add a title", pElement);
    } else {
      data.title = data.title.replace(/'/g, "-");
    }
    // if (data.description) {
    //   data.description = data.description.replace(/'/g, "-");
    // }
    if (!data.quotation_price) {
      let element = "quotation_price";
      let pElement = document.getElementById("quotation_price_err");
      validation(true, element, "Add a Quotation Reference", pElement);
    }
    if (!data.description || data.description.length <= 19 || data.description.length>1000) {
      let element = "description";
      let pElement = document.getElementById("description").nextSibling;
      validation(
        true,
        element,
        "Add a Description (Minimum 20 Words)",
        pElement
      );
    }
    if (data.description.length>1000) {
      let element = "description";
      let pElement = document.getElementById("description").nextSibling;
      validation(
        true,
        element,
        "Description should not be greater than 1000 words",
        pElement
      );
    }
    if (!data.start_date) {
      let element = "start_date";
      let pElement = document.getElementById("start_date").nextSibling;
      validation(true, element, "Select a Start Date", pElement);
    }
    if (!data.likely_end_date) {
      let element = "likely_end_date";
      let pElement = document.getElementById("likely_end_date").nextSibling;
      validation(true, element, "Select an End Date", pElement);
    }
    if (!data.expected_revenue) {
      let element = "expected_revenue";
      let pElement =
        document.getElementById("expected_revenue").parentNode.nextSibling;

      validation(true, element, "Add an Expected Revenue", pElement);
    } else {
      data.expected_revenue = data.expected_revenue.replace(/,/g, "");
    }
    if (!data.status || data.status === "0") {
      let element = "status";
      let pElement = document.getElementById("status").nextSibling;
      validation(true, element, "Select Project Status", pElement);
    }
    if (data.start_date > data.likely_end_date) {
      // let element = "status";
      // let pElement = document.getElementById("status").nextSibling;
      validation(
        true,
        "dateError",
        "Start Date can't be greater than End Date",
        ""
      );
    }

    // if (!data.category || !data.project_classification || !data.title || !data.description || !data.description.length >= 20 || !data.start_date || !data.likely_end_date || !data.status || data.start_date > data.likely_end_date) {
    //     err = true;
    // }
    if (
      !data.category ||
      !data.project_classification ||
      !data.title ||
      !data.start_date ||
      !data.likely_end_date ||
      !data.expected_revenue ||
      !data.status ||
      data.start_date > data.likely_end_date ||
      !data.quotation_price
    ) {
      err = true;
    }

    // if (!data.category || !data.project_classification || !data.title || !data.quotation || !data.description || !data.description.length >= 20 || !data.start_date || !data.likely_end_date || !data.expected_revenue || !data.status || data.start_date > data.likely_end_date) {
    //     err = true;
    // }
    else {
      err = false;
    }

    // if (err) {
    //     document.getElementById('err').classList.remove("d-none")
    //     document.getElementById('err').classList.add("d-block")
    //     window.location.href = "#top"
    // }
    if (!err) {
      document.getElementById("err").classList.add("d-none");
    }

    try {
      if (!data.quotation) {
        data.quotation = "N/A";
      }
      if (!data.description) {
        data.description = "N/A";
      }
      if (!err) {
        const res = await axiosInstance.post(`projectcreateproject/info`, data);
        // swal("Yeah", "Project Status updated", "success");
        document.querySelector("form").reset();
        setProject_id(res.data?.project_id);
        // getcustomers(data?.project_id);
        // getTeam(data?.project_id);
        document
          .getElementById("pills-profile-tab")
          .setAttribute("data-bs-toggle", "pill");
        document
          .getElementById("pills-profile-tab")
          .setAttribute("data-bs-target", "#pills-profile");
        document.getElementById("pills-profile-tab").click();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const skip = (e) => {
    e.preventDefault();
    document
      .getElementById("pills-contact-tab")
      .setAttribute("data-bs-toggle", "pill");
    document
      .getElementById("pills-contact-tab")
      .setAttribute("data-bs-target", "#pills-contact");
    document.getElementById("pills-contact-tab").click();
  };

  const AddAnotherCustomer = () => {};
  // setProject_id("${project_id}");
  const SubmitCustomer = async (e) => {
    e.preventDefault();


    if (!cdata.customer_id) {
      let element = "customer_id";
      let pElement = document.getElementById("customer_id").nextSibling;
      validation(true, element, "Select a customer", pElement);
    }

    if (!cdata.customer_id || cdata.customer_id == "") {
      err = true;
    } else {
      err = false;
    }

    try {
      if (!err) {
        // cdata.concat({"project_id": `${project_id}`});
        const { result } = await axiosInstance.post(`projectcustomers/`, cdata);
        // swal("Yeah", "Project Status updated", "success");
        setcdata({ customer_id: "" });
        document.getElementById("customer_id").value = "0";
        getcustomers(project_id);

        // document.getElementById("pills-contact-tab").click();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const SubmitCustomer2 = async (e) => {
    e.preventDefault();


    if (!cdata.customer_id) {
      let element = "customer_id";
      let pElement = document.getElementById("customer_id").nextSibling;
      validation(true, element, "Select a customer", pElement);
    }

    if (!cdata.customer_id) {
      err = true;
    } else {
      err = false;
    }

    try {
      if (!err) {
        // cdata.concat({"project_id": `${project_id}`});
        const { result } = await axiosInstance.post(`projectcustomers/`, cdata);
        // swal("Yeah", "Project Status updated", "success");
        document.querySelector("form").reset();
        document
          .getElementById("pills-contact-tab")
          .setAttribute("data-bs-toggle", "pill");
        document
          .getElementById("pills-contact-tab")
          .setAttribute("data-bs-target", "#pills-contact");
        getcustomers(project_id);
        document.getElementById("pills-contact-tab").click();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const submitDepartment = async (e) => {
    e.preventDefault();


    if (!ddata.department_id) {
      let element = "department_id";
      let pElement = document.getElementById("department_id").nextSibling;
      validation(true, element, "Select a department", pElement);
    }

    if (!ddata.department_id) {
      err = true;
    } else {
      err = false;
    }

    try {
      if (!err) {
        // cdata.concat({"project_id": `${project_id}`});
        const result1 = await axiosInstance.post(
          `projectdepartments/`,
          ddata
        );
        const res = axiosInstance.put(
          `projectcreateproject/saveproject/${ddata?.project_id}`,
          { now: "done" }
        );
        toast.success("Project Created Successfully");
        const result =await axiosInstance.post(`/notifications`, { title: "Project", subtitle: "New Project Created", path: "/projects" });
        window.localStorage.setItem("notification", JSON.stringify(result.data));
        window.dispatchEvent(new Event("notification"));
        navigate(`/projects/project-access/${ddata?.project_id}`);
        // navigate('/projects', { replace: true });
        // document.querySelector("form").reset();
        // setddata({ department_id: "" })
        // document.getElementById("pills-contact-tab").setAttribute("data-bs-toggle", "pill")
        // document.getElementById("pills-contact-tab").setAttribute("data-bs-target", "#pills-contact")
        // // getdepartmes();
        // document.getElementById("pills-contact-tab").click();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // // Remove team member
  // const handleRemove = (e) => {
  //   e.target.parentNode.remove();
  // };

  // // Submit Team Data
  // const SubmitTeam = async (e) => {
  //   e.preventDefault();


  //   if (!tdata.manager_id) {
  //     let element = "manager_id";
  //     let pElement = document.querySelector(".manager_class").nextSibling;
  //     validation(true, element, "Select a customer", pElement);
  //   }

  //   if (!tdata.manager_id || tdata.manager_id == "") {
  //     err = true;
  //   } else {
  //     err = false;
  //   }

  //   try {
  //     if (!err) {
  //       // cdata.concat({"project_id": `${project_id}`});
  //       const { result } = await axiosInstance.post(
  //         `projectcreateproject/team`,
  //         tdata
  //       );
  //       // swal("Yeah", "Project Status updated", "success");
  //       settdata({ manager_id: "" });
  //       document.querySelectorAll(".manager_class")[0].value = "0";
  //       document.querySelectorAll(".manager_class")[1].value = "0";
  //       getTeam(project_id);

  //       // document.getElementById("pills-contact-tab").click();
  //     }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  // // Submit Team Data
  // const SubmitTeam2 = async (e) => {
  //   e.preventDefault();


  //   // if (!tdata.manager_id) {
  //   //     let element = "manager_id";
  //   //     let pElement = document.querySelector(".manager_class").nextSibling;
  //   //     validation(true, element, "Select a customer", pElement);
  //   // }

  //   // if (!tdata.manager_id || tdata.manager_id == "") {
  //   //     err = true;
  //   // }
  //   // else {
  //   //     err = false;
  //   // }

  //   try {
  //     // if (!err) {
  //     // cdata.concat({"project_id": `${project_id}`});
  //     const res = await axiosInstance.put(
  //       `projectcreateproject/saveproject/${project_id}`,
  //       tdata
  //     );
  //     toast.success("Project Created Successfully");
  //     // settdata({ manager_id: "" })
  //     // document.querySelector("manager_id").value = "0";
  //     // getcustomers();

  //     // document.getElementById("pills-contact-tab").click();
  //     // }
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Toaster />
      <div className="container project-main-mod p-4" id="top">
        <div className="text-center">
          <ul
            className="nav nav-pills mb-0 text-center row"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item col-md-4 px-0" role="presentation">
              <button
                className="col-md-12 rounded-0 nav-link clip active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true"
              >
                &nbsp;&nbsp;Basic&nbsp;Info&nbsp;&nbsp;
              </button>
            </li>
            {/* <li className="nav-item col-md-4 px-0" role="presentation">
                                <h3 className='pb-0 mb-0'><p>---------------</p></h3>
                            </li> */}
            <li className="nav-item col-md-4 px-0" role="presentation">
              <button
                className="col-md-12 rounded-0 nav-link clip"
                id="pills-profile-tab"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false"
              >
                &nbsp;&nbsp;Customer&nbsp;&nbsp;
              </button>
            </li>
            {/* <li className="nav-item col-md-4 px-0" role="presentation">
                                <h3 className='pb-0 mb-0'><p>---------------</p></h3>
                            </li> */}
            <li className="nav-item col-md-4 px-0" role="presentation">
              <button
                className="col-md-12 rounded-0 nav-link clip"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"
              >
                &nbsp;&nbsp;Access&nbsp;&nbsp;
              </button>
            </li>
            {/* <li className="nav-item" role="presentation">
                        <h3 className='pb-0 mb-0'><p>------</p></h3>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="px-4 nav-link clip" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Department</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <h3 className='pb-0 mb-0'><p>------</p></h3>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="px-4 nav-link clip" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Access</button>
                    </li> */}
          </ul>
        </div>
        <div className=" px-5 py-4 rounded bg-white">
          {/* <hr className="new3 mb-4" style={{ borderTop: '1px dotted red' }} /> */}

          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab"
            >
              <form onSubmit={(e) => submit(e)}>
                <div
                  className="alert alert-danger d-none"
                  id="err"
                  role="alert"
                >
                  <ul className="mb-0">
                    <li>{errMsg.dateError}</li>
                  </ul>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Lead Type:*
                      </label>
                      <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={data.category}
                        onChange={(e) => handle(e)}
                      >
                        <option defaultValue="0">Select Lead Type</option>
                        <option value="internal">Inbound</option>
                        <option value="external">Outbound</option>
                      </select>
                      <small className="badge bg-danger d-none">
                        {errMsg.category}
                      </small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Project Classification:*
                      </label>
                      <select
                        className="form-select"
                        id="project_classification"
                        value={data.project_classification}
                        onChange={(e) => handle(e)}
                      >
                        <option defaultValue="0">
                          Select Project Classification
                        </option>
                        <option value="1">Tele-calling</option>
                        <option value="2">Integrated Events</option>
                        <option value="3">Logistics</option>
                        <option value="4">Exhibitions & Sales</option>
                        <option value="5">Design Services</option>
                        <option value="6">TPP</option>
                      </select>
                      <small className="badge bg-danger d-none">
                        {errMsg.project_classification}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* start-for adding 2023 data initially */}
                  {/* <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Project code:</label>
                                            <input type="text" className="form-control" placeholder="Project code" id="code" value={data.code} onChange={(e) => handle(e)} />
                                            <small className='badge bg-danger d-none'>{errMsg.code}</small>
                                        </div>
                                    </div> */}
                  {/* end */}
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Project Title:*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Project Title"
                        id="title"
                        value={data.title}
                        onChange={(e) => handle(e)}
                      />
                      <small className="badge bg-danger d-none">
                        {errMsg.title}
                      </small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Quotation Price:
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          id="quotation_price"
                          value={data.quotation_price}
                          onChange={(e) => handle(e)}
                          placeholder="Quotation Price"
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                      <small
                        id="quotation_price_err"
                        className="badge bg-danger d-none"
                      >
                        {errMsg.quotation_price}
                      </small>

                      {/* <input type="text" className="form-control" id="quotation" value={data.quotation} onChange={(e) => handle(e)} placeholder="Quotation Reference:*" />
                                            <small className='badge bg-danger d-none'>{errMsg.quotation}</small> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label"
                      >
                        Project Description:
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Please write a detailed project description here"
                        rows="3"
                        id="description"
                        value={data.description}
                        onChange={(e) => handle(e)}
                      ></textarea>
                      <small className="badge bg-danger d-none">
                        {errMsg.description}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Project Start Date:*
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="start_date"
                        value={data.start_date}
                        onChange={(e) => handle(e)}
                        min={getCurrentDate()}
                        placeholder="Project Start Date Reference:*"
                      />
                      <small className="badge bg-danger d-none">
                        {errMsg.start_date}
                      </small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Project End Date:*
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="likely_end_date"
                        value={data.likely_end_date}
                        onChange={(e) => handle(e)}
                        min={getCurrentDate()}
                        placeholder="Project Start Date"
                      />
                      <small className="badge bg-danger d-none">
                        {errMsg.likely_end_date}
                      </small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Expected Revenue:*
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          id="expected_revenue"
                          value={data.expected_revenue}
                          onChange={(e) => handle(e)}
                          placeholder="Expected Revenue"
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                      {/* <input type="text" className="form-control" id="expected_revenue" value={data.expected_revenue} onChange={(e) => handle(e)} placeholder="0" /> */}
                      <small className="badge bg-danger d-none">
                        {errMsg.expected_revenue}
                      </small>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Project Status:*
                      </label>
                      <select
                        className="form-select"
                        id="status"
                        value={data.status}
                        onChange={(e) => handle(e)}
                      >
                        <option defaultValue="0">Select Project Status</option>
                        <option value="1">Yet to Start</option>
                        <option value="2">In Progress</option>
                        <option value="3">Postponed</option>
                        <option value="4">Cancelled</option>
                        <option value="5">Closed</option>
                        <option value="6">Partly Executed</option>
                        <option value="7">Executed</option>
                      </select>
                      <small className="badge bg-danger d-none">
                        {errMsg.status}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button className="btn btn-primary">Submit</button>
                  {/* <StyledButton variant="contained" color="primary">
                                        <span className='px-5'>Submit & Next</span>
                                    </StyledButton> */}
                </div>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab"
            >
              {/* <div className="shadow p-3 mb-3">
                                <h4 className='mb-3'>List of Customers already added in the Project</h4>
                                {pcustomers && pcustomers?.map(value => (
                                    <>
                                        <p className='badge p-2 bg-info me-2'>{value?.name}</p>
                                    </>
                                ))
                                }

                            </div> */}

              <form>
                {/* <div className="alert alert-danger d-none" id='err' role="alert">
                                    <ul className='mb-0'>

                                        <li>{errMsg.dateError}</li>

                                    </ul>
                                </div> */}
                <div className="row">
                  <input type="hidden" value={project_id} id="project_id" />
                  <div className="col">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Project Customer:*
                      </label>
                      <select
                        className="form-select"
                        id="customer_id"
                        value={data.customer_id}
                        onChange={(e) => handleCustomer(e)}
                      >
                        <option defaultValue="0">Select a Customer</option>
                        {customers &&
                          customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                              {customer.name}
                            </option>
                          ))}
                      </select>
                      <small className="badge bg-danger d-none">
                        {errMsg.customer_id}
                      </small>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  {/* <button
                    className="btn btn-primary me-3"
                    id="skip"
                    onClick={(e) => skip(e)}
                  >
                    Skip
                  </button> */}
                  {/* <button className="btn btn-primary me-3" id='addcustomer' onClick={(e) => SubmitCustomer(e)}>Submit & Add Another Customer</button> */}
                  <button
                    className="btn btn-primary"
                    id="step3"
                    onClick={(e) => SubmitCustomer2(e)}
                  >
                    Submit & Go to Next Step
                  </button>
                </div>
              </form>
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab"
            >
              <div className="alert alert-danger d-none" id="err" role="alert">
                <ul className="mb-0">
                  <li>{errMsg.dateError}</li>
                </ul>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <form onSubmit={(e) => submitDepartment(e)}>
                    <input type="hidden" value={project_id} id="project_id" />
                    <div className="row">
                      <div className="col-md-10">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Project Department:*
                          </label>
                          <select
                            className="form-select"
                            id="department_id"
                            name="department_id"
                            value={data.department_id}
                            onChange={(e) => handleDepartment(e)}
                          >
                            <option defaultValue="0">
                              Select a Department
                            </option>
                            {departments &&
                              departments.map((department) => (
                                <option
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </option>
                              ))}
                          </select>
                          <small className="badge bg-danger d-none">
                            {errMsg.department_id}
                          </small>
                        </div>
                      </div>

                      <div className="col-md-2">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                            style={{ visibility: "hidden" }}
                          >
                            Project:*
                          </label>
                          <br />
                          <button className="btn btn-primary">Submit</button>
                        </div>
                      </div>

                      <div className="text-center">
                        {/* <button className="btn btn-primary" id='finalsubmit' onClick={(e) => SubmitTeam2(e)}>Submit & Save the Project</button> */}
                      </div>
                    </div>
                  </form>
                  <form>
                    <input type="hidden" value={project_id} id="project_id" />
                    {/* <div className="row">

                                            <div className="col-md-10">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Project Manager:*</label>
                                                    <select className='manager_class form-select' id='manager_id' name="manager_id" value={data.manager_id} onChange={(e) => handleTeam(e)}>
                                                        <option value="0" selected disabled>Select Project Manager</option>
                                                        {pteam && pteam.map(team => (

                                                            <>
                                                                <option value={team.id}>{team.name}</option>
                                                            </>

                                                        )
                                                        )}
                                                    </select>
                                                    <small className='badge bg-danger d-none'>{errMsg.manager_id}</small>
                                                </div>
                                            </div>

                                            <div className="col-2">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label" style={{ visibility: "hidden" }}>Project:*</label><br />
                                                    <button className="btn btn-primary me-3" id='addmember' onClick={(e) => SubmitTeam(e)}>Save</button>
                                                 <button className="btn btn-primary" id='finalsubmit' onClick={(e) => SubmitTeam2(e)}>Submit & Save the Project</button> 
                                                </div>
                                            </div>
                                        </div> */}

                    <div className="row">
                      {/* <div className="col-md-10">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label">Project Team:*</label>
                                                    <select className='manager_class form-select' id='manager_id' name="manager_id" value={data.manager_id} onChange={(e) => handleTeam(e)}>
                                                        <option value="0" selected disabled>Select Team Member</option>
                                                        {pteam && pteam.map(team => (

                                                            <>
                                                                <option value={team.id}>{team.name}</option>
                                                            </>

                                                        )
                                                        )}
                                                    </select>
                                                    <small className='badge bg-danger d-none'>{errMsg.manager_id}</small>
                                                </div>
                                            </div> */}

                      {/* <div className="col-md-2">
                                                <div className="mb-3">
                                                    <label htmlFor="exampleFormControlInput1" className="form-label" style={{ visibility: "hidden" }}>Project:*</label><br />
                                                    <button className="btn btn-primary me-3" id='addmember' onClick={(e) => SubmitTeam(e)}>Save</button>
                                                    
                                                </div>
                                            </div> */}
                    </div>

                    {/* <div className="text-center">
                                                                               <button className="btn btn-primary me-3" id='skip' onClick={(e) => skip(e)}>Skip</button>

                                    <button className="btn btn-primary" id='step3' onClick={(e) => SubmitCustomer2(e)}>Submit & Go to Next Step</button>

                                </div> */}

                    {/* <hr /> */}

                    {/* <div className="text-center">
                                            <button className="btn btn-primary" id='finalsubmit' onClick={(e) => SubmitTeam2(e)}>Submit & Save the Project</button>
                                        </div> */}
                  </form>
                </div>

                {/* <div className="col-md-5">
                                    <div className="shadow p-3 mb-3 bg-light border">
                                        <h4 className='mb-3'>Team Added</h4>
                                        {projectTeam && projectTeam.map((value, index) => (
                                            <>
                                                <p className='badge p-2 bg-info me-2'>{value.name}
                                                   
                                                </p>
                                            </>
                                        ))}

                                    </div>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
