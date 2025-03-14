import { columns } from "@/modules/complaints/ui/components/ComplaintColumns";
import { useGetComplaints } from "@/modules/complaints/hooks/use-get-complaints";
import { ComplaintDataTable } from "@/modules/complaints/ui/components/ComplaintDataTable";

const ComplaintPage = () => {
  const { data: complaints, isLoading, isError } = useGetComplaints();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <ComplaintDataTable data={complaints} columns={columns} />
    </div>
  );
};

export default ComplaintPage;
