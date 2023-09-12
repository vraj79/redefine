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

export const AllEstimates = () => {
  const params = useParams();
  const projectId = params.projectId;
  //   const [estimateInfo, setEstimateInfo] = useState([]);
  //   const [managerInfo, setManagerInfo] = useState([]);
  //   const [servicesInfo, setServicesInfo] = useState([]);
  //   const [servicesList, setServicesList] = useState([]);
  //   const [tobedeleted, setTobedeleted] = useState([]);
  //   const [estimateList, setEstimateList] = useState([]);
  //   const [estimateDetails, setEstimateDetails] = useState([]);
  const [allEstimates, setAllEstimates] = useState([]);
  //   const [wholeData, setwholeData] = useState([]);
  //   const [query, setQuery] = useState("");

  //   const [data, setData] = useState([]);
  //   console.log(managerInfo);
  //   console.log(servicesInfo);

  useEffect(() => {
    getAllEstimates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllEstimates = async () => {
    const { data } = await axiosInstance.get(
      `projectestimate/all/${projectId}`
    );
    setAllEstimates(data);
    console.log(data);
    console.log("res.data");
  };

  //   var rateType = ["", "Per item", "Per hour", "Per LBH"];

  //   let subtotal = 0;

  // {
  //   servicesInfo &&
  //     servicesInfo.map((service, index) => {
  //       subtotal +=
  //         Number(service.no_of_day) *
  //         Number(service.nos) *
  //         Number(service.service_rate);

  //       return subtotal;
  //     });
  // }

  // allEstimates?.forEach((value, index) =>{
  //     getdata(value?.id);
  // })

  // const printDocument = () => {
  //     const input = document.getElementById('divToPrint');
  //     input.classList.remove("d-none");
  //     html2canvas(input)
  //         .then((canvas) => {
  //             const imgData = canvas.toDataURL('image/png');
  //             const pdf = new jsPDF();
  //             pdf.addImage(imgData, 'JPEG', 0, 0);
  //             // pdf.output('dataurlnewwindow');
  //             pdf.save("estimate.pdf");
  //             input.classList.add("d-none");
  //         })
  // }

  // const getdata = async (value) => {
  //     var mydata = {...wholeData};
  //     const { data } = await axiosInstance.get(`projectestimate/getdata/${projectId}/${value}`)
  //     setEstimateDetails(data[0].estimate_info)
  //     setServicesInfo(data[2].services)
  //     setManagerInfo(data[1].users)
  //     mydata[value] = [data[0].estimate_info, data[2].services, data[1].users];
  //     setwholeData(mydata);

  //     console.log("wholeData", wholeData);
  //     console.log("mydata", mydata);
  //     console.log(data);
  //     console.log("res.data")
  // }

  //   const TaxType = ["Null", "CGST & SGST", "IGST"];

  //   let currentDate = new Date();
  //   let day = currentDate.getDate();
  //   let month = currentDate.getMonth() + 1;
  //   let year = currentDate.getFullYear();
  //   let monthArray = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "June",
  //     "July",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  return (
    <>
      <ProjectHeader />

      <div className="row">
        <h4 className="ps-4 pe-0">All Estimates</h4>
        <hr />
        <div className="text-center">
          <div className="container-fluid">
            <div className="row bg-white py-2 shadow border-light">
              <div className="col-sm-12  col-xs-12  col-md-12">
                <div className="the-box">
                  <div className="table table-striped table-hover table-bordered">
                    {/* <Link to={`/projects/try_new_estimate/${projectId}`} className="btn btn-default text-start col-md-6 btn-coral">Create Estimate</Link> */}

                    <div className="row">
                      {allEstimates &&
                        allEstimates.map((value) => (
                          <>
                            <div className="col-md-4 p-2">
                              <div className="card">
                                <div className="card-body">
                                  <h5 className="card-title">Estimate</h5>
                                  <p className="card-text">
                                    {value?.estimate_no}
                                  </p>
                                  <div className="container d-flex justify-content-around">
                                    <Link
                                      className="btn btn-primary"
                                      to={`/projects/estimate-single/${projectId}/${value?.id}`}
                                    >
                                      Open
                                    </Link>
                                    {/* <button className="btn btn-success" onClick={() => printDocument(value?.id)}>Download</button> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div
          className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 d-none"
          id="divToPrint"
        >
          <div className="col-md-9">
            <div className="row ">
              <div className="col-md-5">
                <img
                  src="/assets/images/redefine-logo.png"
                  alt="example"
                  className="img-fluid w-50"
                />
              </div>
              <div className="col-md-6">
                <h5>REDEFINE MARCOM PVT. LTD</h5>
                <p style={{ fontSize: "13px" }}>
                  4, DDA Commercial Complex, Plot No - 22, MOR Land
                  <br />
                  New Rajinder Nagar, New Delhi - 110060
                  <br />
                  <b>Tel:</b> +91 11 4078 7674, <b>Email:</b> info@redefine.in
                  <br />
                  <b>CIN:</b> U74999DL2009PTC190842
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row" style={{ marginTop: "60px" }}>
              <div className="col-md-8">
                <div className="text-start">
                  <h1>Estimate</h1>

                  {estimateDetails &&
                    estimateDetails.map((value) => (
                      <>
                        <table>
                          <tr>
                            <td>
                              <b>Estimate No:</b>
                            </td>
                            <td className="px-3"></td>
                            <td className="ps-5">{value?.estimate_no}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Client:</b>
                            </td>
                            <td className="px-3"></td>
                            <td className="ps-5">{value?.customer_name}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Project No:</b>
                            </td>
                            <td className="px-3"></td>
                            <td className="ps-5">{value?.project_code}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Project Manager:</b>
                            </td>
                            <td className="px-3"></td>
                            <td className="ps-5">{managerInfo[0]?.name}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>Project:</b>
                            </td>
                            <td className="px-3"></td>
                            <td className="ps-5">{value?.project_title}</td>
                          </tr>
                        </table>
                      </>
                    ))}
                </div>
              </div>
              <div className="col-md-4">
                {day + " " + monthArray[month - 1] + " " + year}
              </div>
            </div>
          </div> */}
        {/* <div className="col-md-8 text-start">
            <table
              className="example-table table table-bordered"
              width="100%; margin-top:100px;"
            >
              <tr>
                <td width="15" align="center">
                  <strong>S.No.</strong>
                </td>
                <td width="100" align="start">
                  <strong>Description</strong>
                </td>
                <td width="20" align="center">
                  <strong>Qty</strong>
                </td>
                <td width="30" align="center">
                  <strong>RateType</strong>
                </td>
                <td width="50" align="center">
                  <strong>Days</strong>
                </td>
                <td width="80" align="center">
                  <strong>Unit Cost INR</strong>
                </td>
                <td width="70" align="center">
                  <strong>Amount INR</strong>
                </td>
              </tr>

              {servicesInfo &&
                servicesInfo.map((value, index) => (
                  <>
                    <tr>
                      <td align="center">{index + 1}</td>
                      <td align="left">{value?.service_name}</td>
                      <td align="center">{value?.nos}</td>
                      <td align="center">{rateType[value?.rate_type]}</td>
                      <td align="center">{value?.no_of_day}</td>
                      <td align="center">{value?.service_rate}</td>
                      <td align="center">
                        {(
                          value?.service_rate *
                          value?.nos *
                          value?.no_of_day
                        ).toLocaleString()}
                      </td>
                    </tr>
                  </>
                ))}

              <tr>
                <td align="center">-</td>
                <td align="start">
                  <b>Subtotal</b>
                </td>

                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center">{subtotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td align="center">-</td>
                <td align="start">Taxable Amount</td>

                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center">{subtotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td align="center">-</td>
                <td align="start">
                  <b>Tax</b>
                </td>

                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
              </tr>
              <tr>
                <td align="center">-</td>
                <td align="start">
                  {TaxType[estimateDetails[0]?.tax_type]}{" "}
                  {estimateDetails[0]?.tax_percent}%
                </td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center">{estimateDetails[0]?.tax_amount}</td>
              </tr>
              <tr>
                <td align="center">-</td>
                <td align="start">
                  <strong>Grand Total</strong>
                </td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center"></td>
                <td align="center">
                  <b>
                    {(
                      subtotal + estimateDetails[0]?.tax_amount
                    ).toLocaleString()}
                  </b>
                </td>
              </tr>
            </table>

            <br />
            <br />
            <table className="" width="100%">
              <tr>
                <td colspan="2">
                  <strong>For Redefine Marcom Pvt Ltd</strong>
                </td>
              </tr>
              <tr>
                <img
                  src="/assets/images/stamp.png"
                  alt="example"
                  width="80"
                  className="img-fluid"
                />
              </tr>

              <tr>
                <td colspan="2">
                  <strong>{managerInfo[0]?.name}</strong>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <strong>Terms & Conditions:</strong>
                  <br />
                  <td style={{ fontSize: "13px" }}>
                    #Payment within 15 days of submission of Invoice (As per
                    Client Policy)
                    <br />
                    #No claims will be entertained if the same is not intimated
                    in writing within 15 days from the date of this INVOICE
                    <br />
                    #All payments to be made in favour of Redefine Marcom Pvt
                    Ltd
                    <br />
                    #Govt. Taxes as applicable will be charge in the final
                    Invoice
                    <br />
                    #Subject to Delhi Jurisdiction
                    <br />#{estimateDetails[0]?.terms}
                  </td>
                </td>
              </tr>

              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </table>
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
};
