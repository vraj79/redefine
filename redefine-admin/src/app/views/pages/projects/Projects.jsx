import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Checkbox from "@mui/icons-material/CheckBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { axiosInstance } from "../../../config";
import Multiselect from "multiselect-react-dropdown";
import { useLocation } from "react-router-dom";
// import { Filters } from './project/Filters';
//
export const Projects = () => {
  const groupId = sessionStorage.getItem("groupId");
  const userId = sessionStorage.getItem("userId");
  const location = useLocation();
  var statusFilter = 0;
  if (location.state) {
    statusFilter = location.state.fill;
  } else {
    statusFilter = 0;
  }
  // const { fill } = location.state;
  // const statusFilter=params.fill;
  const sortIcon = <ArrowDownward />;
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const [projects, setProjects] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterVal, setFilterVal] = useState([]);
  const [cities, setCities] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [active, setActive] = useState(false);
  const [filtered, setFiltered] = useState(0);
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  useEffect(() => {
    // getdata(statusFilter);
    getContacts();
    // getfilterdata();
    getCities();
    getUsers();
    getClients();
    getData();
  }, []);
  const statuses = [
    "Yet to Start",
    "In Progress",
    "Postponed",
    "Cancelled",
    "Closed",
    "Partly Executed",
    "Executed",
  ];
  const statusesColour = [
    "red",
    "blue",
    "Postponed",
    "Cancelled",
    "Closed",
    "Partly Executed",
    "Executed",
  ];

  const getdata = async (s) => {
    const { data } = await axiosInstance.get(`project/view2`);

    if (s == "1") {
      const newData = data.filter((x) => x.status == 1);
      setProjects(newData);
    } else if (s == "2") {
      const newData = data.filter((x) => x.status == 2);
      setProjects(newData);
    } else if (s == "3") {
      const newData = data.filter((x) => x.status == 3);
      setProjects(newData);
    } else if (s == "4") {
      const newData = data.filter((x) => x.status == 4);
      setProjects(newData);
    } else if (s == "5") {
      const newData = data.filter((x) => x.status == 5);
      setProjects(newData);
    } else if (s == "6") {
      const newData = data.filter((x) => x.status == 6);
      setProjects(newData);
    } else if (s == "7") {
      const newData = data.filter((x) => x.status == 7);
      setProjects(newData);
    } else {
      setProjects(data);
    }
  };

  const getData = async () => {
    let id;
    if (groupId == 1 || groupId == 10 || groupId == 11) {
      id = groupId;
    } else {
      id = userId;
    }

    const { data } = await axiosInstance.get(`project/data/${id}`);
    setProjects(data.projects);
  };

  const getfilterdata = async () => {
    const { data } = await axiosInstance.get(`project/view`);
    setFilterData(data);
    setProjects(data);
  };
  const getContacts = async () => {
    const { data } = await axiosInstance.get(`clients/contact/view`);
    setContacts(data);
  };
  const getCities = async () => {
    const { data } = await axiosInstance.get(`mastercities/view`);
    setCities(data);
  };
  const getUsers = async () => {
    const { data } = await axiosInstance.get(`users/view2`);
    setUsers(data);
  };
  const getClients = async () => {
    const { data } = await axiosInstance.get(`clients/view`);
    setClients(data);
  };

  var multiselectOptions = {
    project_status: [
      { id: "0", name: "Yet to Start" },
      { id: "1", name: "In Progress" },
      { id: "2", name: "Postponed" },
      { id: "3", name: "Cancelled" },
      { id: "4", name: "Closed" },
      { id: "5", name: "Partly Executed" },
      { id: "6", name: "Executed" },
    ],
    billing_status: [
      { id: "0", name: "Billed" },
      { id: "1", name: "Not Billed" },
      { id: "2", name: "Partly Billed" },
    ],
    po_status: [
      { id: "received", name: "Received" },
      { id: "awaited", name: "Awaited" },
      { id: "nopo", name: "No PO" },
    ],
    project_payment: [
      { id: "0", name: "Paid" },
      { id: "1", name: "Partly Paid" },
      { id: "2", name: "Pending" },
    ],
  };

  var filterValues = { ...filterVal };
  const SelectValue = (e, target) => {
    filterValues[target] = e;
    setFilterVal(filterValues);
  };

  const RemoveValue = (e, target) => {
    filterValues[target] = e;
    setFilterVal(filterValues);
  };

  const showFilters = () => {
    setActive(active == true ? false : true);
  };

  var filteredData = [];
  const getFilteredData = () => {
    const latestdata = [...projects];
    var valuesToBeFiltered = Object.keys(filterValues);
    var v = 0;
    for (var i = 0; i < latestdata.length; i++) {
      const pushDecision = false;
      for (var k = 0; k < valuesToBeFiltered.length; k++) {
        var Key = valuesToBeFiltered[k];
        var Value = filterValues[Key];
        if (Value) {
          var j = 0;
          Value.forEach((val) => {
            j = latestdata[i].status == val.id ? j + 1 : j;
          });
          if (j > 0) {
            v++;
            pushDecision = true;
          }
        }
      }

      if (pushDecision == true) {
        if (
          filteredData.filter((e) => e.title === latestdata[i].title).length <=
          0
        ) {
          filteredData.push(latestdata[i]);
        }
      }
    }
    setProjects(filteredData);
    setActive(false);
  };
  const removeRow = (e) => {
    let row_id = e;
    try {
      const deleteData = axiosInstance.delete(`project/delete/${row_id}`);
      // getdata();
    } catch (error) {
      alert(error);
    }
  };

  const [customerNames, setCustomerNames] = useState([]);

  const getCustomerNames = async () => {
    const { data } = await axiosInstance.get("/projectcustomers");
    setCustomerNames(data);
  };

  const findCustomerName = (id) => {
    const customer =
      customerNames.length > 0 &&
      customerNames?.find((ele) => ele.project_id === id);
    return customer?.customer_name || "N/A";
  };

  const [managerNames, setManagerNames] = useState([]);
  const getProjectManagerName = async (id) => {
    const { data } = await axiosInstance.get(`projectcreateproject/name/id`);
    setManagerNames(data);
  };

  const findManagerName = (id) => {
    const manager =
      managerNames.length > 0 &&
      managerNames?.find((ele) => ele.project_id === id);
    return manager?.name || "N/A";
  };

  useEffect(() => {
    getCustomerNames();
    getProjectManagerName();
  }, []);

  const columns = [
    {
      name: "Project Code",
      cell: (row) => (
        <Link
          to={`project-info/${row.id}`}
          style={{
            textDecoration: "underline !important",
            color: "blue !important",
          }}
        >
          {row.code}
        </Link>
      ),
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => (row.id == null ? "N/A" : findCustomerName(row.id)),
      sortable: true,
    },
    {
      name: "Manager",
      selector: (row) => (row.id == null ? "N/A" : findManagerName(row.id)),
      sortable: true,
    },
    // {
    //     name: 'Project Access',
    //     cell: (row) => <Link to={`project-access/${row.id}`} style={{ textDecoration: "underline !important", color: "blue !important" }} title='View' className="btn btn-primary mr-1"><i className="fa-solid fa-pen-to-square"></i> Edit</Link>,
    // },
    {
      name: "Project Access",
      cell: (row) => (
        <>
          <Link
            to={`project-access/${row.id}`}
            style={{
              textDecoration: "underline !important",
              color: "blue !important",
            }}
            title="View"
            className="btn mr-1"
          >
            <i className="fa-solid fa-pen text-primary"></i>
          </Link>
        </>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <Link
            to={`/projects/update_info/${row.id}`}
            style={{
              textDecoration: "underline !important",
              color: "blue !important",
            }}
            title="View"
            className="btn mr-1"
          >
            <i className="fa-solid fa-pen text-primary"></i>
          </Link>
        </>
      ),
    },
    {
      name: "Status",
      conditionalCellStyles: [
        {
          when: (row) => row.status === "1",
          style: { backgroundColor: "rgb(183,183,183)" },
        },
        {
          when: (row) => row.status === "2",
          style: { backgroundColor: "rgb(106,168,79)" },
        },
        {
          when: (row) => row.status === "3",
          style: { backgroundColor: "rgb(255,109,1)" },
        },
        {
          when: (row) => row.status === "4",
          style: { backgroundColor: "rgb(255,0,0)" },
        },
        {
          when: (row) => row.status === "5",
          style: { backgroundColor: "rgb(0,0,255)" },
        },
        {
          when: (row) => row.status === "6",
          style: { backgroundColor: "rgb(147,196,125)" },
        },
        {
          when: (row) => row.status === "7",
          style: { backgroundColor: "rgb(241,194,50)" },
        },
      ],
      selector: (row) => statuses[row.status - 1],
      sortable: true,
    },
    // {
    //     name: 'Start Date',
    //     // selector: row => row.start_date.split("T")[0],
    //     selector: row => row.start_date,
    //     sortable: true,
    // },
  ];

//   const keys = ["code", "title"];
//   const [search, setSearch] = useState("");
  const handleSearch = (searchVal) => {
    // return data.filter((item) =>
    //   keys.some((key) =>
    //     item[key].toLowerCase().includes(search.toLocaleLowerCase())
    //   )
    // );
    // const newdata =  data.filter((item)=>{
    //     return search.toLowerCase()===''? item : item.code.toLowerCase().includes(search);
    // }) 
    // { return item.code.toLowerCase().includes(search.toLocaleLowerCase());}
    // console.log(projects,searchVal)
    if(searchVal===""){
        getData();
        return
    }
    let filteredProject=projects?.filter((ele)=>ele.title.toLowerCase().includes(searchVal))
    setProjects(filteredProject);
  };

  return (
    <>
      <div className="container project-main-mod">
        <div className="row">
          <div
            className={`col-md-12 p-2 ${active === true ? `` : `d-none`}`}
            id="FilterProject"
          >
            <div className="container-fluid row flex-wrap filters m-2 p-5 ">
              <div className="col-md-6 mb-3">
                <label className="mb-2">Project Status:</label>
                <Multiselect
                  options={multiselectOptions.project_status}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "project_status")}
                  onRemove={(e) => RemoveValue(e, "project_status")}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mb-2">Contact:</label>
                <Multiselect
                  options={contacts}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "customer_contact_id")}
                  onRemove={(e) => RemoveValue(e, "customer_contact_id")}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mb-2">Billing Status:</label>
                <Multiselect
                  options={multiselectOptions.billing_status}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "billing_status")}
                  onRemove={(e) => RemoveValue(e, "billing_status")}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mb-2">Project City:</label>
                <Multiselect
                  options={cities}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "city_id")}
                  onRemove={(e) => RemoveValue(e, "city_id")}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mb-2">Payment Status:</label>
                <Multiselect
                  options={multiselectOptions.project_payment}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "project_payment")}
                  onRemove={(e) => RemoveValue(e, "project_payment")}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="mb-2">Project Executive:</label>
                <Multiselect
                  options={users}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "projectExecutive")}
                  onRemove={(e) => RemoveValue(e, "projectExecutive")}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mb-2">PO Status:</label>
                <Multiselect
                  options={multiselectOptions.po_status}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "po_status")}
                  onRemove={(e) => RemoveValue(e, "po_status")}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mb-2">Project Manager:</label>
                <Multiselect
                  options={users}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "user_id")}
                  onRemove={(e) => RemoveValue(e, "user_id")}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mb-2">Project Customer:</label>
                <Multiselect
                  options={clients}
                  displayValue="name"
                  onSelect={(e) => SelectValue(e, "customer_id")}
                  onRemove={(e) => RemoveValue(e, "customer_id")}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="mb-2">Date Range:</label>
                <div className="d-flex">
                  <input
                    type="date"
                    className="form-control border-modified"
                    id="startDate"
                  />{" "}
                  -
                  <input
                    type="date"
                    className="form-control border-modified"
                    id="endDate"
                  />
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => getFilteredData()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <DataTable title="Projects" pagination columns={columns} data={projects} selectableRows expandableRowsComponent={ExpandedComponent} fixedHeader selectableRowsHighlight highlightOnHover actions={<div className="input-group text-end has_append  d-flex justify-content-end align-items-center"> */}
        <DataTable
          title="Projects"
          pagination
          columns={columns}
          data={projects}
          expandableRowsComponent={ExpandedComponent}
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          actions={
            <div className="input-group text-end has_append  d-flex justify-content-end align-items-center">
              <div style={{ display: "flex" }}>
              <div className="input-group rounded">
                  <input
                    type="search"
                    onKeyDown={(e) => handleSearch(e.target.value)}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="form-control rounded mx-3"
                    placeholder="Search project by title"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  {/* <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search"></i>
                  </span> */}
                </div>
                <div>
                  <Link
                    to="/projects/create-project"
                    style={{ width: "100px" }}
                    className="btn btn-sm btn-success me-3 text-white"
                  >
                    <i className="fa-solid fa-plus"></i> Create
                  </Link>
                </div>
                {/* <Link to="/projects/create-project" className="btn btn-sm btn-success me-3 text-white">
                        <i className="fa-solid fa-plus"></i> Create</Link> */}
                
              </div>
              {/* <Link to="/projects/create-project" className="btn btn-sm btn-success me-3 text-white">
                        <i className="fa-solid fa-plus"></i> Create</Link>
                        <div className="input-group rounded">
                            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            <span className="input-group-text border-0" id="search-addon">
                                <i className="fas fa-search"></i>
                            </span>
                        </div> */}
              {/* <button className="btn btn-warning btn-sm me-3" onClick={()=>showFilters()}><i className="fa-solid fa-filter"></i> Filters</button> */}
            </div>
          }
        />
      </div>
    </>
  );
};
