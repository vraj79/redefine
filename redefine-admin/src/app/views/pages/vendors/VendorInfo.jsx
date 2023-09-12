import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../../config";
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

export const VendorInfo = () => {
  // Get id from the url and then fetch data from api
  const params = useParams();
  const id = params.id;
  // id we got is id
  console.log(id);
  const [VendorData, setVendorData] = useState([]);
  const [branches, setBranches] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);
  const [zone, setZone] = useState([]);

  // Get data
  useEffect(() => {
    getdata();
    getBranches();
    getContacts();
    getServices();
    getZone();
  }, []);

  // Fetch data from API

  var zones = { E: "East", W: "West", N: "North", S: "South" };

  const getdata = async () => {
    const { data } = await axiosInstance.get(`vendors/view/${id}`);
    setVendorData(data);
    console.log(data);
    console.log("res.data");
  };

  const getBranches = async () => {
    const { data } = await axiosInstance.get(`vendors/branch/viewall/${id}`);
    setBranches(data);
  };

  const getContacts = async () => {
    const { data } = await axiosInstance.get(`vendors/contact/view/${id}`);
    setContacts(data);
  };

  const getServices = async () => {
    const { data } = await axiosInstance.get(`vendors/services/view/${id}`);
    setServices(data);
  };
  const getZone = async () => {
    const { data } = await axiosInstance.get(`vendors/zones/view/${id}`);
    setZone(data);
  };

  const removeBranch = async(id) => {
    try {
      const res = await axiosInstance.delete(`vendors/branch/delete/${id}`);
      console.log(res)
      if (res.data?.success) {
        toast.success(res.data?.msg);
        getBranches();
      } else {
        toast.error(res.data?.msg);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const removeContact = (e) => {
    console.log(e);
    let row_id = e;
    try {
      const deleteData = axiosInstance.delete(
        `vendors/contact/delete/${row_id}`
      );
      console.log("deleted");
      getContacts();
    } catch (error) {
      alert(error);
    }
  };

  var company_types = {
    pvt: "Private Limited",
    pub: "Public Limited",
    prop: "Proprietorship",
    publist: "Public Limited Listed",
    partner: "Partnership",
    govt_dept: "Government Department",
    psu: "Public Sector Undertaking",
    trust: "Trust/NGO",
  };

  return (
    <>
      <Toaster />
      {VendorData &&
        VendorData.map((value) => {
          return (
            <div key={value.id} className="row px-3 my-3">
              <div className="container text-end">
                <Link to={`/vendors`} className="btn btn-info mb-3">
                  Go Back
                </Link>
              </div>
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
                      <strong>Vendor Details</strong>
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
                          <Link
                            to={`/vendors/services/${id}`}
                            className="btn btn-outline-dark ms-3"
                          >
                            Update Services
                          </Link>
                          <Link
                            to={`/vendors/update/${id}`}
                            className="btn btn-dark ms-3"
                          >
                            Update Basic Info
                          </Link>
                          <hr />

                          <Box width="100%" overflow="auto">
                            <StyledTable>
                              <TableBody>
                                <TableRow>
                                  <TableCell align="left">
                                    Vendor Code
                                  </TableCell>

                                  <TableCell align="left">
                                    {value.code}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Vendor Name
                                  </TableCell>

                                  <TableCell align="left">
                                    {value.name}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Contact Name
                                  </TableCell>

                                  <TableCell align="left">
                                    {value.contact_name}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Contact Mobile
                                  </TableCell>
                                  <TableCell align="left">
                                    {value.contact_mobile}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">Email</TableCell>

                                  <TableCell align="left">
                                    {value.email}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">Rating</TableCell>

                                  <TableCell align="left">
                                    {value.rating}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">Comments</TableCell>

                                  <TableCell align="left">
                                    {value.comments}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Payment Terms
                                  </TableCell>

                                  <TableCell align="left">
                                    {value.payment_terms}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left">
                                    Bank Details
                                  </TableCell>

                                  <TableCell align="left">
                                    {value.bank_details}
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
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button  text-dark collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      <strong>Branches</strong>
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
                          to={`/vendors/branch/create/${id}`}
                          className="btn btn-dark"
                        >
                          Add Branch
                        </Link>
                        <hr />

                        <Box width="100%" overflow="auto">
                          <StyledTable>
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Branch Name</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">City</TableCell>

                                <TableCell align="right">Action</TableCell>
                              </TableRow>
                            </TableHead>

                            {branches &&
                              branches?.map((value) => (
                                <TableBody key={value.id}>
                                  <TableRow>
                                    <TableCell align="left">
                                      {value.name}
                                    </TableCell>

                                    <TableCell align="center">
                                      {value.type}
                                    </TableCell>
                                    <TableCell align="center">
                                      {value.city}
                                    </TableCell>
                                    <TableCell align="right">
                                      <Link
                                        to={`/vendors/branch/update/${id}/${value.id}`}
                                        style={{
                                          textDecoration:
                                            "underline !important",
                                          color: "blue !important",
                                        }}
                                        title="View"
                                        className="btn mr-1"
                                      >
                                        <i className="fa-solid fa-pen text-primary"></i>
                                      </Link>
                                      <Link
                                        to={`/vendors/branch/${id}/${value.id}`}
                                        style={{
                                          textDecoration:
                                            "underline !important",
                                          color: "blue !important",
                                        }}
                                        title="View"
                                        className="btn mr-1"
                                      >
                                        <i className="fa-solid fa-eye"></i>
                                      </Link>
                                      <button
                                        type="button"
                                        className="btn remJS"
                                        onClick={() => removeBranch(value.id)}
                                      >
                                        <i
                                          className="fa fa-trash text-danger"
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
                      <strong>Contacts</strong>
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
                        {/* <h4 className="panel-title mb-4">Execution Cities</h4> */}
                        <Link
                          to={`/vendors/contact/create/${id}`}
                          className="btn btn-dark"
                        >
                          Add Contact
                        </Link>
                        <hr />

                        <Box width="100%" overflow="auto">
                          <StyledTable>
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">City</TableCell>
                                <TableCell align="right">Action</TableCell>
                              </TableRow>
                            </TableHead>

                            {contacts &&
                              contacts.map((value) => (
                                <TableBody key={value.id}>
                                  <TableRow>
                                    <TableCell align="left">{`${value.firstname} ${value.lastname}`}</TableCell>

                                    <TableCell align="center">
                                      {value.city}
                                    </TableCell>

                                    <TableCell align="right">
                                      <Link
                                        to={`/vendors/contact/update/${id}/${value.id}`}
                                        style={{
                                          textDecoration:
                                            "underline !important",
                                          color: "blue !important",
                                        }}
                                        title="View"
                                        className="btn mr-1"
                                      >
                                        <i className="fa-solid fa-pen text-primary"></i>
                                      </Link>
                                      <Link
                                        to={`/vendors/contact/${id}/${value.id}`}
                                        style={{
                                          textDecoration:
                                            "underline !important",
                                          color: "blue !important",
                                        }}
                                        title="View"
                                        className="btn mr-1"
                                      >
                                        <i className="fa-solid fa-eye"></i>
                                      </Link>
                                      <button
                                        type="button"
                                        className="btn remJS"
                                        onClick={(e) => removeContact(value.id)}
                                      >
                                        <i
                                          className="fa fa-trash text-danger"
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
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      <strong>Services</strong>
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="my-2 text-end bg-light shadow p-4 rounded">
                        {/* <h4 className="panel-title mb-4">Execution Cities</h4> */}
                        <Link
                          to={`/vendors/services/${id}`}
                          className="btn btn-dark"
                        >
                          Add Service
                        </Link>
                        <hr />

                        <Box width="100%" overflow="auto">
                          <StyledTable>
                            <TableHead>
                              <TableRow>
                                <TableCell align="left">Name</TableCell>

                                <TableCell align="right">Action</TableCell>
                              </TableRow>
                            </TableHead>

                            {services &&
                              services.map((value) => (
                                <TableBody key={value.id}>
                                  <TableRow>
                                    <TableCell align="left">
                                      {value.name}
                                    </TableCell>

                                    <TableCell align="center">
                                      {value.city}
                                    </TableCell>

                                    <TableCell align="right">
                                      <Link
                                        to={`/vendors/contact/update/${id}/${value.id}`}
                                        style={{
                                          textDecoration:
                                            "underline !important",
                                          color: "blue !important",
                                        }}
                                        title="View"
                                        className="btn mr-1"
                                      >
                                        <i className="fa-solid fa-gear text-primary"></i>
                                      </Link>
                                      <button
                                        type="button"
                                        className="btn remJS"
                                        onClick={(e) => removeContact(value.id)}
                                      >
                                        <i
                                          className="fa fa-trash text-danger"
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
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      <strong>Service Provisioning Zones</strong>
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="my-2 text-end bg-light shadow p-4 rounded">
                        {/* <h4 className="panel-title mb-4">Execution Cities</h4> */}
                        <Link to={``} className="btn btn-dark">
                          Update Service Zones
                        </Link>
                        <hr />

                        <Box width="100%" overflow="auto">
                          <StyledTable>
                            {zone &&
                              zone.map((value) => (
                                <TableBody key={value.id}>
                                  <TableRow>
                                    <TableCell align="left">
                                      Service Zones:
                                    </TableCell>
                                    <TableCell align="right">
                                      {zones[value.zone]}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Service States:
                                    </TableCell>
                                    <TableCell align="right">
                                      {value.state}
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell align="left">
                                      Service City
                                    </TableCell>
                                    <TableCell align="right">
                                      {value.city}
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
              </div>
            </div>
          );
        })}
    </>
  );
};
