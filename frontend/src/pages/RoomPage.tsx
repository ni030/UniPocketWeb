import { useGetRooms } from "@/modules/rooms/hooks/use-get-rooms";
import { columns } from "@/modules/rooms/ui/components/RoomColumns";
import { RoomDataTable } from "@/modules/rooms/ui/components/RoomDataTable";
import { UserDialog } from "@/modules/complaints/ui/components/UserDialog";

const RoomPage = () => {
  const { data: rooms, isLoading, isError } = useGetRooms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <UserDialog />
      <RoomDataTable data={rooms} columns={columns} />
    </div>
  );
};

export default RoomPage;
