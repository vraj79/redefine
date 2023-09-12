import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../../config";
import { ProjectHeader } from "./ProjectHeader";
import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Toaster, toast } from "react-hot-toast";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

export const ProjectInfo = () => {
  const params = useParams();
  const projectId = params.projectId;
  const [projectData, setProjectData] = useState([]);
  const [cities, setCities] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Get data
  useEffect(() => {
    getData();
    getCities();
    getCustomers();
  }, []);

  // Fetch Data from API

  const getData = async () => {
    const { data } = await axiosInstance.get(`project/${projectId}`);
    setProjectData(data);
  };

  const getCities = async () => {
    const { data } = await axiosInstance.get(`projectcities/view/${projectId}`);
    setCities(data);
  };

  const getCustomers = async () => {
    const { data } = await axiosInstance.get(
      `projectcustomers/view/${projectId}`
    );
    setCustomers(data);
  };

  const removeRow = async (e) => {
    let row_id = e;
    try {
      const deleteData = await axiosInstance.delete(
        `projectcities/delete/${row_id}`
      );
      if (deleteData?.status === 200) {
        toast.success("City Deleted");
        getCities();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const delCustomer=async(id)=>{
    const res = await axiosInstance.delete(`projectcustomers/delete/${id}`);
    if(res?.status===200){
      toast.success("Customer Deleted");
      getCustomers();
    }
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <ProjectHeader />
      {projectData &&
        projectData.map((value,index) => {
          return (
            <div key={index}>
              <div className="row px-3 mb-3">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button text-dark"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <strong>Project Details</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="container px-2">
                          <div className="my-2 bg-light shadow p-4 rounded text-end">
                            {/* <h4 className="panel-title mb-4">Details</h4> */}
                            <Link
                              to={`/projects/manage-department/${projectId}`}
                              className="btn btn-dark"
                            >
                              Update Department
                            </Link>
                            <Link
                              to={`/projects/update_info/${projectId}`}
                              className="btn btn-dark ms-3"
                            >
                              Update Basic Info
                            </Link>
                            <hr />

                            <Box width="100%" overflow="auto">
                              <StyledTable>
                                {/* <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Company</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead> */}

                                <TableBody>
                                  <TableRow>
                                    <TableCell align="left">
                                      Project Number
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.code}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Project Category
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.category}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Project Title
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.title}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Project Description
                                    </TableCell>

                                    <TableCell align="left">
                                      <p>{value.description}</p>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Estimate Price
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.expected_revenue}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Quotation Price
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.quotation_price == null
                                        ? "N/A"
                                        : value.quotation_price}
                                    </TableCell>
                                  </TableRow>
                                  {/* <TableRow>
                                    <TableCell align="left">
                                      Quotation file
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.quotation_file_id == null
                                        ? "N/A"
                                        : value.quotation_file_id}
                                    </TableCell>
                                  </TableRow> */}
                                  <TableRow>
                                    <TableCell align="left">
                                      PO Status
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.purchase_order}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Project Start date
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.start_date.split("T")[0]}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Project End date
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.actual_end_date.split("T")[0]}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Project Status
                                    </TableCell>

                                    <TableCell align="left">
                                      {value.status == 1
                                        ? "Yet to Start"
                                        : value.status == 2
                                        ? "In progress"
                                        : value.status == 3
                                        ? "Postponed"
                                        : value.status == 4
                                        ? "Cancelled"
                                        : value.status == 5
                                        ? "Closed"
                                        : value.status == 6
                                        ? "Partly Executed"
                                        : "Executed"}
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </StyledTable>
                            </Box>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button  text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <strong>Accounts</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="my-2 text-end bg-light shadow p-4 rounded">
                          {/* <h4 className="panel-title mb-4">Accounts</h4> */}
                          <Link
                            to={`/projects/manage_finance/${projectId}`}
                            className="btn btn-dark"
                          >
                            Manage Finance
                          </Link>
                          {/* <Link to={`/projects/finance_files/${projectId}`} className='btn btn-dark'>Manage Finance</Link> */}
                          <hr />

                          <Box width="100%" overflow="auto">
                            <StyledTable>
                              <TableBody>
                                <TableRow>
                                  <TableCell align="left">
                                    Billing status
                                  </TableCell>

                                  <TableCell align="left">
                                    {value.billing_status == 0
                                      ? "Billed"
                                      : value.billing_status == 1
                                      ? "Not Billed"
                                      : "Partly Billed"}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Payment Status
                                  </TableCell>

                                  <TableCell align="left">
                                    {value.payment_status == 2
                                      ? "Unpaid"
                                      : "Paid"}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">A Factor</TableCell>

                                  <TableCell align="left">
                                    INR {value.quotation}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Agency Fees
                                  </TableCell>

                                  <TableCell align="left">- </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Total PO value
                                  </TableCell>

                                  <TableCell align="left">-</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Billed Amount
                                  </TableCell>

                                  <TableCell align="left">-</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Amount Received
                                  </TableCell>

                                  <TableCell align="left">-</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Outstanding amount
                                  </TableCell>

                                  <TableCell align="left">-</TableCell>
                                </TableRow>
                              </TableBody>
                            </StyledTable>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button  text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <strong>Execution Cities</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="my-2 text-end bg-light shadow p-4 rounded">
                          {/* <h4 className="panel-title mb-4">Execution Cities</h4> */}
                          <Link
                            to={`/projects/cities/${projectId}`}
                            className="btn btn-dark"
                          >
                            Add City
                          </Link>
                          <hr />

                          <Box width="100%" overflow="auto">
                            <StyledTable>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left">City</TableCell>
                                  <TableCell align="center">
                                    Execution Date
                                  </TableCell>

                                  <TableCell align="right">Action</TableCell>
                                </TableRow>
                              </TableHead>

                              {cities &&
                                cities.map((value,index) => (
                                    <TableBody key={index}>
                                      <TableRow>
                                        <TableCell align="left">
                                          {value.name}
                                        </TableCell>

                                        <TableCell align="center">
                                          {value.execution_date.split("T")[0]}
                                        </TableCell>
                                        <TableCell align="right">
                                          <button
                                            type="button"
                                            className="btn btn-danger btn-sm remJS"
                                            onClick={(e) => removeRow(value.id)}
                                          >
                                            <i
                                              className="fa fa-trash"
                                              style={{ fontSize: "1.2rem" }}
                                              aria-hidden="true"
                                            ></i>
                                          </button>
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                ))}
                            </StyledTable>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button  text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        <strong>Customers</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="my-2 text-end bg-light shadow p-4 rounded">
                          {/* <h4 className="panel-title mb-4">Customers</h4> */}
                          {customers.length >= 1 ? (
                            <Link
                              to={`/projects/customers/${projectId}`}
                              state={{ stat: 1 }}
                              className="btn btn-dark"
                            >
                              Update Customer
                            </Link>
                          ) : (
                            <Link
                              to={`/projects/customers/${projectId}`}
                              className="btn btn-dark"
                            >
                              Add Customer
                            </Link>
                          )}

                          {/* <Link to={`/projects/customers/${projectId}`} className='btn btn-dark'>Add Customer</Link> */}

                          <hr />

                          <Box width="100%" overflow="auto">
                            <StyledTable>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left">
                                    Customer Name
                                  </TableCell>

                                  <TableCell align="right">Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {customers &&
                                  customers.map((value,index) => (
                                      <TableRow key={index}>
                                        <TableCell align="left">
                                          {value.name}
                                        </TableCell>

                                        <TableCell align="right">
                                          <IconButton onClick={()=>delCustomer(value.id)}>
                                            <Icon color="error">close</Icon>
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                  ))}
                              </TableBody>
                            </StyledTable>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button  text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseContact"
                        aria-expanded="false"
                        aria-controls="collapseContact"
                      >
                        <strong>Contacts</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseContact"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="my-2 text-end bg-light shadow p-4 rounded">
                          {/* <h4 className="panel-title mb-4">Customers</h4> */}
                          <Link
                            to={`/projects/contacts/${projectId}`}
                            className="btn btn-dark"
                          >
                            Add Contact
                          </Link>

                          <hr />

                          <Box width="100%" overflow="auto">
                            <StyledTable>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left">
                                    <strong>Contact Name</strong>
                                  </TableCell>
                                  <TableCell align="center">
                                    <strong>Company</strong>
                                  </TableCell>

                                  <TableCell align="right">
                                    <strong>Action</strong>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell align="left">
                                    R.S Infonet
                                  </TableCell>
                                  <TableCell align="center">
                                    R.S Infonet
                                  </TableCell>

                                  <TableCell align="right">
                                    <IconButton>
                                      <Icon color="error">close</Icon>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </StyledTable>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFive">
                      <button
                        className="accordion-button  text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        <strong>Vendors</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="my-2 text-end bg-light shadow p-4 rounded">
                          {/* <h4 className="panel-title mb-4">Vendors</h4> */}
                          <Link to="example" className="btn btn-dark">
                            Add Vendor
                          </Link>
                          <hr />

                          <Box width="100%" overflow="auto">
                            <StyledTable>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left">
                                    Vendor Name
                                  </TableCell>
                                  <TableCell align="center">Service</TableCell>

                                  <TableCell align="right">City</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  <TableCell align="left"></TableCell>

                                  <TableCell align="right"></TableCell>
                                </TableRow>
                              </TableBody>
                            </StyledTable>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSix">
                      <button
                        className="accordion-button  text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix"
                        aria-expanded="false"
                        aria-controls="collapseSix"
                      >
                        <strong>Add File</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseSix"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSix"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="my-2 text-end bg-light shadow p-4 rounded">
                          {/* <h4 className="panel-title mb-4">Add File</h4> */}
                          <Link
                            to={`/projects/addfile/${projectId}`}
                            className="btn btn-dark"
                          >
                            Add File
                          </Link>
                          <hr />

                          <Box width="100%" overflow="auto">
                            <StyledTable>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left">Filename</TableCell>
                                  <TableCell align="center">Type</TableCell>

                                  <TableCell align="right">
                                    Uploaded By
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  {/* <TableCell align="left"></TableCell>



                          <TableCell align="right">
                            
                          </TableCell> */}
                                </TableRow>
                              </TableBody>
                            </StyledTable>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingSeven">
                      <button
                        className="accordion-button  text-dark collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSeven"
                        aria-expanded="false"
                        aria-controls="collapseSeven"
                      >
                        <strong>Estimator</strong>
                      </button>
                    </h2>
                    <div
                      id="collapseSeven"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSeven"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        <div className="my-2 text-end bg-light shadow p-4 rounded">
                          {/* <h4 className="panel-title mb-4">Estimator</h4> */}
                          <hr />

                          <Box width="100%" overflow="auto">
                            <StyledTable>
                              <TableHead>
                                <TableRow>
                                  <TableCell align="left">
                                    Estimate Name
                                  </TableCell>
                                  <TableCell align="center">
                                    Estimate Date
                                  </TableCell>

                                  <TableCell align="right">Action</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
                                  {/* <TableCell align="left"></TableCell>



                          <TableCell align="right">
                            
                          </TableCell> */}
                                </TableRow>
                              </TableBody>
                            </StyledTable>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
