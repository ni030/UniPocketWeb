import { config } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetFacility = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["facilities", id],
    queryFn: async () => {
      const response = await axios.get(`${config.API_URL}/facilities/${id}`);

      if (response.status !== 200) {
        throw new Error("Failed to fetch facility details");
      }

      return response.data;
    },
  });

  return query;
};
