import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { axiosInstance } from "../../../config";
import DataTable from "react-data-table-component";
import Checkbox from "@mui/icons-material/CheckBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import $ from "jquery";
import { Helmet } from "react-helmet";
import { Toaster, toast } from "react-hot-toast";

export const UpdateVendorInfo = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const [data, setdata] = useState({});
  const [industries, setIndustries] = useState([]);
  const [turnover, setTurnover] = useState([]);
  const [employeeRanges, setEmployeeRanges] = useState([]);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    getData();
    industrydata();
    TurnoverRanges();
    EmployeeRanges();
    Services();
  }, []);

  const getData = async () => {
    try {
      const mydata = await axiosInstance.get(`vendors/view/${id}`);
      console.log(mydata.data[0]);
      setdata(mydata.data[0]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const EmployeeRanges = async () => {
    const { data } = await axiosInstance.get(`masteremployeeranges/view`);
    setEmployeeRanges(data);
    console.log(data);
    console.log("res.data");
  };

  const Services = async () => {
    const { data } = await axiosInstance.get(`services/view`);
    setServices(data);
    setFilteredServices(data);
    console.log(data);
    console.log("res.data");
  };

  const industrydata = async () => {
    try {
      const mydata = await axiosInstance.get(`masterindustrytypes/view`);
      console.log(mydata);
      setIndustries(mydata.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const TurnoverRanges = async () => {
    const { data } = await axiosInstance.get(`masterturnoverranges/view`);
    setTurnover(data);
  };

  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setdata(newdata);
    console.log(newdata);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
      const res = await axiosInstance.put(`vendors/update/${id}`, data);
      if (res.data?.success) {
        toast.success(res.data?.msg);
        // e.target.reset();
        navigate("/vendors");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="container mt-2">
        <div className="container text-end">
          <button onClick={() => navigate(-1)} className="btn btn-info mb-3">
            Go Back
          </button>
        </div>

        <div className="col-sm-12 col-xs-12 col-md-12 container pull-left table-bordered-new mb-3 p-3 shadow">
          <div className="the-box">
            <form onSubmit={(e) => submit(e)} className="d-flex flex-wrap">
              <div className="form-group col-md-4 px-2 mb-3">
                <label className="mb-1">
                  Name:<span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control datepicker"
                  id="name"
                  value={data.name}
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="form-group col-md-4 px-2 mb-3">
                <label className="mb-1">
                  Contact Name:<span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="contact_name"
                  className="form-control"
                  id="contact_name"
                  value={data.contact_name}
                  onChange={(e) => handle(e)}
                />
              </div>
              <div className="form-group col-md-4 px-2 mb-3">
                <label className="mb-1">Rating:</label>

                <select
                  name="rating"
                  className="form-select"
                  id="rating"
                  value={data.rating}
                  onChange={(e) => handle(e)}
                >
                  <option value="untried">Untried</option>
                  <option value="good" selected="selected">
                    Good
                  </option>
                  <option value="avg">Average</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              <div className="form-group col-md-6 px-2 mb-3">
                <label className="mb-1">
                  Contact Mobile:<span className="req">*</span>
                </label>

                <input
                  type="text"
                  name="contact_mobile"
                  className="form-control"
                  id="contact_mobile"
                  value={data.contact_mobile}
                  onChange={(e) => handle(e)}
                />
              </div>

              <div className="form-group col-md-6 px-2 mb-3">
                <label className="mb-1">
                  Email:<span className="req">*</span>
                </label>

                <input
                  type="text"
                  name="quotation"
                  value={data.email}
                  onChange={(e) => handle(e)}
                  className="form-control"
                  id="email"
                />
              </div>

              <div className="form-group col-md-12 px-2 mb-3">
                <label className="mb-1">Comments:</label>

                <textarea
                  type="text"
                  name="comments"
                  value={data.comments}
                  onChange={(e) => handle(e)}
                  className="form-control"
                  id="comments"
                ></textarea>
              </div>

              <div className="form-group col-md-12 px-2 mb-3">
                <label className="mb-1">Payment Terms:</label>

                <textarea
                  type="text"
                  name="payment_terms"
                  value={data.payment_terms}
                  onChange={(e) => handle(e)}
                  className="form-control"
                  id="payment_terms"
                ></textarea>
              </div>
              <div className="form-group col-md-12 px-2 mb-3">
                <label className="mb-1">Bank Details:</label>

                <textarea
                  type="text"
                  name="bank_details"
                  style={{ height: "100px" }}
                  value={data.bank_details}
                  onChange={(e) => handle(e)}
                  className="form-control"
                  id="bank_details"
                ></textarea>
              </div>

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
