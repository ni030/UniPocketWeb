import { ColumnDef } from "@tanstack/react-table";
import { Calendar, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export type Complaint = {
  id: string;
  status: string;
  type: string;
  date: string;
};

export const columns: ColumnDef<Complaint>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Complaint Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const trimStatus = status.trim().toLowerCase();

      return (
        <div
          className={
            trimStatus === "completed"
              ? "text-green-600"
              : trimStatus === "in-progress"
              ? "text-yellow-600"
              : "text-red-600"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
    filterFn: "equals",
    enableSorting: true,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: "equals",
    enableSorting: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-between items-center"
        >
          Date
          <Calendar className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateStr = row.getValue("date") as string;
      // Format date to a more readable version
      const date = new Date(dateStr);
      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(date);

      return <div className="font-medium">{formatted}</div>;
    },
    enableSorting: true,
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     const event = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(event.eventId)}
  //           >
  //             Copy event ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View event details</DropdownMenuItem>
  //           <DropdownMenuItem>Edit event</DropdownMenuItem>
  //           <DropdownMenuItem>Manage participants</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
