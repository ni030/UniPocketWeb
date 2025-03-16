import { ColumnDef } from "@tanstack/react-table";
import {
  Calendar,
  CloudLightning,
  DropletIcon,
  Edit2Icon,
  GlassWaterIcon,
  Lightbulb,
  Locate,
  MapPinHouse,
  MoreHorizontal,
  Store,
  Trash2Icon,
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
import { Separator } from "@/components/ui/separator";
import { useOpenFacilityDialog } from "../../hooks/use-open-facility-dialog";
import { FacilityDialog } from "./FacilityDialog";
import { useDeleteFacility } from "../../hooks/use-delete-facility";
import { useConfirm } from "@/hooks/use-confirm";

export type Facilities = {
  id: string;
  name: string;
  type: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export const facilitiesColumns: ColumnDef<Facilities>[] = [
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
          Facility Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-left"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Facility Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => {
      const location = row.getValue("location") as {
        lat: number;
        lng: number;
      };

      return (
        <div className="flex gap-2 items-center">
          <Locate />
          <div>
            {location.lat}, {location.lng}
          </div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Status
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     const updateStatus = useUpdateComplaint(row.original.id);

  //     const status = row.getValue("status") as string;
  //     const statusTypes = ["Received", "In-progress", "Completed", "Cancelled"];
  //     const trimStatus = status.trim().toLowerCase();

  //     const statusColor =
  //       trimStatus === "completed"
  //         ? "text-green-500 hover:text-green-400"
  //         : trimStatus === "in-progress"
  //         ? "text-yellow-500 hover:text-yellow-400"
  //         : trimStatus === "cancelled"
  //         ? "text-red-500 hover:text-red-400"
  //         : "text-blue-500 hover:text-blue-400";

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button
  //             variant="ghost"
  //             className={cn("flex items-center gap-2", statusColor)}
  //           >
  //             {status.charAt(0).toUpperCase() + status.slice(1)}
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent>
  //           {statusTypes.map((type) => (
  //             <DropdownMenuItem
  //               key={type}
  //               onClick={() => updateStatus?.mutate(type)}
  //             >
  //               {type}
  //             </DropdownMenuItem>
  //           ))}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  //   enableSorting: true,
  // },
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
          {type === "Water Dispenser" ? (
            <DropletIcon className="size-5" />
          ) : type === "Rubbish Bin" ? (
            <Trash2Icon className="size-5" />
          ) : (
            <Store className="size-5" />
          )}
          <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
        </div>
      );
    },
    filterFn: "equals",
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <p className="flex justify-center">Actions</p>;
    },
    cell: ({ row }) => {
      const id = row.original.id as string;
      const { onOpen } = useOpenFacilityDialog();
      const deleteFacility = useDeleteFacility();

      const [ConfirmationDialog, confirm] = useConfirm(
        "Delete Facility",
        "Are you sure you want to delete this facility?"
      );

      const handleEdit = () => {
        onOpen(id);
      };

      const handleDelete = async () => {
        const ok = await confirm();
        if (ok) {
          deleteFacility.mutate(id);
        }
      };

      return (
        <>
          <ConfirmationDialog />
          <div className="flex gap-1 justify-center items-center w-full">
            <Button variant="ghost" onClick={handleEdit}>
              <Edit2Icon />
            </Button>
            <Button
              variant="ghost"
              onClick={handleDelete}
              disabled={deleteFacility.isPending}
            >
              <Trash2Icon className="stroke-rose-500" />
            </Button>
          </div>
        </>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
