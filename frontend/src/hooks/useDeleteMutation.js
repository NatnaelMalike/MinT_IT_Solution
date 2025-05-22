import { useMutation, useQueryClient } from "@tanstack/react-query";
import GenericClient from "@/lib/genericClient";

export const useDeleteMutation = (endpoint, options = {}) => {
  const queryClient = useQueryClient();
  const client = new GenericClient(endpoint);

  return useMutation({
    mutationFn: (id) => client.delete(id),
    onSuccess: () => {
      // Invalidate the relevant query to trigger a refetch
      queryClient.invalidateQueries([endpoint.split('/')[1]]);
    },
    ...options,
  });
};
