import { config } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { FacilityFormValues } from "../ui/components/FacilityForm";

export const useUpdateFacility = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedFacility: FacilityFormValues) => {
      if (!id) return;

      const response = await axios.put(`${config.API_URL}/facilities/${id}`, {
        updatedFacility,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update facility");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facilities"],
      });

      toast.success("Facility updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update facility");
    },
  });

  return mutation;
};
