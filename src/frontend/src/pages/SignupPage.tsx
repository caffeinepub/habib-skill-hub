import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Gamepad2, Loader2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function SignupPage() {
  const { login, isLoggingIn } = useInternetIdentity();
  const { actor } = useActor();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [step, setStep] = useState<"identity" | "profile">("identity");
  const [saving, setSaving] = useState(false);

  const handleConnect = async () => {
    try {
      await login();
      setStep("profile");
    } catch {
      toast.error("Connection failed. Please try again.");
    }
  };

  const handleSaveProfile = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username.");
      return;
    }
    setSaving(true);
    try {
      await actor?.saveCallerUserProfile({ username: username.trim() });
      toast.success("Account created! Welcome to Game Site.");
      navigate({ to: "/dashboard" });
    } catch {
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.65 0.22 145 / 0.05)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "oklch(0.72 0.18 195 / 0.05)",
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
              background: "oklch(0.65 0.22 145 / 0.15)",
              border: "1px solid oklch(0.65 0.22 145 / 0.3)",
            }}
          >
            <Gamepad2
              className="w-8 h-8"
              style={{ color: "oklch(0.82 0.2 145)" }}
            />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Game Site
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Join thousands of players earning rewards.
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
              Create account
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {step === "identity"
                ? "Connect your identity to get started"
                : "Choose your gamer tag"}
            </p>
          </div>

          {step === "identity" ? (
            <Button
              onClick={handleConnect}
              disabled={isLoggingIn}
              className="w-full h-11 font-semibold text-sm"
              style={{
                background: "oklch(0.65 0.22 145)",
                color: "oklch(0.1 0.02 145)",
              }}
              data-ocid="signup.primary_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Connect Internet Identity
                </>
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-foreground"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  placeholder="CoolGamer99"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveProfile()}
                  autoFocus
                  data-ocid="signup.username.input"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                disabled={saving}
                className="w-full h-11 font-semibold text-sm"
                style={{
                  background: "oklch(0.65 0.22 145)",
                  color: "oklch(0.1 0.02 145)",
                }}
                data-ocid="signup.submit_button"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete Setup"
                )}
              </Button>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold hover:underline"
              style={{ color: "oklch(0.82 0.2 145)" }}
              data-ocid="signup.login.link"
            >
              Sign in
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
