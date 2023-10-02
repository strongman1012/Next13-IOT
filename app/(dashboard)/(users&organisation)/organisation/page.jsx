"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import OrganisationSyncfusion from "./organisationSyncfusion";

function OrganisationPage() {
  const router = useRouter();
  return (
    <>
      <Card className="w-full bg-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-500 font-medium py-4">
              Organisations
            </span>
          </div>
          <div className="flex justify-end">
            <Button
              text="Add Organisation"
              className="btn-sm btn-success"
              onClick={() => router.push("/organisation/new")}
            />
          </div>
        </div>
        <OrganisationSyncfusion />
      </Card>
    </>
  );
}
export default OrganisationPage;
