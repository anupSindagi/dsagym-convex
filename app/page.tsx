"use client";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { Dumbbell, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-8">
        <Content />
      </main>
    </div>
  );
}

function Header() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <Dumbbell className="h-6 w-6 text-foreground" />
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            DSAgym
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated && (
            <button
              className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors cursor-pointer border border-border"
              onClick={() =>
                void signOut().then(() => {
                  router.push("/signin");
                })
              }
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function Content() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto flex items-center justify-center py-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          />
          <div
            className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <p className="ml-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <p className="text-muted-foreground">
          Please sign in to access DSAgym.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome to DSAgym
        </h2>
        <p className="text-muted-foreground">
          Your personal training ground for mastering data structures and algorithms.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-card border border-border p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Your Rating
          </h3>
          <p className="text-3xl font-bold text-foreground">--</p>
          <p className="text-sm text-muted-foreground mt-1">
            Set your current LeetCode rating to get started
          </p>
        </div>

        <div className="bg-card border border-border p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Problems Solved
          </h3>
          <p className="text-3xl font-bold text-foreground">0</p>
          <p className="text-sm text-muted-foreground mt-1">
            Track your progress over time
          </p>
        </div>

        <div className="bg-card border border-border p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Current Streak
          </h3>
          <p className="text-3xl font-bold text-foreground">0 days</p>
          <p className="text-sm text-muted-foreground mt-1">
            Keep practicing to build your streak
          </p>
        </div>
      </div>

      <div className="mt-8 bg-card border border-border p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">
          Recommended Problems
        </h3>
        <p className="text-muted-foreground text-center py-8">
          Set your rating to get personalized problem recommendations.
        </p>
      </div>
    </div>
  );
}
