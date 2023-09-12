import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Export from "react-data-table-component";
import Checkbox from "@mui/icons-material/CheckBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { axiosInstance } from "../../../config";
import { Toaster, toast } from "react-hot-toast";
// import { Filters } from './project/Filters';
//
export const AllUsers = () => {
  const navigate = useNavigate();
  // const sortIcon = <ArrowDownward />;
  // const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const [projects, setProjects] = useState([]);
  const [groups, setGroups] = useState([]);
  const [backup, setBackup] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  useEffect(() => {
    getGroups();
    getData();
  }, []);

  const getGroups = async () => {
    const { data } = await axiosInstance.get(`mastergroups/view`);
    setGroups(data);
    console.log(data);
    console.log("res.data");
  };

  const getData = async () => {
    const { data } = await axiosInstance.get(`users/view`);
    setProjects(data);
    setBackup(data);
    console.log(data);
    console.log("res.data");
  };

  // const changeStatus = (id, other) => {
  //   console.log(id, other);
  //   let row_id = id;

  //   try {
  //     if (other === "1") {
  //       const deleteData = axiosInstance.put(`users/activate/${row_id}`);
  //       console.log("deleted");
  //       getData();
  //     } else if (other === "0") {
  //       const deleteData = axiosInstance.put(`users/ban/${row_id}`);
  //       console.log("deleted");
  //       getData();
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const handleCategory = (e) => {
    // console.log(backup);
    const selected_data = { ...selectedData };
    const allData = [...backup];
    selected_data[e.target.id] = e.target.value;
    // console.log(e.target.id)
    if (e.target.id === "group") {
      setProjects(allData.filter((value) => value.group_id === e.target.value));
      setFilteredData(
        allData.filter((value) => value.group_id === e.target.value)
      );
    }
    if (e.target.id === "active") {
      // console.log(filteredData);
      if (filteredData.length > 0) {
        setProjects(
          filteredData.filter(
            (value) => value.activated === 1 && value.banned === 0
          )
        );
      } else {
        // console.log("active 2")

        setProjects(
          allData.filter((value) => value.activated === 1 && value.banned === 0)
        );
      }
    }
    if (e.target.id === "banned") {
      if (filteredData.length > 0) {
        // console.log(filteredData)
        setProjects(filteredData.filter((value) => value.banned === 1));
      } else {
        // console.log("banned 2")

        setProjects(allData.filter((value) => value.banned === 1));
      }
    }
    if (e.target.id === "unapproved") {
      if (filteredData.length > 0) {
        // console.log(filteredData)
        setProjects(
          filteredData.filter(
            (value) => value.activated === 0 && value.banned === 1
          )
        );
      } else {
        // console.log("banned 2")

        setProjects(
          allData.filter((value) => value.activated === 0 && value.banned === 1)
        );
      }
    }
    if (e.target.id === "showall") {
      setProjects(backup);
    }

    setSelectedData(selected_data);
  };

  const handleSearch = (searchVal) => {
    if (searchVal === "") {
      getData();
      return;
    }
    let filteredProject = projects?.filter(
      (ele) =>
        ele.email.toLowerCase().includes(searchVal) ||
        ele.firstname.toLowerCase().includes(searchVal) ||
        ele.lastname.toLowerCase().includes(searchVal)
    );
    setProjects(filteredProject);
  };

  const delUser = async (id) => {
    const {
      data: { success, msg },
    } = await axiosInstance.delete(`users/delete/${id}`);

    if (success) {
      toast.success(msg);
      getData();
      navigate("/users");
    }
  };

  const handleBan = async (id, status) => {
    console.log(status);
    if (status === 1) {
      const {
        data: { success, msg },
      } = await axiosInstance.put(`users/unban/${id}`);

      if (success) {
        toast.success(msg);
        getData();
        navigate("/users");
      }
    } else {
      const {
        data: { success, msg },
      } = await axiosInstance.put(`users/ban/${id}`);

      if (success) {
        toast.success(msg);
        getData();
        navigate("/users");
      }
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.firstname + " " + row.lastname,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Suspend/Active",
      cell: (row) => (
        <>
          <button
            onClick={() => handleBan(row.id, row.banned)}
            className={row.banned === 1 ? "btn btn-success" : "btn btn-danger"}
          >
            {row.banned === 1 ? "Active" : "Suspend"}
          </button>
        </>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link
            to={`/users/update/${row.id}`}
            style={{
              textDecoration: "underline !important",
              color: "blue !important",
            }}
            title="View"
            className="btn mr-1"
          >
            <i className="fa-solid fa-pen text-primary"></i>
          </Link>
          <button onClick={() => delUser(row.id)} className="btn">
            <i className="fa-solid fa-trash-can text-danger"></i>
          </button>
        </>
      ),
    },
  ];

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
          title="Users"
          pagination
          columns={columns}
          data={projects}
          expandableRowsComponent={ExpandedComponent}
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          actions={
            <div className="input-group text-end has_append  d-flex justify-content-end align-items-center">
              {/* <select
                class="form-select me-3 form-control-sm"
                id="group"
                value={selectedData.group}
                onChange={(e) => handleCategory(e)}
              >
                <option value="0" selected disabled>
                  Filter Data
                </option>

                {groups &&
                  groups.map((value) => (
                    <>
                      <option value={value.id}>{value.name}</option>
                    </>
                  ))}
              </select> */}
              <input
                type="search"
                onChange={(e) => handleSearch(e.target.value)}
                className="form-control rounded mx-2"
                placeholder="Search users by name & email"
                aria-label="Search"
                aria-describedby="search-addon"
              />
              <Link
                to="/users/create"
                className="btn btn-sm btn-primary me-2 text-white"
              >
                <i class="fa-solid fa-plus"></i> Create
              </Link>
              <button
                className="btn btn-sm btn-success me-2"
                id="active"
                onClick={(e) => handleCategory(e)}
              >
                Active
              </button>
              <button
                className="btn btn-sm btn-danger me-2"
                id="banned"
                onClick={(e) => handleCategory(e)}
              >
                Suspended
              </button>
              <button
                className="btn btn-sm btn-danger me-2"
                id="unapproved"
                onClick={(e) => handleCategory(e)}
              >
                Unapproved
              </button>
              {/* <Link className="btn btn-sm btn-danger me-2" to="/users/new">
                Unapproved
              </Link> */}
              <button
                className="btn btn-sm btn-warning"
                id="showall"
                onClick={(e) => handleCategory(e)}
              >
                Show All
              </button>
            </div>
          }
        />
      </div>
    </>
  );
};
