"use client";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Select from "react-select";
import { toast } from "react-toastify";

const FormValidationSchema = yup
  .object({
    modelNo: yup.string().notRequired("ModelNo is Required"),
    modelDescription: yup.string().notRequired("ModelDescription is Required"),
    transmissionType: yup.string().notRequired("TransmissionType is Required"),
    brand: yup.string().notRequired("Brand is Required"),
    productURL: yup.string().notRequired("ProductURL is Required").url(),
  })
  .required();

const EditDeviceModel = (props) => {
  const router = useRouter();
  const { id } = props.params;
  const [modelNo, setModelNo] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [modelDescription, setModelDescription] = useState(null);
  const [transmissionType, setTransmissionType] = useState(null);
  const [brand, setBrand] = useState(null);
  const [productURL, setProductURL] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(null);

  const [categoryList, setCategoryList] = useState([]);
  const serverAddress = "http://127.0.0.1:5231/api/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  useEffect(() => {
    if (id) getCategoryData();
  }, [id]);

  const getCategoryData = async () => {
    const token = localStorage.getItem("token");
    let getData = await fetch(serverAddress + "DeviceModel/id?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());

    let getCategoryList = await fetch(serverAddress + "DeviceCategory/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());

    const categoryInd = getCategoryList.findIndex((val) => {
      return getData.categoryID == val.id;
    });
    setCategoryIndex(categoryInd);

    let tempCategoryList = [];
    getCategoryList.map((val) => {
      tempCategoryList.push({ value: val.id, label: val.categoryName });
    });
    setCategoryList(tempCategoryList);
    setModelNo(getData.modelNo);
    setModelDescription(getData.modelDescription);
    setTransmissionType(getData.transmissionType);
    setBrand(getData.brand);
    setProductURL(getData.productURL);
    setCategoryID(getData.categoryID);
  };
  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    data.modelNo = data.modelNo ? data.modelNo : modelNo;
    data.modelDescription = data.modelDescription
      ? data.modelDescription
      : modelDescription;
    data.transmissionType = data.transmissionType
      ? data.transmissionType
      : transmissionType;
    data.brand = data.brand ? data.brand : brand;
    data.productURL = data.productURL ? data.productURL : productURL;
    data.categoryID = categoryID;
    fetch(serverAddress + "DeviceModel/id?id=" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.state === 1) {
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
          setTimeout(() => router.push("/devices/model"), 1000);
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
  };

  return (
    <div>
      <Card title="Edit Device Model">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid-cols-2 grid gap-5 grid-cols-1 ">
            <Textinput
              name="modelNo"
              label="modelNo"
              type="text"
              defaultValue={modelNo}
              register={register}
              error={errors.modelNo}
            />
            <div>
              <label htmlFor="hh" className="form-label ">
                CategoryID
              </label>
              {categoryList.length > 0 ? (
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={categoryList[categoryIndex]}
                  onChange={(e) => setCategoryID(e.value)}
                  options={categoryList}
                />
              ) : null}
            </div>
            <Textarea
              name="modelDescription"
              label="modelDescription"
              defaultValue={modelDescription}
              type="text"
              register={register}
              error={errors.modelDescription}
            />
            <Textinput
              name="transmissionType"
              label="transmissionType"
              type="text"
              defaultValue={transmissionType}
              register={register}
              error={errors.transmissionType}
            />
            <Textinput
              name="brand"
              label="brand"
              type="text"
              defaultValue={brand}
              register={register}
              error={errors.brand}
            />
            <Textinput
              name="productURL"
              label="productURL"
              type="text"
              defaultValue={productURL}
              register={register}
              error={errors.productURL}
            />
          </div>

          <div className="grid grid-cols-2 mt-9 mb-3">
            <div>
              <Button
                type="submit"
                className="btn btn-sm btn-success text-center w-20"
              >
                Save
              </Button>
            </div>
            <div className="justify-self-end">
              <Button
                className="btn btn-sm btn-secondary text-center w-20"
                onClick={() => router.push("/devices/model")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditDeviceModel;
