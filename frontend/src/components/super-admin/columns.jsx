import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";

const userStatus = {
  pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  active:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  inactive: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

export const userCol = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => row.original.department.name,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "profession",
    header: "Profession",
    cell: ({ row }) => {
      return row.original.role === "TechnicianUser"
        ? row.original.profession.name
        : "None";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          className={`${userStatus[row.original.status]} text-sm px-3 py-1`}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Member since",
  },
];
export const departmentCol = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "sector",
    header: "Sector",
  },
  {
    accessorKey: "isActive",
    header: "Available",
    cell: ({ row }) => {
      return row.original.isActive ? (
        <Badge className="text-sm px-3 py-1">Yes</Badge>
      ) : (
        <Badge variant={"destructive"} className="text-sm px-3 py-1">
          No
        </Badge>
      );
    },
  },
];
export const professionCol = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  // {
  //   accessorKey: "isActive",
  //   header: "Available",
  //   cell: ({ row }) => {
  //     return row.original.isActive ? (
  //       <Badge className="text-sm px-3 py-1">Yes</Badge>
  //     ) : (
  //       <Badge variant={"destructive"} className="text-sm px-3 py-1">
  //         No
  //       </Badge>
  //     );
  //   },
  // },
];
