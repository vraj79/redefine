import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { axiosInstance } from "../../../../config";
import { Toaster, toast } from "react-hot-toast";

export const UpdateGroup = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dataId = params.id;
  const user = localStorage.getItem("user");

  const [ddata, setDdata] = useState([]);
  //   const [errMsg, setErrmsg] = useState([])
  const [data, setdata] = useState([]);

  // const [data, setdata] = useState({})
  const [myData, setMyData] = useState([]);
  const [errMsg, setErrmsg] = useState([]);

  useEffect(() => {
    getOneData();
  }, []);

  // const update = async () => {
  //     const { data } = await axiosInstance.get(`mastergroupsupdate/${serviceId}`)
  // }
  const getOneData = async () => {
    const { data } = await axiosInstance.get(`mastergroups/view/${dataId}`);
    setdata(data?.groups[0]);
  };

  var err = true;
  var validationErr = [];

  const validation = (err, element, value, pElement) => {
    if (err) {
      document.getElementById(element).classList.add("border-danger");
      pElement.classList.remove("d-none");
      validationErr[element] = value;
      setErrmsg(validationErr);
    } else {
      document.getElementById(element).classList.remove("border-danger");
      pElement.classList.add("d-none");
    }
  };

  // Handle the input values
  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    let pElement = e.target.nextSibling;
    validation(false, e.target.id, "", pElement);

    setdata(newdata);
  };

  // Submit the form and send data to api
  const submit = async (e) => {
    e.preventDefault();
    if (!data.name) {
      let element = "name";
      let pElement = document.getElementById("name").nextSibling;
      validation(true, element, "Enter Group name", pElement);
    }
    if (!data.slug) {
      let element = "slug";
      let pElement = document.getElementById("slug").nextSibling;
      validation(true, element, "Enter Group slug", pElement);
    }
    if (!data.level) {
      let element = "level";
      let pElement = document.getElementById("level").nextSibling;
      validation(true, element, "Enter Group level", pElement);
    }
    if (!data.name || !data.slug) {
      err = true;
    } else {
      err = false;
    }
    try {
      if (!err) {
        const res = await axiosInstance.put(
          `mastergroups/update/${dataId}`,
          data
        );
        if (res?.status === 200) {
          toast.success(res.data?.msg);
          document.querySelector("form").reset();
          navigate(-1);
        }
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
            <h3 className="my-2">Update Group</h3>
          </div>
          <div className="col-md-6 text-end">
            <Link to="/master/groups" title="Edit" className="btn btn-warning">
              View All Groups
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
                  value={data?.name}
                  onChange={(e) => handle(e)}
                  placeholder="Group Name"
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
                  value={data?.slug}
                  onChange={(e) => handle(e)}
                  placeholder="Group Slug"
                />
                <small className="badge bg-danger d-none">{errMsg.slug}</small>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Level:*
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="level"
                  value={data?.level}
                  onChange={(e) => handle(e)}
                  placeholder="Ranges from 10-100"
                />
                <small className="badge bg-danger d-none">{errMsg.level}</small>
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
