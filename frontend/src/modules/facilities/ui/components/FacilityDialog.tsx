import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOpenFacilityDialog } from "../../hooks/use-open-facility-dialog";
import { FacilityForm, FacilityFormValues } from "./FacilityForm";
import { useGetFacility } from "../../hooks/use-get-facility";
import { useUpdateFacility } from "../../hooks/use-update-facility";

export const FacilityDialog = () => {
  const { id, isOpen, onClose } = useOpenFacilityDialog();
  const { data: facility, isLoading } = useGetFacility(id);
  const updateFacility = useUpdateFacility(id);

  const onSubmit = (values: FacilityFormValues) => {
    updateFacility &&
      updateFacility.mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
  };

  if (!id) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <div className="space-y-1">
          <DialogTitle className="text-xl font-semibold">
            Facility Details
          </DialogTitle>
          <DialogDescription className="text-sm leading-tight">
            You can edit the facility details here.
          </DialogDescription>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          facility && <FacilityForm data={facility} onSubmit={onSubmit} />
        )}
      </DialogContent>
    </Dialog>
  );
};
