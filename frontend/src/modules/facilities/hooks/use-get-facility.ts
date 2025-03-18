import { config } from "@/lib/config";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFacility = (id?: string) => {
  const { getToken } = useAuth();

  const query = useQuery({
    enabled: !!id,
    queryKey: ["facilities", id],
    queryFn: async () => {
      const token = await getToken();

      const response = await axios.get(`${config.API_URL}/facilities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch facility details");
      }

      return response.data;
    },
  });

  return query;
};
