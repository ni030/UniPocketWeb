import { useGetFacilities } from "@/modules/facilities/hooks/use-get-facilities";
import { useGetComplaints } from "@/modules/complaints/hooks/use-get-complaints";
import { ComplaintChart } from "@/modules/dashboard/components/ComplaintChart";
import { useGetMerits } from "@/modules/merits/hooks/use-get-merits";
import { MeritChart } from "@/modules/dashboard/components/MeritChart";
import { useGetUsers } from "@/modules/users/hooks/use-get-users";
import { DashboardCard } from "@/modules/dashboard/components/DashboardCard";
import { useGetEvents } from "@/modules/events/hooks/use-get-events";
import {
  Calendar,
  MessageCircleWarning,
  StoreIcon,
  UserIcon,
} from "lucide-react";
import { EventChart } from "@/modules/dashboard/components/EventChart";

const DashboardPage = () => {
  const { data: complaints, isLoading: complaintsLoading } = useGetComplaints();
  const { data: users } = useGetUsers();
  const { data: merits, isLoading: meritsLoading } = useGetMerits();
  const { data: events, isLoading: eventsLoading } = useGetEvents();
  const { data: facilities } = useGetFacilities();

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8 py-6 space-y-2">
      {/* Dashboard Cards */}
      <section className="w-full grid lg:grid-cols-4 grid-cols-2 gap-2">
        <DashboardCard
          title="Total Users"
          value={users?.length || 0}
          icon={UserIcon}
          className="bg-rose-100 border border-rose-300"
        />
        <DashboardCard
          title="Total Facilities"
          value={facilities?.length || 0}
          icon={StoreIcon}
          className="bg-blue-100 border border-blue-300"
        />
        <DashboardCard
          title="Total Complaints"
          value={complaints?.length || 0}
          icon={MessageCircleWarning}
          className="bg-yellow-100 border border-yellow-300"
        />
        <DashboardCard
          title="Total Events"
          value={events?.length || 0}
          icon={Calendar}
          className="bg-orange-100 border border-orange-300"
        />
      </section>

      {/* Charts */}
      <section className="w-full grid grid-cols-5 gap-2">
        <MeritChart merits={merits || []} isLoading={meritsLoading} />

        <ComplaintChart
          complaints={complaints || []}
          isLoading={complaintsLoading}
        />

        <EventChart events={events || []} isLoading={eventsLoading} />
      </section>
    </div>
  );
};

export default DashboardPage;
