import { ColumnDef } from "@tanstack/react-table";
import { DoorOpen, Hotel, Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type Room = {
  userId: string;
  name: string;
  email: string;
  phoneNum: string;
  block: string;
  room: string;
};

export const columns: ColumnDef<Room>[] = [
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
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => <div>{row.getValue("userId")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <User className="h-5 w-5 mr-1" />
          Name
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("name")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "email",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Mail className="h-5 w-5 mr-1" />
          Email
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("email")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "phoneNum",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Phone className="h-5 w-5 mr-1" />
          Phone Number
        </div>
      );
    },
    cell: ({ row }) => {
      const phoneNum = row.getValue("phoneNum") as string;
      return <div className="text-center">{phoneNum}</div>;
    },

    enableSorting: true,
  },
  {
    accessorKey: "block",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <Hotel className="h-5 w-5" />
            Block
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const block = row.getValue("block") as string;
      return <div className="text-center">{block}</div>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "room",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <DoorOpen className="h-5 w-5" />
          Room Number
        </div>
      );
    },
    cell: ({ row }) => {
      const room = row.getValue("room") as string;
      return <div className="text-center">{room}</div>;
    },
    enableSorting: true,
  },
];
