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
import { professionCol } from "./columns";
import { ProfessionDialog } from "./profession-dialog";
import { DeleteConfirmationDialog } from "../common/delete-confirmation-dialog";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

export default function ProfessionsTable() {
  // State for managing dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState(null);

  // Table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  // Fetch professions data
  const {
    data: professions = [],
    isLoading,
    error,
    refetch,
  } = useApiQuery(["professions"], "/profession", { staleTime: 1000 * 60 * 5 });

  // Delete mutation
  const { mutate: deleteProfession, isLoading: isDeleting } = useDeleteMutation("profession");

  // Handle edit profession
  const handleEdit = (profession) => {
    setSelectedProfession(profession);
    setIsEditDialogOpen(true);
  };

  // Handle delete profession
  const handleDelete = (profession) => {
    setSelectedProfession(profession);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (!selectedProfession) return;

    deleteProfession(selectedProfession._id, {
      onSuccess: () => {
        toast.success("Profession deleted successfully");
        setIsDeleteDialogOpen(false);
        refetch();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to delete profession");
      },
    });
  };

  // Table instance
  const table = useReactTable({
    data: professions,
    columns: professionCol,
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
            placeholder="Search profession name..."
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
          Add Profession
        </Button>
      </div>

      {/* Reusable table render */}
      <GenericTable table={table} />

      {/* Create Profession Dialog */}
      <ProfessionDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={() => refetch()}
      />

      {/* Edit Profession Dialog */}
      <ProfessionDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        profession={selectedProfession}
        onSuccess={() => refetch()}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Profession"
        description={`Are you sure you want to delete the profession "${selectedProfession?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
