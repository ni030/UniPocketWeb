import { config } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUser = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axios.get(`${config.API_URL}/users/${id}`);

      if (response.status !== 200) {
        throw new Error("Failed to fetch user");
      }

      return response.data;
    },
  });

  return query;
};
