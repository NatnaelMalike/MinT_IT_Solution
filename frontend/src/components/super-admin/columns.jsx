import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

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
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {

      return (
        <Button className="p-0" variant={"link"}>
          <Link to={`/user/id/${row.original.id}`}>View User</Link>
        </Button>
      );
    },
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      return (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => meta?.onEdit(row.original)}
            className="h-8 w-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => meta?.onDelete(row.original)}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
            <span className="sr-only">Delete</span>
          </Button>
        </div>
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      return (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => meta?.onEdit(row.original)}
            className="h-8 w-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
            <span className="sr-only">Edit</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => meta?.onDelete(row.original)}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      );
    },
  },
];
