import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useCreateEventDialog } from "../../hooks/use-create-event-dialog";
    import { AddEventForm, AddEventFormValues } from "./AddEventForm";
    import { useCreateEvent } from "../../hooks/use-create-event";

export const AddEventDialog = () => {
    const { isOpen, onClose } = useCreateEventDialog();
    const addEvent = useCreateEvent();
    
    const onSubmit = (values: AddEventFormValues) => {
        addEvent &&
        addEvent.mutate(values, {
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
                Add Event
            </DialogTitle>
            <DialogDescription className="text-sm leading-tight">
                Just installed a new event? Add it here.
            </DialogDescription>
            </div>
            <AddEventForm onSubmit={onSubmit} />
        </DialogContent>
        </Dialog>
    );
};