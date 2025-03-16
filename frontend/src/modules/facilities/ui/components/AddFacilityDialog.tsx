import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateFacilityDialog } from "../../hooks/use-create-facility-dialog";
import { AddFacilityForm, AddFacilityFormValues } from "./AddFacilityForm";
import { useCreateFacility } from "../../hooks/use-create.facility";

export const AddFacilityDialog = () => {
  const { isOpen, onClose } = useCreateFacilityDialog();
  const addFacility = useCreateFacility();

  const onSubmit = (values: AddFacilityFormValues) => {
    addFacility &&
      addFacility.mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <div className="space-y-1">
          <DialogTitle className="text-xl font-semibold">
            Add Facility
          </DialogTitle>
          <DialogDescription className="text-sm leading-tight">
            Just install some new facilities? Add them here.
          </DialogDescription>
        </div>
        <AddFacilityForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
