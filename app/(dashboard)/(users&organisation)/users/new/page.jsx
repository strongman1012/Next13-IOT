"use client";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
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
    username: yup.string().required("Username is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    firstName: yup.string().required("FirstName is Required"),
    lastName: yup.string().required("lastName is Required"),
    address: yup.string().required("Address is Required"),
    city: yup.string().required("City is Required"),
    postalCode: yup.string().required("PostalCode is Required"),
  })
  .required();

const actives = [
  { value: "allow", label: "allow" },
  { value: "block", label: "block" },
];

const NewUser = () => {
  const router = useRouter();
  const [active, setActive] = useState("allow");
  const [role, setRole] = useState(null);
  let roleList = [];
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
    const token = localStorage.getItem("token");
    fetch(serverAddress + "Role/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((result) => {
        result.map((val) => {
          roleList.push({ value: val.id, label: val.roleName });
        });
      });
  }, [roleList]);

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    data.active = active;
    data.roleId = role;
    fetch(serverAddress + "Authentication/register?password=1a2b3c", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
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
          setTimeout(() => router.push("/users"), 1000);
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
      <Card title="New User">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid-cols-2 grid gap-5 grid-cols-1 ">
            <Textinput
              name="username"
              label="username"
              type="text"
              register={register}
              error={errors.username}
            />
            <Textinput
              name="email"
              label="email"
              type="email"
              register={register}
              error={errors.email}
            />
            <Textinput
              name="firstName"
              label="firstName"
              type="text"
              register={register}
              error={errors.firstName}
            />
            <Textinput
              name="lastName"
              label="lastName"
              type="text"
              register={register}
              error={errors.lastName}
            />
            <Textinput
              name="address"
              label="address"
              type="text"
              register={register}
              error={errors.address}
            />
            <Textinput
              name="city"
              label="city"
              type="text"
              register={register}
              error={errors.city}
            />
            <Textinput
              name="postalCode"
              label="postalCode"
              type="text"
              register={register}
              error={errors.postalCode}
            />
            <div>
              <label htmlFor="hh" className="form-label ">
                Active
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                defaultValue={actives[0]}
                onChange={(e) => setActive(e.value)}
                options={actives}
                // styles={styles}
              />
            </div>
            <div>
              <label htmlFor="hh" className="form-label ">
                Role
              </label>
              <Select
                className="react-select"
                classNamePrefix="select"
                defaultValue=""
                onChange={(e) => setRole(e.value)}
                options={roleList}
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
                onClick={() => router.push("/users")}
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

export default NewUser;
