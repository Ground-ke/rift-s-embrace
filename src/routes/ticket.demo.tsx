import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DigitalTicket, DigitalTicketData } from "@/components/event/digital-ticket";
import { VerveBackButton, VervePresenterBadge } from "@/components/brand/verve-logo";
import {
  CheckCircle2,
  ScanLine,
  CircleX,
  AlertCircle,
  FileText,
  Download,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/ticket/demo")({
  head: () => ({
    meta: [
      { title: "Digital Ticket Experience — Verve & Co. | Hauntings of the Rift" },
      {
        name: "description",
        content:
          "Official cryptographic digital admission ticket preview for Hauntings of the Rift presented by Verve & Co.",
      },
      { property: "og:title", content: "Digital Ticket Pass — Verve & Co." },
      {
        property: "og:description",
        content: "Interactive preview of the official event admission ticket and PDF pass.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TicketDemo,
});

type State = "valid" | "used" | "cancelled" | "refunded";

function TicketDemo() {
  const [ticketState, setTicketState] = useState<State>("valid");

  const [ticketData, setTicketData] = useState<DigitalTicketData>({
    ticketNumber: "HRT-DEMO-001",
    qrHash: "HRT_SECURE_VERIFIED_HMAC_HASH_DEMO_001",
    tierSlug: "vip",
    tierName: "VIP Pass",
    admitsCount: 1,
    attendeeName: "Sample Guest",
    buyerEmail: "guest@example.com",
    buyerPhone: "+254712345678",
    status: "valid",
    priceKes: 2500,
    issuedAt: "2026-09-25T10:00:00.000Z",
    usedAt: null,
    venue: {
      name: "Top Cliff Lounge",
      address: "Nakuru-Nairobi Highway, Free Area",
      city: "Nakuru, Kenya",
      date: "Saturday, 31 October 2026",
      time: "4:00 PM - 4:00 AM EAT",
      ageRequirement: "Strictly 21+ with Valid ID",
    },
  });

  const handleStateChange = (newState: State) => {
    setTicketState(newState);
    setTicketData((prev) => ({
      ...prev,
      status: newState,
      usedAt: newState === "used" ? new Date().toISOString() : null,
    }));
  };

  return (
    <div className="min-h-screen px-4 py-8 sm:py-14 bg-background">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-bone/15 pb-4 mb-8">
          <VerveBackButton to="/" label="Back to Event" />
          <VervePresenterBadge />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-2">
            <Sparkles className="size-3.5" /> Official Interactive Pass Preview
          </div>
          <h1 className="text-3xl font-display text-bone sm:text-5xl">DIGITAL ADMISSION PASS</h1>
          <p className="text-xs text-bone-muted mt-2 max-w-lg mx-auto">
            This live pass renders with verified cryptographic HMAC QR tokens, instant state
            toggling, and fast server-side high-res PDF generation.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
          {/* Main Digital Ticket Component with Live QR & PDF Download */}
          <div>
            <DigitalTicket
              ticket={ticketData}
              showAdminActions={true}
              onStatusChange={(status) => handleStateChange(status as State)}
            />
          </div>

          {/* Sidebar Controls */}
          <aside className="space-y-6">
            <div className="border border-bone/20 bg-card p-5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-lavender font-mono">
                Simulate Gate Status
              </p>
              <div className="grid gap-2">
                <Button
                  variant={ticketState === "valid" ? "event" : "spectral"}
                  size="sm"
                  className="justify-start font-mono text-xs"
                  onClick={() => handleStateChange("valid")}
                >
                  <CheckCircle2 className="size-3.5 mr-2 text-emerald-400" />
                  Valid (Ready for Entry)
                </Button>
                <Button
                  variant={ticketState === "used" ? "event" : "spectral"}
                  size="sm"
                  className="justify-start font-mono text-xs"
                  onClick={() => handleStateChange("used")}
                >
                  <ScanLine className="size-3.5 mr-2 text-amber-400" />
                  Used (Checked In at Gate)
                </Button>
                <Button
                  variant={ticketState === "cancelled" ? "event" : "spectral"}
                  size="sm"
                  className="justify-start font-mono text-xs"
                  onClick={() => handleStateChange("cancelled")}
                >
                  <CircleX className="size-3.5 mr-2 text-red-400" />
                  Cancelled Pass
                </Button>
                <Button
                  variant={ticketState === "refunded" ? "event" : "spectral"}
                  size="sm"
                  className="justify-start font-mono text-xs"
                  onClick={() => handleStateChange("refunded")}
                >
                  <AlertCircle className="size-3.5 mr-2 text-purple-400" />
                  Refunded Pass
                </Button>
              </div>
            </div>

            {/* Direct Document Downloads */}
            <div className="border border-bone/20 bg-card p-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-lavender font-mono">
                Fast Pass Downloads
              </p>
              <p className="text-xs text-bone-muted leading-relaxed">
                Test the backend image &amp; PDF generation pipeline running on Sharp + jsPDF.
              </p>
              <div className="space-y-2 pt-1">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs border-blue-500/40 text-blue-300 hover:bg-blue-950/40"
                >
                  <a href="/api/tickets/HRT-DEMO-001/pdf" target="_blank" rel="noopener noreferrer">
                    <FileText className="size-3.5 mr-2 text-blue-400" />
                    Download High-Res PDF Pass
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs border-amber-500/40 text-amber-300 hover:bg-amber-950/40"
                >
                  <a
                    href="/api/tickets/HRT-DEMO-001/image"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="size-3.5 mr-2 text-amber-400" />
                    Download High-Res JPG Pass
                  </a>
                </Button>
              </div>
            </div>

            <div className="border border-bone/10 bg-background/50 p-4 text-xs text-muted-foreground space-y-2 font-mono">
              <div className="text-[11px] text-bone uppercase tracking-wider font-semibold">
                Pass Credentials
              </div>
              <div>
                Code: <span className="text-amber-400">{ticketData.ticketNumber}</span>
              </div>
              <div>
                Tier: <span className="text-bone">{ticketData.tierName}</span>
              </div>
              <div>
                Date: <span className="text-bone">31 Oct 2026</span>
              </div>
              <div>
                Gate: <span className="text-bone">Top Cliff Lounge</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
