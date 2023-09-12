import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import { axiosInstance } from "../../config";
import useSound from "use-sound";
import { Toaster, toast } from "react-hot-toast";

export const Settings = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const groupId = sessionStorage.getItem("groupId");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, SetPhone] = useState("");

  const [oldPassword, SetOldPassword] = useState("");
  const [newPassword, SetNewPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");

  const getUserData = async () => {
    const { data } = await axiosInstance.get(`/users/view/${userId}`);
    setFirstName(data[0].firstname);
    setLastName(data[0].lastname);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleUserData = (e) => {
    e.preventDefault();
    toast.success("User details updated");
    // document.querySelector("form").reset();
    setTimeout(() => {
        navigate('/dashboard/default');
    }, 1500);
  };

  const handlePasswordData = (e) => {
    e.preventDefault();
    toast.success("Password Updated");
    // document.querySelector("form").reset();
    setTimeout(() => {
        navigate('/dashboard/default');
    }, 1500);
  };

  // document.querySelector("form").reset();
  // navigate(-1);

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="row container">
        <div className="row align-items-center mb-3">
          <div className="col-md-6">
            <h3 className="my-2">My Account</h3>
          </div>
          <div className="col-md-6 text-end">
            <button className="btn btn-warning" onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        </div>

        <div className="col-sm-12 d-flex col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3">
          <div className="col-md-6 px-2">
            <div className="shadow">
              <div className="bg-success text-white py-2 px-3">Details</div>
              <div>
                <form onSubmit={handleUserData} className="d-flex flex-wrap">
                  <div className="form-group col-md-12 px-3 mb-3 mt-2">
                    <label className="mb-1">
                      First Name:<span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      className="form-control datepicker"
                      id="firstname"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-12 px-3 mb-3">
                    <label className="mb-1">
                      Last Name:<span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      className="form-control datepicker"
                      id="lastname"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-md-12 px-3 mb-3">
                    <label className="mb-1">
                      Phone Number:<span className="req">*</span>
                    </label>

                    <input
                      type="text"
                      name="quotation"
                      //   value={ddata.mobile_number_1}
                      //   onChange={(e) => handle(e)}
                      className="form-control"
                      id="mobile_number_1"
                    />
                  </div>
                  <div className="px-3 text-start mb-4">
                    <button className="btn btn-success">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-6 px-2">
            <div className="shadow">
              <div className="bg-info text-white py-2 px-3">
                Change Password
              </div>
              <div>
                <form
                  onSubmit={handlePasswordData}
                  className="d-flex flex-wrap"
                >
                  <div className="form-group col-md-12 px-3 mb-3 mt-2">
                    <label className="mb-1">
                      Old Password:<span className="req">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control datepicker"
                      id="password"
                      value={oldPassword}
                      onChange={(e) => SetOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-12 px-3 mb-3">
                    <label className="mb-1">
                      New Password:<span className="req">*</span>
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      className="form-control datepicker"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => SetNewPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group col-md-12 px-3 mb-3">
                    <label className="mb-1">
                      Confirm New Password:<span className="req">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => SetConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="px-3 text-start mb-4">
                    <button className="btn btn-success text-white">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
