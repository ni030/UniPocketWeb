import { config } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFacilities = () => {
  const query = useQuery({
    queryKey: ["facilities"],
    queryFn: async () => {
      const response = await axios.get(`${config.API_URL}/facilities`);

      if (response.status !== 200) {
        throw new Error("An error occurred while fetching facilities");
      }

      return response.data;
    },
  });

  return query;
};
