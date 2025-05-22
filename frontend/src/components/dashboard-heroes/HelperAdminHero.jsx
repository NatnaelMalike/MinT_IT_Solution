import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Clock, CheckCircle, AlertCircle, Search, 
  ArrowRight, BarChart, Users, AlertTriangle, Filter
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function HelperAdminHero() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch all tickets for the helper admin
  const { data: allTickets = [], isLoading: ticketsLoading } = useApiQuery(
    ["helperAdminTickets"],
    `/issue`,
    { enabled: !!user?.id }
  );

  // Fetch all technicians
  const { data: technicians = [], isLoading: techniciansLoading } = useApiQuery(
    ["technicians"],
    `/user/role/TechnicianUser`,
    { enabled: !!user?.id }
  );

  // Calculate ticket statistics
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  
  const ticketStats = {
    awaitingAssignment: allTickets.filter(ticket => !ticket.assignedTo && ticket.status === "Pending").length,
    escalated: allTickets.filter(ticket => ticket.priority === "High" && ticket.status !== "Resolved").length,
    createdToday: allTickets.filter(ticket => new Date(ticket.createdAt) >= startOfDay).length,
    resolvedToday: allTickets.filter(ticket => 
      ticket.status === "Resolved" && 
      new Date(ticket.resolvedAt) >= startOfDay
    ).length
  };

  // Calculate technician workload
  const technicianWorkload = technicians.map(tech => {
    const assignedTickets = allTickets.filter(ticket => 
      ticket.assignedTo === tech.id && 
      ticket.status !== "Resolved"
    );
    
    return {
      id: tech.id,
      name: tech.name,
      assignedCount: assignedTickets.length,
      status: assignedTickets.length > 10 ? "overloaded" : 
             assignedTickets.length > 5 ? "busy" : "available"
    };
  });

  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    
    if (hour < 12) greetingText = "Good morning";
    else if (hour < 18) greetingText = "Good afternoon";
    else greetingText = "Good evening";
    
    setGreeting(`${greetingText}, ${user?.name?.split(' ')[0] || 'Supervisor'}`);
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
                {greeting} <span className="text-primary">– Helper Admin</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Manage tickets, technicians, and department resources.
              </p>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="relative group px-6 py-6 text-base bg-gradient-to-r from-primary to-primary/90 hover:shadow-lg transition-all duration-300"
                asChild
              >
                <Link to="/helper-admin/reports" className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>View Reports</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Quick Search</CardTitle>
                <CardDescription>
                  Find tickets, users, or technicians
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by ticket ID, user, or keyword..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button className="flex items-center gap-1" variant="outline">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                  <Button className="flex items-center gap-1">
                    <Search className="h-4 w-4" />
                    <span>Search</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ticket Metrics */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Awaiting Assignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <span className="text-2xl font-bold">{ticketStats.awaitingAssignment}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/helper-admin/reports" className="text-xs">Assign</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Escalated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span className="text-2xl font-bold">{ticketStats.escalated}</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/helper-admin/reports" className="text-xs">Review</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Created Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                      <span className="text-2xl font-bold">{ticketStats.createdToday}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      New tickets
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resolved Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold">{ticketStats.resolvedToday}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Completed
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Technician Workload */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border shadow-md h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Technician Workload</CardTitle>
                  <CardDescription>
                    Current assignment status of technicians
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {techniciansLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded"></div>
                            <div className="h-4 bg-muted rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : technicianWorkload.length > 0 ? (
                    <div className="space-y-4">
                      {technicianWorkload.slice(0, 5).map((tech) => (
                        <div key={tech.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                              <Users className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">{tech.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {tech.assignedCount} active tickets
                              </p>
                            </div>
                          </div>
                          <Badge className={
                            tech.status === "overloaded" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" :
                            tech.status === "busy" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" :
                            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          }>
                            {tech.status.charAt(0).toUpperCase() + tech.status.slice(1)}
                          </Badge>
                        </div>
                      ))}
                      
                      {technicianWorkload.length > 5 && (
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/helper-admin/reports">View All Technicians</Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="rounded-full bg-primary/10 p-3 mb-3">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-muted-foreground">No technicians found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Escalated Tickets */}
            <motion.div variants={itemVariants}>
              <Card className="border shadow-md h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Escalated Tickets</CardTitle>
                  <CardDescription>
                    High priority tickets needing attention
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {ticketsLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-pulse flex space-x-4">
                        <div className="flex-1 space-y-4 py-1">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-muted rounded"></div>
                            <div className="h-4 bg-muted rounded w-5/6"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : allTickets.filter(ticket => 
                    ticket.priority === "High" && ticket.status !== "Resolved"
                  ).length > 0 ? (
                    <div className="space-y-4">
                      {allTickets
                        .filter(ticket => ticket.priority === "High" && ticket.status !== "Resolved")
                        .slice(0, 3)
                        .map((ticket) => (
                          <div key={ticket.id} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/30">
                            <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{ticket.title}</h3>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(ticket.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                {ticket.description}
                              </p>
                              <Button variant="outline" size="sm" className="mt-2" asChild>
                                <Link to={`/helper-admin/issue/${ticket.id}`}>View Details</Link>
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                      {allTickets.filter(ticket => 
                        ticket.priority === "High" && ticket.status !== "Resolved"
                      ).length > 3 && (
                        <Button variant="outline" className="w-full" asChild>
                          <Link to="/helper-admin/reports">View All Escalated</Link>
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="rounded-full bg-primary/10 p-3 mb-3">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-muted-foreground">No escalated tickets at the moment</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Daily Summary */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Daily Summary</CardTitle>
                <CardDescription>
                  Ticket activity for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                    <p className="text-3xl font-bold mt-1">{ticketStats.createdToday}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      New tickets today
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Resolved</h3>
                    <p className="text-3xl font-bold mt-1">{ticketStats.resolvedToday}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Completed today
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Escalated</h3>
                    <p className="text-3xl font-bold mt-1">{ticketStats.escalated}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      High priority
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/helper-admin/reports" className="flex items-center gap-1">
                      View Detailed Reports
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
