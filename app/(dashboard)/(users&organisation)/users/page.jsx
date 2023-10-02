"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import UsersSyncfucion from "./usersSyncfusion";

function UsersPage() {
  const router = useRouter();
  return (
    <>
      <Card className="w-full bg-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-500 font-medium py-4">Users</span>
          </div>
          <div className="flex justify-end">
            <Button
              text="Add User"
              className="btn-sm btn-success"
              onClick={() => router.push("/users/new")}
            />
          </div>
        </div>
        <UsersSyncfucion />
      </Card>
    </>
  );
}
export default UsersPage;
