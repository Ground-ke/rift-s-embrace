import { ReactNode, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAdminAuth } from "../../lib/auth/admin-auth-context";
import { VerveIcon } from "../brand/verve-logo";
import { GoogleSignInButton } from "../brand/google-sign-in-button";
import { ShieldAlert, LogIn, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, role, isLoading, isAuthenticated, isAdmin, signInWithGoogle } = useAdminAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setAuthError(null);
    try {
      const res = await signInWithGoogle();
      if (res.success) {
        toast.success("Welcome, Administrator", {
          description: "Google authentication verified",
        });
      } else {
        setAuthError(res.message || "Google authentication failed.");
      }
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Google authentication error.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-oxblood-darker flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border border-amber-500/30 animate-ping absolute inset-0" />
          <div className="w-16 h-16 rounded-full border-2 border-amber-500/80 border-t-transparent animate-spin flex items-center justify-center bg-card/60">
            <VerveIcon className="w-7 h-7 text-amber-400" />
          </div>
        </div>
        <h2 className="font-display text-xl text-bone uppercase tracking-wider">
          Verifying Rift Security Credentials
        </h2>
        <p className="text-xs text-muted-foreground mt-2 font-mono">
          Authorizing administrative roles and cryptographic tokens...
        </p>
      </div>
    );
  }

  // Not authenticated -> In-place login options
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-oxblood-darker flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full border border-lavender/20 bg-card/95 p-8 shadow-2xl backdrop-blur-sm space-y-6">
          <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div>
            <h2 className="font-display text-2xl text-bone tracking-wide">
              Organizer Portal Sign In
            </h2>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              Authenticate with your authorized Google account or organizer credentials to access
              /admin operations.
            </p>
          </div>

          {authError && (
            <div className="border border-amber-500/50 bg-amber-950/30 p-3.5 text-left text-xs text-amber-200 font-mono space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0" /> Note on Domain Authorization:
              </div>
              <p>{authError}</p>
              {authError.includes("Authorized Domains") && (
                <p className="text-[11px] text-muted-foreground pt-1">
                  Tip: In Firebase Console &gt; Authentication &gt; Settings &gt; Authorized
                  Domains, add <strong className="text-bone">verve-hauntings.vercel.app</strong>.
                </p>
              )}
            </div>
          )}

          <div className="space-y-3">
            {/* Primary Google Auth Button */}
            <GoogleSignInButton
              onClick={handleGoogleSignIn}
              isLoading={isGoogleLoading}
              label="Sign in with Google"
              className="w-full justify-center h-11"
            />

            <div className="pt-2">
              <Link to="/admin/login" className="block">
                <Button
                  variant="outline"
                  className="w-full border-border bg-background/60 hover:bg-background text-lavender hover:text-bone text-xs font-mono h-11"
                >
                  <LogIn className="w-4 h-4 mr-2 text-amber-400" />
                  Sign In with Email (verve.n.co.ke@gmail.com)
                </Button>
              </Link>
            </div>

            <Link to="/" className="block pt-1">
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-bone text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Return to Public Event
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated but NOT admin role (403 Access Denied)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-oxblood-darker flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-lg w-full border border-red-500/40 bg-card/95 p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

          <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-950/60 border border-red-500/50 text-red-400">
            <ShieldAlert className="w-7 h-7 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-2 mb-3">
            <Badge
              variant="outline"
              className="border-red-500/60 bg-red-950/50 text-red-300 font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5"
            >
              HTTP 403 Forbidden
            </Badge>
            <Badge
              variant="outline"
              className="border-border bg-background/80 text-muted-foreground font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5"
            >
              Role: {role?.toUpperCase() || "CUSTOMER"}
            </Badge>
          </div>

          <h2 className="font-display text-3xl text-bone tracking-wide">Access Denied</h2>

          <p className="text-sm text-lavender/80 mt-3 font-sans leading-relaxed">
            Your account (<span className="text-bone font-mono">{user.email}</span>) holds the{" "}
            <span className="text-amber-400 font-bold uppercase font-mono">{role}</span> role, but
            this area strictly requires verified{" "}
            <span className="text-red-400 font-bold font-mono">ADMIN</span> permissions.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link to="/admin/login">
              <Button className="w-full sm:w-auto bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs font-sans">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Sign In With Another Account
              </Button>
            </Link>
            <Link to="/">
              <Button
                variant="ghost"
                className="w-full sm:w-auto text-muted-foreground hover:text-bone text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Return to Public Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and is an Admin
  return <>{children}</>;
}
