import axios from "axios";
import { toast } from "sonner";
import { config } from "@/lib/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddFacilityFormValues } from "../ui/components/AddFacilityForm";
import { useAuth } from "@clerk/clerk-react";

export const useCreateFacility = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (facility: AddFacilityFormValues) => {
      const token = await getToken();

      const response = await axios.post(
        `${config.API_URL}/facilities`,
        {
          newFacility: facility,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
