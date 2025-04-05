import { useMutation, useQueryClient } from "@tanstack/react-query";
import GenericClient from "@/lib/genericClient";

export const useCreateMutation = (endpoint, options={}) => {
  const queryClient = useQueryClient();
  const client = new GenericClient(endpoint);

  return useMutation({
    mutationFn: (data) => client.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries([endpoint]); // Refresh cache
    },
    ...options,
  });
};