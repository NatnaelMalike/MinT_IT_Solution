import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function UserHero() {
  return (
    <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
          Welcome to <span className="text-primary">Your Dashboard</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-10">
          Report issues easily and track progress in real-time. Let’s make problem-solving effortless!
        </p>
        <Button
          className="relative group px-8 py-6 text-lg bg-gradient-to-r from-acc to-accent hover:opacity-90"
        >
            <Link to={'add-request'}>
          <span className="relative text-foreground z-10">Report an Issue</span>
          <div className="absolute inset-0 bg-white/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            </Link>
        </Button>
      </div>
    </div>
  );
}
