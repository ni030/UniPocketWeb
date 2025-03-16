import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { useOpenEventDialog } from "../../hooks/use-open-event-dialog";
import { EventForm, EventFormValues } from "./EventForm";
import { useGetEvent } from "../../hooks/use-get-event";
import { useUpdateEvent } from "../../hooks/use-update-event";

export const EventDialog = () => {
    const { id, isOpen, onClose } = useOpenEventDialog();
    const { data: event, isLoading } = useGetEvent(id);
    const updateEvent = useUpdateEvent(id);
    
    const onSubmit = (values: EventFormValues) => {
        updateEvent &&
        updateEvent.mutate(values, {
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
                Event Details
            </DialogTitle>
            <DialogDescription className="text-sm leading-tight">
                You can edit the event details here.
            </DialogDescription>
            </div>
            {isLoading ? (
            <div>Loading...</div>
            ) : (
            event && <EventForm data={event} onSubmit={onSubmit} />
            )}
        </DialogContent>
        </Dialog>
    );
}