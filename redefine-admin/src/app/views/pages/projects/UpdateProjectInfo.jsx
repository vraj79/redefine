import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProjectHeader } from "./ProjectHeader";
import { axiosInstance } from "../../../config";
import { Toaster, toast } from "react-hot-toast";

export const UpdateProjectInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectId = params.projectId;

  const [data, setdata] = useState({});

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const mydata = await axiosInstance.get(`projectinfo/view/${projectId}`);
      setdata(mydata.data[0]);
    } catch (error) {
      toast.error(error);
    }
  };

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setdata(newdata);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (data["start_date"] != null) {
        data["start_date"] = data.start_date.split("T")[0];
      }
      if (data["actual_end_date"] != null) {
        data["actual_end_date"] = data.actual_end_date.split("T")[0];
      }
      if (data["likely_end_date"] != null) {
        data["likely_end_date"] = data.likely_end_date.split("T")[0];
      }
      const res = await axiosInstance.put(
        `projectinfo/update/${projectId}`,
        data
      );
      if (res.status === 200) {
        toast.success("Details Updated");
        e.target.reset();
        navigate(`/projects/project-info/${projectId}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const [file, setFile] = useState();

  return (
    <>
      <Toaster position="bottom-center" />
      <ProjectHeader />
      <div className="container mt-4">
        <div className="col-sm-12 col-xs-12 col-md-12 container pull-left table-bordered-new mb-3 px-5 pb-5">
          <div className="the-box">
            <form onSubmit={(e) => submit(e)} className="d-flex flex-wrap">
              {/* "project_classification": "project_classification",
                                "project_title": "project_title",
                                "project_description": "project_description",
                                "quotation": "quotation",
                                "start_date": "start_date",
                                "end_date": "end_date",
                                "status": "0" */}

              <div className="form-group col-md-6 px-2 mb-3">
                <label>
                  Lead Type:<span className="req">*</span>
                </label>
                <select
                  name="category"
                  className="form-select"
                  id="category"
                  value={data.category}
                  onChange={(e) => handle(e)}
                >
                  <option value="internal">Inbound</option>
                  <option value="external">Outbound</option>
                </select>
              </div>
              <div className="form-group col-md-6 px-2 mb-3">
                <label>
                  Project Classification:<span className="req">*</span>
                </label>
                <select
                  name="project_classification"
                  id="project_classification"
                  className="form-select"
                  value={data.project_classification}
                  onChange={(e) => handle(e)}
                >
                  <option value="1">
                    Tele-calling (Includes Calling and Lead Generation)
                  </option>
                  <option value="2">
                    Integrated Events (This Include calling + set-up + venue)
                  </option>
                  <option value="3">
                    Logistics (Includes AV setup or procurement of gifts)
                  </option>
                  <option value="4">Exhibitions &amp; Stalls</option>
                  <option value="5">Design Services (Includes Digital)</option>
                  <option value="6">
                    TPP (Third Party Payouts) (Includes Digital)
                  </option>
                </select>
              </div>
              <div className="form-group col-md-6 px-2 mb-3">
                <label>
                  Project Title:<span className="req">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  id="title"
                  value={data.title}
                  onChange={(e) => handle(e)}
                />
              </div>

              <div className="form-group col-md-6 px-2 mb-3">
                <label>Quotation price:</label>

                <input
                  type="text"
                  name="quotation_price"
                  value={data.quotation_price}
                  onChange={(e) => handle(e)}
                  className="form-control"
                  id="quotation_price"
                />
              </div>
              <div className="form-group col-md-6 px-2 mb-3">
                <label>
                  Estimate Price:<span className="req">*</span>
                </label>

                <input
                  type="text"
                  name="expected_revenue"
                  className="form-control"
                  id="expected_revenue"
                  value={data.expected_revenue}
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="form-group col-md-6 px-2 mb-3">
                <label>
                  Project Start date:<span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="start_date"
                  className="form-control datepicker"
                  id="start_date"
                  value={
                    data.start_date
                      ? data.start_date.split("T")[0]
                      : data.start_date
                  }
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="form-group col-md-6 px-2 mb-3">
                <label>Project End date:</label>

                <input
                  type="text"
                  name="actual_end_date"
                  className="form-control datepicker"
                  id="actual_end_date"
                  value={
                    data.actual_end_date
                      ? data.actual_end_date.split("T")[0]
                      : data.actual_end_date
                  }
                  onChange={(e) => handle(e)}
                />
              </div>

              <div className="form-group col-md-6 px-2 mb-3">
                <label>
                  Project Status:<span className="req">*</span>
                </label>
                <select
                  required
                  name="status"
                  className="form-select"
                  id="status"
                  value={data.status}
                  onChange={(e) => handle(e)}
                >
                  <option value="">Select Project Status</option>
                  <option value="1">Yet to start</option>
                  <option value="2">In Progress</option>
                  <option value="3">Postponed</option>
                  <option value="4">Cancelled</option>
                  <option value="5">Closed</option>
                  <option value="6">Partly Executed</option>
                  <option value="7">Executed</option>
                </select>
              </div>
              <div className="form-group col-md-6 px-2 mb-3">
                <label>PO Status:</label>
                <select
                  name="po_status"
                  className="form-select"
                  id="purchase_order"
                  value={data.purchase_order}
                  onChange={(e) => handle(e)}
                >
                  <option value="">Select PO Status</option>
                  <option value="received">Received</option>
                  <option value="awaited">Awaited</option>
                  <option value="nopo">No PO</option>
                </select>
              </div>

              <div className="form-group col-md-12 px-2 mb-3">
                <label>Project Description:</label>
                <textarea
                  name="description"
                  cols="40"
                  rows="5"
                  className="form-control"
                  id="description"
                  placeholder="Please write a detailed project description here (minimum 100 characters except for TPP classified projects)"
                  value={data.description}
                  onChange={(e) => handle(e)}
                ></textarea>
              </div>
              {/* <div className="col-sm-12 col-xs-12 col-md-12 container">
                <label>Upload Quotation:</label>
                <div className="form-group col-12">
                  <label>
                    Note : It will replace any existing quotation file.
                  </label>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="my-3">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="container text-start">
                <button className="btn btn-success">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
