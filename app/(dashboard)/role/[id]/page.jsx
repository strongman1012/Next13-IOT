"use client";
import React, { useState, useEffect } from "react";
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
    roleName: yup.string().notRequired("RoleName is Required"),
    context: yup.number().notRequired("Context is Required"),
  })
  .required();

const EditRole = (props) => {
  const router = useRouter();
  const { id } = props.params;
  const [roleName, setRoleName] = useState(null);
  const [context, setContext] = useState(null);

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
    let getData = await fetch(serverAddress + "Role/id?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());

    setRoleName(getData.roleName);
    setContext(getData.context);
  };
  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    data.roleName = data.roleName ? data.roleName : roleName;
    data.context = data.context ? data.context : context;
    fetch(serverAddress + "Role/id?id=" + id, {
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
      <Card title="Edit Role">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid-cols-2 grid gap-5 grid-cols-1 ">
            <Textinput
              name="roleName"
              label="roleName"
              type="text"
              defaultValue={roleName}
              register={register}
              error={errors.roleName}
            />
            <Textinput
              name="context"
              label="context"
              type="text"
              defaultValue={context}
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

export default EditRole;
