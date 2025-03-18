import { config } from "@/lib/config";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFacilities = () => {
  const { getToken } = useAuth();

  const query = useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      const token = await getToken();

      const response = await axios.get(`${config.API_URL}/facilities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("An error occurred while fetching facilities");
      }

      return response.data;
    },
  });

  return query;
};
