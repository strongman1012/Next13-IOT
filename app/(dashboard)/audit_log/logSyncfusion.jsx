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
  Sort,
} from "@syncfusion/ej2-react-grids";
// import { DataManager, UrlAdaptor } from "@syncfusion/ej2-data";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function LogSyncfusion() {
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
    let tempData = await fetch("http://127.0.0.1:5231/api/AuditLog", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
    }).then((res) => res.json());
    setData(tempData);
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
            field="userId"
            headerText="UserId"
            width="130"
            textAlign="center"
          />
          <ColumnDirective
            field="affectedUser"
            headerText="Username"
            width="130"
            textAlign="center"
          />
          <ColumnDirective
            field="time"
            headerText="Time"
            width="130"
            textAlign="center"
          />
          <ColumnDirective
            field="eventContext"
            headerText="EventContext"
            width="130"
            textAlign="center"
          />
          <ColumnDirective
            field="eventName"
            headerText="EventName"
            width="130"
            textAlign="center"
          />
          <ColumnDirective
            field="description"
            headerText="Description"
            width="130"
            textAlign="center"
          />
          <ColumnDirective
            field="status"
            headerText="Status"
            width="130"
            textAlign="center"
          />
        </ColumnsDirective>
        <Inject
          services={[
            Page,
            Sort,
            Toolbar,
            Search,
            ExcelExport,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
}
export default LogSyncfusion;
