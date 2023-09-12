import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { axiosInstance } from "../../../config";
import { Toaster, toast } from "react-hot-toast";

export const UpdateServiceRateCard = () => {
  const navigate = useNavigate();

  const params = useParams();
  const serviceId = params.id;

  const [services, setServices] = useState([]);
  const [data, setdata] = useState([]);

  const getOneService = async () => {
    const { data } = await axiosInstance.get(
      `services/ratecard/view/${serviceId}`
    );
    setdata(data?.service_rate_card);
  };

  const getallServices = async () => {
    const { data } = await axiosInstance.get(`services/view`);
    setServices(data);
  };

  const [clients, setClients] = useState([]);

  const getallCustomers = async () => {
    const { data } = await axiosInstance.get(`clients/view`);
    setClients(data);
  };

  // Handle the input values
  const handle = (e) => {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;

    setdata(newdata);
  };

  // Submit the form and send data to api
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `services/ratecard/update/${serviceId}`,
        data
      );
      if (res.data?.success) {
        toast.success(res.data?.msg);
        document.querySelector("form").reset();
        navigate(-1);
      }
      // const { notification } =  axiosInstance.post(`notifications/`, {title:"Service", subtitle:"Rate Card Updated", path:"/service/rate-cards"}).then(resp => {
      //     if(resp.data){
      //         window.localStorage.setItem("notification", JSON.stringify(resp.data));
      //         window.dispatchEvent(new Event("notification"));
      //     }
      // })
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getallServices();
    getOneService();
    getallCustomers();
  }, []);

  return (
    <>
      <Toaster />
      <div className="row container ">
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <h3 className="my-2">Update Service Rate Card</h3>
          </div>
          <div className="col-md-6 text-end">
            <Link
              to="/service/rate-cards"
              title="Edit"
              className="btn btn-warning"
            >
              View All Rate Cards
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
                  Service:*
                </label>
                <select
                required
                  className="form-select"
                  id="name"
                  name="name"
                  value={data?.name}
                  onChange={(e) => handle(e)}
                >
                  <option value="">Select Service</option>
                  {services &&
                    services.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Client:*
                </label>
                <select
                required
                  className="form-select"
                  id="client_id"
                  name="client_id"
                  value={data?.client_id}
                  onChange={(e) => handle(e)}
                >
                  <option value="">Select Client</option>
                  {clients &&
                    clients?.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                </select>
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Service Element:*
                </label>

                <input
                required
                  type="text"
                  name="element"
                  className="form-control datepicker"
                  id="element"
                  value={data?.element}
                  onChange={(e) => handle(e)}
                />
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Service Description:*
                </label>

                <input
                required
                  type="text"
                  name="description"
                  className="form-control datepicker"
                  id="description"
                  value={data?.description}
                  onChange={(e) => handle(e)}
                />
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Rate Type:*
                </label>

                <select
                required
                  className="form-select"
                  id="rate_type"
                  name="rate_type"
                  value={data?.rate_type}
                  onChange={(e) => handle(e)}
                >
                  <option value="">Select Service</option>
                  <option value="per item">Per Item</option>
                  <option value="per hour">Per Hours</option>
                  <option value="by LBH">LBH</option>
                </select>
                {/* <small className='badge bg-danger d-none'>{errMsg.department_id}</small> */}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Enter Service Rate:*
                </label>

                <input
                required
                  type="number"
                  name="rate"
                  className="form-control datepicker"
                  id="rate"
                  value={data?.rate}
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
