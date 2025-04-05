import { format } from 'date-fns'; // Ensure this is imported

export const ReportDTO = (report) => {
  const formattedDate = report.createdAt
    ? format(new Date(report.createdAt), 'MMMM d, yyyy h:mm a')
    : null;

  return {
    id: report._id,
    title: report.title,
    description: report.description,
    status: report.status,
    priority: report.priority,
    tags: report.tags,
    reportedBy: report.reportedBy,
    isConfidential: report.isConfidential,
    issuedAt: formattedDate
  };
};
