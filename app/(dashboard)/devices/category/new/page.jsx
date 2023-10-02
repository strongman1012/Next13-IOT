"use client";
import React, { useState } from "react";
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
    categoryName: yup.string().required("CategoryName is Required"),
    categoryDescription: yup
      .string()
      .required("CategoryDescription is Required"),
    imageURL: yup.string().required("ImageURL is Required").url(),
  })
  .required();

const actives = [
  { value: "allow", label: "allow" },
  { value: "block", label: "block" },
];

const NewCategory = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState("allow");
  const serverAddress = "http://127.0.0.1:5231/api/";
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    data.isActive = isActive;
    fetch(serverAddress + "DeviceCategory", {
      method: "POST",
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
          setTimeout(() => router.push("/devices/category"), 1000);
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
      <Card title="New Device Category">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid-cols-2 grid gap-5 grid-cols-1 ">
            <Textinput
              name="categoryName"
              label="categoryName"
              type="text"
              register={register}
              error={errors.categoryName}
            />
            <Textarea
              name="categoryDescription"
              label="categoryDescription"
              type="text"
              register={register}
              error={errors.categoryDescription}
            />
            <Textinput
              name="imageURL"
              label="imageURL"
              type="text"
              register={register}
              error={errors.imageURL}
            />
            <div>
              <label htmlFor="hh" className="form-label ">
                IsActive
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                defaultValue={actives[0]}
                onChange={(e) => setIsActive(e.value)}
                options={actives}
              />
            </div>
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
                onClick={() => router.push("/devices/category")}
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

export default NewCategory;
