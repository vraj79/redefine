import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProjectHeader } from "./ProjectHeader";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import swal from "sweetalert";
import { axiosInstance } from "../../../config";
import { Toaster,toast } from "react-hot-toast";
// import DataTable from 'react-data-table-component';
// import Checkbox from '@mui/icons-material/CheckBox';
// import ArrowDownward from '@mui/icons-material/ArrowDownward';

import html2pdf from "html2pdf.js";
// ========  Per item -> 1, Per hour -> 2, per LBH -> 3  =========
const termsText = `
<br/>
<p>
#This Estimate (the "Estimate") is made and entered into as of the date of last signature below (the "Effective Date"), by and between Zscaler Softech India Private
Limited, having its registered office at Bren Optimus , 3rd floor, 8/2 Dr. M.H. Marigowda Road, Dairy Colony, Adugodi Bengaluru KA 560029 IN with its parent
company Zscaler, Inc. located at 120 Holger Way, San Jose, CA 95134 (“Zscaler” together with its affiliates, group companies and subsidiaries including its branches),
and Redefine Marcom Private Limited located at 4, DDA Commercial Complex, Plot No. 22, MOR Land, New Rajinder Nagar, New Delhi – 110060 (Zscaler, including its
parent company, affiliates, group companies and subsidiaries, including branch offices, are referred to as "Zscaler”.) The terms of Zscaler Vendor Amendment dated
February 12th, 2023, are herein incorporated by reference. This Estimate and Zscaler Vendor Amendment together shall be known as the “Agreement” and in the event
of conflict of terms, the terms of Zscaler Vendor Amendment shall prevail.
</p>
<br/>
<p>
# Any matter in relation to data protection/ privacy laws under this Agreement shall be governed by the Data Protection Addendum dated February
12, 2023 ("DPA"). In the event of any conflict between the data protection related terms and conditions of this Agreement and the DPA, the terms and
conditions set out in the DPA shall govern and control.
</p>
<br/>
<p>
#Payment within 60 days from the receipt of valid and undisputed of submission of Invoice (As per Client Policy). All invoices shall be paid and
received through Coupa. Any payment related queries shall be sent to the Accounts Payable India team at apindia@zscaler.com.
</p>
<br/>
<p>
#No claims will be entertained if the same is not intimated in writing within 20 days from the receipt date of the INVOICE
</p>
<br/>
<p>
#All payments to be made in favour of Redefine Marcom Pvt Ltd
</p>
<br/>
<p style={{color:"red"}}>
# The Grand Total mentioned above is inclusive of all applicable Government Taxes.
</p>
`;
export const CheckOneEstimate = () => {
  const navigate = useNavigate();
  const ref = React.createRef();
  const params = useParams();
  const projectId = params.projectId;
  const estimateId = params.estimateId;
  const [servicesInfo, setServicesInfo] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(false);
    
  const showPdfBtn=true

  // my work
  const [agencyFees, setAgencyFees] = useState("");
  const [discount, setDiscount] = useState("");
  const [taxPercent, setTaxPercent] = useState("");
  const [taxType, setTaxType] = useState("");
  const [terms, setTerms] = useState(termsText);

  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");

  const getClientName = async (projectId) => {
    const { data } = await axiosInstance.get(
      `projectcustomers/view/${projectId}`
    );
    setClientName(data[0]?.name);
    setClientId(data[0]?.id);
  };

  const [projectDetails, setProjectDetails] = useState({});

  const getProjectDetails = async (projectId) => {
    const res = await axiosInstance.get(`project/${projectId}`);
    setProjectDetails(res.data[0]);
  };

  const [projectManager, setProjectManager] = useState([]);

  const getProjectManagerName = async (projectId) => {
    const { data } = await axiosInstance.get(
      `projectcreateproject/team/view/${projectId}`
    );
    setProjectManager(data);
  };

  const getServices = async () => {
    const { data } = await axiosInstance.get(`services/view`);
    setServicesList(data);
  };

  const [estimateList, setEstimateList] = useState([]);
  const [estimateNum, setEstimateNum] = useState("");

  const getEstimateList = async () => {
    const { data } = await axiosInstance.get(`projectestimate/list`);
    setEstimateList(data);
  };


  const getServicesList = async () => {
    const { data } =
      estimateId !== "" &&
      (await axiosInstance.get(`projectestimate/service/list/${estimateId}`));
    setServicesInfo(data?.services);
  };

  let subtotal = 0;

  {
    servicesInfo &&
      servicesInfo?.map((service) => {
        subtotal +=
          Number(service.no_of_day) *
          Number(service.no_of_unit) *
          Number(service.service_rate);

        return subtotal;
      });
  }

  let total = subtotal + Number(agencyFees) - Number(discount);
  let tax_amount =
    ((subtotal + Number(agencyFees) - Number(discount)) * taxPercent) / 100;
  let grand_total =
    subtotal +
    Number(agencyFees) -
    Number(discount) +
    ((subtotal + Number(agencyFees) - Number(discount)) * taxPercent) / 100;

  const estimateDataById = async () => {
    const { data } = await axiosInstance.get(
      `projectestimate/details/${estimateId}`
    );
    const {
      // project_id,
      client,
      estimate_no,
      terms,
      // estimate_amount,
      discount: newDiscount,
      agency_fees,
      // total,
      tax_type,
      tax_percent,
      tax_amount: newTaxAmount,
      grand_total: grandTotal,
      // project_manager_id,
      // project_city_id,
      // created_on,
      // created_by,
    } = data[0];
    console.log(data);
    setAgencyFees(agency_fees);
    setClientId(client);
    setEstimateNum(estimate_no);
    setTerms(terms);
    setDiscount(newDiscount);
    tax_amount = newTaxAmount;
    grand_total = grandTotal;
    setTaxPercent(tax_percent);
    setTaxType(tax_type);
  };

  const addMoreRow = () => {
    setServicesInfo((prevServices) => [
      ...prevServices,
      {
        service_id: "",
        rate_type: "",
        height: "",
        length: "",
        no_of_day: "",
        no_of_unit: "",
        service_desc: "",
        service_rate: "",
        width: "",
        totalPrice: "",
      },
    ]);
    let element = document.getElementById("estimate");
    element.scrollIntoView({ behavior: "smooth" });
  };

  const removeRow = (index) => {
    let allRows = document.querySelectorAll("#addServices tbody tr");
    if (allRows.length > 1) {
      const newServicesInfo = [...servicesInfo];
      newServicesInfo.splice(index, 1);
      setServicesInfo(newServicesInfo);
    }
  };

  // getting current date
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth();
  let year = currentDate.getFullYear();
  let monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let today = day + " " + monthArray[month] + " " + year;
  // getting current date

  const calculateTotalPrice = (service) => {
    const { no_of_day, service_rate, no_of_unit } = service;
    const totalPrice =
      Number(no_of_day) * Number(service_rate) * Number(no_of_unit);

    return totalPrice;
  };

  const handleServicesData = (e, index) => {
    const { name, value } = e.target;
    setServicesInfo((prevServices) => {
      const updatedServices = [...prevServices];
      const service = updatedServices[index];
      service[name] = value;
      service.total_price = calculateTotalPrice(service);
      service.created_on = today;
      return updatedServices;
    });
  };

  // const randomNum=Math.floor(Math.random() * 25)
  const randomNum = (
    Math.random().toString(16).substring(7, 10) +
    Array.from({ length: 2 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join("")
  ).toUpperCase();

  const estimateNumber =
    estimateId === "" &&
    `${projectId}_C${clientId}_RMPL_${monthArray[month]}_${year}_${randomNum}`;

  // Submit Team Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (servicesInfo.length < 1) {
      setLoading(false);
      return toast.error("Please add atleast one service!");
    }
    try {
      if (taxType == "") {
        setLoading(false);
        return toast.error("Please select tax type!");
      }
      if (!clientId) {
        setLoading(false);
        return toast.error("Please add a client or customer!");
      }
      const { data } = await axiosInstance.post(`projectestimate/`, {
        servicesInfo,
        estimateInfo: {
          project_id: projectId,
          clientId: clientId,
          estimate_no: estimateNumber,
          terms,
          estimate_amount: subtotal,
          discount: discount,
          agency_fees: agencyFees,
          total,
          tax_type: taxType,
          tax_percent: taxPercent,
          tax_amount,
          grand_total,
          project_manager_id: projectManager[0]?.user_id,
          user_id: sessionStorage.getItem("userId"),
        },
      });
      if (data.success) {
        toast.success("Estimate is Submitted Successfully");
        setTimeout(() => {
          navigate(`/projects/project-info/${projectId}`);
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Please try again!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.patch(
        `projectestimate/${estimateId}`,
        {
          servicesInfo,
          estimateInfo: {
            // project_id: projectId,
            // clientId: clientId,
            // estimate_no: estimateNumber,
            terms,
            estimate_amount: subtotal,
            discount: discount,
            agency_fees: agencyFees,
            total,
            tax_type: taxType,
            tax_percent: taxPercent,
            tax_amount,
            grand_total,
            // project_manager_id: projectManager[0]?.user_id,
            // user_id: sessionStorage.getItem("userId"),
          },
        }
      );
      if (data.success) {
        toast.success("Estimate is Updated Successfully");
        setTimeout(() => {
          navigate(`/projects/project-info/${projectId}`);
        }, 1500);
        // setShowPdfBtn(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Please try again!");
    }
  };

  useEffect(() => {
    getServices();
    getClientName(projectId);
    getProjectDetails(projectId);
    getProjectManagerName(projectId);
    getEstimateList();
    if (estimateId !== "") {
      getServicesList();
      estimateDataById();
    }
  }, [estimateId]);

  const downloadPDF = () => {
    const element = ref.current;
    const opt = {
      margin: 10,
      filename: `Estimate-${estimateNum}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Create the PDF
    html2pdf().from(element).set(opt).save();
  };

  if (loading) {
    return (
      <h1
        style={{ height: "100vh", display: "flex", justifyContent: "center" }}
      >
        Loading....
      </h1>
    );
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <ProjectHeader />
      {showPdfBtn && (
        <div
          style={{ fontSize: "11px" }}
          className="p-5 table-responsive"
          ref={ref}
        >
          <div className="pb-3 d-flex justify-content-between align-items-center">
            <img
              className="w-25"
              src={"/assets/images/redefine-logo.png"}
              alt="rededine-logo"
            />
            <div>
              <p className="m-0 text-primary font-weight-bold">
                REDEFINE MARCOM PVT LTD
              </p>
              <p className="m-0">
                4, DDA Commercial Complex PLot No-22,MOR Land
              </p>
              <p className="m-0">New Rajinder Nagar,New Delhi-110066</p>
              <p className="m-0">
                Tel : +91 11 4078 7674,email:info@redefine.in
              </p>
              <p className="m-0">CIN: U74999DL2009PTC190842</p>
            </div>
          </div>
          <h3>Estimate</h3>
          <table className="table table-hover table-bordered">
            <tbody>
              <tr style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Date</b>
                </td>
                <td className="text-start">{today}</td>
              </tr>
              <tr style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Estimate Number</b>
                </td>
                <td className="text-start">
                  {estimateNum === "" ? estimateNumber : estimateNum}
                </td>
              </tr>
              <tr style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Client Name</b>
                </td>
                <td className="text-start">{clientName}</td>
              </tr>
              <tr style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Project Code</b>
                </td>
                <td className="text-start">{projectDetails?.code}</td>
              </tr>
              <tr style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Project Title</b>
                </td>
                <td className="text-start">{projectDetails?.title}</td>
              </tr>
              <tr style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Project Manager</b>
                </td>
                {projectManager.length > 0 &&
                  projectManager?.map((item) => (
                    <td key={item.user_id} value={item.user_id}>
                      {item.name}
                    </td>
                  ))}
              </tr>
            </tbody>
          </table>
          <br />
          <table className="table table-hover table-bordered table-sm">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Service Type</th>
                <th>Description</th>
                <th>No Of Unit</th>
                <th colSpan={3}>Size</th>
                <th>No of Days</th>
                <th>Unit Cost</th>
                <th>Amount</th>
              </tr>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>L</th>
                <th>B</th>
                <th>H</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <>
                {servicesInfo &&
                  servicesInfo?.map((service, index) => {
                    const serviceName =
                      servicesList.find(
                        (item) => item.id === service.service_id
                      )?.name || "";
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{serviceName}</td>
                        <td>{service.service_desc}</td>
                        <td>{service.no_of_unit}</td>
                        <td>{service?.length === 0 ? "" : service?.length}</td>
                        <td>{service?.width === 0 ? "" : service?.width}</td>
                        <td>{service?.height === 0 ? "" : service?.height}</td>
                        <td>{service.no_of_day}</td>
                        <td>{service.service_rate}</td>
                        <td className="text-end">{service.total_price}</td>
                      </tr>
                    );
                  })}
              </>
            </tbody>
          </table>
          <table className="table table-bordered table-sm">
            <tbody>
              <tr className="text-end" style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Subtotal</b>
                </td>
                <td>{subtotal}</td>
              </tr>
              <tr className="text-end" style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Discount</b>
                </td>
                <td>{discount}</td>
              </tr>
              <tr className="text-end" style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Agency Fees</b>
                </td>
                <td>{agencyFees}</td>
              </tr>
              <tr className="text-end" style={{ verticalAlign: "middle" }}>
                <td>
                  <b>Total</b>
                </td>
                <td>{total}</td>
              </tr>
              <tr className="text-end">
                <td>
                  <b>Tax Type</b>
                </td>
                <td>
                  {taxType === "wtax" ? "Without tax" : taxType.toUpperCase()}
                </td>
              </tr>
              {taxType !== "wtax" && (
                <tr className="text-end">
                  <td>
                    <b>Tax Percent</b>
                  </td>
                  <td>{taxPercent}%</td>
                </tr>
              )}
              <tr className="text-end">
                <td>
                  <b>Tax Amount</b>
                </td>
                <td>
                  {taxType === "wtax" ? "Applicable Taxes Extra" : tax_amount}
                </td>
              </tr>
              <tr className="bg-success text-light text-end">
                <td>
                  <b>Grand Total</b>
                </td>
                <td>{grand_total}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <p>
            <b>Pan No : AAECR3805M</b>
          </p>
          <p>
            <b>GSTIN : 07AAECR3805M1Z7</b>
          </p>
          <p className="m-0">
            <b>For Redefine Marcom Pvt Ltd</b>
          </p>
          <img
            style={{ width: "10%" }}
            className="rounded-circle"
            src="/assets/images/stamp.png"
            alt="stamp"
          />
          <p>
            <b>Authorized signatory</b>
          </p>
          <br />
          <p>
            Terms & Conditions
            <div
              style={{ fontSize: "0.8vmax" }}
              dangerouslySetInnerHTML={{ __html: terms }}
            />
          </p>
          <br />
          <p>Agreed and Accepted By:-</p>
          <br />
          <div className="d-flex justify-content-between">
            <div>
              <p>
                <b>{clientName}</b>
              </p>
              <p>
                <b>By:</b>
              </p>
              <p>
                <b>Name: </b>
              </p>
              <p>
                <b>Title: </b>
              </p>
              <p>
                <b>Date: </b>
              </p>
            </div>
            <div>
              <p>
                <b>REDEFINE MARCOM PRIVATE</b>
              </p>
              <p>
                <b>By:</b>
              </p>
              <p>
                <b>Name: {projectManager[0]?.name}</b>
              </p>
              <p>
                <b>Title: Account Manager</b>
              </p>
              <p>
                <b>Date: {today}</b>
              </p>
            </div>
          </div>
        </div>
      )}

      {showPdfBtn && (
        <div className="p-5">
          <button className="btn btn-success col-md-2" onClick={downloadPDF}>
            Download Estimate
          </button>
        </div>
      )}
    </>
  );
};
