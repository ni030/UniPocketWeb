import { useGetEvents } from "@/modules/events/hooks/use-get-events";
import { columns } from "@/modules/events/ui/components/EventColumns";
import { EventDataTable } from "@/modules/events/ui/components/EventDataTable";

const EventPage = () => {
  const eventQuery = useGetEvents();
  const events = eventQuery.data;

  const isLoading = eventQuery.isLoading;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <EventDataTable data={events} columns={columns} />
    </div>
  );
};

export default EventPage;
