import GenericClient from "@/lib/genericClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApiMutation = (
    method,
    endpoint,
    options = {}
  ) => {
    const queryClient = useQueryClient();
    const client = new GenericClient(endpoint);
    return useMutation({
      mutationFn: (data) => GenericClient[method](url, data),
      ...options,
    });
  };
  