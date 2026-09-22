import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  LayoutDashboard,
  Menu,
  QrCode,
  Settings,
  Ticket,
  Users,
  XCircle,
  ShieldCheck,
  Tag,
  FileText,
  LogOut,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Receipt,
  Camera,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerveIcon } from "@/components/brand/verve-logo";
import { ProtectedAdminRoute } from "@/components/admin/protected-admin-route";
import { TicketManagementTab } from "@/components/admin/ticket-management-tab";
import { PromotionManagementTab } from "@/components/admin/promotion-management-tab";
import { ScannerManagementTab } from "@/components/admin/scanner-management-tab";
import { AuditLogTab } from "@/components/admin/audit-log-tab";
import { NotificationCenterTab } from "@/components/admin/notification-center-tab";
import { AnalyticsLiveTab } from "@/components/admin/analytics-live-tab";
import { ManualVerificationTab } from "@/components/admin/manual-verification-tab";
import { useAdminAuth } from "@/lib/auth/admin-auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Operations Portal — Verve & Co. | Hauntings of the Rift" },
      {
        name: "description",
        content:
          "Authoritative event operations, ticket ledger management, gate check-in, and promotional campaign administration.",
      },
      { property: "og:title", content: "Hauntings of the Rift Admin Portal — Verve & Co." },
      { property: "og:description", content: "Executive event operations & gate security." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

interface OverviewMetrics {
  totalRevenueKes: number;
  totalTicketsSold: number;
  checkedInCount: number;
  remainingCapacity: number;
  activePromotionsCount: number;
  activeScannersCount: number;
  hourlySalesTrend: Array<{ hour: string; sales: number; count: number }>;
}

function AdminPage() {
  return (
    <ProtectedAdminRoute>
      <AdminDashboardContent />
    </ProtectedAdminRoute>
  );
}

function AdminDashboardContent() {
  const { user, role, signOut, switchTestRole } = useAdminAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [metrics, setMetrics] = useState<OverviewMetrics | null>(null);
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(true);

  // Fetch overview metrics from backend
  const fetchMetrics = async () => {
    setIsLoadingMetrics(true);
    try {
      const res = await fetch("/api/admin/overview");
      const data = await res.json();
      if (data.success) {
        setMetrics({
          totalRevenueKes: data.totalRevenueKes,
          totalTicketsSold: data.totalTicketsSold,
          checkedInCount: data.checkedInCount,
          remainingCapacity: data.remainingCapacity,
          activePromotionsCount: data.activePromotionsCount,
          activeScannersCount: data.activeScannersCount,
          hourlySalesTrend: data.hourlySalesTrend || [],
        });
      }
    } catch (err) {
      console.warn("Failed to load metrics:", err);
    } finally {
      setIsLoadingMetrics(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.info("Signed out of Admin Portal");
  };

  const navItems: Array<{
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: string;
    isRoute?: string;
  }> = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    {
      id: "verifications",
      label: "M-Pesa Verification",
      icon: ShieldCheck,
      badge: "Pending",
    },
    {
      id: "analytics",
      label: "Live Page Analytics",
      icon: BarChart3,
      badge: "Firebase",
    },
    {
      id: "tickets",
      label: "Ticket Management",
      icon: Ticket,
      badge: metrics ? `${metrics.totalTicketsSold}` : undefined,
    },
    {
      id: "notifications",
      label: "Notification Gateway",
      icon: MessageSquare,
      badge: "WhatsApp & Email",
    },
    {
      id: "promotions",
      label: "Promotion Codes",
      icon: Tag,
      badge: metrics ? `${metrics.activePromotionsCount} Active` : undefined,
    },
    {
      id: "scanners",
      label: "Gate Terminals",
      icon: QrCode,
      badge: metrics ? `${metrics.activeScannersCount} Active` : undefined,
    },
    { id: "audit", label: "Audit Ledger", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-oxblood-darker lg:grid lg:grid-cols-[16rem_1fr] text-bone">
      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`${
          mobileNavOpen ? "fixed inset-0 z-50 block" : "hidden"
        } border-r border-border/80 bg-card/95 p-5 backdrop-blur-md lg:static lg:block flex flex-col justify-between`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5" aria-label="Return to public site">
              <VerveIcon className="w-7 h-7 text-amber-400" />
              <div>
                <span className="font-display text-lg text-bone tracking-wide block leading-none">
                  Verve &amp; Co.
                </span>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5 block">
                  Admin Portal
                </span>
              </div>
            </Link>
            <Button
              className="lg:hidden"
              variant="ghost"
              size="icon"
              aria-label="Close admin menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <XCircle className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-1">
            {navItems.map(({ id, label, icon: Icon, badge }) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setActiveTab(id);
                    setMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-sans rounded-none transition-colors ${
                    isActive
                      ? "bg-oxblood text-bone font-medium border-l-2 border-amber-400 shadow-sm"
                      : "text-muted-foreground hover:bg-background/80 hover:text-bone"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-lavender/60"}`}
                    />
                    <span>{label}</span>
                  </div>
                  {badge && (
                    <span className="text-[10px] font-mono bg-background/80 px-1.5 py-0.5 rounded border border-border text-lavender">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-3 border-t border-border/50 space-y-1">
              <Link to="/admin/scan" className="w-full block">
                <button className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-sans text-amber-300 bg-amber-950/30 hover:bg-amber-950/50 border border-amber-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <Camera className="w-4 h-4 text-amber-400" />
                    <span>Live Gate Scanner</span>
                  </div>
                  <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1 rounded">
                    LIVE
                  </span>
                </button>
              </Link>

              <Link to="/admin/reconciliation" className="w-full block">
                <button className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-sans text-emerald-300 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-4 h-4 text-emerald-400" />
                    <span>Reconciliation</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1 rounded">
                    AUDIT
                  </span>
                </button>
              </Link>
            </div>
          </nav>
        </div>

        {/* Bottom User Profile & Sign Out */}
        <div className="mt-8 pt-4 border-t border-border/80 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground truncate">{user?.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/" className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-[11px] font-mono border-border text-muted-foreground hover:text-bone h-8"
              >
                <ExternalLink className="w-3 h-3 mr-1.5" />
                Public Site
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-[11px] font-mono text-red-400/80 hover:text-red-300 hover:bg-red-950/40 h-8 px-2"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="min-w-0 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-border/80 bg-card/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              className="lg:hidden size-9"
              variant="ghost"
              size="icon"
              aria-label="Open admin menu"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu className="w-5 h-5 text-bone" />
            </Button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate font-display text-base sm:text-lg text-bone tracking-wide">
                  Hauntings of the Rift
                </h1>
                <span className="hidden sm:inline text-xs text-muted-foreground font-mono">
                  · 31 Oct 2026
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono truncate hidden sm:block">
                Top Cliff Lounge, Nakuru · Official Organizer Console
              </p>
            </div>
          </div>

          {/* Right Header: Explicit Role Indicator & Fast Tester */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* EXPLICIT ROLE INDICATOR BADGE */}
            <div className="flex items-center gap-1.5 border border-amber-500/50 bg-amber-950/40 px-2.5 py-1 rounded-none shadow-[0_0_12px_rgba(245,158,11,0.15)]">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300">
                ROLE: {role?.toUpperCase() || "ADMIN"}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchMetrics}
              className="border-border text-lavender hover:text-bone text-xs h-8 px-2.5 hidden sm:flex items-center"
              title="Refresh Dashboard"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingMetrics ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </header>

        {/* Dynamic Tab Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TAB 1: OVERVIEW & REAL-TIME METRICS */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stat Metric Cards */}
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <div className="border border-border bg-card p-5 space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-mono uppercase tracking-wider">
                      Gross Revenue
                    </span>
                    <CircleDollarSign className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-display text-3xl text-bone">
                    KES {metrics ? metrics.totalRevenueKes.toLocaleString() : "—"}
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Direct M-Pesa Daraja 2.0 Settlement
                  </p>
                </div>

                <div className="border border-border bg-card p-5 space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-mono uppercase tracking-wider">
                      Passes Issued
                    </span>
                    <Ticket className="w-4 h-4 text-lavender" />
                  </div>
                  <div className="font-display text-3xl text-bone">
                    {metrics ? metrics.totalTicketsSold : "—"} Passes
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Cryptographic HMAC QR Passes
                  </p>
                </div>

                <div className="border border-green-500/30 bg-card p-5 space-y-2">
                  <div className="flex items-center justify-between text-green-400">
                    <span className="text-xs font-mono uppercase tracking-wider">
                      Gate Check-ins
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="font-display text-3xl text-green-300">
                    {metrics ? metrics.checkedInCount : "—"} /{" "}
                    {metrics ? metrics.totalTicketsSold : "—"}
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Admitted at Security Perimeters
                  </p>
                </div>

                <div className="border border-border bg-card p-5 space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-mono uppercase tracking-wider">
                      Available Capacity
                    </span>
                    <Users className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="font-display text-3xl text-bone">
                    {metrics ? metrics.remainingCapacity : "—"} / 1,200
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    Max Venue Fire Marshall Limit
                  </p>
                </div>
              </div>

              {/* Chart & Quick Actions Grid */}
              <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                {/* Sales Velocity Chart */}
                <div className="border border-border bg-card p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg text-bone flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        Hourly Ticket Sales Trend
                      </h2>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        Live checkout velocity on 31 October 2026
                      </p>
                    </div>
                    <Badge variant="outline" className="border-border text-[10px] font-mono">
                      Real-Time
                    </Badge>
                  </div>

                  <div className="mt-6 flex h-48 items-end gap-2 border-b border-l border-border/80 px-2 pb-2">
                    {(
                      metrics?.hourlySalesTrend || [
                        { hour: "10:00", sales: 12000, count: 6 },
                        { hour: "12:00", sales: 24000, count: 12 },
                        { hour: "14:00", sales: 48000, count: 20 },
                        { hour: "16:00", sales: 85000, count: 35 },
                        { hour: "18:00", sales: 140000, count: 58 },
                        { hour: "20:00", sales: 220000, count: 85 },
                        { hour: "22:00", sales: 310000, count: 110 },
                      ]
                    ).map((item, idx) => {
                      const maxSale = 350000;
                      const heightPercent = Math.max(12, Math.round((item.sales / maxSale) * 100));
                      return (
                        <div
                          key={idx}
                          className="flex-1 flex flex-col items-center gap-1 group relative"
                        >
                          {/* Tooltip on hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-background border border-border px-2 py-1 text-[10px] font-mono text-bone whitespace-nowrap z-10 pointer-events-none">
                            KES {item.sales.toLocaleString()} ({item.count} tickets)
                          </div>
                          <div
                            className="w-full bg-gradient-to-t from-oxblood via-oxblood/80 to-amber-500/80 hover:to-amber-400 transition-all rounded-t-none"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="text-[9px] font-mono text-muted-foreground">
                            {item.hour}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Operations Quick Shortcuts */}
                <div className="border border-border bg-card p-5 space-y-4">
                  <h2 className="font-display text-lg text-bone flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Quick Operations
                  </h2>
                  <p className="text-xs text-muted-foreground font-mono">
                    Instant access to event administrator workflows.
                  </p>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setActiveTab("analytics")}
                      className="w-full flex items-center justify-between p-3 border border-amber-500/30 bg-amber-950/20 hover:bg-amber-950/40 text-left transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-medium text-amber-300 group-hover:text-amber-200 transition-colors flex items-center gap-1.5">
                          <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Live Page Analytics &amp; Telemetry</span>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          View real-time visitors, telemetry streams, and checkout funnels from
                          Firebase
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-amber-400 group-hover:text-bone transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <button
                      onClick={() => setActiveTab("tickets")}
                      className="w-full flex items-center justify-between p-3 border border-border/80 bg-background/60 hover:bg-background text-left transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-medium text-bone group-hover:text-amber-400 transition-colors">
                          Manage &amp; Invalidate Passes
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          Search attendees, resend emails, or revoke admission
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-bone transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <button
                      onClick={() => setActiveTab("promotions")}
                      className="w-full flex items-center justify-between p-3 border border-border/80 bg-background/60 hover:bg-background text-left transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-medium text-bone group-hover:text-amber-400 transition-colors">
                          Launch Promotion Code
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          Configure flash sale percentage or fixed KES discounts
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-bone transition-transform group-hover:translate-x-0.5" />
                    </button>

                    <button
                      onClick={() => setActiveTab("scanners")}
                      className="w-full flex items-center justify-between p-3 border border-border/80 bg-background/60 hover:bg-background text-left transition-colors group"
                    >
                      <div>
                        <div className="text-xs font-medium text-bone group-hover:text-amber-400 transition-colors">
                          Launch Gate Scanner Terminal
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                          Simulate optical HMAC verification and duplicate check-in
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-bone transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: REAL-TIME PAGE ANALYTICS (FIREBASE) */}
          {activeTab === "analytics" && <AnalyticsLiveTab />}

          {/* TAB: MANUAL M-PESA APPROVAL QUEUE */}
          {activeTab === "verifications" && <ManualVerificationTab />}

          {/* TAB 2: TICKET MANAGEMENT */}
          {activeTab === "tickets" && <TicketManagementTab />}

          {/* TAB 3: NOTIFICATION GATEWAY */}
          {activeTab === "notifications" && <NotificationCenterTab />}

          {/* TAB 4: PROMOTION MANAGEMENT */}
          {activeTab === "promotions" && <PromotionManagementTab />}

          {/* TAB 5: SCANNERS & GATE MANAGEMENT */}
          {activeTab === "scanners" && <ScannerManagementTab />}

          {/* TAB 6: AUDIT LOG */}
          {activeTab === "audit" && <AuditLogTab />}
        </main>
      </div>
    </div>
  );
}
