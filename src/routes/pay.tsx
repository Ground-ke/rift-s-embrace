import React, { useState, useEffect, useRef, useCallback } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { PaymentStatusCard, PaymentPhase } from "@/components/event/payment-status-card";
import {
  VerveBackButton,
  VervePresenterBadge,
  VerveErrorState,
} from "@/components/brand/verve-logo";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const paySearchSchema = z.object({
  orderId: z.string().optional(),
  token: z.string().optional(),
  idempotencyKey: z.string().optional(),
});

export const Route = createFileRoute("/pay")({
  validateSearch: (search) => paySearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Complete Payment — Hauntings of the Rift | Verve & Co." },
      {
        name: "description",
        content:
          "Authoritative M-Pesa checkout and instant cryptographic ticket issuance for Hauntings of the Rift.",
      },
      { property: "og:title", content: "Payment & Confirmation — Hauntings of the Rift" },
      { property: "og:description", content: "Complete your admission payment securely." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PayRouteComponent,
});

interface OrderData {
  orderId: string;
  orderNumber: string;
  ticketName: string;
  quantity: number;
  admitsCount: number;
  totalKes: number;
  buyerName: string;
  buyerPhone: string;
  status: string;
  expiresAt: string;
  checkoutToken: string;
}

function PayRouteComponent() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [paymentPhase, setPaymentPhase] = useState<PaymentPhase>("idle");
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [mpesaReceipt, setMpesaReceipt] = useState<string | null>(null);
  const [firstTicketCode, setFirstTicketCode] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number | undefined>(undefined);

  // Stable idempotency key initialization — preserved across all retries in this session
  const [idempotencyKey, setIdempotencyKey] = useState<string>(() => search.idempotencyKey || "");

  const idempotencyInitialized = useRef(false);

  useEffect(() => {
    if (!idempotencyInitialized.current) {
      idempotencyInitialized.current = true;
      if (!search.idempotencyKey) {
        const newKey = `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        setIdempotencyKey(newKey);
      }
    }
  }, [search.idempotencyKey]);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // Expiration countdown timer
  useEffect(() => {
    if (!order || !order.expiresAt) return;

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.round((new Date(order.expiresAt).getTime() - Date.now()) / 1000),
      );
      setSecondsRemaining(remaining);
      if (remaining <= 0 && paymentPhase !== "paid") {
        setPaymentPhase("failed");
        setPaymentError("Your 10-minute reservation has expired. Please select passes again.");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [order, paymentPhase]);

  // Authoritatively issue and verify payment via idempotency gate
  const handleVerifyCompletedPayment = useCallback(
    async (orderId: string, token: string, receipt?: string) => {
      try {
        const res = await fetch("/api/pay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idempotency_key: idempotencyKey,
            order_id: orderId,
            checkout_token: token,
            mpesa_receipt: receipt,
          }),
        });

        const data = await res.json();
        if (data.success && data.tickets && data.tickets.length > 0) {
          setFirstTicketCode(data.tickets[0].ticketNumber);
        }
      } catch (e) {
        console.warn("Could not verify tickets:", e);
      }
    },
    [idempotencyKey],
  );

  // Fetch authoritative order details
  useEffect(() => {
    async function loadOrder() {
      if (!search.orderId || !search.token) {
        setLoading(false);
        setErrorMessage("No active order or authorization token provided in link.");
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${search.orderId}?token=${search.token}`, {
          headers: {
            Authorization: `Bearer ${search.token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          setErrorMessage(
            errData.message || "Order reservation not found or authorization expired.",
          );
          setLoading(false);
          return;
        }

        const data = (await res.json()) as OrderData;
        setOrder(data);

        if (data.status === "paid" || data.status === "approved" || data.status === "completed") {
          setPaymentPhase("paid");
          // Verify & retrieve tickets
          handleVerifyCompletedPayment(data.orderId, data.checkoutToken);
        }
      } catch {
        setErrorMessage("Network error fetching order details. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [search.orderId, search.token, handleVerifyCompletedPayment]);

  // Polling for Payment Status Verification
  useEffect(() => {
    if (paymentPhase !== "waiting_for_pin" || !order) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/payments/status?order_id=${order.orderId}&token=${order.checkoutToken}`,
          {
            headers: {
              Authorization: `Bearer ${order.checkoutToken}`,
            },
          },
        );

        if (!res.ok) return;

        const data = await res.json();
        if (!data.success) return;

        if (data.orderStatus === "paid" || data.paymentStatus === "successful") {
          setPaymentPhase("paid");
          setMpesaReceipt(data.mpesaReceipt);
          clearInterval(pollInterval);
          handleVerifyCompletedPayment(order.orderId, order.checkoutToken, data.mpesaReceipt);
        } else if (data.paymentStatus === "failed") {
          setPaymentPhase("failed");
          setPaymentError(data.errorMessage || "Payment was declined or cancelled on your phone.");
          clearInterval(pollInterval);
        } else if (data.paymentStatus === "timed_out") {
          setPaymentPhase("timed_out");
          setPaymentError("Payment prompt timed out without confirmation.");
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.warn("[Pay Polling] Status check error:", err);
      }
    }, 2500);

    return () => clearInterval(pollInterval);
  }, [paymentPhase, order, handleVerifyCompletedPayment]);

  // Trigger STK Push
  const handleInitiateMpesaPayment = async () => {
    if (!order) return;
    setPaymentError(null);
    setPaymentPhase("initiating");

    try {
      const res = await fetch("/api/payments/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: order.orderId,
          checkout_token: order.checkoutToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setPaymentError(data.message || "Could not initiate M-Pesa prompt. Please try again.");
        setPaymentPhase("failed");
        return;
      }

      setPaymentPhase("waiting_for_pin");
      setCooldownSeconds(30);
    } catch {
      setPaymentError("Network error sending M-Pesa payment prompt. Please try again.");
      setPaymentPhase("failed");
    }
  };

  // Manual Status Check
  const handleCheckStatusAgain = async () => {
    if (!order) return;
    try {
      const res = await fetch(
        `/api/payments/status?order_id=${order.orderId}&token=${order.checkoutToken}`,
        {
          headers: {
            Authorization: `Bearer ${order.checkoutToken}`,
          },
        },
      );
      const data = await res.json();
      if (data.success && (data.orderStatus === "paid" || data.paymentStatus === "successful")) {
        setPaymentPhase("paid");
        setMpesaReceipt(data.mpesaReceipt);
        handleVerifyCompletedPayment(order.orderId, order.checkoutToken, data.mpesaReceipt);
      }
    } catch {
      // noop
    }
  };

  // Cancel reservation
  const handleCancelReservation = async () => {
    if (!order) return;
    try {
      await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: order.orderId,
          token: order.checkoutToken,
        }),
      });
    } catch {
      // noop
    } finally {
      navigate({ to: "/checkout" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-4 py-16 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="size-8 animate-spin text-oxblood-light mx-auto" />
          <p className="font-display text-lg text-bone">Loading reservation status...</p>
        </div>
      </div>
    );
  }

  if (errorMessage || !order) {
    return (
      <div className="min-h-screen bg-background px-4 py-12">
        <div className="mx-auto max-w-xl">
          <div className="mb-6">
            <VerveBackButton to="/checkout" label="Return to Ticket Selection" />
          </div>
          <VerveErrorState
            code="400"
            title="Reservation Unavailable"
            description={
              errorMessage || "We could not find an active reservation for this session."
            }
            actionLabel="Select Tickets"
            actionTo="/checkout"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-14">
      <div className="mx-auto max-w-2xl">
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-bone/15 pb-4 mb-8">
          <Button asChild variant="ghost" size="sm" className="text-bone-muted hover:text-bone">
            <Link to="/checkout">
              <ArrowLeft className="mr-2 size-4" /> Change Selection
            </Link>
          </Button>
          <VervePresenterBadge />
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-oxblood-light">
            Secure Payment Gateway
          </p>
          <h1 className="text-3xl font-display text-bone sm:text-4xl mt-1">CONFIRM &amp; PAY</h1>
          <p className="text-sm text-bone-muted mt-1">
            Complete your M-Pesa transaction to receive your cryptographic admission pass.
          </p>
        </div>

        {/* Payment Component Card */}
        <PaymentStatusCard
          orderId={order.orderId}
          orderNumber={order.orderNumber}
          buyerName={order.buyerName}
          buyerPhone={order.buyerPhone}
          ticketName={order.ticketName}
          quantity={order.quantity}
          totalKes={order.totalKes}
          paymentPhase={paymentPhase}
          paymentError={paymentError}
          mpesaReceipt={mpesaReceipt}
          firstTicketCode={firstTicketCode}
          cooldownSeconds={cooldownSeconds}
          secondsRemaining={secondsRemaining}
          onInitiatePayment={handleInitiateMpesaPayment}
          onCheckStatusAgain={handleCheckStatusAgain}
          onCancelReservation={handleCancelReservation}
        />
      </div>
    </div>
  );
}
