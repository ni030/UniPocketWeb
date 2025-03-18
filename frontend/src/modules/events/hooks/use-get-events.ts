import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config";
import { useAuth } from "@clerk/clerk-react";

export const useGetEvents = () => {
  const { getToken } = useAuth();

  const query = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const token = await getToken();

      const response = await axios.get(`${config.API_URL}/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("An error occurred while fetching events");
      }

      return response.data;
    },
  });

  return query;
};
