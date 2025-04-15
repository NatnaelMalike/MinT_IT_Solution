import React, { useMemo, useState } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import DataTableSkeleton from "../common/table-skeleton";
import { reportCol } from "./columns";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import { GenericTable } from "../common/generic-table";
import useAuthStore from "@/store/authStore";
const ReportTable = () => {
  const {user} = useAuthStore()
  const endpoint = user.role === 'NormalUser'? "/report/me": "/report"
  const { data: reports = [], isLoading, error } = useApiQuery(["report"], endpoint, {staleTime: 1000 * 60 * 5});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const table =  useReactTable({
      data: reports,
      columns: reportCol,
      state: {
        columnFilters,
        sorting,
        columnVisibility,
      },
      onColumnFiltersChange: setColumnFilters,
      onSortingChange: setSorting,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });
  if (isLoading) return <DataTableSkeleton/>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="mx-auto">
    <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filter titles..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" >
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
            <GenericTable table={table} />
    </div>
  );
};

export default ReportTable;
