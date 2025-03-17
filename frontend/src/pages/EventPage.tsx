import { TableSkeleton } from "@/components/TableSkeleton";
import { useGetEvents } from "@/modules/events/hooks/use-get-events";
import { AddEventDialog } from "@/modules/events/ui/components/AddEventDialog";
import { columns } from "@/modules/events/ui/components/EventColumns";
import { EventDataTable } from "@/modules/events/ui/components/EventDataTable";
import { EventDialog } from "@/modules/events/ui/components/EventDialog";

const EventPage = () => {
  const { data: events, isLoading } = useGetEvents();

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <AddEventDialog />
      <EventDialog />
      {isLoading ? (
        <TableSkeleton rows={10} columns={5} />
      ) : (
        <EventDataTable data={(events as any) || []} columns={columns} />
      )}
    </div>
  );
};

export default EventPage;
