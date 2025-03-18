import { config } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { FacilityFormValues } from "../ui/components/FacilityForm";
import { useAuth } from "@clerk/clerk-react";

export const useUpdateFacility = (id?: string) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (updatedFacility: FacilityFormValues) => {
      if (!id) return;

      const token = await getToken();

      const response = await axios.put(
        `${config.API_URL}/facilities/${id}`,
        {
          updatedFacility,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
