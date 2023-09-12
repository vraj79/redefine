import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { axiosInstance } from "../../../config";
import { Toaster, toast } from "react-hot-toast";

export const CreateUser = () => {
  const navigate = useNavigate();

  const params = useParams();
  const serviceId = params.serviceId;
  const user = localStorage.getItem("user");

  const [groups, setGroups] = useState([]);
  //   const [errMsg, setErrmsg] = useState([])
  const [ddata, setddata] = useState([]);

  const [data, setdata] = useState({});
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  // const update = async () => {
  //     const { data } = await axiosInstance.get(`services/update/${serviceId}`)
  // }
  const getGroups = async () => {
    const { data } = await axiosInstance.get(`mastergroups/view`);
    setGroups(data);
  };

  // Handle the input values
  const handle = (e) => {
    const newdata = { ...ddata };
    newdata[e.target.id] = e.target.value;

    setddata(newdata);
    console.log(newdata);
  };

  // Submit the form and send data to api
  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(`users/create/`, ddata);

      if (data.success) {
        toast.success(data.msg);
        document.querySelector("form").reset();
        navigate(-1);
      }
      else{
        return toast.error(data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <>
      <Toaster />
      <div className="row container ">
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <h3 className="my-2">Create User</h3>
          </div>
          <div className="col-md-6 text-end">
            <Link to="/users" title="Edit" className="btn btn-warning">
              View All Users
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
                  Group:*
                </label>
                <select
                  required
                  className="form-select"
                  id="group_id"
                  name="groups"
                  value={data.group_id}
                  onChange={(e) => handle(e)}
                >
                  <option value="" selected disabled>
                    Select Service
                  </option>
                  {groups &&
                    groups.map((group) => (
                      <>
                        <option value={group.id}>{group.name}</option>
                      </>
                    ))}
                </select>
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  First Name:*
                </label>

                <input
                  required
                  type="text"
                  name="firstname"
                  className="form-control datepicker"
                  id="firstname"
                  value={data.firstname}
                  onChange={(e) => handle(e)}
                />
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Last Name:*
                </label>

                <input
                  required
                  type="text"
                  name="lastname"
                  className="form-control datepicker"
                  id="lastname"
                  value={data.lastname}
                  onChange={(e) => handle(e)}
                />
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email:*
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  value={data.email}
                  onChange={(e) => handle(e)}
                />
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Mobile:*
                </label>

                <input
                  required
                  type="number"
                  name="phone"
                  className="form-control"
                  id="phone"
                  value={data.phone}
                  onChange={(e) => handle(e)}
                />
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Password:*
                </label>

                <input
                  required
                  type="password"
                  name="password"
                  className="form-control datepicker"
                  id="password"
                  value={data.password}
                  onChange={(e) => handle(e)}
                />
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
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
