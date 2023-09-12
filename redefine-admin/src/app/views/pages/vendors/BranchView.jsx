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

export const BranchView = () => {

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
        const { data } = await axiosInstance.get(`vendors/branch/view/${cid}/${id}`)
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

                                        <strong>Branch Details</strong>
                                    </h2>
                                    <hr />


                                    <Box width="100%" overflow="auto">
                                        <StyledTable>

{VendorData && VendorData.map(v => (
    <>
  
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell align="left">Type</TableCell>

                                                    <TableCell align="left">
                                                    {v.type}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Name</TableCell>

                                                    <TableCell align="left">
                                                        {v.name}
                                                    </TableCell>
                                                </TableRow>

                                               
                                                <TableRow>
                                                    <TableCell align="left">Address Line 1</TableCell>

                                                    <TableCell align="left">
                                                        {v.address_line_1}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Address Line 2</TableCell>
                                                    <TableCell align="left">
                                                        {v.address_line_2}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Address Line 3</TableCell>

                                                    <TableCell align="left">
                                                        {v.address_line_3}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">City</TableCell>

                                                    <TableCell align="left">
                                                        {v.city}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">State</TableCell>

                                                    <TableCell align="left">
                                                        {v.state}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Country</TableCell>

                                                    <TableCell align="left">
                                                        {v.country}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Zipcode</TableCell>

                                                    <TableCell align="left">
                                                        {v.zipcode}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left">Phone</TableCell>

                                                    <TableCell align="left">
                                                        {v.phone}
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
