import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectHeader } from "./ProjectHeader";
import { axiosInstance } from "../../../config";
import { Toaster, toast } from "react-hot-toast";

export const ManageFinance = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId;

  const [data, setdata] = useState({});

  // Get data
  useEffect(() => {
    getdata();
  }, []);

  // Fetch data from API
  const getdata = async () => {
    const mydata = await axiosInstance.get(`project/${projectId}`);
    setdata(mydata.data[0]);
  };

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setdata(newdata);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `projectmanagefinance/update/${projectId}`,
        data
      );
      if (res?.status === 200) {
        toast.success("Finance Updated");
        document.querySelector("form").reset();
        navigate(`/projects/project-info/${projectId}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
    <Toaster position="bottom-center"/>
      <ProjectHeader />

      {/* Form section start */}
      <h4 className="ps-0 pe-0">Manage Finance</h4>
      <hr />

      <div className="col-sm-12 col-xs-12 col-md-12 container">
        <div className="the-box table-bordered-new mb-3">
          {/* <div className="form-group col-12">
                      <label>File: </label>
                  </div> */}
          <form
            acceptCharset="utf-8"
            className="mainForm"
            onSubmit={(e) => submit(e)}
          >
            <div className="d-none">
              <input type="hidden" name="project_id" value="3414" />
              <input type="hidden" name="redirect_url" value="" />
            </div>

            <div className="form-group mb-3">
              <label>Billing Status:</label>
              <select
                name="billing_status"
                className="form-control"
                id="billing_status"
                value={data.billing_status}
                onChange={(e) => handle(e)}
              >
                <option value="0">Billed</option>
                <option value="1">Not Billed</option>
                <option value="2">Partly Billed</option>
                {/* <option value="other">-</option> */}
              </select>
            </div>
            
            <div className="form-group mb-3">
              <label>A Factor:</label>
              <input
                type="text"
                name="number"
                id="quotation"
                value={data.quotation?data.quotation:""}
                onChange={(e) => handle(e)}
                className="form-control"
              />
            </div>
            <input
              type="submit"
              className="btn btn-success"
              value="Submit"
              name="submit"
            />
          </form>
        </div>
      </div>

      {/* Form section end */}
    </>
  );
};
