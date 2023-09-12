import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
import DataTable from 'react-data-table-component';
import Checkbox from '@mui/icons-material/CheckBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';

export const EditProject = () => {
  const params = useParams();
  const projectId = params.projectId;

  const [data, setdata] = useState({})
  const [errMsg, setErrmsg] = useState([])

  useEffect(() => {
      getdata();
  }, [])

  const getdata = async () => {
      try {
      const  mydata  = await axiosInstance.get(`projecteditproject/view/${projectId}`)
      console.log(mydata.data[0]);  
      setdata(mydata.data[0])
      console.log(data);
      // data.start_date =  data.start_date.tspli("T")
      // alert(mydata);
      }
      catch(error){
          console.log(error);
      }
      // setdata(mydata)
      // console.log({mydata});
  }

  const handle = (e) => {
      const newdata = { ...data }
      let pElement = e.target.nextSibling;
      validation(false, e.target.id, "", pElement);
      newdata[e.target.id] = e.target.value
      setdata(newdata)
      console.log(newdata);
  }

  var validationErr = [];
  const validation = (err, element, value, pElement) => {
    if (err) {

        if (element == "dateError") {
            document.getElementById("err").classList.remove("d-none");
            window.location.href = "#top";
        }
        if (element != "dateError") {
            console.log("en")
            document.getElementById(element).classList.add("border-danger");
            pElement.classList.remove("d-none")
        }
        validationErr[element] = value;

        // msg.push(value);

        // errmsg += value;
        // msg = `<ul>${errmsg}</ul>`;
        console.log(validationErr);
        console.log(pElement);
        setErrmsg(validationErr);
        console.log(errMsg);
    }
    else {
        document.getElementById(element).classList.remove("border-danger");
        pElement.classList.add("d-none")
    }

}
    var err = true;
  const submit = async (e) => {
      e.preventDefault();
        if (!data.category) {
            let element = "category";
            let pElement = document.getElementById("category").nextSibling;
            validation(true, element, "Select a category", pElement);
        }
        if (!data.project_classification) {
            let element = "project_classification";
            let pElement = document.getElementById("project_classification").nextSibling;
            validation(true, element, "Select a Project Classification", pElement);
        }
        if (!data.title) {
            let element = "title";
            let pElement = document.getElementById("title").nextSibling;
            validation(true, element, "Add a title", pElement);
        }
        if (!data.start_date) {
            let element = "start_date";
            let pElement = document.getElementById("start_date").nextSibling;
            validation(true, element, "Select a Start Date", pElement);
        }
        if (!data.actual_end_date) {
            let element = "actual_end_date";
            let pElement = document.getElementById("actual_end_date").nextSibling;
            validation(true, element, "Select a End Date", pElement);
        }
        if (!data.expected_revenue) {
            let element = "expected_revenue";
            let pElement = document.getElementById("expected_revenue").nextSibling;
            // let pElement = document.getElementById("expected_revenue").parentNode.nextSibling;

            validation(true, element, "Add an Expected Revenue", pElement);
        }
        // if (data.start_date > data.actual_end_date) {
        //     validation(true, "dateError", "Start Date can't be greater than End Date", "");
        // }
        if (!data.category || !data.project_classification || !data.title || !data.start_date  || !data.actual_end_date || !data.expected_revenue || data.start_date > data.actual_end_date) {
            err = true;
            console.log("there is error");
        }
        else {
            err = false;
        }
      try {
        if (!err) {
            if(data["start_date"] != null){
                data["start_date"]=data.start_date.split("T")[0];
            }
            if(data["actual_end_date"] != null){
                data["actual_end_date"]=data.actual_end_date.split("T")[0];
            }
            if(data["likely_end_date"] != null){
                data["likely_end_date"]=data.likely_end_date.split("T")[0];
            }
            data["expected_revenue"]=data.expected_revenue.replace (/,/g, "");
            console.log(data);
            const {result} = await axiosInstance.put(`projectinfo/update/${projectId}`, data)
            swal("Yeah", "Details Updated", "success");
            e.target.reset();
        }
      }
      catch(error){
          alert(error);
      }
  }

  return (
      <>
      <ProjectHeader/>

          <div className="container mt-2">
            <h4 className='ps-0 pe-0'>Edit Project</h4>
            <hr />

              <div className="col-sm-12 col-xs-12 col-md-12 container pull-left table-bordered-new mb-3 p-3 shadow">
                  <div className="the-box">
                      <form onSubmit={(e) => submit(e)} className="d-flex flex-wrap">

                          {/* "project_classification": "project_classification",
                              "project_title": "project_title",
                              "project_description": "project_description",
                              "quotation": "quotation",
                              "start_date": "start_date",
                              "end_date": "end_date",
                              "status": "0" */}

                          <div className="form-group col-md-6 px-2 mb-3">
                              <label>Lead Type:<span className="req">*</span></label>
                              <select name="category" className="form-select" id="category"  value={data.category} onChange={(e) => handle(e)}>
                                  <option value="internal">Inbound</option>
                                  <option value="external">Outbound</option>
                              </select>
                              <small className='badge bg-danger d-none'>{errMsg.category}</small>
                          </div>
                          <div className="form-group col-md-6 px-2 mb-3">
                              <label>Project Classification:<span className="req">*</span></label>
                              <select name="project_classification" id='project_classification' className="form-select" value={data.project_classification} onChange={(e) => handle(e)}>
                                  <option value="1">Tele-calling (Includes Calling and Lead Generation)</option>
                                  <option value="2">Integrated Events (This Include calling + set-up + venue)</option>
                                  <option value="3">Logistics  (Includes AV setup  or procurement of gifts)</option>
                                  <option value="4">Exhibitions &amp; Stalls</option>
                                  <option value="5">Design Services (Includes Digital)</option>
                                  <option value="6">TPP (Third Party Payouts) (Includes Digital)</option>
                              </select>
                              <small className='badge bg-danger d-none'>{errMsg.project_classification}</small>
                          </div>
                          <div className="form-group col-md-6 px-2 mb-3">
                              <label>Project Title:<span className="req">*</span></label>

                              <input type="text" name="title" className="form-control" id="title" value={data.title} onChange={(e) => handle(e)} />
                              <small className='badge bg-danger d-none'>{errMsg.title}</small>

                          </div>

                          <div className="form-group col-md-6 px-2 mb-3">
                              <label>Quotation Reference:</label>

                              <input type="text" name="quotation"  value={data.quotation} onChange={(e) => handle(e)} className="form-control" id="quotation" />
                              {/* <small className='badge bg-danger d-none'>{errMsg.quotation}</small> */}
                          </div>

                          <div className="form-group col-md-6 px-2 mb-3">
                              <label>Project Start date:<span className="req">*</span></label>
                              <input type="text" name="start_date" className="form-control datepicker" id="start_date" value={(data.start_date) ? data.start_date.split("T")[0] : data.start_date} onChange={(e) => handle(e)}  />
                              <small className='badge bg-danger d-none'>{errMsg.start_date}</small>
                          </div>

                          <div className="form-group col-md-6 px-2 mb-3">
                              <label>Project End date:<span className="req">*</span></label>
                              <input type="text" name="actual_end_date" className="form-control datepicker" id="actual_end_date" value={(data.actual_end_date) ? data.actual_end_date.split("T")[0] : data.actual_end_date} onChange={(e) => handle(e)} />
                              <small className='badge bg-danger d-none'>{errMsg.actual_end_date}</small>
                          </div>
                          {/* <div className="form-group col-md-6 px-2 mb-3">
                              <label>Expected Revenue:<span className="req">*</span></label>

                              <input type="text" name="expected_revenue" className="form-control" id="expected_revenue" value={data.start_date} onChange={(e) => handle(e)} />

                          </div> */}
                          <div className="form-group col-md-6 px-2 mb-3">

                              <label>Expected Revenue:<span className="req">*</span></label>
                              <input name="expected_revenue" className="form-control" id='expected_revenue' value={data.expected_revenue} onChange={(e) => handle(e)} type="text" />
                              <small className='badge bg-danger d-none'>{errMsg.expected_revenue}</small>
                          </div>
                          <div className="form-group col-md-12 px-2 mb-3">
                              <label>Project Description:<span className="req"></span></label>
                              <textarea name="description" cols="40" rows="5" className="form-control" id="description" placeholder="Please write a detailed project description here (minimum 100 characters except for TPP classified projects)" value={data.description} onChange={(e) => handle(e)}>
                              </textarea>
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
