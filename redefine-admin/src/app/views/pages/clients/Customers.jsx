import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Checkbox from "@mui/icons-material/CheckBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { axiosInstance } from "../../../config";
import Multiselect from "multiselect-react-dropdown";
// import { Filters } from './project/Filters';

export const Clients = () => {
  const sortIcon = <ArrowDownward />;
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const [projects, setProjects] = useState([]);
  const [filterVal, setFilterVal] = useState([]);
  const [cities, setCities] = useState([]);
  const [active, setActive] = useState(false);

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  useEffect(() => {
    getdata();
    getCities();
  }, []);

  const getdata = async () => {
    const { data } = await axiosInstance.get(`clients/view`);
    setProjects(data);
    console.log(data);
    console.log("res.data");
  };

  const getCities = async () => {
    const { data } = await axiosInstance.get(`mastercities/view`);
    setCities(data);
  };

  const removeRow = (e) => {
    console.log(e);
    let row_id = e;
    try {
      const deleteData = axiosInstance.delete(`clients/delete/${row_id}`);
      console.log("deleted");
      getdata();
    } catch (error) {
      alert(error);
    }
  };

  // var multiselectOptions = {
  //     project_status: [
  //         { id: "0", name: "Yet to Start" },
  //         { id: "1", name: "In Progress" },
  //         { id: "2", name: "Postponed" },
  //         { id: "3", name: "Cancelled" },
  //         { id: "4", name: "Closed" },
  //         { id: "5", name: "Partly Executed" },
  //         { id: "6", name: "Executed" }],
  //     billing_status: [
  //         { id: "0", name: "Billed" },
  //         { id: "1", name: "Not Billed" },
  //         { id: "2", name: "Partly Billed" }],
  //     po_status: [
  //         { id: "received", name: "Received" },
  //         { id: "awaited", name: "Awaited" },
  //         { id: "nopo", name: "No PO" }],
  //     project_payment: [
  //         { id: "0", name: "Paid" },
  //         { id: "1", name: "Partly Paid" },
  //         { id: "2", name: "Pending" }],
  // };

  // var filterValues = { ...filterVal };
  // const SelectValue = (e, target) => {
  //     console.log(e);
  //     console.log(target);
  //     filterValues[target] = e;
  //     setFilterVal(filterValues);
  //     console.log(filterValues);
  // }

  // const RemoveValue = (e, target) => {
  //     console.log(e)
  //     filterValues[target] = e;
  //     setFilterVal(filterValues)
  //     console.log(filterValues);

  // }
  // console.log("filterValues", filterValues);

  const showFilters = () => {
    setActive(active === true ? false : true);
  };

  // var filteredData = [];
  // const getFilteredData = () => {
  //     const latestdata = [...projects];
  //     // console.log("entered")
  //     var valuesToBeFiltered = Object.keys(filterValues);
  //     var v = 0;
  //     for (var i = 0; i < latestdata.length; i++) {
  //         const pushDecision = false;
  //         // console.log(typeof(filterValues),  "type of ")
  //         for (var k = 0; k < valuesToBeFiltered.length; k++) {
  //             var Key = valuesToBeFiltered[k];
  //             var Value = filterValues[Key];
  //             // console.log("Key", Key);
  //             // console.log(Value, valuesToBeFiltered[k])
  //             // console.log("element", element);
  //             if (Value) {
  //                 var j = 0;
  //                 Value.forEach(val => {
  //                     j = (latestdata[i].status == val.id) ? j + 1 : j
  //                 })
  //                 if (j > 0) {
  //                     v++;
  //                     pushDecision = true;
  //                 }
  //             }
  //         }

  //         if (pushDecision == true) {
  //             if (filteredData.filter(e => e.title === latestdata[i].title).length <= 0) {
  //                 filteredData.push(latestdata[i]);
  //             }
  //         }
  //     }
  //     setProjects(filteredData);
  //     setActive(false);

  // }

  const columns = [
    {
      name: "Client Code",
      cell: (row) => (
        <Link
          to={`/customers/customer-info/${row.id}`}
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number_1,
      sortable: true,
    },
    {
      name: "Client Access",
      cell: (row) => (
        <Link
          to={`/customers/customer-access/${row.id}`}
          style={{
            textDecoration: "underline !important",
            color: "blue !important",
          }}
          title="View"
          className="btn text-primary mr-1"
        >
          <i className="fa-solid fa-pen-to-square"></i> Edit
        </Link>
      ),
    },
    // {
    //     name: 'Date',
    //     selector: row => row.created ,
    //     // selector: row => row.created ,
    // },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link
            to={`/customers/update/${row.id}`}
            style={{
              textDecoration: "underline !important",
              color: "blue !important",
            }}
            title="View"
            className="btn mr-1"
          >
            <i className="fa-solid fa-pen text-primary"></i>
          </Link>
          <button className="btn" onClick={(e) => removeRow(row.id)}>
            <i className="fa-solid fa-trash-can text-danger"></i>
          </button>
        </>
      ),
    },
    // {
    //     name: 'Start Date',
    //     // selector: row => row.start_date.split("T")[0],
    //     selector: row => row.start_date,
    //     sortable: true,
    // },
  ];

  const handleSearch = (searchVal) => {
    if (searchVal === "") {
      getdata();
    }
    let filteredProject = projects?.filter(
      (ele) =>
        ele.name.toLowerCase().includes(searchVal) ||
        ele.phone_number_1.toLowerCase().includes(searchVal) ||
        ele.phone_number_2.toLowerCase().includes(searchVal)
    );
    setProjects(filteredProject);
  };

  return (
    <>
      <div className="container project-main-mod">
        {/* <div className="row">
                    <div className={`col-md-12 p-2 ${active == true ? `` : `d-none`}`} id="FilterProject">

                        <div className="container-fluid row flex-wrap filters m-2 p-5 ">
                            <div className="col-md-6 mb-3">
                                <label className="mb-2">Industry Type:</label>
                                <Multiselect
                                    options={multiselectOptions.project_status}
                                    displayValue="name"
                                    onSelect={(e) => SelectValue(e, "project_status")}
                                    onRemove={(e) => RemoveValue(e, "project_status")}
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="mb-2">Turnover:</label>
                                <Multiselect
                                    options={contacts}
                                    displayValue="name"
                                    onSelect={(e) => SelectValue(e, "customer_contact_id")}
                                    onRemove={(e) => RemoveValue(e, "customer_contact_id")}
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


                            <div className="text-center mt-3">
                                <button className="btn btn-primary" onClick={() => getFilteredData()}>
                                    Submit
                                </button>
                            </div>

                        </div>

                    </div>
                </div> */}

        <DataTable
          title="Clients"
          pagination
          columns={columns}
          data={projects}
          expandableRowsComponent={ExpandedComponent}
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          actions={
            <div className="input-group text-end has_append  d-flex justify-content-end align-items-center">
              <input
                type="search"
                onChange={(e) => handleSearch(e.target.value)}
                className="form-control rounded mx-2"
                placeholder="Search clients by name & phone number"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <Link
                to="/customers/create"
                className="btn btn-sm btn-success me-3 text-white"
              >
                <i className="fa-solid fa-plus"></i> Create
              </Link>

              {/* <button className="btn btn-sm btn-info me-3">
                <i className="fa-solid fa-download"></i> Export
              </button>
              <button
                className="btn btn-sm btn-warning me-3"
                onClick={() => showFilters()}
              >
                <i className="fa-solid fa-filter"></i> Filters
              </button> */}
            </div>
          }
        />
      </div>
    </>
  );
};
