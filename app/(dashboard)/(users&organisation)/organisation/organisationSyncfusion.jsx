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
import React, { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function OrganisationSyncfusion() {
  const router = useRouter();
  let grid;
  const toolbar = ["PdfExport", "Search", "ExcelExport"];
  const [data, setData] = useState([]);
  // const [childData, setChildData] = useState([]);
  const [childGridOptions, setChildGridOptions] = useState({});
  const toolbarClick = (args) => {
    if (grid && args.item.id === "grid_pdfexport") {
      const exportProperties = {
        hierarchyExportMode: "Expanded",
      };
      grid.pdfExport(exportProperties);
    }
    if (grid && args.item.id === "grid_excelexport") {
      const exportProperties = {
        hierarchyExportMode: "Expanded",
      };
      grid.excelExport(exportProperties);
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
    let getData = await fetch("http://127.0.0.1:5231/api/Organisation/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());

    let tempData = [];
    let tempChildData = [];
    getData.map((val) => {
      if (val.parentOrganisationId === "top")
        tempData.push({ ...val, parent: val.organisationContactId });
      else tempChildData.push({ ...val, parent: val.parentOrganisationId });
    });

    setData(tempData);
    // setChildData(tempChildData);
    setChildGridOptions({
      columns: [
        {
          field: "parentOrganisationName",
          headerText: "Parent",
          textAlign: "Right",
        },
        {
          field: "organisationName",
          headerText: "Organisation",
          textAlign: "center",
        },
        {
          field: "organisationAddress",
          headerText: "Address",
          textAlign: "center",
        },
        {
          field: "organisationContactName",
          headerText: "Contact",
          textAlign: "center",
        },
        { field: "billingId", headerText: "Billing ID", textAlign: "center" },
        { field: "slug", headerText: "Slug", textAlign: "center" },
        { field: "active", headerText: "Active", textAlign: "center" },
        { headerText: "Actions", textAlign: "center", template: template },
      ],
      dataSource: tempChildData,
      queryString: "parent",
    });
  };
  const handleEdit = (id) => {
    router.push("/organisation/" + id);
  };
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    confirmAlert({
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            fetch("http://127.0.0.1:5231/api/Organisation?id=" + id, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`,
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
        childGrid={childGridOptions}
        pageSettings={pageOptions}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="parentOrganisationName"
            headerText="Parent"
            width="100"
            textAlign="center"
          />
          <ColumnDirective
            field="organisationName"
            headerText="Organisation"
            width="100"
            textAlign="center"
          />
          <ColumnDirective
            field="organisationAddress"
            headerText="Address"
            width="100"
            textAlign="center"
          />
          <ColumnDirective
            field="organisationContactName"
            headerText="Contact"
            width="100"
            textAlign="center"
          />
          <ColumnDirective
            field="billingId"
            width="100"
            headerText="Billing ID"
            textAlign="center"
          />
          <ColumnDirective
            field="slug"
            width="100"
            headerText="Slug"
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
export default OrganisationSyncfusion;
