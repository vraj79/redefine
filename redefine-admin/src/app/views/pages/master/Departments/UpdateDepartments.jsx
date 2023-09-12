import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { axiosInstance } from "../../../../config";
import { Toaster, toast } from "react-hot-toast";

export const UpdateDepartments = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dataId = params.id;
  console.log(params.id);
  const user = localStorage.getItem("user");

  const [ddata, setDdata] = useState([]);
  //   const [errMsg, setErrmsg] = useState([])
  const [data, setdata] = useState([]);

  // const [data, setdata] = useState({})
  const [myData, setMyData] = useState([]);
  const [errMsg, setErrmsg] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getOneData();
    getdata();
  }, []);

  // const update = async () => {
  //     const { data } = await axiosInstance.get(`mastergroupsupdate/${serviceId}`)
  // }

  const getdata = async () => {
    const { data } = await axiosInstance.get(`mastergroups/view`);
    setGroups(data);
    console.log(data);
    console.log("res.data");
  };

  const getOneData = async () => {
    const { data } = await axiosInstance.get(
      `masterdepartments/view/${dataId}`
    );
    console.log(data);

    setDdata(data.departmentData[0]);
  };

  var err = true;
  console.log(err);

  // var errmsg = '';
  var validationErr = [];

  const validation = (err, element, value, pElement) => {
    if (err) {
      document.getElementById(element).classList.add("border-danger");

      pElement.classList.remove("d-none");
      validationErr[element] = value;
      console.log(validationErr);
      console.log(pElement);
      setErrmsg(validationErr);
      console.log(errMsg);
    } else {
      document.getElementById(element).classList.remove("border-danger");
      pElement.classList.add("d-none");
    }
  };

  // Handle the input values
  const handle = (e) => {
    const newdata = { ...ddata };
    newdata[e.target.id] = e.target.value;
    if (e.target.id != "mandatory") {
      let pElement = e.target.nextSibling;
      validation(false, e.target.id, "", pElement);
      console.log(pElement);
    }

    setDdata(newdata);
    console.log(newdata);
  };

  // Submit the form and send data to api
  const submit = async (e) => {
    e.preventDefault();
    // if (!ddata.name) {
    //     let element = "name";
    //     let pElement = document.getElementById("name").nextSibling;
    //     validation(true, element, "Enter Name", pElement);
    // }
    // if (!ddata.slug) {
    //     let element = "slug";
    //     let pElement = document.getElementById("slug").nextSibling;
    //     validation(true, element, "Enter Slug", pElement);
    // }
    // if (!ddata.manager) {
    //     let element = "manager_group_id";
    //     let pElement = document.getElementById("manager_group_id").nextSibling;
    //     validation(true, element, "Enter Group", pElement);
    // }
    // if (!ddata.name || !ddata.slug || !ddata.manager) {
    //     err = true;
    // }
    // else {
    //     err = false;
    // }
    try {
      const res = await axiosInstance.put(
        `masterdepartments/update/${dataId}`,
        ddata
      );
      if (res.data?.success) {
        toast.success(res.data?.msg);
        document.querySelector("form").reset();
        navigate(-1);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="row container ">
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <h3 className="my-2">Update Department</h3>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to="/master/departments"
              title="Edit"
              className="btn btn-warning"
            >
              View All Departments
            </Link>
          </div>
        </div>

        <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
          <form
            acceptCharset="utf-8"
            className="mainForm"
            onSubmit={(e) => submit(e)}
          >
            <div className="panel panel-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Name:*
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={ddata?.name}
                  onChange={(e) => handle(e)}
                />
                <small className="badge bg-danger d-none">{errMsg.name}</small>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Slug:*
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="slug"
                  value={ddata?.slug}
                  onChange={(e) => handle(e)}
                />
                <small className="badge bg-danger d-none">{errMsg.slug}</small>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Group:*
                </label>

                <select
                  className="form-select"
                  id="manager_group_id"
                  value={ddata?.manager_group_id}
                  onChange={(e) => handle(e)}
                >
                  <option value="">Select</option>

                  {groups &&
                    groups.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    ))}
                </select>
                <small className="badge bg-danger d-none">
                  {errMsg.manager_group_id}
                </small>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Mandatory:*
                </label>
                <select
                  className="form-select"
                  id="mandatory"
                  value={ddata?.mandatory}
                  onChange={(e) => handle(e)}
                >
                  <option value="">Select</option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <input
                type="submit"
                className="btn btn-success"
                value="Submit"
                name="submit"
              />
            </div>
            <div className="fix"></div>
          </form>
        </div>
      </div>
    </>
  );
};
