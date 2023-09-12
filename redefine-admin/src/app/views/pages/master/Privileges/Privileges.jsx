import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Checkbox from "@mui/icons-material/CheckBox";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import { axiosInstance } from "../../../../config";
import { Toaster, toast } from "react-hot-toast";

export const Privileges = () => {
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
    const { data } = await axiosInstance.get(`masterprivileges/view`);
    setProjects(data);
  };

  const removeRow = async (e) => {
    let row_id = e;
    try {
      const deleteData = await axiosInstance.put(
        `masterprivileges/delete/${row_id}`
      );
      if (deleteData?.status === 200) {
        toast.success("Privilege deleted");
        getdata();
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <Link
            to={`/master/privileges/update/${row.id}`}
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
          title="Privileges"
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
                to="/master/privileges/create"
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
