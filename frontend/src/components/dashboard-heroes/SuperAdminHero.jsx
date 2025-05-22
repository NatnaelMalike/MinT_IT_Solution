import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, CheckCircle, AlertCircle, Download, 
  ArrowRight, BarChart, Settings, Shield, 
  Clock, Database, FileText, Activity
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function SuperAdminHero() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);
  
  // Fetch all tickets for analytics
  const { data: allTickets = [], isLoading: ticketsLoading } = useApiQuery(
    ["superAdminTickets"],
    `/issue`,
    { enabled: !!user?.id }
  );

  // Fetch all users
  const { data: allUsers = [], isLoading: usersLoading } = useApiQuery(
    ["allUsers"],
    `/user`,
    { enabled: !!user?.id }
  );

  // Calculate system statistics
  const userStats = {
    totalUsers: allUsers.filter(user => user.role === "NormalUser").length,
    activeTechnicians: allUsers.filter(user => user.role === "TechnicianUser").length,
    totalAdmins: allUsers.filter(user => 
      user.role === "SuperAdmin" || user.role === "HelperAdmin"
    ).length
  };

  // Calculate ticket analytics
  const totalResolved = allTickets.filter(ticket => ticket.status === "Resolved").length;
  const resolutionRate = allTickets.length > 0 
    ? Math.round((totalResolved / allTickets.length) * 100) 
    : 0;

  // Calculate average response time (mock data for now)
  const avgResponseTime = "4.2 hours";

  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    
    if (hour < 12) greetingText = "Good morning";
    else if (hour < 18) greetingText = "Good afternoon";
    else greetingText = "Good evening";
    
    setGreeting(`${greetingText}, ${user?.name?.split(' ')[0] || 'Admin'}`);
    setMounted(true);
  }, [user]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
      {mounted && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {greeting} <span className="text-primary">– All systems go!</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Complete system overview and administrative controls
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="outline"
                  className="relative group px-4 py-2 text-base hover:shadow-sm transition-all duration-300"
                  asChild
                >
                  <Link to="/admin/reports" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span>Download Reports</span>
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="relative group px-4 py-2 text-base bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all duration-300"
                  asChild
                >
                  <Link to="/admin/users" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>System Settings</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* System Overview */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">System Overview</CardTitle>
                <CardDescription>
                  Current status of users and system resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                    <div className="bg-primary/20 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-bold">{userStats.totalUsers}</p>
                        <p className="text-xs text-muted-foreground mb-1">Registered accounts</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                    <div className="bg-primary/20 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                      <Wrench className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Technicians</p>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-bold">{userStats.activeTechnicians}</p>
                        <p className="text-xs text-muted-foreground mb-1">Support staff</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                    <div className="bg-primary/20 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">System Admins</p>
                      <div className="flex items-end gap-2">
                        <p className="text-2xl font-bold">{userStats.totalAdmins}</p>
                        <p className="text-xs text-muted-foreground mb-1">Administrative users</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Analytics Dashboard */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Ticket System Analytics</CardTitle>
                <CardDescription>
                  Performance metrics and statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Resolution Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-sm">Resolution Rate</h3>
                      <span className="text-sm font-bold">{resolutionRate}%</span>
                    </div>
                    <Progress value={resolutionRate} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {totalResolved} of {allTickets.length} tickets resolved
                    </p>
                  </div>
                  
                  {/* Average Response Time */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Avg. Response Time</h3>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold">{avgResponseTime}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      First response to new tickets
                    </p>
                  </div>
                  
                  {/* Ticket Distribution */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm">Ticket Distribution</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded">
                        <span className="text-lg font-bold text-yellow-700 dark:text-yellow-300">
                          {allTickets.filter(t => t.status === "Pending").length}
                        </span>
                        <p className="text-xs text-yellow-700 dark:text-yellow-300">Pending</p>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                        <span className="text-lg font-bold text-blue-700 dark:text-blue-300">
                          {allTickets.filter(t => t.status === "In Progress").length}
                        </span>
                        <p className="text-xs text-blue-700 dark:text-blue-300">Active</p>
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded">
                        <span className="text-lg font-bold text-green-700 dark:text-green-300">
                          {allTickets.filter(t => t.status === "Resolved").length}
                        </span>
                        <p className="text-xs text-green-700 dark:text-green-300">Resolved</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/reports" className="flex items-center gap-1">
                      <BarChart className="h-4 w-4 mr-1" />
                      View Detailed Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Health and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Health */}
            <motion.div variants={itemVariants}>
              <Card className="border shadow-md h-full">
                <CardHeader>
                  <CardTitle className="text-xl">System Health</CardTitle>
                  <CardDescription>
                    System status and recent activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="status">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="status" className="flex items-center gap-1">
                        <Activity className="h-4 w-4" />
                        <span>Status</span>
                      </TabsTrigger>
                      <TabsTrigger value="logs" className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        <span>Logs</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="status" className="mt-4 space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">API Services</span>
                        </div>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">Operational</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Database</span>
                        </div>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">Operational</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Authentication</span>
                        </div>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">Operational</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900/30">
                        <div className="flex items-center gap-2">
                          <Database className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Last Backup</span>
                        </div>
                        <span className="text-xs font-medium text-green-600 dark:text-green-400">Today, 04:30 AM</span>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="logs" className="mt-4">
                      <div className="space-y-3 max-h-[240px] overflow-y-auto">
                        <div className="flex items-start gap-2 p-2 border-b text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">System backup completed</p>
                            <p className="text-xs text-muted-foreground">Today, 04:30 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 p-2 border-b text-sm">
                          <Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">New user registered</p>
                            <p className="text-xs text-muted-foreground">Today, 09:45 AM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 p-2 border-b text-sm">
                          <Shield className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Security scan completed</p>
                            <p className="text-xs text-muted-foreground">Yesterday, 11:30 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 p-2 border-b text-sm">
                          <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Disk space warning</p>
                            <p className="text-xs text-muted-foreground">Yesterday, 03:15 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-2 p-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">System update installed</p>
                            <p className="text-xs text-muted-foreground">2 days ago, 10:20 AM</p>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                        <Link to="/admin/reports">View All Logs</Link>
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Administrative Controls */}
            <motion.div variants={itemVariants}>
              <Card className="border shadow-md h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Administrative Controls</CardTitle>
                  <CardDescription>
                    Manage system settings and user roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2" asChild>
                      <Link to="/admin/users">
                        <Users className="h-6 w-6 mb-1" />
                        <span className="font-medium">Manage Users</span>
                        <span className="text-xs text-muted-foreground">
                          Add, edit, or remove users
                        </span>
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2" asChild>
                      <Link to="/admin/technicians">
                        <Wrench className="h-6 w-6 mb-1" />
                        <span className="font-medium">Technicians</span>
                        <span className="text-xs text-muted-foreground">
                          Manage support staff
                        </span>
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2" asChild>
                      <Link to="/admin/departments">
                        <Building className="h-6 w-6 mb-1" />
                        <span className="font-medium">Departments</span>
                        <span className="text-xs text-muted-foreground">
                          Configure departments
                        </span>
                      </Link>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2" asChild>
                      <Link to="/admin/admin_users">
                        <Shield className="h-6 w-6 mb-1" />
                        <span className="font-medium">Admin Access</span>
                        <span className="text-xs text-muted-foreground">
                          Manage admin permissions
                        </span>
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full" asChild>
                      <Link to="/admin/professions" className="flex items-center justify-center gap-1">
                        <Settings className="h-4 w-4 mr-1" />
                        System Configuration
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Activity Feed */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>
                  System audit trail and user actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mt-1">
                      <Users className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">New user registered</h3>
                        <span className="text-xs text-muted-foreground">10 minutes ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        User "John Doe" created a new account
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mt-1">
                      <Wrench className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Technician assigned</h3>
                        <span className="text-xs text-muted-foreground">45 minutes ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ticket #1234 assigned to technician "Sarah Johnson"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mt-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Ticket resolved</h3>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ticket #1230 marked as resolved by technician "Mike Smith"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 text-primary rounded-full h-8 w-8 flex items-center justify-center mt-1">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Admin login</h3>
                        <span className="text-xs text-muted-foreground">3 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Administrator "Alex Chen" logged into the system
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/admin/reports" className="flex items-center gap-1">
                      View Full Audit Trail
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// Additional icons used in the component
const Wrench = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
};

const Building = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
};
