import React, { useMemo } from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import DataTableSkeleton from "../common/table-skeleton";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GenericTable } from "../common/generic-table";
import { userCol } from "./columns";
import RegistrationDialog from "./register-user-dialog";

export default function TechniciansTable() {
    const {
      data: users = [],
      isLoading,
      error,
    } = useApiQuery(["users", "technicians"], "/user/technicians", { staleTime: 1000 * 60 * 5 });
  
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
  
    const table = useReactTable({
      data: users,
      columns: userCol,
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
  
    if (isLoading) return <DataTableSkeleton />;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;
  
    return (
      <div className="mx-auto">
        <RegistrationDialog/>
        <div className="flex justify-between items-center py-4">
          <Input
            placeholder="Search name..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    className="capitalize"
                    checked={col.getIsVisible()}
                    onCheckedChange={(val) => col.toggleVisibility(!!val)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <GenericTable table={table} />
      </div>
    );
}