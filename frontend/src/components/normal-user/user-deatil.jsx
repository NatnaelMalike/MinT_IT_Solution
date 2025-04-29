import { BadgeCheck, Building2, Briefcase, Calendar, Mail, Phone, User2, MapPin } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useApiQueryById } from "@/hooks/useApiQueryById"
import { useParams } from "react-router-dom"
import ProfileSkeleton from "../common/profile-skeleton"
import { Button } from "../ui/button"


export default function UserDetail() {
    const {id} = useParams()
    const {data: user, isLoading, isError, error} = useApiQueryById(["user",id], '/user/id',{}, id)
    const getInitials = (name) => {
        return name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      }

  if (isLoading) {
    return <ProfileSkeleton />;
  }
    if (isError) {
      return (
        <div className="container mx-auto py-6 max-w-6xl">
          <Card className="shadow-md">
            <CardContent className="p-8 text-center">
              <div className="text-red-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Error Loading Issue</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {error?.response?.data?.message || "An error occurred while loading the issue."}
              </p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </CardContent>
          </Card>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 ">
      <div className="container mx-auto max-w-5xl">
        <Card className="shadow-xl border-0 overflow-hidden">
          {/* Header Background */}
          <div className="h-48 bg-gradient-to-r from-primary/80 to-primary relative">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 mix-blend-overlay"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-6 pb-8 -mt-20">
            {/* Avatar and Name Section */}
            <div className="flex flex-col items-center text-center mb-10">
              <Avatar className="h-36 w-36 border-4 border-background shadow-xl">
                <AvatarImage src={user.profilePicture} alt={user.name} />
                <AvatarFallback className="text-3xl bg-primary/10">{getInitials(user.name)}</AvatarFallback>
              </Avatar>

              <h1 className="mt-6 text-3xl font-bold tracking-tight">{user.name}</h1>

              <div className="mt-2 flex items-center gap-2">
              <Badge className="text-xs px-3 py-1" variant={"secondary"}>
                  {user.status}
                </Badge>
                {user.status =="active" && <BadgeCheck className="h-5 w-5 text-primary" />}
              </div>

              <p className="mt-2 text-muted-foreground text-lg font-medium">{user.profession == "None"? "Employee": user.profession.name}</p>

              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.department?.sector || "No sector specified"}</span>
              </div>
            </div>

            <CardContent className="p-0">
              {/* Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Contact Information */}
                <div className="bg-muted/20 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold flex items-center mb-4">
                    <User2 className="h-5 w-5 mr-2 text-primary" />
                    Contact Information
                  </h3>
                  <Separator className="mb-6" />
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Information */}
                <div className="bg-muted/20 rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-semibold flex items-center mb-4">
                    <Building2 className="h-5 w-5 mr-2 text-primary" />
                    Department Information
                  </h3>
                  <Separator className="mb-6" />
                  <div className="space-y-5">
                    {user.department && (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Department</p>
                            <p className="font-medium">{user.department.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Sector</p>
                            <p className="font-medium">{user.department.sector}</p>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <User2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Role</p>
                        <p className="font-medium">{user.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-muted/10 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Member since</p>
                      <p className="font-medium">{user.createdAt}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}

