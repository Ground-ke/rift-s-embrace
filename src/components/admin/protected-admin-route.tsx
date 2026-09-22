import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useAdminAuth } from "../../lib/auth/admin-auth-context";
import { VerveIcon } from "../brand/verve-logo";
import { ShieldAlert, LogIn, ArrowLeft, RefreshCw, UserCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, role, isLoading, isAuthenticated, isAdmin, switchTestRole } = useAdminAuth();

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

  // Not authenticated -> Prompt login
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-oxblood-darker flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full border border-lavender/20 bg-card/90 p-8 shadow-2xl backdrop-blur-sm">
          <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <ShieldAlert className="w-6 h-6" />
          </div>

          <h2 className="font-display text-2xl text-bone tracking-wide">
            Organizer Authentication Required
          </h2>
          <p className="text-sm text-muted-foreground mt-2 font-sans">
            You must be authenticated as an authorized event administrator to access the Hauntings
            of the Rift operations portal.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link to="/admin/login">
              <Button className="w-full bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 font-sans tracking-wide">
                <LogIn className="w-4 h-4 mr-2" />
                Go to Admin Sign In
              </Button>
            </Link>

            <Link to="/">
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
            this area strictly requires elevated{" "}
            <span className="text-red-400 font-bold font-mono">ADMIN</span> permissions.
          </p>

          <div className="my-6 border-t border-b border-border/60 py-4 bg-background/40 px-4 text-left">
            <p className="text-xs text-muted-foreground uppercase font-mono tracking-wider mb-2">
              Instant Sandbox Role Switcher (Evaluation Only):
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-amber-950/30 border-amber-500/40 text-amber-300 hover:bg-amber-900/50 text-xs font-mono"
                onClick={() => switchTestRole("admin")}
              >
                <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                Switch to Admin Role
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-card border-border text-muted-foreground hover:text-bone text-xs font-mono"
                onClick={() => switchTestRole("scanner")}
              >
                Switch to Scanner
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
