import { ColumnDef } from "@tanstack/react-table";
import { DoorOpen, Hotel, TrendingUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useOpenUserDialog } from "@/hooks/use-open-user-dialog";

export type Room = {
  id: string;
  block: string;
  roomNum: string;
  user: {
    userId: string;
    name: string;
  };
  ranking: number;
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
    accessorFn: (row) => row.user?.name || "No User",
    id: "user.name",
    header: "User Name",
    enableSorting: true,
    filterFn: (row, _, filterValue) => {
      return row.original.user?.name
        ?.toLowerCase()
        .includes(filterValue.toLowerCase());
    },
    cell: ({ row }) => {
      const userId = row.original.user?.userId as string;
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
            {row.getValue("user.name")}
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "ranking",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <TrendingUpDown className="h-5 w-5" />
            Ranking
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const ranking = row.getValue("ranking") as number;
      return <div className="text-center">{ranking}</div>;
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
    accessorKey: "roomNum",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <DoorOpen className="h-5 w-5" />
          Room Number
        </div>
      );
    },
    cell: ({ row }) => {
      const roomNum = row.getValue("roomNum") as string;
      return <div className="text-center">{roomNum}</div>;
    },
    enableSorting: true,
  },
];
