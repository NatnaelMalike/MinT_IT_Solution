import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { useRoles } from "@/hooks/useRoles";
const statusColors = {
  Pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "In Progress":
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  Resolved:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  Closed: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
};
const priorityColors = {
  Low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  Medium: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  High: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  Critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};
export const reportCol = [
  {
    accessorKey: "issuedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Issued At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      return (
        <Badge
        className={`${
          priorityColors[row.original.priority]
        } text-sm px-3 py-1`}
      >
        {row.original.priority}
      </Badge>
      );
    },
  },
  {
    accessorKey: "isConfidential",
    header: "Confidential",
    cell: ({ row }) => {
      return (
        row.original.isConfidential ? (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-sm px-3 py-1">
            Yes
          </Badge>
        ) : (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-sm px-3 py-1">
            No
          </Badge>
        )
     
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
        className={`${
          statusColors[row.original.status]
        } text-sm px-3 py-1`}
      >
        {row.original.status}
      </Badge>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      return row.original.tags?.map((tag, index) => (
        <Badge key={index} variant="default" className="text-xs px-2 py-1 mr-1">
          {tag}
        </Badge>
      ));
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const issue = row.original;
      const {isUser} = useRoles()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {!isUser && (
            <DropdownMenuItem>
              <Link to={`/user/id/${issue.reportedBy._id}`}>View Reporter</Link>
            </DropdownMenuItem>
          )}
            <DropdownMenuItem><Link to={`/user/issue/${issue.id}`}> View issue details</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
