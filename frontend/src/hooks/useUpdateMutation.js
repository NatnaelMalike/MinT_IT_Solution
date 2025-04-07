import { useMutation, useQueryClient } from "@tanstack/react-query";
import GenericClient from "@/lib/genericClient";

export const useUpdateMutation = (endpoint, options={}, id) => {
  const queryClient = useQueryClient();
  const client = new GenericClient(endpoint);

  return useMutation({
    mutationFn: (data) => client.updateP(id, data, options),
    onSuccess: () => {
      queryClient.invalidateQueries(['report']); // Refresh cache
    },
    ...options,
  });
};