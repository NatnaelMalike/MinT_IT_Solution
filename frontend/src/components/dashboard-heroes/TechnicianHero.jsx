import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Clock, CheckCircle, AlertCircle, Calendar, 
  ArrowRight, BarChart, Wrench, AlertTriangle 
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TechnicianHero() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);
  
  // Fetch technician's assigned tickets
  const { data: assignedTickets = [], isLoading: ticketsLoading } = useApiQuery(
    ["technicianTickets", user?.id],
    `/issue/technician/${user?.id}`,
    { enabled: !!user?.id }
  );

  // Calculate ticket statistics
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  
  const ticketStats = {
    todayAssigned: assignedTickets.filter(ticket => {
      const ticketDate = new Date(ticket.assignedAt);
      return ticketDate.toDateString() === today.toDateString();
    }).length,
    weekAssigned: assignedTickets.filter(ticket => {
      const ticketDate = new Date(ticket.assignedAt);
      return ticketDate >= startOfWeek;
    }).length,
    pending: assignedTickets.filter(ticket => ticket.status === "Pending").length,
    inProgress: assignedTickets.filter(ticket => ticket.status === "In Progress").length,
    resolved: assignedTickets.filter(ticket => 
      ticket.status === "Resolved" && 
      new Date(ticket.resolvedAt) >= startOfWeek
    ).length,
    escalated: assignedTickets.filter(ticket => ticket.priority === "High" && ticket.status !== "Resolved").length
  };

  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    
    if (hour < 12) greetingText = "Good morning";
    else if (hour < 18) greetingText = "Good afternoon";
    else greetingText = "Good evening";
    
    setGreeting(`${greetingText}, ${user?.name?.split(' ')[0] || 'there'}`);
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
                {greeting} <span className="text-primary">– Technician</span>
              </h1>
              <p className="mt-2 text-muted-foreground">
                Here's an overview of your assigned tickets and upcoming tasks.
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
                <Link to="/technician/reports" className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  <span>View All Tickets</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Ticket Metrics */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Today's Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold">{ticketStats.todayAssigned}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Assigned today
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold">{ticketStats.weekAssigned}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Assigned this week
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      <span className="text-2xl font-bold">{ticketStats.pending}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Awaiting action
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Resolved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-2xl font-bold">{ticketStats.resolved}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      This week
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Ticket Management Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="escalated" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="escalated" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Escalated ({ticketStats.escalated})</span>
                </TabsTrigger>
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Pending ({ticketStats.pending})</span>
                </TabsTrigger>
                <TabsTrigger value="inprogress" className="flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  <span>In Progress ({ticketStats.inProgress})</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="escalated" className="mt-4">
                <Card className="border shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Escalated Tickets</CardTitle>
                    <CardDescription>
                      High priority tickets that need immediate attention
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {assignedTickets.filter(ticket => 
                      ticket.priority === "High" && ticket.status !== "Resolved"
                    ).length > 0 ? (
                      <div className="space-y-4">
                        {assignedTickets
                          .filter(ticket => ticket.priority === "High" && ticket.status !== "Resolved")
                          .slice(0, 3)
                          .map((ticket) => (
                            <div key={ticket.id} className="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-100 dark:border-red-900/30">
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
                                  <Link to={`/technician/issue/${ticket.id}`}>View Details</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                        {assignedTickets.filter(ticket => 
                          ticket.priority === "High" && ticket.status !== "Resolved"
                        ).length > 3 && (
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/technician/reports">View All Escalated Tickets</Link>
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
              </TabsContent>
              
              <TabsContent value="pending" className="mt-4">
                <Card className="border shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Pending Tickets</CardTitle>
                    <CardDescription>
                      Tickets awaiting your action
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {assignedTickets.filter(ticket => ticket.status === "Pending").length > 0 ? (
                      <div className="space-y-4">
                        {assignedTickets
                          .filter(ticket => ticket.status === "Pending")
                          .slice(0, 3)
                          .map((ticket) => (
                            <div key={ticket.id} className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                              <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
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
                                  <Link to={`/technician/issue/${ticket.id}`}>View Details</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                        {assignedTickets.filter(ticket => ticket.status === "Pending").length > 3 && (
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/technician/reports">View All Pending Tickets</Link>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="rounded-full bg-primary/10 p-3 mb-3">
                          <CheckCircle className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-muted-foreground">No pending tickets at the moment</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="inprogress" className="mt-4">
                <Card className="border shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">In Progress Tickets</CardTitle>
                    <CardDescription>
                      Tickets you are currently working on
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {assignedTickets.filter(ticket => ticket.status === "In Progress").length > 0 ? (
                      <div className="space-y-4">
                        {assignedTickets
                          .filter(ticket => ticket.status === "In Progress")
                          .slice(0, 3)
                          .map((ticket) => (
                            <div key={ticket.id} className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                              <Wrench className="h-5 w-5 text-blue-500 mt-0.5" />
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
                                  <Link to={`/technician/issue/${ticket.id}`}>View Details</Link>
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                        {assignedTickets.filter(ticket => ticket.status === "In Progress").length > 3 && (
                          <Button variant="outline" className="w-full" asChild>
                            <Link to="/technician/reports">View All In Progress Tickets</Link>
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="rounded-full bg-primary/10 p-3 mb-3">
                          <AlertCircle className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-muted-foreground">No tickets in progress at the moment</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Calendar Section */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Upcoming Schedule</CardTitle>
                <CardDescription>
                  Your calendar for the week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Today's Shift</h3>
                        <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-primary">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/20 text-primary rounded-full h-10 w-10 flex items-center justify-center">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Tomorrow's Shift</h3>
                        <p className="text-sm text-muted-foreground">9:00 AM - 5:00 PM</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/technician/profile" className="flex items-center justify-center gap-1">
                      View Full Schedule
                      <ArrowRight className="h-4 w-4 ml-1" />
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
