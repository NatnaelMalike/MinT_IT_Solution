import { Building2, Building2Icon, FilePen, FileStack, FolderArchive, Home, LayoutDashboard, Settings, ShieldUser, User2, UserRoundCog, Users, Wrench } from "lucide-react";

export const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/profile', label: 'Profile', icon: User2 },
    { href: '/admin/admin_users', label: 'Admins', icon: ShieldUser  }, // Keep commented if not used
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/technicians', label: 'Technicians', icon: UserRoundCog },
    { href: '/admin/reports', label: 'Reports', icon: FileStack },
    { href: '/admin/departments', label: 'Departments', icon: Building2 },
    { href: '/admin/professions', label: 'Professions', icon: Wrench },
  ];
export const helperNavItems = [
    { href: '/helper-admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/helper-admin/reports', label: 'Reports', icon: FileStack }, // Keep commented if not used
    { href: '/helper-admin/profile', label: 'Profile', icon: User2 },
 
  ];
export const technicianNavItems = [
    { href: '/technician', label: 'Home', icon: Home },
    { href: '/technician/reports', label: 'Assets', icon: FileStack }, // Keep commented if not used
    { href: '/technician/profile', label: 'Transactions', icon: User2 },

  ];  
export const userNavItems = [
    { href: '/user', label: 'Home', icon: Home },
    { href: '/user/add-request', label: 'Report', icon: FilePen }, // Keep commented if not used
    { href: '/user/requests', label: 'History', icon: FolderArchive },
    { href: '/user/profile', label: 'Profile', icon: User2 },
  ];
