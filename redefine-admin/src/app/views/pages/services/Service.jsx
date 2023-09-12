import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Checkbox from "@mui/icons-material/CheckBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { axiosInstance } from "../../../config";
import { Toaster, toast } from "react-hot-toast";
// import { Filters } from './project/Filters';
//
export const Service = () => {
  const sortIcon = <ArrowDownward />;
  const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
  const [projects, setProjects] = useState([]);
  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axiosInstance.get(`services/view`);
    setProjects(data);
    console.log(data);
    console.log("res.data");
  };

  const removeRow = async(e) => {
    console.log(e);
    let row_id = e;
    try {
      const res = await axiosInstance.delete(`services/delete/${row_id}`);
      console.log(res)
      if (res.data?.success) {
        toast.success(res.data?.msg);
        getData();
          navigate("/service/home");
      }
      // getData();
      // const { notification } =  axiosInstance.post(`notifications/`, {title:"Service", subtitle:"Service Deleted", path:"/service/home"}).then(resp => {
      //     if(resp.data){
      //         console.log("ye", resp.data);
      //         window.localStorage.setItem("notification", JSON.stringify(resp.data));
      //         window.dispatchEvent(new Event("notification"));
      //     }
      // })
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = [
    {
      name: "Service",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Parent Service",
      selector: (row) => "-",
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <Link
            to={`/service/update/${row.id}`}
            title="Edit"
            className="btn btn-primary mr-1"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </Link>
          <button
            type="button"
            className="btn btn-danger btn-sm ms-2"
            onClick={(e) => removeRow(row.id)}
          >
            <i
              className="fa fa-trash"
              style={{ fontSize: "1.2rem" }}
              aria-hidden="true"
            ></i>
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <Toaster position="bottom-center" />
      <div className="container project-main-mod">
        <DataTable
          title="Services"
          pagination
          columns={columns}
          data={projects}
          expandableRowsComponent={ExpandedComponent}
          fixedHeader
          selectableRowsHighlight
          highlightOnHover
          actions={
            <div className="input-group text-end has_append  d-flex justify-content-end align-items-center">
              <Link
                to="/service/create"
                className="btn btn-sm btn-success me-3 text-white"
              >
                <i className="fa-solid fa-plus"></i> Create
              </Link>
            </div>
          }
        />
      </div>
    </>
  );
};
