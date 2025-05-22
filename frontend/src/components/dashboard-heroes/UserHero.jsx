import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Clock, CheckCircle, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useApiQuery } from "@/hooks/useApiQuery";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function UserHero() {
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);
  
  // Fetch user's tickets
  const { data: tickets = [], isLoading: ticketsLoading } = useApiQuery(
    ["userTickets", user?.id],
    `/issue/user/${user?.id}`,
    { enabled: !!user?.id }
  );

  // Calculate ticket statistics
  const ticketStats = {
    pending: tickets.filter(ticket => ticket.status === "Pending").length,
    inProgress: tickets.filter(ticket => ticket.status === "In Progress").length,
    resolved: tickets.filter(ticket => ticket.status === "Resolved").length,
    total: tickets.length
  };

  // Get most recent ticket
  const recentTicket = tickets.length > 0 
    ? tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] 
    : null;

  // Set appropriate greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let greetingText = "";
    
    if (hour < 12) greetingText = "Good morning";
    else if (hour < 18) greetingText = "Good afternoon";
    else greetingText = "Good evening";
    
    setGreeting(`${greetingText}, ${user?.name?.split(' ')[0] || 'there'}!`);
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
                {greeting}
              </h1>
              <p className="mt-2 text-muted-foreground">
                Need help with something today? We're here to assist you.
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
                <Link to="/user/add-request" className="flex items-center gap-2">
                  <PlusCircle className="h-5 w-5" />
                  <span>Create New Ticket</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Ticket Status Overview */}
          <motion.div variants={itemVariants}>
            <Card className="border shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Your Ticket Status</CardTitle>
                <CardDescription>
                  Overview of your current support tickets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
                    <Clock className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">{ticketStats.pending}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-100 dark:border-blue-900/30">
                    <AlertCircle className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold">{ticketStats.inProgress}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-100 dark:border-green-900/30">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                      <p className="text-2xl font-bold">{ticketStats.resolved}</p>
                    </div>
                  </div>
                </div>

                {ticketStats.total > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between mb-2 text-sm">
                      <span>Overall Progress</span>
                      <span>{Math.round((ticketStats.resolved / ticketStats.total) * 100)}%</span>
                    </div>
                    <Progress value={(ticketStats.resolved / ticketStats.total) * 100} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity and Help Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recent Ticket */}
            <motion.div variants={itemVariants}>
              <Card className="border shadow-md h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                  <CardDescription>
                    Your most recent support ticket
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentTicket ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{recentTicket.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(recentTicket.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          recentTicket.status === "Resolved" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                            : recentTicket.status === "In Progress" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}>
                          {recentTicket.status}
                        </div>
                      </div>
                      
                      <p className="text-sm line-clamp-2">
                        {recentTicket.description}
                      </p>
                      
                      <Button variant="outline" size="sm" asChild className="mt-2">
                        <Link to={`/user/issue/${recentTicket.id}`} className="flex items-center gap-1">
                          View Details
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="rounded-full bg-primary/10 p-3 mb-3">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-muted-foreground">No recent tickets found</p>
                      <Button variant="link" asChild className="mt-2">
                        <Link to="/user/add-request">Create your first ticket</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Help Center */}
            <motion.div variants={itemVariants}>
              <Card className="border shadow-md h-full">
                <CardHeader>
                  <CardTitle className="text-xl">Need Help?</CardTitle>
                  <CardDescription>
                    Quick access to support resources
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Frequently Asked Questions</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Find answers to common questions about our services
                        </p>
                        <Button variant="link" className="px-0 mt-1" asChild>
                          <Link to="/contact" className="flex items-center gap-1">
                            Browse FAQs
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Support Hours</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Our technicians are available Monday-Friday, 9am-5pm
                        </p>
                        <Button variant="link" className="px-0 mt-1" asChild>
                          <Link to="/contact" className="flex items-center gap-1">
                            Contact Support
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
