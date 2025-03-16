import axios from "axios";
import { toast } from "sonner";
import { config } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddFacilityFormValues } from "../ui/components/AddFacilityForm";

export const useCreateFacility = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (facility: AddFacilityFormValues) => {
      const response = await axios.post(`${config.API_URL}/facilities`, {
        newFacility: facility,
      });

      if (response.status !== 201) {
        throw new Error("Failed to create facility");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["facilities"],
      });

      toast.success("Facility created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create facility");
    },
  });

  return mutation;
};
