import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export const UpdateCustomerInfo = () => {
    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();


    const [data, setdata] = useState({})
    const [industries, setIndustries] = useState([])
    const [turnover, setTurnover] = useState([])
    const [employeeRanges, setEmployeeRanges] = useState([])

    useEffect(() => {
        getdata();
        industrydata();
        TurnoverRanges();
        EmployeeRanges();
    }, [])

    const getdata = async () => {
        try {
            const mydata = await axiosInstance.get(`clients/view/${id}`)
            console.log(mydata.data[0]);
            setdata(mydata.data[0])
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }

    }

    const EmployeeRanges = async () => {
        const { data } = await axiosInstance.get(`masteremployeeranges/view`)
        setEmployeeRanges(data)
        console.log(data);
        console.log("res.data")
    }


    const industrydata = async () => {
        try {
            const mydata = await axiosInstance.get(`masterindustrytypes/view`)
            console.log(mydata);
            setIndustries(mydata.data)
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }

    }


    const TurnoverRanges = async () => {
        const { data } = await axiosInstance.get(`masterturnoverranges/view`)
        setTurnover(data);

    }

    const handle = (e) => {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setdata(newdata)
        console.log(newdata);
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            console.log(data);
            const { result } = await axiosInstance.put(`clients/update/${id}`, data
            )

            swal("Yeah", "Details Updated", "success");
            e.target.reset();
            navigate(-1);

        }
        catch (error) {
            alert(error);
        }
    }

    return (
        <>

            <div className="container mt-2">

                <div className="container text-end">
                    <button onClick={() => navigate(-1)} className="btn btn-info mb-3">Go Back</button>
                </div>

                <div className="col-sm-12 col-xs-12 col-md-12 container pull-left table-bordered-new mb-3 p-3 shadow">
                    <div className="the-box">
                        <form onSubmit={(e) => submit(e)} className="d-flex flex-wrap">

                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Company Name:<span className="req">*</span></label>
                                <input type="text" name="name" className="form-control datepicker" id="name" value={data.name} onChange={(e) => handle(e)} />

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Company Group Name:<span className="req">*</span></label>
                                <input type="text" name="group_name" className="form-control" id="group_name" value={data.group_name} onChange={(e) => handle(e)} />
                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Abbreviation:<span className="req">*</span></label>

                                <input type="text" name="abbreviation" className="form-control" id="abbreviation" value={data.abbreviation} onChange={(e) => handle(e)} />

                            </div>

                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Phone Number 1:<span className="req">*</span></label>

                                <input type="text" name="quotation" value={data.phone_number_1} onChange={(e) => handle(e)} className="form-control" id="phone_number_1" />

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Phone Number 2:</label>

                                <input type="text" name="quotation" value={data.phone_number_2} onChange={(e) => handle(e)} className="form-control" id="phone_number_2" />

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Phone Number 3:</label>

                                <input type="text" name="quotation" value={data.phone_number_3} onChange={(e) => handle(e)} className="form-control" id="phone_number_3" />

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Fax Number 1:</label>

                                <input type="text" name="quotation" value={data.fax_number_1} onChange={(e) => handle(e)} className="form-control" id="fax_number_1" />

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Fax Number 2:</label>

                                <input type="text" name="quotation" value={data.fax_number_2} onChange={(e) => handle(e)} className="form-control" id="fax_number_2" />

                            </div>

                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Email:<span className="req">*</span></label>
                                <input type="text" name="email" className="form-control datepicker" id="email" value={data.email} onChange={(e) => handle(e)} />
                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Industry Type 1:</label>
                                <select name="industry_type_id_1" className="form-select" id="industry_type_id_1" value={data.industry_type_id_1} onChange={(e) => handle(e)}>
                                    <option value="1" selected>Select</option>

                                    {industries && industries.map(val => (

                                        <>
                                            <option value={val.id}>{val.name}</option>

                                        </>
                                    ))}
                                    {/* <option value="external">Outbound</option> */}
                                </select>

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Industry Type 2:</label>
                                <select name="industry_type_id_2" className="form-select" id="industry_type_id_2" value={data.industry_type_id_2} onChange={(e) => handle(e)}>
                                    <option value="1" selected>Select</option>

                                    {industries && industries.map(val => (

                                        <>
                                            <option value={val.id}>{val.name}</option>

                                        </>
                                    ))}
                                </select>

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Industry Type 3:</label>
                                <select name="industry_type_id_3" className="form-select" id="industry_type_id_3" value={data.industry_type_id_3} onChange={(e) => handle(e)}>
                                    <option value="1" selected>Select</option>

                                    {industries && industries.map(val => (

                                        <>
                                            <option value={val.id}>{val.name}</option>

                                        </>
                                    ))}
                                </select>

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Turnover:</label>
                                <select className="form-select" name="turnover_ranges" id="turnover_range_id" value={data.turnover_range_id} onChange={(e) => handle(e)}>
                                    <option value="0" selected>Select</option>
                                    {turnover && turnover.map(value => (
                                        <>
                                            <option value={value.id} selected>{value.name}</option>
                                        </>
                                    ))}

                                </select>

                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Number of Employees:</label>
                                <select className="form-select" name="employee_range_id" id="employee_range_id" value={data.employee_range_id} onChange={(e) => handle(e)}>
                                    <option value="0" selected>Select</option>
                                    {employeeRanges && employeeRanges.map(value => (
                                        <>
                                            <option value={value.id} selected>{value.name}</option>
                                        </>
                                    ))}

                                </select>
                            </div>
                            <div className="form-group col-md-6 px-2 mb-3">
                                <label className="mb-1">Company Type:<span className="req">*</span></label>
                                <select name="company_type" className="form-control form-select" id="company_type" value={data.company_type} onChange={(e) => handle(e)}>
                                    <option value="pvt" selected="selected">Private Limited</option>
                                    <option value="pub">Public Limited</option>
                                    <option value="publist">Public Limited Listed</option>
                                    <option value="partner">Partnership</option>
                                    <option value="prop">Proprietorship</option>
                                    <option value="govt_dept">Government Department</option>
                                    <option value="psu">Public Sector Undertaking</option>
                                    <option value="trust">Trust/NGO</option>
                                </select>
                            </div>


                            <div className="container text-start">
                                <button className="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </>

    )
}
