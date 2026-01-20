"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dumbbell } from "lucide-react";

export default function SignIn() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-8 w-full max-w-md mx-auto min-h-screen justify-center items-center px-4 bg-background">
      <div className="text-center flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <Dumbbell className="h-10 w-10 text-foreground" />
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            DSAgym
          </h1>
        </div>
        <p className="text-muted-foreground">
          Track and solve LeetCode problems based on your rating
        </p>
      </div>

      <form
        className="flex flex-col gap-4 w-full bg-card p-8 border border-border"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData)
            .catch((error) => {
              setError(error.message);
              setLoading(false);
            })
            .then(() => {
              router.push("/");
            });
        }}
      >
        <h2 className="text-xl font-semibold text-card-foreground text-center">
          {flow === "signIn" ? "Sign In" : "Create Account"}
        </h2>

        <input
          className="bg-background text-foreground p-3 border border-input focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-colors placeholder:text-muted-foreground"
          type="email"
          name="email"
          placeholder="Email"
          required
        />

        <div className="flex flex-col gap-1">
          <input
            className="bg-background text-foreground p-3 border border-input focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-colors placeholder:text-muted-foreground"
            type="password"
            name="password"
            placeholder="Password"
            minLength={8}
            required
          />
          {flow === "signUp" && (
            <p className="text-xs text-muted-foreground px-1">
              Password must be at least 8 characters
            </p>
          )}
        </div>

        <button
          className="bg-primary text-primary-foreground font-semibold py-3 hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : flow === "signIn" ? "Sign In" : "Sign Up"}
        </button>

        <div className="flex flex-row gap-2 text-sm justify-center">
          <span className="text-muted-foreground">
            {flow === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <button
            type="button"
            className="text-foreground hover:text-foreground/80 font-medium underline underline-offset-2 cursor-pointer transition-colors"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up" : "Sign in"}
          </button>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 p-4">
            <p className="text-destructive font-medium text-sm break-words">
              Error: {error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
