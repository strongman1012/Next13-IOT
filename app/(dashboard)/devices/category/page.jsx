"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import CategorySyncfucion from "./categorySyncfusion";

function CategoryPage() {
  const router = useRouter();
  return (
    <>
      <Card className="w-full bg-white">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-500 font-medium py-4">Device Type</span>
          </div>
          <div className="flex justify-end">
            <Button
              text="Add Category"
              className="btn-sm btn-success"
              onClick={() => router.push("/devices/category/new")}
            />
          </div>
        </div>
        <CategorySyncfucion />
      </Card>
    </>
  );
}
export default CategoryPage;
