import { config } from "@/lib/config";
import { queryClient } from "@/providers/query-provider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteFacility = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      if (!id) return;

      const response = await axios.delete(`${config.API_URL}/facilities/${id}`);

      if (response.status !== 200) {
        throw new Error("Failed to delete facility");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facilities"],
      });

      toast.success("Facility deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete facility");
    },
  });

  return mutation;
};
