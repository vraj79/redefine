import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';


export const ManagePayments = () => {

    
  const params = useParams();
  const projectId = params.projectId;
  const user = localStorage.getItem("user");

  const [myData, setMyData] = useState([])
  const [data, setdata] = useState({})

  const sortIcon = <ArrowDownward />;
  const selectProps = { indeterminate: isIndeterminate => isIndeterminate };
  const [projects, setProjects] = useState([]);
  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

  useEffect(() => {
      getdata();
  }, [])

  const getdata = async () => {
      const { data } = await axiosInstance.get(`projectpayments/view/${projectId}`)
      setMyData(data)
      console.log(data);
      console.log("res.data")

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

      const deleteData = axiosInstance.delete(`projectpayments/delete/${row_id}`)
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
    const {result} = await axiosInstance.post(`projectpayments/`, data
    )
    getdata();
    swal("Yeah", "Payment Submitted", "success");
    document.querySelector("form").reset();
    // getdata();
    }
    catch(error){
        alert(error);
    }
}

  const columns = [
     
      {
          name: 'Amount',
          selector: row => row.payment_amount,
          sortable: true,
      },
      {
          name: 'Date',
          selector: row => row.date,
          sortable: true,
      },
      {
          name: 'Uploaded By',
          selector: row => row.name,
          sortable: true,
      },
      {
          name: 'Comments',
          selector: row => row.comments,
      },
   
      {
          name: 'Delete',
          cell: (row) => <button type="button" className="btn btn-danger btn-sm remJS" onClick={(e) => removeRow(row.id)}><i className="fa fa-trash" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button>
      }
     
  ];


  return (
      <>

          <ProjectHeader />



          <div className="row container">
          <h4 className='ps-0 pe-0'>Manage Payments</h4>
                <hr />

              <div className="col-sm-12 col-xs-12 col-md-4 pull-left table-bordered-new mb-3 p-3 shadow">
                  <form onSubmit={(e) => submit(e)}>
                      <div className='d-none'>
                          <input type="hidden" name="project_id" value="3414" />
                          <input type="hidden" name="redirect_url" value="" />
                      </div>
                      <div className="panel panel-body">
                          {/* <div className="head">
                              <h5 className="iList">
                                  Upload Invoice
                              </h5>
                              <hr className='mb-3 border-bottom' />
                          </div> */}
                          <div className="form-group mb-3">

                              <label>Amount:</label>
                              <input type="text" name="number" className="form-control" id="amount" value={data.amount} onChange={(e) => handle(e)} />
                          </div>
                          <div className="form-group mb-3">
                              <label>Payment Date:</label>
                              <input type="date" name="number" className="form-control" id="date" value={data.date} onChange={(e) => handle(e)}  />

                          </div>
                          <div className="form-group mb-3">
                              <label>Comments:</label>
                              <input type="text" name="value" className="form-control" id="comments" value={data.comments} onChange={(e) => handle(e)}  />

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


              <DataTable title="Projects" pagination  columns={columns} data={myData} expandableRowsComponent={ExpandedComponent} fixedHeader fixedHeaderScrollHeight='250px' selectableRowsHighlight highlightOnHover />

              


          </div>
              </div>


          </div>


      </>

  )
}
