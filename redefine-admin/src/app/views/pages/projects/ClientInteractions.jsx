import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';



export const ClientInteractions = () => {
    const params = useParams();
    const projectId = params.projectId;

    const user = localStorage.getItem("user");
    console.log(user);

    const [sendData, setSendData] = useState({})

    
    useEffect(() => {
        getdata();
    }, [])

    const getdata = async () => {
        const { data } = await axiosInstance.get(`projectclientinteractions/view/${projectId}`)
        setProjects(data)
        console.log(data);
        console.log("res.data")
    }

    const sortIcon = <ArrowDownward />;
    const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
    const [projects, setProjects] = useState([]);
    const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;



    // Handle data change and save in an array
    const handle = (e) => {
        const newdata = { ...sendData }
        newdata[e.target.id] = e.target.value;
        newdata['user'] = user;
        newdata['project_id'] = projectId;
        setSendData(newdata);
        console.log(newdata);
    }


    const removeRow = (e) => {
        // console.log(e);
        let row_id = e;
        try {

            const deleteData = axiosInstance.delete(`projectclientinteractions/delete/${row_id}`)
            console.log("deleted")
            getdata();
        }
        catch (error) {
            alert(error);
        }
    }

    const Submit = (e) => {
        e.preventDefault();


        try {

            const updateData = axiosInstance.post(`projectclientinteractions/`, sendData)


            swal("Yeah", "Data Saved Successfully", "success");
            e.target.reset();
            getdata();

        }
        catch (error) {
            alert(error);
        }

    }




    const columns = [


        {
            name: 'Date',
            selector: row => row.date.split("T")[0],
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'User',
            selector: row => row.date,
        },
        {
            name: 'Interaction',
            selector: row => row.interaction,
            sortable: true,
        },
        {
            name: 'Notes',
            selector: row => row.notes,
        },
        {
            name: 'Delete',
            cell: (row) => <button type="button" className="btn btn-danger btn-sm remJS" onClick={(e) => removeRow(row.id)}><i className="fa fa-trash" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button>
        }

    ];


    return (
        <>

            <ProjectHeader />



            <div className="row px-2">
                <h4 className='ps-2 pe-2'>Client Interactions</h4>
                <hr />

                <div className="col-sm-12 col-xs-12 col-md-4 pull-left table-bordered-new mb-3 p-3 shadow">
                    <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => Submit(e)}>
                        <div className="panel panel-body">
                            {/* <div className="head">
                              <h5 className="iList">
                                  Upload Invoice
                              </h5>
                              <hr className='mb-3 border-bottom' />
                          </div> */}
                            <div className="form-group mb-3">
                                <label>Type:</label>
                                <select name="type" className="form-select" id="type" value={sendData.type} onChange={(e) => handle(e)}>
                                    <option value="physical">Physical</option>
                                    <option value="telecall" selected="selected">Tele Call</option>
                                    <option value="videocall">Video Call</option>
                                    {/* <option value="0">-</option> */}
                                </select>

                            </div>
                            <div className="form-group mb-3">

                                <label>date:</label>
                                <input type="date" name="date" className="form-control" id="date" value={sendData.date} onChange={(e) => handle(e)} />
                            </div>
                            <div className="form-group mb-3">
                                <label>Interaction:</label>
                                <input type="text" name="interaction" className="form-control" id="interaction" value={sendData.interaction} onChange={(e) => handle(e)} />

                            </div>
                            <div className="form-group mb-3">
                                <label>Notes:</label>
                                <input type="text" name="notes" className="form-control" id="notes" value={sendData.notes} onChange={(e) => handle(e)} />

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


                        <DataTable title="Projects" pagination columns={columns} data={projects} selectableRows expandableRowsComponent={ExpandedComponent} fixedHeader  selectableRowsHighlight highlightOnHover />




                    </div>
                </div>


            </div>


        </>

    )
}

