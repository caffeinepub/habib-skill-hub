import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { Gamepad2, Loader2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function LoginPage() {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const navigate = useNavigate();

  if (identity) {
    navigate({ to: "/dashboard" });
    return null;
  }

  const handleLogin = async () => {
    try {
      await login();
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.72 0.18 195 / 0.05)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.65 0.22 145 / 0.05)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: "oklch(0.72 0.18 195 / 0.15)",
              border: "1px solid oklch(0.72 0.18 195 / 0.3)",
            }}
          >
            <Gamepad2
              className="w-8 h-8"
              style={{ color: "oklch(0.88 0.16 195)" }}
            />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Game Site
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Play games. Earn rewards. Cash out.
          </p>
        </div>

        <div
          className="rounded-2xl p-8 space-y-6"
          style={{
            background: "oklch(var(--card))",
            border: "1px solid oklch(var(--border))",
          }}
        >
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Welcome back
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Sign in to access your dashboard
            </p>
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full h-11 font-semibold text-sm"
            style={{
              background: "oklch(0.72 0.18 195)",
              color: "oklch(0.1 0.01 195)",
            }}
            data-ocid="login.primary_button"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Login with Internet Identity
              </>
            )}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link
              to="/signup"
              className="font-semibold hover:underline"
              style={{ color: "oklch(0.88 0.16 195)" }}
              data-ocid="login.signup.link"
            >
              Create an account
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </div>
  );
}
