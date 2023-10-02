"use client";

import React from "react";
import Card from "@/components/ui/Card";
// import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import LogSyncfucion from "./logSyncfusion";

function AuditLogPage() {
  const router = useRouter();
  return (
    <>
      <Card className="w-full bg-white">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <span className="text-slate-500 font-medium py-4">Audit Log</span>
          </div>
        </div>
        <LogSyncfucion />
      </Card>
    </>
  );
}
export default AuditLogPage;
