import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Checkbox from "@mui/icons-material/CheckBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { axiosInstance } from "../../../config";
import moment from "moment";
import { Toaster, toast } from "react-hot-toast";
// import { Filters } from './project/Filters';
//
export const Vendors = () => {
  const sortIcon = <ArrowDownward />;
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const [projects, setProjects] = useState([]);
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const { data } = await axiosInstance.get(`vendors/view`);
    setProjects(data);
    console.log(data);
    console.log("res.data");
  };

  const navigate = useNavigate();

  const removeRow = async (e) => {
    console.log(e);
    let row_id = e;
    try {
      const { data } = await axiosInstance.delete(`vendors/delete/${row_id}`);
      if (data?.success) {
        toast.success(data?.msg);
        getdata();
        navigate("/vendors");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = [
    {
      name: "Vendor Code",
      cell: (row) => (
        <Link
          to={`/vendors/vendor-info/${row.id}`}
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
      name: "Contact Person",
      selector: (row) => row.contact_name,
      sortable: true,
    },

    // {
    //     name: 'Date',
    //     selector: row =>row.created, type: 'date-dd-mmm-yyyy',
    // },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link
            to={`/vendors/update/${row.id}`}
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
      return;
    }
    let filteredProject = projects?.filter(
      (ele) =>
        ele.name.toLowerCase().includes(searchVal) ||
        ele.contact_mobile.toLowerCase().includes(searchVal)
    );
    setProjects(filteredProject);
  };

  return (
    <>
      <Toaster />
      <div className="container project-main-mod">
        <div className="row">
          <div className="col-md-12 p-1">
            {/* <div className="white px-4 py-4 min-height-90 filter-box"> */}

            {/* <Filters/> */}

            {/* </div> */}
          </div>
        </div>

        <DataTable
          title="Vendors"
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
                placeholder="Search vendor by name & contact person"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <Link
                to="/vendors/create"
                className="btn btn-sm btn-success me-3 text-white"
              >
                <i className="fa-solid fa-plus"></i> Create
              </Link>

              {/* <button className="btn btn-sm btn-info me-3"><i className="fa-solid fa-download"></i> Export</button>
                    <button className="btn btn-sm btn-warning me-3"><i className="fa-solid fa-filter"></i> Filters</button>
                    <Link to={`/vendors/rate-cards`} className="btn btn-sm btn-primary me-3">Rate Cards</Link> */}
            </div>
          }
        />
      </div>
    </>
  );
};
