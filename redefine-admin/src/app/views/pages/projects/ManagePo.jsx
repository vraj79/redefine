import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';



export const ManagePo = () => {
    const params = useParams();
    const projectId = params.projectId;

    const user = localStorage.getItem("user");
    console.log(user);


    const sortIcon = <ArrowDownward />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [data, setData] = useState([])
    const ExpandedComponent = (data) => <pre>{JSON.stringify(data, null, 2)}</pre>;


    const [sendData, setSendData] = useState({})
    const [purchaseOrder, setPurchaseOrder] = useState()


    useEffect(() => {
        getdata();
    }, [])


    // Get data from backend
    const getdata = async () => {
        try {
            const { data } = await axiosInstance.get(`projectmanagepo/view/${projectId}`)
            console.log("my manage po data");
            console.log(data);
            setData(data)
            console.log(data);
            // data.start_date =  data.start_date.split("T")
            // alert(mydata);
        }
        catch (error) {
            console.log(error);
        }
        // setdata(mydata)
        // console.log({mydata});
    }


    // Handle data change and save in an array
    const handle = (e) => {
        const newdata = { ...sendData }
        newdata[e.target.id] = e.target.value;
        newdata['user'] = user;
        newdata['project_id'] = projectId;
        setSendData(newdata);
        console.log(newdata);
    }



    const [file, setFile] = useState();

    const removeRow = (e) => {
        console.log(e);
        let row_id = e;
        try {
            const deleteData = axiosInstance.delete(`projectmanagepo/delete/${row_id}`)
            console.log("deleted")
            getdata();
        }
        catch (error) {
            alert(error);
        }
    }

    const handleDataSubmit = (e) => {
        e.preventDefault();
        // gather all the data and add to the array i.e. Data
        const data = new FormData();
        data.append("file", file)
        data.append("file_type", "po")
        data.append("flag", "1")
        data.append("project_id", projectId)

        try {
            const { addfile } = axiosInstance.post(`projectaddfile/`, data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            ).then(resp => {
                console.log(resp.data);
                if (resp.data) {
                    console.log(resp.data);
                    sendData['projectFileId'] = resp.data;
                    console.log(sendData);
                    const updateData = axiosInstance.post(`projectmanagepo/`, sendData)


                    swal("Yeah", "File is uploaded Successfully", "success");

                    e.target.reset();
                    getdata();

                }
                else{
                    swal("Oops", "Please add the details", "error");
                }


            })
        }



        catch (error) {
            alert(error);
        }

    }


    var i = 0;
    const columns = [
        {
            name: 'PO Number',
            selector: (row) => row.number,
            sortable: true,
        },
        {
            name: 'Value',
            selector: (row) => row.value,
            sortable: true,
        },
        {
            name: 'Date',
            selector: (row) => row.date,
            sortable: true,
        },
        {
            name: 'Uploaded By',
            selector: (row) => row.name,
        },
        {
            name: 'Delete',
            cell: (row) => <button type="button" className="btn btn-danger btn-sm remJS" onClick={(e) => removeRow(row.id)}><i className="fa fa-trash" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button>
        },
        i = i + 1
    ];


    return (
        <>

            <ProjectHeader />



            <div className="row container">
                <h4 className='ps-0 pe-0'>Manage PO</h4>
                <hr />

                <div className="col-sm-12 col-xs-12 col-md-4 pull-left table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => handleDataSubmit(e)}>

                        <div className="panel panel-body">
                            <div className="head">
                                <h5 className="iList">
                                    Upload PO
                                </h5>
                                <hr className='mb-3 border-bottom' />
                            </div>

                            <div className="form-group mb-3">

                                <label>PO Status:*</label>
                                <select name="purchase_order" className="form-control" id='purchase_order' value={sendData.purchase_order} onChange={(e) => handle(e)}>
                                    <option value="awaited">Awaited</option>
                                    <option value="nopo">No PO</option>
                                    <option value="0" selected>-</option>
                                    <option value="received">Received</option>

                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label>PO Number:*</label>
                                <input type="text" name="number" className="form-control" id="number" value={sendData.number} onChange={(e) => handle(e)} />

                            </div>
                            <div className="form-group mb-3">
                                <label>PO Value:*</label>
                                <input type="text" name="value" className="form-control" id="value" value={sendData.value} onChange={(e) => handle(e)} />

                            </div>
                            <div className="form-group mb-3">
                                <label>PO Date:*</label>
                                <input type="date" name="date" className="form-control datepicker" id="date" value={sendData.date} onChange={(e) => handle(e)} />

                            </div>
                            <div className="form-group mb-3">
                                <label>File:*</label>
                                <div className="input-group">
                                    <div className="my-3">

                                        <input className="form-control" type="file" id="formFile" onChange={e => setFile(e.target.files[0])} />
                                    </div>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-success" value="Submit" name="submit" />
                        </div>
                        <div className="fix"></div>
                    </form>
                </div>

                <div className="col-md-8">

                    <div className='container'>
                        <div className="row">
                            <div className="col-md-12 px-0">

                            </div>
                        </div>

                        <DataTable title="Manage PO Info" columns={columns} data={data} expandableRowsComponent={ExpandedComponent} fixedHeader  selectableRowsHighlight highlightOnHover />


                    </div>
                </div>


            </div>


        </>

    )
}

