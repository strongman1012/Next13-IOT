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
    organisationName: yup.string().notRequired("OrganisationName is Required"),
    orgainsationAddress: yup
      .string()
      .notRequired("OrgainsationAddress is Required"),
    billingId: yup.string().notRequired("BillingId is Required"),
    slug: yup.string().notRequired("Slug is Required"),
  })
  .required();

const actives = [
  { value: "allow", label: "allow" },
  { value: "block", label: "block" },
];

const EditOrganisation = (props) => {
  const router = useRouter();
  const { id } = props.params;
  const [organisationName, setOrganisationName] = useState(null);
  const [organisationAddress, setOrganisationAddress] = useState(null);
  const [billingId, setBillingId] = useState(null);
  const [slug, setSlug] = useState(null);
  const [active, setActive] = useState(null);
  const [parentOrganisationId, setParentOrganisationId] = useState(null);
  const [parentOrganisationName, setParentOrganisationName] = useState(null);
  const [organisationContactId, setOrganisationContactId] = useState(null);
  const [organisationContactName, setOrganisationContactName] = useState(null);
  const [parentList, setParentList] = useState([]);
  //   const [contactList, setContactList] = useState([]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [parentIndex, setParentIndex] = useState(null);
  //   const [contactIndex, setContactIndex] = useState(null);
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
    if (id) getData();
  }, [id]);

  const getData = async () => {
    const token = localStorage.getItem("token");

    let getData = await fetch(serverAddress + "Organisation/id?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());

    const result = await fetch(serverAddress + "Organisation/parent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());

    let temp = [{ value: "top", label: "Top" }];
    let parentIds = [];
    result.map((val) => {
      temp.push({
        value: val.organisationContactId,
        label: val.organisationContactName,
      });
      parentIds.push(val.organisationContactId);
    });
    setParentList(temp);
    const parentInd = temp.findIndex((val) => {
      return getData.parentOrganisationId == val.value;
    });
    setParentIndex(parentInd);

    const activeInd = actives.findIndex((val) => {
      return getData.active == val.value;
    });
    setActiveIndex(activeInd);

    setOrganisationName(getData.organisationName);
    setOrganisationAddress(getData.organisationAddress);
    setBillingId(getData.billingId);
    setSlug(getData.slug);
    setActive(getData.active);
    setParentOrganisationId(getData.parentOrganisationId);
    setParentOrganisationName(getData.parentOrganisationName);
    setOrganisationContactId(getData.organisationContactId);
    setOrganisationContactName(getData.organisationContactName);
  };
  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    data.organisationName = data.organisationName
      ? data.organisationName
      : organisationName;
    data.organisationAddress = data.organisationAddress
      ? data.organisationAddress
      : organisationAddress;
    data.billingId = data.billingId ? data.billingId : billingId;
    data.slug = data.slug ? data.slug : slug;
    data.organisationContactId = organisationContactId;
    data.organisationContactName = organisationContactName;
    data.parentOrganisationId = parentOrganisationId;
    data.parentOrganisationName = parentOrganisationName;
    data.active = active;
    
    fetch(serverAddress + "Organisation/id?id=" + id, {
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
  return (
    <div>
      <Card title="Edit Organisation">
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
                  defaultValue={parentList[parentIndex]}
                  onChange={(e) => handleParent(e)}
                  options={parentList}
                />
              ) : null}
            </div>
            <Textinput
              name="organisationName"
              label="organisationName"
              type="text"
              defaultValue={organisationName}
              register={register}
              error={errors.organisationName}
            />
            <Textinput
              name="organisationAddress"
              label="organisationAddress"
              type="text"
              defaultValue={organisationAddress}
              register={register}
              error={errors.organisationAddress}
            />
            <Textinput
              name="organisationContactName"
              label="organisationContactName"
              type="text"
              disabled={true}
              defaultValue={organisationContactName}
              register={register}
              error={errors.organisationContactName}
            />
            <Textinput
              name="billingId"
              label="billingId"
              type="number"
              defaultValue={billingId}
              register={register}
              error={errors.billingId}
            />
            <Textinput
              name="slug"
              label="slug"
              type="text"
              defaultValue={slug}
              register={register}
              error={errors.slug}
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

export default EditOrganisation;
