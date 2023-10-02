"use client";
import { ColumnDirective, ColumnsDirective } from "@syncfusion/ej2-react-grids";
import {
  GridComponent,
  Inject,
  Page,
  Toolbar,
  ExcelExport,
  PdfExport,
  Search,
  DetailRow,
  Sort,
} from "@syncfusion/ej2-react-grids";
// import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function UsersSyncfusion() {
  const router = useRouter();
  let grid;
  const toolbar = ["PdfExport", "Search", "ExcelExport"];
  const [data, setData] = useState([]);

  const toolbarClick = (args) => {
    if (grid && args.item.id === "grid_pdfexport") {
      grid.pdfExport();
    }
    if (grid && args.item.id === "grid_excelexport") {
      grid.excelExport();
    }
  };

  const pageOptions = {
    pageSize: 10,
    pageSizes: true,
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = localStorage.getItem("token");
    let tempData = await fetch("http://127.0.0.1:5231/api/Users/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
    }).then((res) => res.json());
    const length = tempData.length;
    let roleList = await fetch("http://127.0.0.1:5231/api/Role/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
    }).then((res) => res.json());

    for (let i = 0; i < length; i++) {
      let index = roleList.findIndex((val) => {
        return tempData[i].roleId == val.id;
      });
      if (index === -1) tempData[i].role = "";
      else tempData[i].role = roleList[index].roleName;
    }
    setData(tempData);
  };

  const handleEdit = (id) => {
    router.push("/users/" + id);
  };
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    confirmAlert({
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch("http://127.0.0.1:5231/api/Users?id=" + id, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`
              },
            })
              .then((res) => res.json())
              .then((result) => {
                if (result.state === 1) {
                  getData();
                  toast.success(result.message, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                } else
                  toast.error(result.message, {
                    position: "top-right",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
              });
          },
        },
        {
          label: "No",
          onClick: () => {
            console.log("Canceled");
          },
        },
      ],
    });
  };

  const actionTemplate = (rowData) => {
    return (
      <>
        <button
          className="mr-5 e-edit e-icons"
          onClick={() => handleEdit(rowData.id)}
        ></button>
        <button
          className="e-delete e-icons"
          onClick={() => handleDelete(rowData.id)}
        ></button>
      </>
    );
  };

  const template = (props) => {
    return <div>{actionTemplate(props)}</div>;
  };
  return (
    <div className="py-5 w-full">
      <GridComponent
        id="grid"
        dataSource={data}
        allowPaging={true}
        allowExcelExport={true}
        allowPdfExport={true}
        allowSorting={true}
        height={420}
        toolbar={toolbar}
        toolbarClick={toolbarClick}
        pageSettings={pageOptions}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="username"
            headerText="Username"
            width="100"
            textAlign="center"
          />
          <ColumnDirective
            field="firstName"
            headerText="FirstName"
            width="100"
            textAlign="center"
          />
          <ColumnDirective
            field="lastName"
            headerText="LastName"
            width="100"
            textAlign="center"
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="150"
            textAlign="center"
          />
          <ColumnDirective
            field="address"
            headerText="Address"
            width="100"
            textAlign="center"
          />
          <ColumnDirective
            field="role"
            width="100"
            headerText="Role"
            textAlign="center"
          />
          <ColumnDirective
            field="active"
            width="100"
            headerText="Active"
            textAlign="center"
          />
          <ColumnDirective
            headerText="Actions"
            width="100"
            textAlign="center"
            template={template}
          />
        </ColumnsDirective>
        <Inject
          services={[
            Page,
            Sort,
            Toolbar,
            Search,
            DetailRow,
            ExcelExport,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
}
export default UsersSyncfusion;
