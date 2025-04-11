import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useApiQuery } from "@/hooks/useApiQuery";
import DataTableSkeleton from "../common/table-skeleton";

const ReportTable = () => {
  const { data, isLoading, error } = useApiQuery(["report"], "/report/me", {staleTime: 1000 * 60 * 5});

  if (isLoading) return <DataTableSkeleton/>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="container mx-auto py-10">
      {data?.reports?.length > 0 ? (
        <DataTable columns={columns} data={data.reports} />
      ) : (
        <p className="text-center">No reports found.</p>
      )}
    </div>
  );
};

export default ReportTable;
