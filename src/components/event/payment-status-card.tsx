import React from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  XCircle,
  Clock3,
  RefreshCw,
  Smartphone,
  ShieldCheck,
  RotateCcw,
  Ticket,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type PaymentPhase =
  "idle" | "initiating" | "waiting_for_pin" | "paid" | "failed" | "timed_out" | "review";

export interface PaymentStatusCardProps {
  orderId: string;
  orderNumber: string;
  buyerName: string;
  buyerPhone: string;
  ticketName: string;
  quantity: number;
  totalKes: number;
  paymentPhase: PaymentPhase;
  paymentError?: string | null;
  mpesaReceipt?: string | null;
  firstTicketCode?: string | null;
  cooldownSeconds?: number;
  secondsRemaining?: number;
  onInitiatePayment: () => void;
  onCheckStatusAgain: () => void;
  onCancelReservation?: () => void;
}

export const PaymentStatusCard: React.FC<PaymentStatusCardProps> = ({
  orderNumber,
  buyerName,
  buyerPhone,
  ticketName,
  quantity,
  totalKes,
  paymentPhase,
  paymentError,
  mpesaReceipt,
  firstTicketCode,
  cooldownSeconds = 0,
  secondsRemaining,
  onInitiatePayment,
  onCheckStatusAgain,
  onCancelReservation,
}) => {
  return (
    <div className="space-y-6" id="payment-status-container">
      {/* Reservation Expiry Timer Warning if active */}
      {secondsRemaining !== undefined && secondsRemaining > 0 && paymentPhase !== "paid" && (
        <div className="flex items-center justify-between border border-amber-500/30 bg-amber-950/20 px-4 py-3 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <Clock3 className="size-4 text-amber-400 shrink-0" />
            <span>
              Inventory held for your reservation:{" "}
              <strong className="font-mono text-amber-300">
                {Math.floor(secondsRemaining / 60)
                  .toString()
                  .padStart(2, "0")}
                :{(secondsRemaining % 60).toString().padStart(2, "0")}
              </strong>
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:inline">
            Active Hold
          </span>
        </div>
      )}

      {/* Summary Card */}
      <div className="border border-border bg-card p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Order Reference
            </span>
            <p className="font-mono text-lg font-bold text-bone">{orderNumber}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Purchaser
            </span>
            <p className="text-lg text-bone">{buyerName}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              M-Pesa Number
            </span>
            <p className="font-mono text-lg text-bone">+{buyerPhone}</p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Pass Selection
            </span>
            <p className="text-lg text-bone">
              {quantity} × {ticketName}
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Authoritative Due</span>
          <strong className="font-display text-3xl text-bone">
            KES {totalKes.toLocaleString()}
          </strong>
        </div>
      </div>

      {/* STATE 1: IDLE / READY */}
      {paymentPhase === "idle" && (
        <div className="border border-border bg-card p-6 space-y-6">
          <div>
            <h2 className="text-xl font-display text-bone">Instant Safaricom M-Pesa STK Prompt</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Click below to send an authoritative payment prompt directly to{" "}
              <strong className="text-bone font-mono">+{buyerPhone}</strong>. Enter your M-Pesa PIN
              on your handset to complete your reservation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="event"
              size="xl"
              onClick={onInitiatePayment}
              className="w-full sm:w-auto"
              id="pay-mpesa-button"
            >
              <Smartphone className="mr-2 size-5" /> Send M-Pesa Prompt
            </Button>
            {onCancelReservation && (
              <Button variant="spectral" size="xl" onClick={onCancelReservation}>
                Cancel Reservation
              </Button>
            )}
          </div>
        </div>
      )}

      {/* STATE 2: INITIATING */}
      {paymentPhase === "initiating" && (
        <div className="border border-border bg-card p-8 text-center space-y-4">
          <div className="inline-grid size-12 place-items-center bg-oxblood/20 text-oxblood-light border border-oxblood/40 animate-pulse">
            <RefreshCw className="size-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-xl font-display text-bone">Connecting to Safaricom Daraja...</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Authorizing transaction session and pushing prompt to your phone.
            </p>
          </div>
        </div>
      )}

      {/* STATE 3: WAITING FOR PIN */}
      {paymentPhase === "waiting_for_pin" && (
        <div className="border border-amber-500/50 bg-amber-950/20 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
              <Smartphone className="size-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="inline-block bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-500/30 uppercase tracking-widest">
                STK Prompt Dispatched
              </div>
              <h2 className="text-2xl font-display text-bone">CHECK YOUR PHONE</h2>
              <p className="text-sm text-bone-muted">
                An M-Pesa prompt has been sent to{" "}
                <strong className="text-bone font-mono">+{buyerPhone}</strong>. Enter your PIN to
                authorize <strong className="text-bone">KES {totalKes.toLocaleString()}</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-t border-amber-500/30 pt-4 text-sm text-amber-200/90 font-mono">
            <RefreshCw className="size-4 animate-spin text-amber-400 shrink-0" />
            <span>Awaiting payment verification confirmation...</span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-amber-500/20">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-amber-500/40 text-bone hover:bg-amber-950/40"
              onClick={onInitiatePayment}
              disabled={cooldownSeconds > 0}
            >
              {cooldownSeconds > 0
                ? `Resend Prompt in ${cooldownSeconds}s`
                : "Didn't receive prompt? Resend"}
            </Button>
            {onCancelReservation && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-bone"
                onClick={onCancelReservation}
              >
                Cancel Reservation
              </Button>
            )}
          </div>
        </div>
      )}

      {/* STATE 4: SUCCESS / PAID */}
      {paymentPhase === "paid" && (
        <div className="border border-emerald-500/60 bg-emerald-950/30 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shrink-0">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="space-y-1">
              <div className="inline-block bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/40 uppercase tracking-widest">
                Payment Verified
              </div>
              <h2 className="text-3xl font-display text-bone">PAYMENT CONFIRMED</h2>
              <p className="text-sm text-emerald-300 font-mono">
                M-Pesa Receipt:{" "}
                <strong className="text-bone font-bold">{mpesaReceipt || "VERIFIED"}</strong>
              </p>
              <p className="text-sm text-bone-muted pt-1">
                Your payment of{" "}
                <strong className="text-bone">KES {totalKes.toLocaleString()}</strong> has been
                settled and your cryptographically signed tickets have been generated.
              </p>
            </div>
          </div>

          <div className="border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-bone-muted space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <ShieldCheck className="size-4" /> Cryptographic Digital Pass Issued
            </div>
            <p>
              Order <strong className="text-bone font-mono">{orderNumber}</strong> has been
              permanently written to the guest registry. You can view, save, and present your
              digital ticket now.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {firstTicketCode ? (
              <Button asChild variant="event" size="xl" className="w-full sm:w-auto">
                <Link to="/ticket/$code" params={{ code: firstTicketCode }}>
                  <Ticket className="mr-2 size-5" /> View Digital Ticket & QR
                </Link>
              </Button>
            ) : (
              <Button asChild variant="event" size="xl" className="w-full sm:w-auto">
                <Link to="/ticket/$code" params={{ code: "HR-7892-4910" }}>
                  <Ticket className="mr-2 size-5" /> View Digital Ticket & QR
                </Link>
              </Button>
            )}
            <Button asChild variant="spectral" size="xl">
              <Link to="/">
                Return Home <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* STATE 5: FAILED / DECLINED */}
      {paymentPhase === "failed" && (
        <div className="border border-destructive/60 bg-destructive/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center bg-destructive/20 text-destructive border border-destructive/50 shrink-0">
              <XCircle className="size-6" />
            </div>
            <div className="space-y-1">
              <div className="inline-block bg-destructive/20 px-2 py-0.5 text-[11px] font-bold text-destructive-foreground border border-destructive/40 uppercase tracking-widest">
                Transaction Incomplete
              </div>
              <h2 className="text-2xl font-display text-bone">PAYMENT NOT COMPLETED</h2>
              <p className="text-sm text-destructive-foreground">
                {paymentError || "The M-Pesa transaction was cancelled or declined on your device."}
              </p>
              <p className="text-xs text-bone-muted pt-1">
                Your reservation remains active while the countdown timer runs. You can safely retry
                with the same transaction key.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="event"
              size="xl"
              onClick={onInitiatePayment}
              className="w-full sm:w-auto"
            >
              <RotateCcw className="mr-2 size-4" /> Retry M-Pesa Payment
            </Button>
            {onCancelReservation && (
              <Button variant="spectral" size="xl" onClick={onCancelReservation}>
                Cancel Reservation
              </Button>
            )}
          </div>
        </div>
      )}

      {/* STATE 6: TIMED OUT / REVIEW */}
      {(paymentPhase === "timed_out" || paymentPhase === "review") && (
        <div className="border border-amber-500/50 bg-card p-6 sm:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
              <Clock3 className="size-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-display text-bone">STATUS PENDING VERIFICATION</h2>
              <p className="text-sm text-bone-muted">
                {paymentError ||
                  "We are reconciling your transaction with Safaricom. If you already entered your PIN, please do not pay again while we complete verification."}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="event" size="xl" onClick={onCheckStatusAgain}>
              <RefreshCw className="mr-2 size-4" /> Check Status Again
            </Button>
            <Button
              variant="spectral"
              size="xl"
              onClick={onInitiatePayment}
              disabled={cooldownSeconds > 0}
            >
              {cooldownSeconds > 0 ? `Retry in ${cooldownSeconds}s` : "Resend M-Pesa Prompt"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
