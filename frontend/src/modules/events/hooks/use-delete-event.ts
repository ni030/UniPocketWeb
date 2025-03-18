import { config } from "@/lib/config";
import { queryClient } from "@/providers/query-provider";
import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteEvent = () => {
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      if (!id) return;

      const token = await getToken();

      const response = await axios.delete(`${config.API_URL}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
};
