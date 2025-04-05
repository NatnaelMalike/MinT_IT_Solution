import { useQuery } from "@tanstack/react-query";
import GenericClient from "@/lib/genericClient";

export const useApiQuery = (
  key, // Unique query key
  endpoint, // API endpoint
  options = {}
) => {
  const client = new GenericClient(endpoint);

  return useQuery({
    queryKey: key,
    queryFn: () => client.getAll(),
    ...options,
  });
};
