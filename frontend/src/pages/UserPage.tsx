import { useGetUsers } from "@/modules/users/hooks/use-get-users";
import { columns } from "@/modules/users/ui/components/UserColumns";
import { UserDataTable } from "@/modules/users/ui/components/UserDataTable";

const UserPage = () => {
  const { data: users, isLoading, isError } = useGetUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[2400px] mx-auto w-full px-8">
      <UserDataTable data={users} columns={columns} />
    </div>
  );
};

export default UserPage;
