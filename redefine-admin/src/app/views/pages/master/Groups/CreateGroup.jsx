import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../config";
import { Toaster, toast } from "react-hot-toast";

export const CreateGroup = () => {
  const navigate = useNavigate();

  const [data1, setData1] = useState([]);
  const [ddata, setddata] = useState([]);

  const [errMsg, setErrmsg] = useState([]);

  useEffect(() => {
    getallData();
  }, []);

  const getallData = async () => {
    const { data } = await axiosInstance.get(`services/view`);
    setData1(data);
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
    const newdata = { ...ddata };
    newdata[e.target.id] = e.target.value;
    if (e.target.id != "level") {
      let pElement = e.target.nextSibling;
      validation(false, e.target.id, "", pElement);
    }

    setddata(newdata);
  };

  // Submit the form and send data to api
  const submit = async (e) => {
    e.preventDefault();
    if (!ddata.name) {
      let element = "name";
      let pElement = document.getElementById("name").nextSibling;
      validation(true, element, "Enter Group name", pElement);
    }
    if (!ddata.slug) {
      let element = "slug";
      let pElement = document.getElementById("slug").nextSibling;
      validation(true, element, "Enter Group slug", pElement);
    }
    if (!ddata.name || !ddata.slug) {
      err = true;
    } else {
      err = false;
    }

    try {
      if (!err) {
        const res = await axiosInstance.post(`mastergroups/`, ddata);
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
      <Toaster position="bottom-center" />
      <div className="row container ">
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <h3 className="my-2">Create Group</h3>
          </div>
          <div className="col-md-6 text-end">
            <Link to="/master/groups" className="btn btn-warning">
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
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  value={ddata.name}
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
                  required
                  type="text"
                  className="form-control"
                  id="slug"
                  value={ddata.slug}
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
                  required
                  type="number"
                  min={10}
                  max={100}
                  className="form-control"
                  id="level"
                  value={ddata.level}
                  onChange={(e) => handle(e)}
                  placeholder="Ranges from 10-100"
                />
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
