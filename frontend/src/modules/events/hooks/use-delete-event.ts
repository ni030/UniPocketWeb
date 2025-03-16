import { config } from "@/lib/config";
import { queryClient } from "@/providers/query-provider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteEvent = () => {
    const mutation = useMutation({
        mutationFn: async (id: string) => {
        if (!id) return;
    
        const response = await axios.delete(`${config.API_URL}/events/${id}`);
    
        if (response.status !== 200) {
            throw new Error("Failed to delete event");
        }
    
        return response.data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["events"],
        });
    
        toast.success("Event deleted successfully");
        },
        onError: (error) => {
        toast.error(error.message || "Failed to delete event");
        },
    });
    
    return mutation;
    }