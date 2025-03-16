import { columns } from "@/modules/complaints/ui/components/ComplaintColumns";
import { useGetComplaints } from "@/modules/complaints/hooks/use-get-complaints";
import { ComplaintDataTable } from "@/modules/complaints/ui/components/ComplaintDataTable";
import { UserDialog } from "@/modules/complaints/ui/components/UserDialog";
import { TableSkeleton } from "@/components/TableSkeleton";

const ComplaintPage = () => {
  const { data: complaints, isLoading, isError } = useGetComplaints();
  // const { isOpen, onClose } = useOpenUserDialog();

  if (isLoading) {
    return <TableSkeleton rows={10} columns={7} />;
  }

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <UserDialog />
      <ComplaintDataTable data={complaints} columns={columns} />
    </div>
  );
};

export default ComplaintPage;
