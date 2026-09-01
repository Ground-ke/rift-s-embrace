import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export type DigitalTicketData = {
  ticket_code: string;
  qr_hash: string;
  event_name: string;
  event_date: string | null;
  venue: string | null;
  tier: string;
  holder_name: string;
  is_used: boolean;
};

function formatDate(value: string | null) {
  if (!value) return "Date to be confirmed";
  return new Date(value).toLocaleString("en-KE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  });
}

export function DigitalTicket({ ticket, origin }: { ticket: DigitalTicketData; origin?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const base = origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  const verificationUrl = `${base}/ticket/${encodeURIComponent(ticket.ticket_code)}?sig=${ticket.qr_hash}`;

  const download = () => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `${ticket.ticket_code}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <article className="relative overflow-hidden border border-border bg-card">
      <header className="border-b border-border bg-oxblood/20 p-6">
        <p className="text-xs font-bold uppercase tracking-widest text-lavender">Digital ticket</p>
        <h1 className="mt-1 font-display text-3xl text-bone">{ticket.event_name}</h1>
        <p className="mt-1 text-sm text-bone-muted">{formatDate(ticket.event_date)}</p>
        <p className="text-sm text-bone-muted">{ticket.venue ?? "Venue to be confirmed"}</p>
      </header>

      <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div ref={wrapRef} className="relative w-fit bg-bone p-3">
          <QRCodeCanvas value={verificationUrl} size={168} level="M" includeMargin={false} />
          {ticket.is_used ? (
            <span className="absolute inset-0 grid place-items-center bg-background/80 text-xs font-bold uppercase tracking-widest text-destructive">
              Scanned
            </span>
          ) : null}
        </div>

        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Holder</dt>
            <dd className="text-bone">{ticket.holder_name}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Tier</dt>
            <dd className="text-bone">{ticket.tier}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Ticket code</dt>
            <dd className="break-all font-mono text-xs text-bone">{ticket.ticket_code}</dd>
          </div>
          <div>
            <span
              className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest ${
                ticket.is_used
                  ? "bg-destructive/20 text-destructive"
                  : "bg-emerald-500/15 text-emerald-400"
              }`}
            >
              {ticket.is_used ? "Used" : "Valid"}
            </span>
          </div>
        </dl>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-6">
        <p className="text-xs text-muted-foreground">
          The QR encodes a signed verification link. Screenshots work at the gate.
        </p>
        <Button variant="bone" onClick={download}>
          <Download className="mr-2 size-4" />
          Save QR
        </Button>
      </footer>
    </article>
  );
}
