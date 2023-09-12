import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



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

    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0);
                // pdf.output('dataurlnewwindow');
                pdf.save("download.pdf");
            })
    }


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
    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]


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
            <div className="row container-fluid">

                <button className="btn btn-primary" onClick={()=>printDocument()}>Download</button>

                <div className="col-sm-12 col-xs-12 col-md-12 mx-auto table-bordered-new mb-3 p-3" id='divToPrint'>


                    <div className='row'>
                        <div className="col-md-5">
                            <img src="/assets/images/redefine-logo.png" alt="example" className="img-fluid w-50" />
                        </div>
                        <div className="col-md-6">
                            <h5>REDEFINE MARCOM PVT. LTD</h5>
                            <p style={{ fontSize: "13px" }}>4, DDA Commercial Complex, Plot No - 22, MOR Land<br />New Rajinder Nagar, New Delhi - 110060<br /><b>Tel:</b> +91 11 4078 7674, <b>Email:</b> info@redefine.in<br /><b>CIN:</b> U74999DL2009PTC190842</p>
                        </div>

                    </div>

                    <center>

                        <div className="row" style={{ marginTop: "60px" }}>
                            <div className="col-md-8">


                                <div className="text-start">
                                    <h1>Estimate</h1>

                                    <table>
                                        <tr>
                                            <td><b>Estimate No:</b></td>
                                            <td className='px-3'></td>
                                            <td className='ps-5'>Ruchi</td>
                                        </tr>
                                        <tr>
                                            <td><b>Client:</b></td>
                                            <td className='px-3'></td>
                                            <td className='ps-5'>Ruchi</td>
                                        </tr>
                                        <tr>
                                            <td><b>Enquiry through:</b></td>
                                            <td className='px-3'></td>
                                            <td className='ps-5'>Ruchi</td>
                                        </tr>
                                        <tr>
                                            <td><b>Project No:</b></td>
                                            <td className='px-3'></td>
                                            <td className='ps-5'>Ruchi</td>
                                        </tr>
                                        <tr>
                                            <td><b>Project Manager:</b></td>
                                            <td className='px-3'></td>
                                            <td className='ps-5'>Ruchi</td>
                                        </tr>
                                        <tr>
                                            <td><b>Project:</b></td>
                                            <td className='px-3'></td>
                                            <td className='ps-5'>Ruchi</td>
                                        </tr>
                                    </table>

                                </div>
                            </div>
                            <div className="col-md-4">
                                {day + ' ' + monthArray[month - 1] + ' ' + year}
                            </div>
                        </div>

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
