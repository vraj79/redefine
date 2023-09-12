import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
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

export const ContactView = () => {

    // Get id from the url and then fetch data from api
    const params = useParams();
    const id = params.id;
    const cid = params.cid;
    // id we got is id
    console.log(id);
    const [VendorData, setVendorData] = useState([]);

    // Get data
    useEffect(() => {
        getdata();

    }, [])

    // Fetch data from API


    const getdata = async () => {
        const { data } = await axiosInstance.get(`clients/contact/view/${cid}/${id}`)
        setVendorData(data)
        console.log(data);
        console.log("res.data")
    }




    return (
        <>



            <div className="row px-3 my-3">
                <div className="container text-end">
                    <button onClick={() => Navigate(-1)} className="btn btn-info mb-3">Go Back</button>
                </div>
                <div className="accordion-item">

                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className='container px-2'>
                                <div className="my-2 bg-light shadow p-4 rounded text-start">
                                    <h2 className="" id="headingOne">

                                        <strong>Contact Details</strong>
                                    </h2>
                                    <hr />


                                    <Box width="100%" overflow="auto">
                                        <StyledTable>

                                            {VendorData && VendorData.map(v => (
                                                <>

                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell align="left">Salutation</TableCell>

                                                            <TableCell align="left">
                                                                {v.salutation}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Name</TableCell>

                                                            <TableCell align="left">
                                                                {`${v.firstname} ${v.lastname}`}
                                                            </TableCell>
                                                        </TableRow>


                                                        <TableRow>
                                                            <TableCell align="left">Designation Level</TableCell>

                                                            <TableCell align="left">
                                                                {v.designation_level}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Designation</TableCell>
                                                            <TableCell align="left">
                                                                {v.designation}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Landline Number</TableCell>

                                                            <TableCell align="left">
                                                                {v.landline_number}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Mobile Number 1</TableCell>

                                                            <TableCell align="left">
                                                                {v.mobile_number_1}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Mobile Number 2</TableCell>

                                                            <TableCell align="left">
                                                                {v.mobile_number_2}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Official Email</TableCell>

                                                            <TableCell align="left">
                                                                {v.official_email}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Personal Email</TableCell>

                                                            <TableCell align="left">
                                                                {v.personal_email}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Gender</TableCell>

                                                            <TableCell align="left">
                                                                {v.gender == "m" ? "Male" : "Female"}
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left">Branch</TableCell>

                                                            <TableCell align="left">
                                                                {v.branch}
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
}
