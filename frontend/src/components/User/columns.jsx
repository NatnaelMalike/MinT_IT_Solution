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
export const columns = [
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
  },
  {
    accessorKey: "isConfidential",
    header: "Confidential",
  },
  {
    accessorKey: "status",
    header: "Status",
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
    cell: ({ row }) => {
      const issue = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Reporter</DropdownMenuItem>
            <DropdownMenuItem><Link to={`/user/issue/${issue.id}`}> View issue details</Link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
