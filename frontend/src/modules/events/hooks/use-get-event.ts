import { config } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetEvent = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["events", id],
        queryFn: async () => {
        const response = await axios.get(`${config.API_URL}/events/${id}`);
    
        if (response.status !== 200) {
            throw new Error("Failed to fetch event details");
        }
    
        return response.data;
        },
    });

    return query;
};
