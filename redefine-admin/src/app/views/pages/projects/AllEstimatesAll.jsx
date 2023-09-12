import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { ProjectHeader } from "./ProjectHeader";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import swal from "sweetalert";
import { axiosInstance } from "../../../config";
// import DataTable from 'react-data-table-component';
// import Checkbox from '@mui/icons-material/CheckBox';
// import ArrowDownward from '@mui/icons-material/ArrowDownward';

// ========  Per item -> 1, Per hour -> 2, per LBH -> 3  =========

export const AllEstimatesAll = () => {
  const [allEstimates, setAllEstimates] = useState([]);

  useEffect(() => {
    getAllEstimates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const year = localStorage.getItem("invoice_year");
  const month = localStorage.getItem("invoice_month");
  const date = month + year;
  console.log(date);
  const getAllEstimates = async () => {
    const { data } = await axiosInstance.get(`projectestimate/all`);
    console.log(data[0]?.created_on.split(" ").join(""))
    let filteredData = data?.filter((ele) =>
      ele.created_on.split(" ").join("").includes(date)
    );
    setAllEstimates(filteredData);
  };


  return (
    <>
      {/* <ProjectHeader /> */}

      <div className="row">
        <h4 className="ps-4 pe-0">All Estimates</h4>
        <hr />
        <div className="text-center">
          <div className="container-fluid">
            <div className="row bg-white py-2 shadow border-light">
              <div className="col-sm-12  col-xs-12  col-md-12">
                <div className="the-box">
                  <div className="table table-striped table-hover table-bordered">
                    <div className="row">
                      {allEstimates &&
                        allEstimates.map((value) => (
                          <div key={value.id} className="col-md-4 p-2">
                            <div className="card">
                              <div className="card-body">
                                <h5 className="card-title">Estimate</h5>
                                <p className="card-text">
                                  {value?.estimate_no}
                                </p>
                                <div className="container d-flex justify-content-around">
                                  <Link
                                    className="btn btn-primary"
                                    to={`/projects/estimate-single/${value.project_id}/${value?.id}`}
                                  >
                                    Open
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
