import { format } from 'date-fns'; // Ensure this is imported

export const ProfileDTO = (user) => {
  const formattedDate = user.createdAt
    ? format(new Date(user.createdAt), 'MMMM d, yyyy h:mm a')
    : null;

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    profilePicture: user.profilePicture,
    department: user.department,
    role: user.role,
    profession: user.profession,
    status: user.status,
    createdAt: formattedDate
  };
};

