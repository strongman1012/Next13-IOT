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
  Sort
} from "@syncfusion/ej2-react-grids";
import * as React from "react";
import { data, childData } from "../data";

function MyOrganisationSyncfusion() {
  let grid;
  const toolbar = ["PdfExport", "Search", "ExcelExport"];
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

  const childGridOptions = {
    columns: [
      {
        field: "parent_organisation_id",
        headerText: "Parent Organisation ID",
        textAlign: "Right",
      },
      {
        field: "organisation_name",
        headerText: "Organisation Name",
        textAlign: "center",
      },
      {
        field: "organisation_address",
        headerText: "Organisation Address",
        textAlign: "center",
      },
      {
        field: "organisation_contact_id",
        headerText: "Organisation Contact ID",
        textAlign: "center",
      },
      { field: "billing_id", headerText: "Billing ID", textAlign: "center" },
      { field: "slug", headerText: "Slug", textAlign: "center" },
      { field: "active", headerText: "Active", textAlign: "center" },
    ],
    dataSource: childData,
    queryString: "organisation_name",
  };

  const pageOptions = {
    pageSize: 10,
    pageSizes: true,
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
            field="parent_organisation_id"
            headerText="Parent Organisation ID"
            textAlign="center"
          />
          <ColumnDirective
            field="organisation_name"
            headerText="Organisation Name"
            textAlign="center"
          />
          <ColumnDirective
            field="organisation_address"
            headerText="Organisation Address"
            textAlign="center"
          />
          <ColumnDirective
            field="organisation_contact_id"
            headerText="Organisation Contact ID"
            textAlign="center"
          />
          <ColumnDirective
            field="billing_id"
            headerText="Billing ID"
            textAlign="center"
          />
          <ColumnDirective field="slug" headerText="Slug" textAlign="center" />
          <ColumnDirective
            field="active"
            headerText="Active"
            textAlign="center"
          />
        </ColumnsDirective>
        <Inject
          services={[Page, Sort, Toolbar, Search, DetailRow, ExcelExport, PdfExport]}
        />
      </GridComponent>
    </div>
  );
}
export default MyOrganisationSyncfusion;
