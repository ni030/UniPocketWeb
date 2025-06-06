import { ColumnDef } from "@tanstack/react-table";
import { Calendar, MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import QRCode from "react-qr-code"
import { useState } from "react";
import { ResponsiveDialog } from "@/components/ResponsiveDialog";
import { useOpenEventDialog } from "../../hooks/use-open-event-dialog";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteEvent } from "../../hooks/use-delete-event";

export type Event = {
  id: string;
  eventName: string;
  role: "committee" | "participant";
  category: string;
  date: string;
};

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: "eventName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Event Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <div
          className={
            role === "committee"
              ? "text-blue-600 font-medium"
              : "text-green-600 font-medium"
          }
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </div>
      );
    },
    filterFn: "equals",
    enableSorting: true,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    filterFn: "equals",
    enableSorting: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex justify-between items-center"
      >
        Date
        <Calendar className="ml-2 h-4 w-4" />
      </Button>
    ),
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const event = row.original;
      const [showQRModal, setShowQRModal] = useState(false);

      const handleGenerateQR = () => {
        setShowQRModal(true);
      };

      const id = row.original.id as string;
      const { onOpen } = useOpenEventDialog();
      const deleteEvent = useDeleteEvent();

      const [ConfirmationDialog, confirm] = useConfirm(
        "Delete Event",
        "Are you sure you want to delete this event?"
      );

      const handleEdit = () => {
        onOpen(id);
      }

      const handleDelete = async () => {
        const ok = await confirm();
        if (ok) {
          deleteEvent.mutate(id);
        }
      }

      return (
        <>
        <ConfirmationDialog />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleGenerateQR}>
                Generate QR
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleEdit}>Edit event</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete}>Delete event</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {showQRModal && (
            <ResponsiveDialog
              open={showQRModal}
              onOpenChange={setShowQRModal}
              title={event.eventName}
            >
              <QRCode value={JSON.stringify(event)} />
            </ResponsiveDialog>
          )}
        </>
      );
    },
  },
];