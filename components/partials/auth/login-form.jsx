"use client";
import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Checkbox from "@/components/ui/Checkbox";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { handleLogin } from "./store";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  // const { user, isAuth } = useSelector((state) => state.auth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const router = useRouter();
  const onSubmit = (data) => {
    const serverAddress = "http://127.0.0.1:5231/api/";
    fetch(serverAddress + "Authentication/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message)
          toast.error(result.message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        else {
          dispatch(handleLogin(result));
          fetch(serverAddress + "AuditLog", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: result.id,
              affectedUser: result.username,
              eventContext: "Login",
              eventName: "User Login",
              description: "User has successfully logged in",
              status: "Success",
            }),
          })
          setTimeout(() => router.push("/analytics"), 1500);
        }
      });
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        defaultValue="rakeshg@astainnosys.com"
        type="email"
        register={register}
        error={errors?.email}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        defaultValue="password"
        register={register}
        error={errors.password}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
