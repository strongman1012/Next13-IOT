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
    username: yup.string().notRequired("Username is Required"),
    email: yup
      .string()
      .required("Invalid email")
      .notRequired("Email is Required"),
    firstName: yup.string().notRequired("FirstName is Required"),
    lastName: yup.string().notRequired("lastName is Required"),
    address: yup.string().notRequired("Address is Required"),
    city: yup.string().notRequired("City is Required"),
    postalCode: yup.string().notRequired("PostalCode is Required"),
  })
  .required();

const actives = [
  { value: "allow", label: "allow" },
  { value: "block", label: "block" },
];

const EditUser = (props) => {
  const router = useRouter();
  const { id } = props.params;
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [active, setActive] = useState(null);
  const [role, setRole] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const [roleList, setRoleList] = useState([]);
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
    if (id) getUserData();
  }, [id]);

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    let getData = await fetch(serverAddress + "Users/id?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
    }).then((res) => res.json());

    let getRoleList = await fetch(serverAddress + "Role/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${token}`
      },
    }).then((res) => res.json());

    const roleInd = getRoleList.findIndex((val) => {
      return getData.roleId == val.id;
    });
    setRoleIndex(roleInd);
    const activeInd = actives.findIndex((val) => {
      return getData.active == val.value;
    });
    setActiveIndex(activeInd);
    let tempRoleList = [];
    getRoleList.map((val) => {
      tempRoleList.push({ value: val.id, label: val.roleName });
    });
    setRoleList(tempRoleList);
    setUsername(getData.username);
    setFirstName(getData.firstName);
    setLastName(getData.lastName);
    setEmail(getData.email);
    setAddress(getData.address);
    setCity(getData.city);
    setPostalCode(getData.postalCode);
    setRole(getData.roleId);
    setActive(getData.active);
  };
  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    data.username = data.username ? data.username : username;
    data.firstName = data.firstName ? data.firstName : firstName;
    data.lastName = data.lastName ? data.lastName : lastName;
    data.email = data.email ? data.email : email;
    data.address = data.address ? data.address : address;
    data.city = data.city ? data.city : city;
    data.postalCode = data.postalCode ? data.postalCode : postalCode;
    data.active = active;
    data.roleId = role;
    fetch(serverAddress + "Users/id?id=" + id, {
      method: "PUT",
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
      <Card title="Edit User">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid-cols-2 grid gap-5 grid-cols-1 ">
            <Textinput
              name="username"
              label="username"
              type="text"
              defaultValue={username}
              register={register}
              error={errors.username}
            />
            <Textinput
              name="email"
              label="email"
              type="email"
              defaultValue={email}
              register={register}
              error={errors.email}
            />
            <Textinput
              name="firstName"
              label="firstName"
              type="text"
              defaultValue={firstName}
              register={register}
              error={errors.firstName}
            />
            <Textinput
              name="lastName"
              label="lastName"
              type="text"
              defaultValue={lastName}
              register={register}
              error={errors.lastName}
            />
            <Textinput
              name="address"
              label="address"
              type="text"
              defaultValue={address}
              register={register}
              error={errors.address}
            />
            <Textinput
              name="city"
              label="city"
              type="text"
              defaultValue={city}
              register={register}
              error={errors.city}
            />
            <Textinput
              name="postalCode"
              label="postalCode"
              type="text"
              defaultValue={postalCode}
              register={register}
              error={errors.postalCode}
            />
            <div>
              <label htmlFor="hh" className="form-label ">
                Active
              </label>
              {activeIndex !== null ? (
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={actives[activeIndex]}
                  onChange={(e) => setActive(e.value)}
                  options={actives}
                />
              ) : null}
            </div>
            <div>
              <label htmlFor="hh" className="form-label ">
                Role
              </label>
              {roleList.length > 0 ? (
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={roleList[roleIndex]}
                  onChange={(e) => setRole(e.value)}
                  options={roleList}
                />
              ) : null}
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

export default EditUser;
