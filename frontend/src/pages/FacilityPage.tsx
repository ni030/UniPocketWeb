import { TableSkeleton } from "@/components/TableSkeleton";
import { useGetFacilities } from "@/modules/facilities/hooks/use-get-facilities";
import { AddFacilityDialog } from "@/modules/facilities/ui/components/AddFacilityDialog";
import { facilitiesColumns } from "@/modules/facilities/ui/components/FacilitiesColumns";
import { FacilitiesDataTable } from "@/modules/facilities/ui/components/FacilitiesDataTable";
import { FacilityDialog } from "@/modules/facilities/ui/components/FacilityDialog";

const FacilityPage = () => {
  const { data: facilities, isLoading } = useGetFacilities();

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <AddFacilityDialog />
      <FacilityDialog />
      {isLoading ? (
        <TableSkeleton rows={10} columns={5} />
      ) : (
        <FacilitiesDataTable columns={facilitiesColumns} data={facilities} />
      )}
    </div>
  );
};

export default FacilityPage;
