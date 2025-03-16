import { ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  CloudLightning,
  DropletIcon,
  Lightbulb,
  MoreHorizontal,
  Wrench,
} from "lucide-react";
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
import { useOpenUserDialog } from "@/hooks/use-open-user-dialog";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import { ImagePreview } from "./ImagePreview";
import { cn } from "@/lib/utils";
import { useUpdateComplaint } from "../../hooks/use-update-complaint";

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
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updateStatus = useUpdateComplaint(row.original.id);

      const status = row.getValue("status") as string;
      const statusTypes = ["Received", "In-progress", "Completed", "Cancelled"];
      const trimStatus = status.trim().toLowerCase();

      const statusColor =
        trimStatus === "completed"
          ? "text-green-500 hover:text-green-400"
          : trimStatus === "in-progress"
          ? "text-yellow-500 hover:text-yellow-400"
          : trimStatus === "cancelled"
          ? "text-red-500 hover:text-red-400"
          : "text-blue-500 hover:text-blue-400";

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn("flex items-center gap-2", statusColor)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statusTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => updateStatus?.mutate(type)}
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
    cell: ({ row }) => {
      const type = row.getValue("type") as string;

      return (
        <div className="flex gap-2 items-center">
          {type === "Electricity" ? (
            <CloudLightning />
          ) : type === "Water" ? (
            <DropletIcon className="fill-blue-100" />
          ) : (
            <Wrench />
          )}
          <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        </div>
      );
    },
    filterFn: "equals",
    enableSorting: true,
  },
  {
    accessorKey: "userId",
    header: "Complainant",
    cell: ({ row }) => {
      const userId = row.getValue("userId") as string;
      const { onOpen } = useOpenUserDialog();

      const handleOpenDialog = () => {
        onOpen(userId);
      };

      return (
        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenDialog}
            className="text-blue-500 underline hover:text-blue-700 cursor-pointer"
          >
            View Details
          </button>
        </div>
      );
    },
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
  {
    accessorKey: "image",
    header: "Evidence",
    cell: ({ row }) => {
      const [preview, setPreview] = useState(false);
      const image = row.getValue("image") as string;

      return (
        <>
          <ResponsiveDialog
            open={preview}
            onOpenChange={setPreview}
            title="Complaint Evidence"
          >
            <ImagePreview src={image} alt="Complaint evidence" />
          </ResponsiveDialog>
          <button
            onClick={() => setPreview(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={image}
              alt="Complaint evidence"
              className="h-10 w-10 object-cover rounded-lg"
            />
          </button>
        </>
      );
    },
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
