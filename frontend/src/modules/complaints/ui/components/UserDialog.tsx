import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useOpenUserDialog } from "@/hooks/use-open-user-dialog";
import { useGetUser } from "@/modules/users/hooks/use-get-user";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  BedIcon,
  HouseIcon,
  MailIcon,
  PhoneCallIcon,
  User2Icon,
} from "lucide-react";

interface DetailItemProps {
  icon: React.FC;
  value: string | undefined;
}

const DetailItem = ({ icon: Icon, value }: DetailItemProps) => {
  if (!value) return null; // Skip rendering if the value is undefined
  return (
    <div className="flex items-center gap-2 rounded-md py-2">
      <div className="flex items-center justify-center size-8 bg-gray-200 rounded-full p-2">
        <Icon />
      </div>
      <span>{value}</span>
    </div>
  );
};

export const UserDialog = () => {
  const { id, onClose, isOpen } = useOpenUserDialog();
  const { data: user, isLoading, isError } = useGetUser(id);

  if (!id) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div className="space-y-1">
          <DialogTitle className="text-xl font-semibold">
            User Details
          </DialogTitle>
          <DialogDescription className="text-sm leading-tight">
            Details of the user who submitted the complaint.
          </DialogDescription>
        </div>
        <div className="flex flex-col">
          <DetailItem icon={User2Icon} value={user.name} />
          <DetailItem icon={MailIcon} value={user.email} />
          <DetailItem icon={PhoneCallIcon} value={user.phoneNum} />
          <DetailItem icon={HouseIcon} value={user.block} />
          <DetailItem icon={BedIcon} value={user.room} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
