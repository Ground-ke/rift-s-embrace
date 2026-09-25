import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { VerveBackButton, VervePresenterBadge } from "@/components/brand/verve-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ticket, Search, ShieldCheck, Sparkles, ArrowRight, HelpCircle } from "lucide-react";

export const Route = createFileRoute("/tickets")({
  head: () => ({
    meta: [
      { title: "My Tickets & Admission Passes — Verve & Co. | Hauntings of the Rift" },
      {
        name: "description",
        content: "Lookup and view your official digital tickets for Hauntings of the Rift.",
      },
      { property: "og:title", content: "Tickets & Passes — Hauntings of the Rift" },
      { property: "og:description", content: "Access and present your digital event passes." },
    ],
  }),
  component: TicketsPageComponent,
});

function TicketsPageComponent() {
  const navigate = useNavigate();
  const [ticketCodeInput, setTicketCodeInput] = useState("");

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const code = ticketCodeInput.trim().toUpperCase();
    if (code) {
      navigate({ to: "/ticket/$code", params: { code } });
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-14">
      <div className="mx-auto max-w-xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-bone/15 pb-4 mb-8">
          <VerveBackButton to="/" label="Back to Event" />
          <VervePresenterBadge />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-oxblood-light">
            Verified Admission Portal
          </p>
          <h1 className="text-3xl font-display text-bone sm:text-4xl mt-1">MY EVENT TICKETS</h1>
          <p className="text-xs text-bone-muted mt-2 max-w-md mx-auto">
            Access your cryptographic pass, download your PDF ticket, or present your QR code at the
            venue gate.
          </p>
        </div>

        {/* Card: Instant Ticket Code Lookup */}
        <div className="border border-bone/20 bg-card p-6 sm:p-8 shadow-2xl backdrop-blur-sm space-y-6">
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <Label
                htmlFor="ticket-code-input"
                className="text-xs font-mono uppercase tracking-wider text-muted-foreground"
              >
                Enter Ticket Code
              </Label>
              <div className="relative mt-1">
                <Input
                  id="ticket-code-input"
                  type="text"
                  placeholder="e.g. HRT-DEMO-001 or HR-8492-7104"
                  value={ticketCodeInput}
                  onChange={(e) => setTicketCodeInput(e.target.value)}
                  className="bg-background border-border text-bone font-mono text-sm pl-9 uppercase"
                  required
                />
                <Ticket className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              </div>
            </div>

            <Button type="submit" variant="event" size="xl" className="w-full">
              <Search className="mr-2 size-4" /> View Digital Ticket
            </Button>
          </form>

          {/* Quick Demo Ticket Link */}
          <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold font-mono text-[11px] uppercase tracking-wider">
                <Sparkles className="size-3.5" /> Demo Ticket Pass Available
              </div>
              <span className="text-[10px] text-amber-400/80 font-mono">HRT-DEMO-001</span>
            </div>
            <p className="text-bone-muted">
              Want to preview the official ticket pass design and high-res PDF generation?
            </p>
            <div className="pt-1">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full border-amber-500/40 text-amber-300 hover:bg-amber-950/40 text-xs"
              >
                <Link to="/ticket/$code" params={{ code: "HRT-DEMO-001" }}>
                  Open Verified Demo Pass <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Action Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-bone/10">
            <Button asChild variant="spectral" size="sm" className="text-xs">
              <Link to="/recover">
                <HelpCircle className="mr-1.5 size-3.5" /> Recover Lost Ticket
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-border text-xs text-bone">
              <Link to="/checkout">
                <Ticket className="mr-1.5 size-3.5" /> Buy More Passes
              </Link>
            </Button>
          </div>
        </div>

        {/* Security Assurance */}
        <div className="mt-8 text-center text-xs text-muted-foreground space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            Cryptographic HMAC SHA-256 Verified Ticketing
          </p>
          <p className="text-[11px] text-bone/40">Top Cliff Lounge • Nakuru • 31 Oct 2026</p>
        </div>
      </div>
    </div>
  );
}
