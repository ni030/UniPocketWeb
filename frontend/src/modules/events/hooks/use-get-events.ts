import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config";

export const useGetEvents = () => {
  const query = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await axios.get(`${config.API_URL}/events`);

      if (response.status !== 200) {
        throw new Error("An error occurred while fetching events");
      }

      console.log(response.data);

      return response.data;
    },
  });

  return query;
};
