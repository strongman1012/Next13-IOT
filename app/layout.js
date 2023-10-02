"use client";
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-svg-map/lib/index.css";
import "leaflet/dist/leaflet.css";
import "./scss/app.scss";
import { Provider } from "react-redux";
import store from "../store";
import { registerLicense } from "@syncfusion/ej2-base";
import { ToastContainer } from "react-toastify";
export default function RootLayout({ children }) {
  registerLicense(
    "ORg4AjUWIQA/Gnt2VFhiQlhPcUBKQmFJfFBmQWlYeFRwd0U3HVdTRHRcQltjQX5XdURmWnpXcXw="
  );
  // registerLicense('@32312E312E3232bkOVb/Donh5md37J/QdgVOQvUyEqjSNIrJVS+djxuCU='); // 21.1.35
  return (
    <>
      <html lang="en">
        <body className="font-inter  custom-tippy dashcode-app">
          <ToastContainer />
          <Provider store={store}>{children}</Provider>
        </body>
      </html>
    </>
  );
}
