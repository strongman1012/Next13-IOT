"use client";
import React from "react";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

const FormValidationSchema = yup
  .object({
    username: yup.string().required(),
    number: yup.number().required().positive(),
    betweenNumber: yup
      .number()
      .required("The Number between field is required")
      .positive()
      .min(1)
      .max(10),

    alphabetic: yup
      .string()
      .required()
      .matches(/^[a-zA-Z]+$/, "Must only consist of alphabetic characters"),
    length: yup.string().required("The Min Character field is required").min(3),

    password: yup.string().required().min(8),
    url: yup.string().required("The URL field is required").url(),
    message: yup.string().required("The Message field is required"),
  })
  .required();

const MyNewOrganisation = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = (data) => {
    //console.log(data);
  };

  return (
    <Card className="w-full h-full bg-white p-4">
      <div className="mx-auto 2xl:w-2/5 xl:w-3/5 lg:w-4/5 md:w-4/5 text-center">
        <p className="font-bold text-block-200 pb-5">New Organisation</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 text-left"
        >
          <Textinput
            label="Parent Organisation ID"
            type="text"
            placeholder="Type your User Name"
            name="parent_organisation_id"
            register={register}
            error={errors.parent_organisation_id}
          />
          <Textinput
            label="Organisation Name"
            type="text"
            placeholder="Enter Organisation Name"
            name="organisation_name"
            register={register}
            error={errors.organisation_name}
          />
          <Textinput
            label="Organisation Address"
            type="text"
            placeholder="Enter Organisation Address"
            name="organisation_address"
            register={register}
            error={errors.organisation_address}
          />

          <Textinput
            label="Organisation Contact ID"
            type="text"
            placeholder="Enter Organisation Contact ID"
            name="organisation_contact_id"
            register={register}
            error={errors.organisation_contact_id}
          />

          <Textinput
            label="Billing ID"
            type="text"
            placeholder="Enter Billing ID"
            name="billing_id"
            register={register}
            error={errors.billing_id}
          />
          <Textinput
            label="Slug"
            type="text"
            placeholder="Enter Slug"
            name="slug"
            register={register}
            error={errors.slug}
          />
          <Textinput
            label="Active"
            type="text"
            placeholder="Enter Active"
            name="active"
            register={register}
            error={errors.active}
          />

          <div className="grid grid-cols-2">
            <div>
              <button className="btn btn-success btn-sm text-center w-20">
                Save
              </button>
            </div>
            <div className="justify-self-end">
              <Button
                className="btn btn-secondary btn-sm text-center w-20"
                onClick={() => router.push("/my_organisation")}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default MyNewOrganisation;
