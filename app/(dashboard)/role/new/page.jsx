"use client";
import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FormValidationSchema = yup
  .object({
    roleName: yup.string().required("RoleName is Required"),
    context: yup.number().required("Context is Required"),
  })
  .required();

const NewRole = () => {
  const router = useRouter();
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
    fetch(serverAddress + "Role", {
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
          setTimeout(() => router.push("/role"), 1000);
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
      <Card title="New Role">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid-cols-2 grid gap-5 grid-cols-1 ">
            <Textinput
              name="roleName"
              label="roleName"
              type="text"
              register={register}
              error={errors.roleName}
            />
            <Textinput
              name="context"
              label="context"
              type="text"
              register={register}
              error={errors.context}
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
                onClick={() => router.push("/role")}
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

export default NewRole;
