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
    organisationName: yup.string().required("OrganisationName is Required"),
    organisationAddress: yup
      .string()
      .required("OrganisationAddress is Required"),
    billingId: yup.number().required("BillingId is Required"),
    slug: yup.string().required("Slug is Required"),
  })
  .required();

const actives = [
  { value: "allow", label: "allow" },
  { value: "block", label: "block" },
];

const NewOrganisation = () => {
  const router = useRouter();
  const [active, setActive] = useState("allow");
  const [parentOrganisationId, setParentOrganisationId] = useState(null);
  const [parentOrganisationName, setParentOrganisationName] = useState(null);
  const [organisationContactId, setOrganisationContactId] = useState(null);
  const [organisationContactName, setOrganisationContactName] = useState(null);
  const [parentList, setParentList] = useState([]);
  const [contactList, setContactList] = useState([]);
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
    if (parentList.length === 0 && contactList.length === 0) getList();
  }, [parentList, contactList]);

  const getList = async () => {
    const token = localStorage.getItem("token");
    const result = await fetch(serverAddress + "Organisation/parent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());
    const users = await fetch(serverAddress + "Users/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());
    let temp = [{ value: "top", label: "Top" }];
    let parentIds = [];
    result.map((val) => {
      temp.push({ value: val.organisationContactId, label: val.organisationContactName });
      parentIds.push(val.organisationContactId);
    });
    setParentList(temp);
    let tempContact = [];
    users.map((val) => {
      if (!parentIds.includes(val.id))
        tempContact.push({ value: val.id, label: val.username });
    });
    setContactList(tempContact);
    setParentOrganisationId(temp[0].value);
    setParentOrganisationName(temp[0].label);
    setOrganisationContactId(tempContact[0].value);
    setOrganisationContactName(tempContact[0].label);
  };
  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    data.organisationContactId = organisationContactId;
    data.organisationContactName = organisationContactName;
    data.parentOrganisationId = parentOrganisationId;
    data.parentOrganisationName = parentOrganisationName;
    data.active = active;
    fetch(serverAddress + "Organisation", {
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
          setTimeout(() => router.push("/organisation"), 1000);
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

  const handleParent = (e) => {
    setParentOrganisationId(e.value);
    setParentOrganisationName(e.label);
  };
  const handleContact = (e) => {
    setOrganisationContactId(e.value);
    setOrganisationContactName(e.label);
  };

  return (
    <div>
      <Card title="New Organisation">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:grid-cols-2 grid gap-5 grid-cols-1 ">
            <div>
              <label htmlFor="hh" className="form-label ">
                Parent
              </label>
              {parentList.length > 0 ? (
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={parentList[0]}
                  onChange={(e) => handleParent(e)}
                  options={parentList}
                />
              ) : null}
            </div>
            <Textinput
              name="organisationName"
              label="organisationName"
              type="text"
              register={register}
              error={errors.organisationName}
            />
            <Textinput
              name="organisationAddress"
              label="organisationAddress"
              type="text"
              register={register}
              error={errors.organisationAddress}
            />
            <div>
              <label htmlFor="hh" className="form-label ">
                OrganisationContactId
              </label>
              {contactList.length > 0 ? (
                <Select
                  className="react-select"
                  classNamePrefix="select"
                  defaultValue={contactList[0]}
                  onChange={(e) => handleContact(e)}
                  options={contactList}
                />
              ) : null}
            </div>
            <Textinput
              name="billingId"
              label="billingId"
              type="number"
              register={register}
              error={errors.billingId}
            />
            <Textinput
              name="slug"
              label="slug"
              type="text"
              register={register}
              error={errors.slug}
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
                onClick={() => router.push("/organisation")}
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

export default NewOrganisation;
