import useAuthStore from "@/store/authStore";

export const useRoles = () => {
  const { user } = useAuthStore();
  return {
    isHelperAdmin: user.role === "HelperAdmin",
    isSuperAdmin: user.role === "SuperAdmin",
    isTechnician: user.role === "TechnicianUser",
    isUser: user.role === "NormalUser"
  };
};