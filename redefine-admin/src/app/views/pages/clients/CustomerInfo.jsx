import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { axiosInstance } from '../../../config';
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



const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: "pre",
    "& thead": {
        "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
        "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
}));

export const CustomerInfo = () => {

    // Get id from the url and then fetch data from api
    const params = useParams();
    const id = params.id;
    // id we got is id
    console.log(id);
    const [projectData, setProjectData] = useState([]);
    const [cities, setCities] = useState([]);
    const [contacts, setContacts] = useState([]);

    // Get data
    useEffect(() => {
        getdata();
        getBranches();
        getContacts();
    }, [])

    // Fetch data from API

    const getdata = async () => {
        const { data } = await axiosInstance.get(`clients/view/${id}`)
        setProjectData(data)
        console.log(data);
        console.log("res.data")
    }


    const getBranches = async () => {
        const { data } = await axiosInstance.get(`clients/branch/viewall/${id}`)
        setCities(data);

    }


    const getContacts = async () => {
        const { data } = await axiosInstance.get(`clients/contact/view/${id}`)
        setContacts(data);

    }

    const removeBranch = (e) => {
        console.log(e);
        let row_id = e;
        try {
            const deleteData = axiosInstance.delete(`clients/branch/delete/${row_id}`)
            console.log("deleted")
            getBranches();
        }
        catch (error) {
            alert(error);
        }
    }

    const removeContact = (e) => {
        console.log(e);
        let row_id = e;
        try {
            const deleteData = axiosInstance.delete(`clients/contact/delete/${row_id}`)
            console.log("deleted")
            getContacts();
        }
        catch (error) {
            alert(error);
        }
    }


    var company_types = { pvt: "Private Limited", pub: "Public Limited", prop: "Proprietorship", publist: "Public Limited Listed", partner: "Partnership", govt_dept: "Government Department", psu: "Public Sector Undertaking", trust: "Trust/NGO" };

    return (
        <>

            {projectData && projectData.map((value) => {
                // console.log(value);

                return (
                    <>



                        <div className="row px-3 my-3">
                            <div className="container text-end">
                                <Link to={`/customers`} className="btn btn-info mb-3">Go Back</Link>
                            </div>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button text-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <strong>Customer Details</strong>
                                        </button>

                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <div className='container px-2'>
                                                <div className="my-2 bg-light shadow p-4 rounded text-end">

                                                    <Link to={`/customers/update/${id}`} className='btn btn-dark ms-3'>Update Basic Info</Link>
                                                    <hr />


                                                    <Box width="100%" overflow="auto">
                                                        <StyledTable>


                                                            <TableBody>
                                                                <TableRow>
                                                                    <TableCell align="left">Customer Code</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.code}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Customer Name</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.name}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Customer Group</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.group_name}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Abbreviation</TableCell>
                                                                    <TableCell align="left">
                                                                        {value.abbreviation}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Phone Number 1</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.phone_number_1}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Phone Number 2</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.phone_number_2}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Phone Number 3</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.phone_number_3}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Fax Number 1</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.fax_number_1}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Fax Number 2</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.fax_number_2}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Email</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.email}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Industry Type 1</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.industry_type_1}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Industry Type 2</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.industry_type_2}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Industry Type 3</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.industry_type_3}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Turnover</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.turnover}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">No of Employees</TableCell>

                                                                    <TableCell align="left">
                                                                        {value.employee}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left">Type of Company</TableCell>

                                                                    <TableCell align="left">
                                                                        {company_types[value.company_type]}
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
                                        <button className="accordion-button  text-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <strong>Branches</strong>
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <div className="my-2 text-end bg-light shadow p-4 rounded">
                                                {/* <h4 className="panel-title mb-4">Execution Cities</h4> */}
                                                <Link to={`/customers/branch/create/${id}`} className='btn btn-dark'>Add Branch</Link>
                                                <hr />

                                                <Box width="100%" overflow="auto">
                                                    <StyledTable>

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="left">Branch Name</TableCell>
                                                                <TableCell align="center">Type</TableCell>
                                                                <TableCell align="center">Phone</TableCell>

                                                                <TableCell align="right">Action</TableCell>
                                                            </TableRow>
                                                        </TableHead>

                                                        {cities && cities.map(value => (
                                                            <>


                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell align="left">{value.name}</TableCell>



                                                                        <TableCell align="center">
                                                                            {value.type}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {value.phone}
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            <Link to={`/customers/branch/update/${id}/${value.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn mr-1"><i className="fa-solid fa-pen text-primary"></i></Link>
                                                                            <Link to={`/customers/branch/${id}/${value.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn mr-1"><i className="fa-solid fa-eye"></i></Link>
                                                                            <button type="button" className="btn remJS" onClick={(e) => removeBranch(value.id)}><i className="fa fa-trash text-danger" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button>
                                                                        </TableCell>


                                                                    </TableRow>

                                                                </TableBody>

                                                            </>
                                                        ))}

                                                    </StyledTable>
                                                </Box>



                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button  text-dark collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            <strong>Contacts</strong>
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            <div className="my-2 text-end bg-light shadow p-4 rounded">
                                                {/* <h4 className="panel-title mb-4">Execution Cities</h4> */}
                                                <Link to={`/customers/contact/create/${id}`} className='btn btn-dark'>Add Contact</Link>
                                                <hr />

                                                <Box width="100%" overflow="auto">
                                                    <StyledTable>

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell align="left">Name</TableCell>
                                                                <TableCell align="center">Mobile Number</TableCell>
                                                                <TableCell align="center">Branch Name</TableCell>

                                                                <TableCell align="right">Action</TableCell>
                                                            </TableRow>
                                                        </TableHead>

                                                        {contacts && contacts.map(value => (
                                                            <>


                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell align="left">{`${value.firstname} ${value.lastname}`}</TableCell>



                                                                        <TableCell align="center">
                                                                            {value.mobile_number_1}
                                                                        </TableCell>
                                                                        <TableCell align="center">
                                                                            {value.branch}
                                                                        </TableCell>
                                                                        <TableCell align="right">
                                                                            <Link to={`/customers/contact/update/${id}/${value.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn mr-1"><i className="fa-solid fa-pen text-primary"></i></Link>
                                                                            <Link to={`/customers/contact/${id}/${value.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn mr-1"><i className="fa-solid fa-eye"></i></Link>
                                                                            <button type="button" className="btn remJS" onClick={(e) => removeContact(value.id)}><i className="fa fa-trash text-danger" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button>
                                                                        </TableCell>


                                                                    </TableRow>

                                                                </TableBody>

                                                            </>
                                                        ))}

                                                    </StyledTable>
                                                </Box>



                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </div>
                        </div>


                    </>
                )
            })}




        </>

    )
}
