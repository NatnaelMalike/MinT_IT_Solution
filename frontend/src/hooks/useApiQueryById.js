import { useQuery } from "@tanstack/react-query";
import GenericClient from "@/lib/genericClient";

export const useApiQueryById = (
  key, // Unique query key
  endpoint, // API endpoint
  options = {},
  id
) => {
  const client = new GenericClient(endpoint);

  return useQuery({
    queryKey: key,
    queryFn: () => client.get(id),
    ...options,
  });
};
