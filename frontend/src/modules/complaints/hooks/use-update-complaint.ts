import axios from "axios";
import { config } from "@/lib/config";
import { queryClient } from "@/providers/query-provider";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateComplaint = (id: string) => {
  if (!id) {
    return;
  }

  const mutation = useMutation({
    mutationFn: async (status: string) => {
      const response = await axios.put(`${config.API_URL}/complaints/${id}`, {
        status,
      });

      if (response.status !== 200) {
        throw new Error("An error occurred while updating the complaint");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["complaints"],
      });

      toast.success("Complaint updated successfully");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return mutation;
};
