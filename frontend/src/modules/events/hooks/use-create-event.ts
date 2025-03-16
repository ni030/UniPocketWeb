import axios from "axios";
import { toast } from "sonner";
import { config } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddEventFormValues } from "../ui/components/AddEventForm";

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: async (event: AddEventFormValues) => {
        const response = await axios.post(`${config.API_URL}/events`, {
            newEvent: event,
        });
    
        if (response.status !== 201) {
            throw new Error("Failed to create event");
        }
    
        return response.data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["events"],
        });
    
        toast.success("Event created successfully");
        },
        onError: (error) => {
        toast.error(error.message || "Failed to create event");
        },
    });
    
    return mutation;
    };