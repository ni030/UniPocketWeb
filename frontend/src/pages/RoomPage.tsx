import { useGetRooms } from "@/modules/rooms/hooks/use-get-rooms";
import { columns } from "@/modules/rooms/ui/components/RoomColumns";
import { RoomDataTable } from "@/modules/rooms/ui/components/RoomDataTable";

const RoomPage = () => {
  const { data: rooms, isLoading, isError } = useGetRooms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <RoomDataTable data={rooms} columns={columns} />
    </div>
  );
};

export default RoomPage;
