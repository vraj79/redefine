import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"


export const Estimatepdf = () => {

    const params = useParams();
    const projectId = params.projectId;
    const user = localStorage.getItem("user");

    const [departments, setDepartments] = useState([]);
    const [errMsg, setErrmsg] = useState([])
    const [ddata, setddata] = useState([])





    const [data, setdata] = useState({})
    const [myData, setMyData] = useState([])

    useEffect(() => {
    }, [])



    const getdepartmentList = async () => {
        const { data } = await axiosInstance.get(`projectdepartments/view`)
        setDepartments(data);
        console.log(data);
        console.log(departments)
    }


    // Handle the input values
    const handleDepartment = (e) => {
        const newdata = { ...ddata }
        newdata[e.target.id] = e.target.value;

        setddata(newdata)
        console.log(newdata);
    }



    // Submit the form and send data to api
    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(data);
            const { result } = await axiosInstance.put(`projectdepartments/update/${projectId}`, ddata
            )
            swal("Yeah", "Department updated", "success");
            document.querySelector("form").reset();
        }
        catch (error) {
            alert(error);
        }
    }


    return (

        <>
            <div className="row container">

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3 shadow">

                    <center>

                        <h1 style={{marginTop:"100px"}}>Estimate</h1>
                        <b style={{fontSize:"10px"}}>Estimate No: Ruchi<br />Client : Ruchi</b><br />
                        <b style={{fontSize:"10px"}}>Project No:</b> Ruchi<br /><br />
                        <b style={{fontSize:"10px"}}>Project Manager:</b> Ruchi<br /><br /><br />
                        <b style={{fontSize:"10px"}}>Project:Ruchi</b>

                        <br />
                        <br />
                        <table className="example-table" width="100%; margin-top:100px;">
                            <tr>

                                <td width="200" align="center"><strong>Description</strong></td>
                                <td width="40" align="center"><strong>Nos.</strong></td>
                                <td width="30" align="center"><strong>L</strong></td>
                                <td width="30" align="center"><strong>W</strong></td>
                                <td width="30" align="center"><strong>H</strong></td>
                                <td width="50" align="center"><strong>No Of Days</strong></td>
                                <td width="80" align="center"><strong>Unit Cost INR</strong></td>
                                <td width="70" align="center"><strong>Amount INR</strong></td>
                            </tr>

                            <tr>

                                <td>Ruchi</td>
                                <td>Ruchi</td>
                                <td>Ruchi</td>
                                <td>Ruchi</td>
                                <td>Ruchi</td>
                                <td>Ruchi</td>
                                <td>Ruchi</td>
                                <td>Ruchi</td>

                            </tr>

                            <tr>

                                <td align="right"><strong>Subtotal</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td align="right">Ruchi</td>
                            </tr>
                            <tr>

                                <td><strong>Agency Fees</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td align="right">
                                    Ruchi
                                </td>
                            </tr>

                            <tr>

                                <td align="right"><strong>Total</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td> </td>
                                <td align="right">Ruchi</td>
                            </tr>

                            <tr>

                                <td><strong>Tax</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td> </td>
                                <td></td>
                            </tr>


                            <tr>

                                <td>CGST @ Ruchi%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td align="right">Ruchi</td>
                            </tr>
                            <tr>

                                <td>SGST @ Ruchi%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td align="right">Ruchi</td>
                            </tr>

                            <tr>

                                <td>IGST @ Ruchi%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td align="right">Ruchi</td>
                            </tr>


                            <tr>

                                <td align="right"><strong>Grand Total</strong></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td> </td>
                                <td align="right">Ruchi</td>
                            </tr>

                        </table>

                        <br />
                        <br />
                        <table className="" width="100%">
                            <tr>
                                <td colspan="2"><strong>For Redefine Marcom Pvt Ltd</strong></td>
                            </tr>

                            <tr>
                                <td colspan="2"><strong>Ruchi</strong></td>
                            </tr>
                            <tr>
                                <td colspan="2"><strong>Terms & Conditions:</strong>
                                    Ruchi

                                </td>
                            </tr>


                        </table>
                    </center>


                </div>

            </div>


        </>

    )
}
