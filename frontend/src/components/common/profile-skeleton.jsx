import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12">
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
              <Skeleton className="h-36 w-36 rounded-full border-4 border-background shadow-xl" />
              <Skeleton className="mt-6 h-8 w-48 rounded-md" />
              <div className="mt-2 flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
              <Skeleton className="mt-2 h-5 w-32 rounded-md" />
              <Skeleton className="mt-4 h-4 w-40 rounded-md" />
            </div>

            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Contact Information */}
                <div className="bg-muted/20 rounded-xl p-6 shadow-sm space-y-5">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Department Information */}
                <div className="bg-muted/20 rounded-xl p-6 shadow-sm space-y-5">
                  <Skeleton className="h-6 w-60 mb-4" />
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-muted/10 rounded-xl p-6 shadow-sm space-y-5">
                <Skeleton className="h-6 w-60 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-5 w-40" />
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
