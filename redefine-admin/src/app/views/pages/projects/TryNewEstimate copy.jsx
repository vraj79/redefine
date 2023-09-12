import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { ProjectHeader } from './ProjectHeader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import swal from 'sweetalert'
import { axiosInstance } from "../../../config"
// import DataTable from 'react-data-table-component';
// import Checkbox from '@mui/icons-material/CheckBox';
// import ArrowDownward from '@mui/icons-material/ArrowDownward';



// ========  Per item -> 1, Per hour -> 2, per LBH -> 3  =========



export const TryNewEstimate = () => {

  const params = useParams();
  const projectId = params.projectId;
  const [estimateInfo, setEstimateInfo] = useState([])
  const [estimateCopyId, setEstimateCopyId] = useState([])
  const [managerInfo, setManagerInfo] = useState([])
  const [managerInfo2, setManagerInfo2] = useState([])
  const [servicesInfo, setServicesInfo] = useState([])
  const [servicesInfo2, setServicesInfo2] = useState([])
  const [servicesList, setServicesList] = useState([])
  const [tobedeleted, setTobedeleted] = useState([])
  const [estimateList, setEstimateList] = useState([])
  const [estimateDetails, setEstimateDetails] = useState([])
  const [query, setQuery] = useState("")
  const [errMsg, setErrmsg] = useState([])


  const [data, setData] = useState([])
  console.log(estimateInfo);
  console.log(managerInfo2);
  // console.log("servicesInfo2", servicesInfo2);
  console.log("servicesInfo", servicesInfo);

  useEffect(() => {
    getdata();
    getServices();
    getEstimateList();
    getDetails();
  }, [])

  const getdata = async () => {
    const { data } = await axiosInstance.get(`projectestimate/getdata/${projectId}`)
    setEstimateInfo(data[0].estimate_info)
    setServicesInfo2(data[2].services)
    setManagerInfo2(data[1].users)
    console.log(data);
    console.log("res.data")
  }



  // Get details from different tables in it doesn't exists in estimate table
  const getDetails = async () => {
    const { data } = await axiosInstance.get(`projectestimate/details/${projectId}`)
    setEstimateDetails(data)
    console.log(data);
    console.log("res.data")
  }


  const getEstimateList = async () => {
    const { data } = await axiosInstance.get(`projectestimate/list`)
    setEstimateList(data)
    console.log(data);
    console.log("res.data")
  }

  const getServices = async () => {
    const { data } = await axiosInstance.get(`services/view`)
    setServicesList(data)
    console.log(data);
    console.log("res.data")
  }

  let subtotal = 0;

  {
    servicesInfo && servicesInfo.map((service, index) => {

      subtotal += Number(service.no_of_day) * Number(service.nos) * Number(service.service_rate);

      return subtotal;
    }

    )
  }

  const addMoreRow = () => {
    console.log("servicesInfo", servicesInfo)
    servicesInfo != undefined ? setServicesInfo([...servicesInfo, { service_id: 0, s_id: 0, rate_type: 0, height: '', length: '', no_of_day: '', nos: '', s_id: '', service_description: "", service_id: 0, service_rate: '', width: '' }]) : setServicesInfo([{ service_id: 0, s_id: 0, rate_type: 0, height: '', length: '', no_of_day: '', nos: '', s_id: '', service_description: "", service_id: 0, service_rate: '', width: '' }]);
    console.log(servicesInfo);
    // window.location.href = '#estimate';
    let element = document.getElementById("estimate");
    element.scrollIntoView({ behavior: "smooth" });

    //  document.querySelector("#addServices tbody").innerHTML += rowHtml;

  }

  var rateType = ["Null", "Per item", "Per hour", "Per LBH"];

  const removeRow = (e, sId) => {
    console.log(sId);

    let allrows = document.querySelectorAll('#addServices tbody tr');
    if (allrows.length > 1) {
      // document.getElementById(e).remove();
      const newdata = [...servicesInfo]
      const deleteddata = [...tobedeleted]
      console.log(document.getElementById(e).getAttribute('name'));
      const objWithIdIndex = newdata.findIndex((data) => data.s_id == sId);
      newdata.splice(objWithIdIndex, 1);
      deleteddata.push(sId);
      // newdata[e.target.name][e.target.id] = e.target.value;
      console.log(deleteddata);
      setTobedeleted(deleteddata);

      setServicesInfo(newdata)

    }

  }
  let currentDate = new Date()
  let day = currentDate.getDate()
  let month = currentDate.getMonth() + 1
  let year = currentDate.getFullYear()
  let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
  // let today = day + "/" + month + "/" + year;

  const handle = (e) => {
    const newdata = [...servicesInfo]
    console.log(newdata);
    // const objWithIdIndex = newdata.findIndex((data, index) => index == e.target.indexVal);
    // const objWithIdIndex = newdata.findIndex((data, index) => index == e.target.indexVal);
    // console.log(objWithIdIndex);
    // console.log(newdata[objWithIdIndex]);
    // console.log(newdata[objWithIdIndex][e.target.id]);
    // newdata[objWithIdIndex][e.target.id] = e.target.value;
    console.log(e.target.getAttribute("indexVal"))
    console.log(newdata[e.target.getAttribute("indexVal")][e.target.id]);

    newdata[e.target.getAttribute("indexVal")][e.target.id] = e.target.value;
    setServicesInfo(newdata);
    console.log(newdata);
  }




  const handleCost = (e) => {

    if (estimateInfo.length > 0) {
      const newdata = [...estimateInfo]
      console.log("something")
      console.log(e.target.name)
      // const objWithIdIndex = newdata.findIndex((data, index) => data.s_id == e.target.name);
      newdata[0][e.target.id] = e.target.value;

      let total = subtotal + Number(estimateInfo[0]?.agency_fees) - Number(estimateInfo[0]?.discount);
      // total is estimated price as well.
      let grand_total = subtotal + Number(estimateInfo[0]?.agency_fees) - Number(estimateInfo[0]?.discount);
      let tax_amount = (subtotal + Number(estimateInfo[0]?.agency_fees) - Number(estimateInfo[0]?.discount)) * estimateInfo[0]?.tax_percent / 100;
      newdata[0]["total"] = total;
      newdata[0]["price"] = total;
      newdata[0]["grand_total"] = grand_total;
      newdata[0]["tax_amount"] = tax_amount;
      setEstimateInfo(newdata)
      console.log(newdata);
    }
    else {
      const newdata = [...estimateDetails]
      console.log("something 2")
      console.log(e.target.name)
      // const objWithIdIndex = newdata.findIndex((data, index) => data.s_id == e.target.name);
      newdata[0][e.target.id] = e.target.value;

      let total = subtotal + Number(estimateDetails[0]?.agency_fees) - Number(estimateDetails[0]?.discount);
      // total is estimated price as well.
      let grand_total = subtotal + Number(estimateDetails[0]?.agency_fees) - Number(estimateDetails[0]?.discount);
      let tax_amount = (subtotal + Number(estimateDetails[0]?.agency_fees) - Number(estimateDetails[0]?.discount)) * estimateDetails[0]?.tax_percent / 100;
      newdata[0]["total"] = total;
      newdata[0]["price"] = total;
      newdata[0]["grand_total"] = grand_total;
      newdata[0]["tax_amount"] = tax_amount;
      setEstimateDetails(newdata)
      console.log(newdata);
    }


  }

  // var errmsg = '';
  var validationErr = [];

  const validation = (err, element, value, pElement) => {
    if (err) {


      console.log("en")
      document.getElementById(element).classList.add("border-danger");
      pElement.classList.remove("d-none")
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


  const handleCopyData = async (value) => {
    setEstimateCopyId(value);
    const { data } = await axiosInstance.get(`projectestimate/getdata/${value}`)
    setEstimateInfo(data[0].estimate_info)
    setServicesInfo(data[2].services)
    setManagerInfo2(data[1].users)
    console.log(data);
    console.log("res.data")
  }

  const handleManagerInfo = (e) => {
    console.log("herehere here")
    const newdata = {...managerInfo}
    // const objWithIdIndex = newdata.findIndex((data, index) => data.s_id == e.target.name);
    newdata[e.target.id] = e.target.value;
    newdata["project_id"] = projectId;
    newdata["uid"] = sessionStorage.getItem("userId");
    setManagerInfo(newdata)
    console.log(newdata);
    let pElement = e.target.nextSibling;
    validation(false, e.target.id, "", pElement);

  }

  // Submit Team Data
  const Submit = async (e) => {
    e.preventDefault();

    if (!managerInfo.user_id) {
      let element = "user_id";
      let pElement = document.querySelector(".manager_class").nextSibling;
      validation(true, element, "Select a manager", pElement);
    }


    if (!managerInfo.user_id || managerInfo.user_id == "0") {
      err = true;
    }
    else {
      err = false;
    }

    console.log("state good");
    try {
      // console.log(data);
      // if (!err) {
      // cdata.concat({"project_id": `${project_id}`});
      console.log("estimateInfo", estimateInfo);
      console.log("servicesInfo", servicesInfo);
      console.log("managerInfo", managerInfo);
      console.log("tobedeleted", tobedeleted);
      // if(estimateInfo.length>0){
      //   const { result } = await axiosInstance.post(`projectestimate/`, { estimateInfo, servicesInfo, managerInfo, tobedeleted })

      // }
      // else {
      if (!err) {
        const { result } = await axiosInstance.post(`projectestimate/`, { estimateDetails, servicesInfo, managerInfo, tobedeleted })
        // }

        swal("Yeah", "Estimate is Submitted", "success");
      }

      // settdata({ manager_id: "" })
      // document.querySelectorAll(".manager_class")[0].value = "0";
      // document.querySelectorAll(".manager_class")[1].value = "0";
      // console.log(project_id);
      // getTeam(project_id);

      // document.getElementById("pills-contact-tab").click();
      // }
    }
    catch (error) {
      alert(error);
    }
  }


  return (
    <>

      <ProjectHeader />



      <div className="row">

        {/* <h4 className='ps-0 pe-0 text-center mb-4'>How would you like to go ahead?<br /><b className='text-success mt-4'>Choose an Option</b></h4> */}
        {/* <hr /> */}

        <div className='text-center'>
          <div className="container-fluid">

            <div className="bg-blue row p-2 align-items-center">
              <div className="col-md-7 text-start">
                <h2 className="page-heading text-start text-white">
                  Create Estimator</h2>
              </div>
              <div className="col-md-5 text-end">
                {/* <input type="text" id="service_description" placeholder='To copy data from other estimate, search here...' onChange={event => setQuery(event.target.value)} className="form-control service_desc" /> */}
                <select name="" id="" className="form-control" value={estimateCopyId} onChange={(e) => handleCopyData(e)}>
                  <option value="" selected>To copy data from other estimate, search here...</option>
                  {estimateList && estimateList.map(value => (
                    <>
                      <option value={value?.id}>{value?.estimate_no}</option>
                    </>
                  ))}
                </select>                {
                  estimateList.filter(post => {
                    if (query === '') {
                      return post;
                    } else {
                      return post;
                    }
                  }).map((post, index) => {
                    <div key={index}>
                      <p id={post.id}>{post.estimate_no}</p>
                    </div>
                  })
                }
              </div>
            </div>

            <div className="row search-estimate-row">
              <div className="col-sm-6  col-xs-12  col-md-6">

              </div>
            </div>

            <div className="row bg-white py-2 shadow border-light" id="estimatorCreatePage">
              <div className="col-sm-12  col-xs-12  col-md-12">

                <div className="the-box">
                  <table className="table table-striped table-hover table-bordered">
                    <tbody>
                      {

                        estimateInfo.length > 0 ?

                          estimateInfo && estimateInfo.map(value => (
                            <>
                              <tr style={{ verticalAlign: "middle" }}>
                                <td ><b>Estimate No.</b></td>
                                <td className='text-start'>{value?.estimate_no}</td>
                                <td colspan="2" className='text-end'>{day + ' ' + monthArray[month - 1] + ' ' + year}</td>


                              </tr>


                              <tr style={{ verticalAlign: "middle" }}>
                                <td ><b>Project Code.</b></td>
                                <td className='text-start'>{value.project_code}</td>
                                <td ><b>Project</b></td>
                                <td className='text-start'>{value.project_title}</td>
                              </tr>
                            </>
                          ))
                          :
                          estimateDetails && estimateDetails.map(value => (
                            <>
                              <tr style={{ verticalAlign: "middle" }}>
                                <td ><b>Estimate No.</b></td>
                                <td className='text-start'>{value?.estimate_no}</td>
                                <td colspan="2" className='text-end'>{day + ' ' + monthArray[month - 1] + ' ' + year}</td>
                              </tr>


                              <tr style={{ verticalAlign: "middle" }}>
                                <td ><b>Project Code.</b></td>
                                <td className='text-start'>{value.project_code}</td>
                                <td ><b>Project</b></td>
                                <td className='text-start'>{value.project_title}</td>
                              </tr>
                            </>
                          ))

                      }

                      <tr style={{ verticalAlign: "middle" }}>
                        <td ><b>Client</b></td>
                        <td className='text-start'>{estimateInfo.length > 0 ? estimateInfo[0]?.customer_name : estimateDetails[0]?.customer_name}</td>
                        <td ><b>Project Manager</b></td>
                        <td>



                          <select className="form-control" id='user_id' value={managerInfo.user_id} onChange={e => handleManagerInfo(e)} required>
                            <option value="0" selected disabled className='manager_class'>Select Project Manager</option>
                            {managerInfo2 && managerInfo2.map(user => (
                              <>
                                <option value={user?.user_id}>{user?.name}</option>
                              </>
                            ))}
                          </select>
                          <small className='badge bg-danger d-none'>{errMsg.user_id}</small>
                        </td>
                      </tr>






                    </tbody>

                  </table>


                  <form className='mt-4' onSubmit={(e) => Submit(e)}>

                    <hr style={{ opacity: "0.6", height: "4px", backgroundColor: "#000" }} />
                    <div className="row">
                      <div className="text-start col-md-8">
                        <h4 className="text-start">Add Services :</h4>

                      </div>
                      <div className="text-end col-md-4">
                        <button type="button" className="btn btn-primary btn-sm" onClick={addMoreRow}><i className="fa fa-plus-square me-2" style={{ fontSize: "1.2rem" }}></i><b>Add Service</b></button>
                      </div>

                    </div>
                    <div className="row p-2 border-dark">
                      <table className="table table-bordered" id="addServices">
                        <thead>
                          <tr>
                            <th>Service</th>
                            <th>Service Type</th>
                            <th>Description</th>
                            <th>Nos.</th>
                            <th>L</th>
                            <th>W</th>
                            <th>H</th>
                            <th>No of Days</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            {/* <th><b>Add </b></th> */}
                            <th><b>Delete</b></th>
                          </tr>
                        </thead>
                        <tbody>
                          {servicesInfo && servicesInfo.map((service, index) => (
                            <>
                              <tr className="estimator-row" id={`serviceRow${index}`}>
                                <td>
                                  <select className="form-control service_id watch-for-change" required="required" onChange={(e) => handle(e)} id="service_id" name={service?.s_id} indexVal={index} value={service?.service_id}>
                                    <option value='0' disabled>Select Service</option>
                                    {servicesList && servicesList.map(val => (

                                      <>
                                        <option className='text-dark' value={val?.id}>{val?.name}</option>
                                      </>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <select className="form-control service_id watch-for-change" required="required" onChange={(e) => handle(e)} id="rate_type" name="rate_type" value={service?.rate_type} indexVal={index}>
                                    <option value='0' selected disabled></option>
                                    <option className='text-dark' value="1">Item</option>
                                    <option className='text-dark' value="2">Hour</option>
                                    <option className='text-dark' value="3">LBH</option>
                                  </select>

                                  {/* <input type="text" value={rateType[service?.rate_type]} onChange={(e) => handle(e)} id="rate_type" className="form-control rate_type" name={service?.s_id} required /> */}
                                </td>
                                <td>
                                  <input type="text" value={service?.service_description} onChange={(e) => handle(e)} id="service_description" name={service?.s_id} indexVal={index} className="form-control service_desc" />
                                </td>
                                <td>
                                  <input type="text" value={service?.nos} onChange={(e) => handle(e)} id="nos" className="form-control no_of_unit watch-for-change" name={service?.s_id} indexVal={index} required="required" />

                                </td>
                                <td>
                                  <input type="number" value={service?.length} onChange={(e) => handle(e)} name={service?.s_id} indexVal={index} id="length" className="form-control length watch-for-change" required="required" />

                                </td>
                                <td>
                                  <input type="number" value={service?.width} id="width" onChange={(e) => handle(e)} name={service?.s_id} indexVal={index} className="form-control width watch-for-change" required="required" />

                                </td>
                                <td>
                                  <input type="number" value={service?.height} id="height" onChange={(e) => handle(e)} name={service?.s_id} indexVal={index} className="form-control height watch-for-change" required="required" />

                                </td>
                                <td>
                                  <input type="text" value={service?.no_of_day} id="no_of_day" onChange={(e) => handle(e)} name={service?.s_id} indexVal={index} className="form-control no_of_day watch-for-change" required="required" />

                                </td>
                                <td>
                                  <input type="text" value={service?.service_rate} id="service_rate" onChange={(e) => handle(e)} name={service?.s_id} indexVal={index} className="form-control price watch-for-change" required="required" />

                                </td>
                                <td>
                                  <input type="text" name="total_price" value={(service?.no_of_day * service?.service_rate * service?.nos).toLocaleString()} id="total-1" className="form-control total_price text-end" readonly="readonly" required="required" />

                                </td>
                                {/* <td>
                                  <button type="button" className="btn btn-primary btn-sm addJS" onClick={() => createNewRow}><i className="fa fa-plus-square" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button>
                                </td> */}
                                <td>
                                  <button type="button" className="btn btn-danger btn-sm remJS" onClick={(e) => removeRow(`serviceRow${index}`, `${service?.s_id}`)}><i className="fa fa-trash" style={{ fontSize: "1.2rem" }} aria-hidden="true"></i></button>
                                </td>
                              </tr>
                            </>
                          ))}


                        </tbody>
                      </table>
                      {/* <div></div> */}


                    </div>
                    <hr style={{ opacity: "0.6", height: "4px", backgroundColor: "#000" }} className="mb-4" />




                    <div className="row" id="estimate">
                      <div className="col-md-8">
                        {/* <label>keypoints</label> */}
                        <div className="editor">


                          <CKEditor
                            editor={ClassicEditor}
                            data="#Payment within 15 days of submission of Invoice (As per Client Policy)<br/>
                            #No claims will be entertained if the same is not intimated in writing within 15 days from the date of this INVOICE<br/>
                            #Govt. Taxes as applicable will be charge in the final Invoice<br/>
                            #All payments to be made in favour of Redefine Marcom Pvt Ltd<br/>
                            # Subject to Delhi Jurisdiction"
                            id="terms"
                            onkepup={(e) => handleCost(e)}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              // setKeypoints(data)
                              // setText(data)
                            }}

                          />
                        </div>
                        {/* <input className="form-control" type="text" value={keypoints} onChange={e => setKeypoints(e.target.value)} placeholder="Keypoints" /> */}
                      </div>
                      <div className="col-md-4 ">
                        <table className="table table-bordered border-dark">

                          <tbody>
                            <tr>

                              <td colSpan="2"><b>Subtotal</b></td>
                              <td>
                                {subtotal.toLocaleString()}
                              </td>

                            </tr>
                            <tr style={{ verticalAlign: "middle" }}>
                              <td colSpan="2">
                                <b>Discount</b>
                              </td>
                              <td>
                                <input type="text" value={estimateInfo.length > 0 ? estimateInfo[0]?.discount : estimateDetails[0]?.discount} id="discount" onChange={(e) => handleCost(e)} className="form-control total_price text-end" required="required" />
                              </td>
                            </tr>

                            <tr style={{ verticalAlign: "middle" }}>
                              <td colSpan="2">
                                <b>Agency Fees</b>
                              </td>
                              <td><input type="text" value={estimateInfo.length > 0 ? estimateInfo[0]?.agency_fees : estimateDetails[0]?.agency_fees} id="agency_fees" onChange={(e) => handleCost(e)} className="form-control total_price text-end" required="required" /></td>
                            </tr>

                            <tr>
                              <td colSpan="2">
                                <b>Total</b>
                              </td>
                              <td>{estimateInfo.length > 0 ? (subtotal + Number(estimateInfo[0]?.agency_fees) - Number(estimateInfo[0]?.discount)).toLocaleString() : (subtotal + Number(estimateDetails[0]?.agency_fees) - Number(estimateDetails[0]?.discount)).toLocaleString()}</td>
                            </tr>

                            <tr>
                              <td>

                                <b>Tax Type</b>
                              </td>
                              <td>
                                <b>Percent Tax</b>
                              </td>
                              <td>Tax Amount</td>
                            </tr>
                            <tr style={{ verticalAlign: "middle" }}>
                              <td>
                                <select className="form-control" value={estimateInfo.length > 0 ? estimateInfo[0]?.tax_type : estimateDetails[0]?.tax_type} onChange={(e) => handleCost(e)} id="tax_type">
                                  <option value="0" disabled>Select Tax Type</option>

                                  <option value="cgst_sgst">CGST & SGST</option>
                                  <option value="igst">IGST</option>

                                </select>

                              </td>
                              <td>
                                <input type="text" value={estimateInfo.length > 0 ? estimateInfo[0]?.tax_percent : estimateDetails[0]?.tax_percent} id="tax_percent" onChange={(e) => handleCost(e)} className="form-control total_price text-end" required="required" />
                              </td>
                              <td>{estimateInfo.length > 0 ? ((subtotal + Number(estimateInfo[0]?.agency_fees) - Number(estimateInfo[0]?.discount)) * estimateInfo[0]?.tax_percent / 100) : ((subtotal + Number(estimateDetails[0]?.agency_fees) - Number(estimateDetails[0]?.discount)) * estimateDetails[0]?.tax_percent / 100)}</td>
                            </tr>


                            <tr>
                              <td colSpan="2">
                                <b>Grand Total</b>
                              </td>
                              <td>
                                {estimateInfo.length > 0 ? ((subtotal + Number(estimateInfo[0]?.agency_fees) - Number(estimateInfo[0]?.discount)) + ((subtotal + Number(estimateInfo[0]?.agency_fees) - Number(estimateInfo[0]?.discount)) * estimateInfo[0]?.tax_percent / 100)).toLocaleString() : ((subtotal + Number(estimateDetails[0]?.agency_fees) - Number(estimateDetails[0]?.discount)) + ((subtotal + Number(estimateDetails[0]?.agency_fees) - Number(estimateDetails[0]?.discount)) * estimateDetails[0]?.tax_percent / 100)).toLocaleString()}
                              </td>
                            </tr>

                          </tbody>
                        </table>
                      </div>
                      <div>
                      </div>
                    </div>
                    <div className="text-start">
                      <input type="submit" className="btn btn-success col-md-3" value="Submit" name="submit" />

                    </div>

                  </form>

                </div>
              </div>
            </div>



          </div>
        </div>



      </div>


    </>

  )
}

