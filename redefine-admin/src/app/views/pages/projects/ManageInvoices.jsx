import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';


export const ManageInvoices = () => {
  const sortIcon = <ArrowDownward />;
  const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
  const [myData, setMyData] = useState([])
  const ExpandedComponent = ( {data} ) => <pre>{JSON.stringify(data, null, 2)}</pre>;

  const params = useParams();
  const projectId = params.projectId;
  const user = localStorage.getItem("user");

  const billingStatuses = ['Billed', 'Not Billed','Partly Billed'];

  const [data, setdata] = useState({})

  useEffect(() => {
      getdata();
  }, [])


  // Get data from backend
  const getdata = async () => {
      try {
          const { data }  = await axiosInstance.get(`projectinvoice/view/${projectId}`)
          console.log(data);
          setMyData(data)
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


// Handle the input values
  const handle = (e) => {
      const newdata = { ...data }
      newdata["user"] = user;
      newdata["project_id"] = projectId;
      newdata[e.target.id] = e.target.value
      setdata(newdata)
      console.log(newdata);
  }

  const removeRow = (e) => {
    // console.log(e);
    let row_id = e;
    try {

        const deleteData = axiosInstance.delete(`projectinvoice/delete/${row_id}`)
        console.log("deleted")
        getdata();
    }
    catch (error) {
        alert(error);
    }
}


// Submit the form and send data to api
  const submit = async (e) => {
      e.preventDefault();
      try {
          console.log(data);
      const {result} = await axiosInstance.post(`projectinvoice/`, data
      )
      swal("Yeah", "Invoice updated", "success");
      document.querySelector("form").reset();
      getdata();
      }
      catch(error){
          alert(error);
      }
  }


  const columns = [
      {
          name: 'Invoice No.',
          selector: (row) => row.invoice_id,
          sortable: true,
      },        
      {
          name: 'Amount',
          selector: (row) => row.billed_amount,
          sortable: true,
      },
      {
          name: 'Date',
          selector: (row) => row.date.split("T")[0],
          sortable: true,
      },
      {
          name: 'Uploaded By',
          selector: (row) => row.name,
          sortable: true,
      }
      ,
      {
          name: 'Delete',
          cell: (row) => <button type="button" className="btn btn-danger btn-sm remJS" onClick={(e) => removeRow(row.id)}><i className="fa fa-trash" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button>
      },
  ];
  return (
    
    <>

    <ProjectHeader />

    <div className="row container">

    <h4 className='ps-0 pe-0'>Manage Invoices</h4>
    <hr />

        <div className="col-sm-12 col-xs-12 col-md-4 pull-left table-bordered-new mb-3 p-3 shadow">
            <form acceptCharset="utf-8" className="mainForm" onSubmit={(e) => submit(e)}>
                <div className="panel panel-body">
                    {/* <div className="head">
                        <h5 className="iList">
                            Upload Invoice
                        </h5>
                        <hr className='mb-3 border-bottom' />
                    </div> */}
                    <div className="form-group mb-3">

                        <label>Invoice Number:</label>
                        <input type="text" name="number" className="form-control" id="invoice_id" value={data.invoice_id} onChange={(e) => handle(e)} />
                    </div>
                    <div className="form-group mb-3">
                        <label>Amount:</label>
                        <input type="text" name="number" className="form-control" id="billed_amount" value={data.billed_amount} onChange={(e) => handle(e)} />

                    </div>
                    <div className="form-group mb-3">
                        <label>Billing Date:</label>
                        <input type="date" name="value" className="form-control" id="date" value={data.date} onChange={(e) => handle(e)} />

                    </div>
                    <div className="form-group mb-3">
                        <label>Billing Status:</label>
                        <select name="purchase_order" className="form-control" id="status" value={data.status} onChange={(e) => handle(e)}>
                            <option value="0">Billed</option>
                            <option value="1">Not Billed</option>
                            <option value="2">Partly Billed</option>
                            {/* <option value="0">-</option> */}
                        </select>

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


        <DataTable title="Invoices" columns={columns} data={myData} expandableRowsComponent={ExpandedComponent} fixedHeader  selectableRowsHighlight highlightOnHover />

        


    </div>
        </div>


    </div>


</>

  )
}
