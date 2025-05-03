import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"
import { Link } from "react-router-dom"

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background">
      <div className="flex flex-col items-center max-w-md mx-auto text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <ShieldAlert className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">401</h1>
        <h2 className="text-2xl font-semibold mb-4">Unauthorized</h2>
        <p className="mb-8 text-muted-foreground">
          You don't have permission to access this page. Please sign in or contact your administrator if you believe
          this is an error.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
