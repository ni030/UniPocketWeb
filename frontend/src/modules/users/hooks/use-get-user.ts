import { config } from "@/lib/config";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetUser = (id?: string) => {
  const { getToken } = useAuth();

  const query = useQuery({
    enabled: !!id,
    queryKey: ["user", id],
    queryFn: async () => {
      const token = await getToken();

      const response = await axios.get(`${config.API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to fetch user");
      }

      return response.data;
    },
  });

  return query;
};
