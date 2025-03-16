import { config } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { EventFormValues } from "../ui/components/EventForm";

export const useUpdateEvent = (id?: string) => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: async (updatedEvent: EventFormValues) => {
        if (!id) return;
    
        const response = await axios.put(`${config.API_URL}/events/${id}`, {
            updatedEvent,
        });
    
        if (response.status !== 200) {
            throw new Error("Failed to update event");
        }
    
        return response.data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["events"],
        });
    
        toast.success("Event updated successfully");
        },
        onError: (error) => {
        toast.error(error.message || "Failed to update event");
        },
    });
    
    return mutation;
};