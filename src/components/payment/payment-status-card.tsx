import { AlertTriangle, CheckCircle2, Loader2, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PaymentUiStatus = "idle" | "processing" | "queued" | "success" | "failed";

const STATE = {
  idle: {
    icon: Clock3,
    tone: "text-muted-foreground",
    ring: "border-border",
    label: "Ready",
  },
  processing: {
    icon: Loader2,
    tone: "text-lavender",
    ring: "border-lavender/40",
    label: "Processing payment",
  },
  queued: {
    icon: Clock3,
    tone: "text-lavender",
    ring: "border-lavender/40",
    label: "Already in progress",
  },
  success: {
    icon: CheckCircle2,
    tone: "text-emerald-400",
    ring: "border-emerald-400/40",
    label: "Payment confirmed",
  },
  failed: {
    icon: AlertTriangle,
    tone: "text-destructive",
    ring: "border-destructive/50",
    label: "Payment failed",
  },
} as const;

export function PaymentStatusCard({
  status,
  message,
  reference,
  attempt,
  onRetry,
}: {
  status: PaymentUiStatus;
  message: string;
  reference?: string | null;
  attempt?: number;
  onRetry?: () => void;
}) {
  const state = STATE[status];
  const Icon = state.icon;

  return (
    <section
      aria-live="polite"
      className={`border ${state.ring} bg-card p-6 transition-colors sm:p-8`}
    >
      <div className="flex items-start gap-4">
        <span className={`mt-1 ${state.tone}`}>
          <Icon className={`size-7 ${status === "processing" ? "animate-spin" : ""}`} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-lavender">
            Payment status
          </p>
          <h2 className="mt-1 font-display text-2xl text-bone">{state.label}</h2>
          <p className="mt-2 text-sm text-bone-muted">{message}</p>

          {reference ? (
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              Provider reference: {reference}
            </p>
          ) : null}

          {typeof attempt === "number" && attempt > 1 ? (
            <p className="mt-1 text-xs text-muted-foreground">
              Attempt {attempt} · same request key reused, so you cannot be charged twice.
            </p>
          ) : null}

          {status === "failed" && onRetry ? (
            <Button className="mt-5" variant="event" onClick={onRetry}>
              Retry payment safely
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
