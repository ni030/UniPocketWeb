import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { config } from "@/lib/config";

export const useGetComplaints = () => {
  const query = useQuery({
    queryKey: ["complaints"],
    queryFn: async () => {
      const response = await axios.get(`${config.API_URL}/complaints`);

      if (response.status !== 200) {
        throw new Error("An error occurred while fetching complaints");
      }

      return response.data;
    },
  });

  return query;
};
