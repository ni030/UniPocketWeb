import { useGetMerits } from "@/modules/merits/hooks/use-get-merits";
import { columns } from "@/modules/merits/ui/components/MeritColumns";
import { MeritDataTable } from "@/modules/merits/ui/components/MeritDataTable";

const MeritPage = () => {
  const { data: merits, isLoading, isError } = useGetMerits();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <MeritDataTable data={merits} columns={columns} />
    </div>
  );
};

export default MeritPage;
