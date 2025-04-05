// hooks/useFileUploadMutation.js
import GenericClient from '@/lib/genericClient';
import { useMutation } from '@tanstack/react-query';

// Instantiate the client with the endpoint
const client = new GenericClient("/report/issue-attachments");

const uploadFiles = async (files) => {
  if (!files || files.length === 0) return [];

  const formData = new FormData();
  files.forEach((file) => {
    formData.append('attachments', file);
  });

  // Use the GenericClient's post method
  const response = await client.create(formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response; // Expecting array of file paths
};

export function useFileUploadMutation() {
  return useMutation({
    mutationFn: (files) => uploadFiles(files),
    onError: (error) => {
      console.error('File upload error:', error);
    },
  });
}