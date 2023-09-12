import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProjectHeader } from "./ProjectHeader";
import swal from "sweetalert";
import { axiosInstance } from "../../../config";
import { Toaster, toast } from "react-hot-toast";

export const ManageCities = () => {
    const navigate=useNavigate();
  const params = useParams();
  const projectId = params.projectId;
  const user = localStorage.getItem("user");

  const [cities, setCities] = useState([]);
  //   const [errMsg, setErrmsg] = useState([])
  const [ddata, setddata] = useState([]);

  const [data, setdata] = useState({});
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    getallCities();
  }, []);

  const getallCities = async () => {
    const { data } = await axiosInstance.get(`projectcities/viewall`);
    setCities(data);
  };

  // Handle the input values
  const handle = (e) => {
    const newdata = { ...ddata };
    newdata["project_id"] = projectId;
    newdata[e.target.id] = e.target.value;

    setddata(newdata);
    console.log(newdata);
  };

  // Submit the form and send data to api
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`projectcities/`, ddata);
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
            onSubmit={(e) => submit(e)}
          >
            <div className="panel panel-body">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  City:*
                </label>
                <select
                required
                  className="form-select"
                  id="city_id"
                  name="city_id"
                  value={data.city_id}
                  onChange={(e) => handle(e)}
                >
                  <option value="" selected disabled>
                    Select a City
                  </option>
                  {cities &&
                    cities.map((city) => (
                      <>
                        <option value={city.id}>{city.name}</option>
                      </>
                    ))}
                </select>
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                  Execution Date:*
                </label>

                <input
                required
                  type="date"
                  name="execution_date"
                  className="form-control datepicker"
                  id="execution_date"
                  value={data.execution_date}
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
