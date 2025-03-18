import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config";
import { useAuth } from "@clerk/clerk-react";

export const useGetComplaints = () => {
  const { getToken } = useAuth();

  const query = useQuery<Complaint[]>({
    queryKey: ["complaints"],
    queryFn: async () => {
      const token = await getToken();

      const response = await axios.get(`${config.API_URL}/complaints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("An error occurred while fetching complaints");
      }

      return response.data;
    },
  });

  return query;
};
