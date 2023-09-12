import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProjectHeader } from "./ProjectHeader";
import swal from "sweetalert";
import { axiosInstance } from "../../../config";
import { Toaster, toast } from "react-hot-toast";

export const AddCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  var status = 0;
  if (location.state) {
    status = location.state.stat;
  } else {
  }

  const params = useParams();
  const projectId = params.projectId;

  const [customers, setCustomers] = useState([]);
  const [ddata, setddata] = useState([]);

  const [data, setdata] = useState({});

  useEffect(() => {
    getallCustomers();
  }, []);

  const getallCustomers = async () => {
    const { data } = await axiosInstance.get(`clients/view`);
    setCustomers(data);
  };

  // Handle the input values
  const handle = (e) => {
    const newdata = { ...ddata };
    newdata["project_id"] = projectId;
    newdata[e.target.id] = e.target.value;

    setddata(newdata);
  };

  // Submit the form and send data to api
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`projectcustomers/`, ddata);
      if (res?.status === 200) {
        toast.success("Customer Added");
        document.querySelector("form").reset();
        navigate(`/projects/project-info/${projectId}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `projectcustomers/update/${projectId}`,
        ddata
      );
      if (res?.status === 200) {
        toast.success("Customer updated");
        document.querySelector("form").reset();
        navigate(`/projects/project-info/${projectId}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" />
      <ProjectHeader />

      <div className="row container">
        <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">
          <form
            acceptCharset="utf-8"
            className="mainForm"
            onSubmit={(e) => (status === 0 ? submit(e) : submitUpdate(e))}
          >
            <div className="panel panel-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Customer:*
                </label>
                <select
                  required
                  className="form-select"
                  id="customer_id"
                  name="customer_id"
                  value={data.customer_id}
                  onChange={(e) => handle(e)}
                >
                  <option value="">Select a Customer</option>
                  {customers &&
                    customers.map((value) => (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    ))}
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
