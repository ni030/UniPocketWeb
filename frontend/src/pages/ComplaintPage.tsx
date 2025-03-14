import { useGetComplaints } from "@/modules/complaints/hooks/use-get-complaints";

const ComplaintPage = () => {
  const { data, isLoading, isError } = useGetComplaints();

  return <div>{JSON.stringify(data)}</div>;
};

export default ComplaintPage;
