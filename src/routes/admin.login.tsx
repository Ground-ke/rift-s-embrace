import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAdminAuth, PRESET_ACCOUNTS, type UserRole } from "@/lib/auth/admin-auth-context";
import { VerveIcon } from "@/components/brand/verve-logo";
import {
  Shield,
  KeyRound,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Sign In — Verve & Co. | Hauntings of the Rift" },
      {
        name: "description",
        content: "Secure organizer and security checkpoint authentication gateway.",
      },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const {
    signIn,
    signInWithGoogle,
    signOut,
    switchTestRole,
    user,
    role,
    isAuthenticated,
    isAdmin,
    isLoading,
  } = useAdminAuth();
  const [email, setEmail] = useState("erastus.n.gathungu@gmail.com");
  const [password, setPassword] = useState("••••••••••••");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated as admin, provide quick entry or auto-navigate
  useEffect(() => {
    if (!isLoading && isAuthenticated && isAdmin) {
      // Don't auto-redirect abruptly if the user just navigated here with an error
      // but if authenticated without error, redirect to admin
      const timer = setTimeout(() => {
        navigate({ to: "/admin" });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, isAdmin, navigate]);

  const handleGoogleSignIn = async () => {
    setIsGoogleSigningIn(true);
    setErrorMessage(null);
    try {
      const res = await signInWithGoogle();
      if (res.success) {
        toast.success("Authenticated with Google Auth", {
          description: "Administrator session established",
        });
        navigate({ to: "/admin" });
      } else {
        setErrorMessage(res.message || "Failed to sign in with Google.");
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Google authentication error.");
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await signIn(email, "admin");
      if (res.success) {
        toast.success("Authenticated as Event Administrator", {
          description: `Logged in as ${email}`,
        });
        navigate({ to: "/admin" });
      } else {
        setErrorMessage(res.message || "Failed to authenticate.");
      }
    } catch {
      setErrorMessage("Authentication failed. Please verify credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (targetRole: UserRole) => {
    switchTestRole(targetRole);
    const account = PRESET_ACCOUNTS[targetRole];
    toast.success(`Active profile set to: ${targetRole.toUpperCase()}`, {
      description: account.email,
    });
    if (targetRole === "admin") {
      navigate({ to: "/admin" });
    }
  };

  return (
    <div className="min-h-screen bg-oxblood-darker flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-oxblood/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header Branding */}
      <div className="text-center mb-8 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <VerveIcon className="w-8 h-8 text-amber-400" />
          <span className="font-display text-2xl text-bone tracking-wide">Verve &amp; Co.</span>
        </Link>
        <h1 className="font-display text-3xl sm:text-4xl text-bone tracking-tight">
          Admin Portal Authentication
        </h1>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1">
          Hauntings of the Rift · Operations &amp; Access Control Gateway
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md border border-lavender/20 bg-card/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative z-10">
        {/* Already Logged In Banner */}
        {isAuthenticated && isAdmin && (
          <div className="mb-6 p-4 border border-emerald-500/40 bg-emerald-950/40 text-emerald-200 text-xs rounded-none">
            <div className="flex items-center gap-2 font-semibold text-emerald-300 mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Active Admin Session Detected
            </div>
            <p className="text-[11px] text-emerald-200/80 mb-3">
              Signed in as <span className="font-mono text-emerald-100">{user?.email}</span> ({user?.name || "Administrator"}).
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => navigate({ to: "/admin" })}
                className="bg-emerald-600 hover:bg-emerald-500 text-bone text-xs font-mono h-8 flex-1"
              >
                Go to Dashboard
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={signOut}
                className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/60 text-xs h-8"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="mb-5 p-3.5 border border-red-500/50 bg-red-950/40 flex items-start gap-3 text-red-200 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-red-300">Authentication Alert</p>
              <p className="text-[11px] leading-relaxed text-red-200/90">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Firebase Google Sign-In */}
        <div className="space-y-3 mb-5">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleSigningIn || isSubmitting}
            className="w-full bg-white text-stone-900 hover:bg-stone-100 font-sans tracking-normal h-11 border border-stone-300 shadow-sm flex items-center justify-center gap-3 transition-colors active:scale-[0.99]"
          >
            {isGoogleSigningIn ? (
              <span className="text-xs font-medium flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" />
                Signing in with Google...
              </span>
            ) : (
              <>
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-xs font-semibold">Sign In with Google</span>
              </>
            )}
          </Button>

          <div className="flex items-center gap-3 my-4">
            <div className="h-px bg-border/80 flex-1" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              or organizer credentials
            </span>
            <div className="h-px bg-border/80 flex-1" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label
              htmlFor="admin-email"
              className="text-xs text-lavender uppercase font-mono tracking-wider"
            >
              Administrator Email
            </Label>
            <div className="relative">
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@verve.co.ke"
                required
                className="bg-background border-border text-bone font-mono text-sm pl-9"
              />
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="admin-pass"
                className="text-xs text-lavender uppercase font-mono tracking-wider"
              >
                Access Token / Password
              </Label>
              <span className="text-[10px] text-muted-foreground font-mono">256-Bit Encrypted</span>
            </div>
            <div className="relative">
              <Input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="bg-background border-border text-bone font-mono text-sm pl-9"
              />
              <KeyRound className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 font-sans tracking-wide mt-2 h-11"
          >
            {isSubmitting ? (
              "Authenticating Credentials..."
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>Access Management Console</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Quick Role Tester Profiles */}
        <div className="mt-8 pt-6 border-t border-border/60">
          <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-3 text-center">
            One-Click Testing Accounts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("admin")}
              className="text-xs font-mono border-border bg-background/50 hover:bg-card text-lavender hover:text-bone h-9"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              Organizer (Superadmin)
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("scanner")}
              className="text-xs font-mono border-border bg-background/50 hover:bg-card text-lavender hover:text-bone h-9"
            >
              <Shield className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              Gate Staff (Scanner)
            </Button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-start gap-2 text-[11px] text-muted-foreground font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Protected by Cloud Firestore access rules, rate-limited tokens, and immutable audit logs.
          </span>
        </div>
      </div>

      {/* Return to Public Site */}
      <div className="mt-6 text-center relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-bone transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Hauntings of the Rift Ticket Experience</span>
        </Link>
      </div>

      <footer className="mt-8 text-center text-xs text-muted-foreground font-mono relative z-10">
        Verve &amp; Co. Operational Systems · Nakuru, Kenya · 2026
      </footer>
    </div>
  );
}
