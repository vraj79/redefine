import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../../config";
import { useNavigate } from "react-router-dom";

export const ProjectHeader = () => {
  const navigate = useNavigate();

  // Get id from the url and then fetch data from api
  const params = useParams();
  const projectId = params.projectId;
  // id we got is projectId
  const [projectData, setProjectData] = useState([]);
  const [title, setTitle] = useState([]);

  // Get data
  useEffect(() => {
    getdata();
    getTitle();
  }, []);

  const ShowModal = () => {
    document.getElementById("ModalHeader").classList.remove("v-hidden");
    document.getElementById("ModalHeader").classList.add("v-show");
  };
  const CloseModal = () => {
    document.getElementById("ModalHeader").classList.remove("v-show");
    document.getElementById("ModalHeader").classList.add("v-hidden");
  };

  // Fetch data from API
  const getdata = async () => {
    const { data } = await axiosInstance.get(`project/${projectId}`);
    setProjectData(data);
  };

  // Fetch data from API
  const getTitle = async () => {
    const { data } = await axiosInstance.get(`project/view/${projectId}`);
    setTitle(data);
  };

  return (
    <>
      <div className="row">
        <div className="pt-4 px-5 col-md-6">
          <h3>{title[0]?.title}</h3>
        </div>
        <div className="text-end pe-4 col-md-6">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-warning btn-sm mt-3"
          >
            Go Back
          </button>
          <Link to="/projects" className="btn btn-success ms-2 btn-sm mt-3">
            All Projects
          </Link>
          <button
            id="LaunchModal"
            onClick={ShowModal}
            className="btn btn-sm ms-2 mt-3 text-white"
            style={{ backgroundColor: "#242a44" }}
          >
            More Options &nbsp;
            <i className="fa-solid fa-braille text-white"></i>
            {/* <IconButton  id="LaunchModal" onClick={ShowModal}>
            <Icon></Icon>
          </IconButton> */}
          </button>
        </div>
        {/* <div>
          <IconButton  id="LaunchModal" onClick={ShowModal}>
            <Icon>more_vert</Icon>
          </IconButton>
        </div> */}
      </div>

      <div className="v-hidden" id="ModalHeader" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content te">
            <div className="modal-header">
              {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
              <button
                type="button"
                className="btn-close"
                onClick={CloseModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="the-box col-12 justify-content-between d-flex flex-wrap align-items-baseline">
                {/* <Link to={`project-info/${projectId}`} className="btn btn-default text-start col-md-6 btn-coral">
                                        Project Home
                                    </Link> */}
                {/* <Link
                  to={`/projects/finance_files/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Manage Quotation
                </Link> */}
                <Link
                  to={`/projects/manage_po/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Manage PO
                </Link>
                <Link
                  to={`/projects/manage_invoice/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Manage Invoices
                </Link>
                <Link
                  to={`/projects/payments/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Manage Payments
                </Link>
                <Link
                  to={`/projects/addfile/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Add File
                </Link>
                {/* <Link to={`/projects/manage_finance/${projectId}`} className="btn btn-default text-start col-md-6 btn-coral" onClick={CloseModal}>Manage Finance</Link> */}
                <Link
                  to={`/projects/finance_files/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Manage Finance Files
                </Link>
                <Link
                  to={`/projects/project_status/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Update Project Status
                </Link>
                <Link
                  to={`/projects/edit-project/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Edit Project
                </Link>

                {/* <Link to={`/projects/generate_estimate/${projectId}`} className="btn btn-default text-start col-md-6 btn-coral" onClick={CloseModal}>Generate Estimate</Link> */}
                <Link
                  to={`/projects/client_interactions/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Client Interactions
                </Link>
                {/* <Link className="btn col-md-6 btn-danger ms-2" onClick={CloseModal}>Delete Project</Link> */}

                <Link
                  to={`/projects/try_new_estimate/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  Create Estimate
                </Link>
                <Link
                  to={`/projects/estimates/${projectId}`}
                  className="btn btn-default text-start col-md-6 btn-coral"
                  onClick={CloseModal}
                >
                  All Estimates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
