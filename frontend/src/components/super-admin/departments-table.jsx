import React from "react";
import { useApiQuery } from "@/hooks/useApiQuery";
import { useDeleteMutation } from "@/hooks/useDeleteMutation";
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
import { departmentCol } from "./columns";
import { DepartmentDialog } from "./department-dialog";
import { DeleteConfirmationDialog } from "../common/delete-confirmation-dialog";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export default function DepartmentsTable() {
  // State for managing dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  // Fetch departments data
  const {
    data: departments = [],
    isLoading,
    error,
    refetch,
  } = useApiQuery(["departments"], "/department", { staleTime: 1000 * 60 * 5 });

  // Delete mutation
  const { mutate: deleteDepartment, isLoading: isDeleting } = useDeleteMutation("department");

  // Handle edit department
  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setIsEditDialogOpen(true);
  };

  // Handle delete department
  const handleDelete = (department) => {
    setSelectedDepartment(department);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (!selectedDepartment) return;

    deleteDepartment(selectedDepartment._id, {
      onSuccess: () => {
        toast.success("Department deleted successfully");
        setIsDeleteDialogOpen(false);
        refetch();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to delete department");
      },
    });
  };

  // Table instance
  const table = useReactTable({
    data: departments,
    columns: departmentCol,
    state: {
      columnFilters,
      sorting,
      columnVisibility,
    },
    meta: {
      onEdit: handleEdit,
      onDelete: handleDelete,
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
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search department name..."
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

        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Department
        </Button>
      </div>

      {/* Reusable table render */}
      <GenericTable table={table} />

      {/* Create Department Dialog */}
      <DepartmentDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={() => refetch()}
      />

      {/* Edit Department Dialog */}
      <DepartmentDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        department={selectedDepartment}
        onSuccess={() => refetch()}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Department"
        description={`Are you sure you want to delete the department "${selectedDepartment?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
