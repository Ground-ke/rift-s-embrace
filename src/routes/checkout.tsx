import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Info,
  LockKeyhole,
  Minus,
  Plus,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateAndNormalizeKenyanPhone } from "@/lib/validation/phone";
import type { ClientOrderResponse } from "@/server/order-service";
import { VerveBackButton, VerveIcon, VerveLogo } from "@/components/brand/verve-logo";

const ticketNames = ["early-bird", "couple", "couple-pass", "group-of-four"] as const;
const searchSchema = z.object({ ticket: z.string().optional().catch(undefined) });

export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Ticket Checkout — Hauntings of the Rift" },
      {
        name: "description",
        content: "Reserve your ticket for Hauntings of the Rift on 31 October in Nakuru.",
      },
      { property: "og:title", content: "Hauntings of the Rift Ticket Checkout" },
      { property: "og:description", content: "Reserve your ticket for 31 October in Nakuru." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

interface TicketOption {
  id: string;
  name: string;
  price: number;
  admitsCount: number;
  description: string;
}

const options: TicketOption[] = [
  {
    id: "early-bird",
    name: "Early Bird",
    price: 1000,
    admitsCount: 1,
    description: "Single entry pass",
  },
  {
    id: "couple-pass",
    name: "Couple Pass",
    price: 1800,
    admitsCount: 2,
    description: "Admits 2 guests together (1 QR bundle)",
  },
  {
    id: "group-of-four",
    name: "Group of Four",
    price: 3600,
    admitsCount: 4,
    description: "Admits 4 guests together (1 QR bundle)",
  },
];

function Checkout() {
  const { ticket } = Route.useSearch();

  // Normalize initial selection from URL
  const initialSelected = useMemo(() => {
    if (ticket === "couple") return "couple-pass";
    if (options.some((o) => o.id === ticket)) return ticket as string;
    return "early-bird";
  }, [ticket]);

  const [selected, setSelected] = useState<string>(initialSelected);
  const [quantity, setQuantity] = useState<number>(1);
  const [step, setStep] = useState<"select" | "details" | "payment" | "expired">("select");

  // Buyer Form State
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Reservation & Order State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeOrder, setActiveOrder] = useState<ClientOrderResponse | null>(null);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(600);

  // Payment Phase State (Gate 4)
  const [paymentPhase, setPaymentPhase] = useState<
    "idle" | "initiating" | "waiting_for_pin" | "paid" | "failed" | "timed_out" | "review"
  >("idle");
  const [mpesaReceipt, setMpesaReceipt] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [cooldownSeconds, setCooldownSeconds] = useState<number>(0);
  const [isCancelling, setIsCancelling] = useState(false);

  const choice = options.find((o) => o.id === selected) ?? options[0];

  // Real-time phone validation
  const phoneValidation = useMemo(() => {
    if (!buyerPhone) return null;
    return validateAndNormalizeKenyanPhone(buyerPhone);
  }, [buyerPhone]);

  // Idempotency key per checkout attempt
  const [idempotencyKey] = useState(
    () => `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
  );

  // Synchronize reservation countdown timer
  useEffect(() => {
    if (step !== "payment" || !activeOrder || paymentPhase === "paid") return;

    const interval = setInterval(() => {
      const targetTime = new Date(activeOrder.expiresAt).getTime();
      const now = Date.now();
      const diff = Math.max(0, Math.round((targetTime - now) / 1000));

      setSecondsRemaining(diff);

      if (diff <= 0) {
        clearInterval(interval);
        setStep("expired");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [step, activeOrder, paymentPhase]);

  // Cooldown timer for STK prompt retries
  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCooldownSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownSeconds]);

  // Polling for Payment Status Verification (Gate 4)
  useEffect(() => {
    if (paymentPhase !== "waiting_for_pin" || !activeOrder) return;

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/payments/status?order_id=${activeOrder.orderId}&token=${activeOrder.checkoutToken}`,
          {
            headers: {
              Authorization: `Bearer ${activeOrder.checkoutToken}`,
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
        } else if (data.paymentStatus === "failed") {
          setPaymentPhase("failed");
          setPaymentError(data.errorMessage || "Payment was declined or cancelled on your phone.");
          clearInterval(pollInterval);
        } else if (data.paymentStatus === "timed_out") {
          setPaymentPhase("timed_out");
          setPaymentError("Payment prompt timed out without confirmation.");
          clearInterval(pollInterval);
        } else if (data.paymentStatus === "payment_review") {
          setPaymentPhase("review");
          setPaymentError("Payment is undergoing manual verification.");
          clearInterval(pollInterval);
        }
      } catch (err) {
        console.warn("[Checkout] Status poll network hiccup:", err);
      }
    }, 2500);

    return () => clearInterval(pollInterval);
  }, [paymentPhase, activeOrder]);

  // Handle Order Creation / Reservation
  const handleCreateReservation = async () => {
    setNameTouched(true);
    setPhoneTouched(true);
    setErrorMessage(null);

    if (!buyerName.trim() || buyerName.trim().length < 2) {
      setErrorMessage("Please enter a valid full name (at least 2 characters).");
      return;
    }

    if (!phoneValidation?.isValid) {
      setErrorMessage(phoneValidation?.error || "Please enter a valid Kenyan phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticket_type_id: choice.id,
          quantity,
          buyer_name: buyerName.trim(),
          buyer_phone: phoneValidation.normalized,
          idempotency_key: idempotencyKey,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.message || "We couldn't complete your reservation. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setActiveOrder(data as ClientOrderResponse);
      const initialTtl = Math.max(
        0,
        Math.round((new Date(data.expiresAt).getTime() - Date.now()) / 1000),
      );
      setSecondsRemaining(initialTtl);
      setPaymentPhase("idle");
      setStep("payment");
    } catch {
      setErrorMessage(
        "Network error connecting to the ticket reservation service. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle M-Pesa STK Push Trigger
  const handleInitiateMpesaPayment = async () => {
    if (!activeOrder) return;
    setPaymentError(null);
    setPaymentPhase("initiating");

    try {
      const response = await fetch("/api/payments/mpesa/stkpush", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: activeOrder.orderId,
          checkout_token: activeOrder.checkoutToken,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setPaymentError(
          data.message || "Could not initiate M-Pesa payment prompt. Please try again.",
        );
        setPaymentPhase("failed");
        return;
      }

      setPaymentPhase("waiting_for_pin");
      setCooldownSeconds(30);
    } catch {
      setPaymentError("Network error sending M-Pesa payment request. Please try again.");
      setPaymentPhase("failed");
    }
  };

  // Cancel reservation & release inventory hold
  const handleCancelReservation = async () => {
    if (!activeOrder) {
      handleStartAgain();
      return;
    }

    setIsCancelling(true);
    try {
      await fetch("/api/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: activeOrder.orderId,
          token: activeOrder.checkoutToken,
        }),
      });
    } catch (e) {
      console.warn("Cancel order warning:", e);
    } finally {
      setIsCancelling(false);
      handleStartAgain();
    }
  };

  // Format seconds into MM:SS
  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const handleStartAgain = () => {
    setActiveOrder(null);
    setErrorMessage(null);
    setPaymentError(null);
    setPaymentPhase("idle");
    setMpesaReceipt(null);
    setStep("select");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4">
          <VerveBackButton to="/" label="Event" />
          <div className="min-w-0 flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 border-r border-border pr-3">
              <VerveIcon className="size-6 text-amber-400" />
            </div>
            <div>
              <p className="truncate font-display text-xl text-bone">Hauntings of the Rift</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                Verve &amp; Co. Official Ticket Checkout
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <LockKeyhole className="size-4 text-lavender" />
            <span className="hidden sm:inline">256-bit Encrypted</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 lg:py-12">
        {/* Step Indicator */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          {[
            { id: "select", label: "Ticket" },
            { id: "details", label: "Buyer Details" },
            { id: "payment", label: "Payment (Gate 4)" },
          ].map((s, i) => {
            const stepOrder = ["select", "details", "payment", "expired"];
            const currentIndex = stepOrder.indexOf(step);
            const isCompleted = currentIndex > i;
            const isCurrent = step === s.id;

            return (
              <div
                key={s.id}
                className={`flex items-center gap-2 ${
                  isCurrent ? "text-primary" : isCompleted ? "text-bone" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`grid size-6 place-items-center border text-xs font-mono transition-colors ${
                    isCurrent
                      ? "border-primary bg-primary text-primary-foreground font-bold"
                      : isCompleted
                        ? "border-bone text-bone"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
                {i < 2 && <ChevronRight className="size-3 text-muted-foreground/60" />}
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          {/* Main Form Body */}
          <section>
            {/* ------------------------------------------------------------- */}
            {/* STEP 1: CHOOSE TICKET & QUANTITY */}
            {/* ------------------------------------------------------------- */}
            {step === "select" && (
              <div>
                <h1 className="font-display text-4xl text-bone sm:text-5xl">Choose your ticket</h1>
                <p className="mt-2 text-muted-foreground">
                  Select your preferred tier. Ticket quantity is reserved for 10 minutes upon
                  proceeding.
                </p>

                <div className="mt-8 grid gap-4" role="radiogroup" aria-label="Ticket options">
                  {options.map((o) => {
                    const isSelected = selected === o.id;
                    return (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => {
                          setSelected(o.id);
                          setQuantity(1);
                        }}
                        className={`group relative grid min-h-24 w-full grid-cols-[minmax(0,1fr)_auto] items-center border p-5 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-oxblood/80 shadow-[0_0_24px_rgba(114,35,53,0.35)]"
                            : "border-border bg-card hover:border-lavender/40 hover:bg-card/80"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-3">
                            <strong className="font-display text-2xl text-bone">{o.name}</strong>
                            <span className="border border-border/80 bg-background/60 px-2 py-0.5 text-xs text-bone-muted uppercase tracking-wider">
                              {o.admitsCount === 1 ? "1 Guest" : `Admits ${o.admitsCount}`}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{o.description}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-display text-2xl text-bone sm:text-3xl">
                            KES {o.price.toLocaleString()}
                          </span>
                          <span className="block text-xs uppercase tracking-widest text-lavender">
                            {o.admitsCount > 1 ? "Per Bundle" : "Per Pass"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Quantity Selector */}
                <div className="mt-8 border border-border bg-card p-6">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <Label className="text-base text-bone font-medium">Quantity</Label>
                      <p className="text-xs text-muted-foreground">
                        {choice.admitsCount > 1
                          ? `Each bundle admits ${choice.admitsCount} guests`
                          : "Single pass per guest"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-11 border-border bg-background text-bone hover:border-lavender"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-4" />
                      </Button>
                      <span className="min-w-10 text-center font-display text-2xl font-bold text-bone">
                        {quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="size-11 border-border bg-background text-bone hover:border-lavender"
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  variant="event"
                  size="xl"
                  className="mt-8 w-full sm:w-auto"
                  onClick={() => setStep("details")}
                >
                  Continue to Buyer Details <ChevronRight className="ml-2 size-5" />
                </Button>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 2: BUYER DETAILS */}
            {/* ------------------------------------------------------------- */}
            {step === "details" && (
              <div>
                <h1 className="font-display text-4xl text-bone sm:text-5xl">Buyer details</h1>
                <p className="mt-2 text-muted-foreground">
                  Provide your official name and M-Pesa phone number. This reserves your tickets and
                  routes the payment request.
                </p>

                {errorMessage && (
                  <div className="mt-6 flex items-start gap-3 border border-destructive/40 bg-destructive/10 p-4 text-sm text-red-200">
                    <AlertCircle className="size-5 shrink-0 text-destructive mt-0.5" />
                    <div>
                      <strong className="block font-bold">Unable to proceed</strong>
                      <span>{errorMessage}</span>
                    </div>
                  </div>
                )}

                <div className="mt-8 grid gap-6">
                  <div>
                    <Label htmlFor="buyer-name" className="text-bone">
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="buyer-name"
                      className="mt-2 h-12 bg-card border-border text-bone placeholder:text-muted-foreground focus:border-primary"
                      placeholder="e.g. Amani Mwangi"
                      value={buyerName}
                      onChange={(e) => {
                        setBuyerName(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      onBlur={() => setNameTouched(true)}
                    />
                    {nameTouched && (!buyerName.trim() || buyerName.trim().length < 2) && (
                      <p className="mt-1.5 text-xs text-red-400">
                        Please enter a valid full name (minimum 2 characters).
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="buyer-phone" className="text-bone">
                      M-Pesa Phone Number <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="buyer-phone"
                      type="tel"
                      inputMode="tel"
                      className="mt-2 h-12 bg-card border-border text-bone placeholder:text-muted-foreground focus:border-primary"
                      placeholder="07XX XXX XXX or 01XX XXX XXX"
                      value={buyerPhone}
                      onChange={(e) => {
                        setBuyerPhone(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      onBlur={() => setPhoneTouched(true)}
                    />
                    {phoneValidation && phoneValidation.isValid ? (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-400">
                        <Check className="size-3.5" /> Canonical: {phoneValidation.formatted} (
                        {phoneValidation.operator})
                      </p>
                    ) : phoneTouched && buyerPhone ? (
                      <p className="mt-1.5 text-xs text-red-400">
                        {phoneValidation?.error ||
                          "Enter a valid Kenyan number (e.g. 0712 345 678)."}
                      </p>
                    ) : (
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Accepts formats: 07XXXXXXXX, 01XXXXXXXX, or +254XXXXXXXXX.
                      </p>
                    )}
                  </div>

                  <div className="border border-lavender/30 bg-lavender/5 p-4 text-sm text-bone-muted">
                    <ShieldCheck className="mr-2 inline size-4 text-lavender" />
                    Upon clicking reserve, your {quantity} {choice.name}{" "}
                    {choice.admitsCount > 1 ? "bundle" : "pass"} will be locked in the inventory
                    engine for exactly 10 minutes.
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Button
                      variant="event"
                      size="xl"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                      onClick={handleCreateReservation}
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="mr-2 size-4 animate-spin" />
                          Locking Inventory...
                        </>
                      ) : (
                        <>
                          Reserve & Review Payment <ChevronRight className="ml-2 size-5" />
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="xl"
                      className="text-bone hover:bg-card"
                      onClick={() => setStep("select")}
                      disabled={isSubmitting}
                    >
                      Change Ticket
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 3: PAYMENT / GATE 4 LIVE M-PESA PAYMENT ENGINE */}
            {/* ------------------------------------------------------------- */}
            {step === "payment" && activeOrder && (
              <div className="space-y-6">
                {/* Header Status */}
                <div className="flex items-center gap-3">
                  <div
                    className={`grid size-12 place-items-center border ${
                      paymentPhase === "paid"
                        ? "bg-emerald-950 text-emerald-400 border-emerald-500/60"
                        : "bg-oxblood text-lavender border-lavender/40"
                    }`}
                  >
                    {paymentPhase === "paid" ? (
                      <CheckCircle2 className="size-6" />
                    ) : (
                      <Smartphone className="size-6" />
                    )}
                  </div>
                  <div>
                    <h1 className="font-display text-3xl text-bone sm:text-4xl">
                      {paymentPhase === "paid" ? "Payment Confirmed" : "M-Pesa STK Checkout"}
                    </h1>
                    <p
                      className={`text-xs uppercase tracking-widest font-mono ${
                        paymentPhase === "paid"
                          ? "text-emerald-400 font-bold"
                          : paymentPhase === "waiting_for_pin"
                            ? "text-amber-400 font-bold"
                            : "text-lavender"
                      }`}
                    >
                      Status:{" "}
                      {paymentPhase === "paid"
                        ? "PAID & VERIFIED (READY FOR TICKET ISSUANCE)"
                        : paymentPhase === "waiting_for_pin"
                          ? "CHECK PHONE FOR PIN PROMPT"
                          : "PENDING AUTHORIZATION"}
                    </p>
                  </div>
                </div>

                {/* Reservation Countdown Banner (Hidden when Paid) */}
                {paymentPhase !== "paid" && (
                  <div className="flex flex-col justify-between gap-4 border border-lavender/40 bg-card p-5 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <Clock3 className="size-6 text-lavender animate-pulse" />
                      <div>
                        <p className="text-xs uppercase tracking-widest text-muted-foreground">
                          Inventory Hold Timer
                        </p>
                        <p className="text-sm text-bone">
                          Tickets are reserved exclusively for you.
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-3xl font-bold text-lavender">
                        {formatCountdown(secondsRemaining)}
                      </span>
                      <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">
                        Time Remaining
                      </span>
                    </div>
                  </div>
                )}

                {/* Authoritative Order Details Card */}
                <div className="border border-border bg-card p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        Order Reference
                      </span>
                      <p className="font-mono text-lg font-bold text-bone">
                        {activeOrder.orderNumber}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        Buyer
                      </span>
                      <p className="text-lg text-bone">{activeOrder.buyerName}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        M-Pesa Number
                      </span>
                      <p className="font-mono text-lg text-bone">+{activeOrder.buyerPhone}</p>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-widest text-muted-foreground">
                        Total Admissions
                      </span>
                      <p className="text-lg text-bone">
                        {activeOrder.quantity * activeOrder.admitsCount} Guests (
                        {activeOrder.quantity} {activeOrder.ticketName})
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-border pt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Authoritative Amount Due</span>
                    <strong className="font-display text-3xl text-bone">
                      KES {activeOrder.totalKes.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* PAYMENT STATE 1: IDLE / READY TO PAY */}
                {paymentPhase === "idle" && (
                  <div className="border border-border bg-card p-6 space-y-6">
                    <div>
                      <h2 className="text-xl font-display text-bone">
                        Pay with Safaricom M-Pesa STK Push
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click the button below. We will send an instant M-Pesa prompt to{" "}
                        <strong className="text-bone font-mono">+{activeOrder.buyerPhone}</strong>.
                        Simply enter your M-Pesa PIN on your phone to complete your purchase.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Button
                        variant="event"
                        size="xl"
                        onClick={handleInitiateMpesaPayment}
                        className="w-full sm:w-auto"
                      >
                        <Smartphone className="mr-2 size-5" />
                        Pay KES {activeOrder.totalKes.toLocaleString()} with M-Pesa
                      </Button>
                      <Button
                        variant="spectral"
                        size="xl"
                        onClick={handleCancelReservation}
                        disabled={isCancelling}
                      >
                        {isCancelling ? "Releasing..." : "Cancel Reservation"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* PAYMENT STATE 2: INITIATING */}
                {paymentPhase === "initiating" && (
                  <div className="border border-lavender/40 bg-card p-8 text-center space-y-4">
                    <RefreshCw className="size-8 animate-spin mx-auto text-lavender" />
                    <h2 className="text-2xl font-display text-bone">Contacting Safaricom...</h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Connecting securely to Daraja API to dispatch the payment request to +
                      {activeOrder.buyerPhone}.
                    </p>
                  </div>
                )}

                {/* PAYMENT STATE 3: WAITING FOR PIN ON PHONE */}
                {paymentPhase === "waiting_for_pin" && (
                  <div className="border border-amber-500/50 bg-amber-950/20 p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="grid size-12 place-items-center bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
                        <Smartphone className="size-6 animate-bounce" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-display text-bone tracking-wide">
                          CHECK YOUR PHONE
                        </h2>
                        <p className="text-sm text-bone-muted leading-relaxed">
                          We&apos;ve sent an M-Pesa payment prompt for{" "}
                          <strong className="text-bone font-mono">
                            KES {activeOrder.totalKes.toLocaleString()}
                          </strong>{" "}
                          to{" "}
                          <strong className="text-bone font-mono">+{activeOrder.buyerPhone}</strong>
                          .
                        </p>
                        <p className="text-xs text-amber-300 font-mono pt-1">
                          Please enter your M-Pesa PIN on your phone screen now.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-t border-amber-500/30 pt-4 text-sm text-amber-200/90 font-mono">
                      <RefreshCw className="size-4 animate-spin text-amber-400 shrink-0" />
                      <span>Waiting for M-Pesa payment confirmation...</span>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-amber-500/20">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs border-amber-500/40 text-bone hover:bg-amber-950/40"
                        onClick={handleInitiateMpesaPayment}
                        disabled={cooldownSeconds > 0}
                      >
                        {cooldownSeconds > 0
                          ? `Resend Prompt in ${cooldownSeconds}s`
                          : "Didn't receive prompt? Resend"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-bone"
                        onClick={handleCancelReservation}
                        disabled={isCancelling}
                      >
                        Cancel Reservation
                      </Button>
                    </div>
                  </div>
                )}

                {/* PAYMENT STATE 4: SUCCESS / PAID (GATE 4 FINAL STATE) */}
                {paymentPhase === "paid" && (
                  <div className="border border-emerald-500/60 bg-emerald-950/30 p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="grid size-12 place-items-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shrink-0">
                        <CheckCircle2 className="size-6" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-3xl font-display text-bone">PAYMENT CONFIRMED</h2>
                        <p className="text-sm text-emerald-300 font-mono">
                          M-Pesa Receipt:{" "}
                          <strong className="text-bone font-bold">
                            {mpesaReceipt || "CONFIRMED"}
                          </strong>
                        </p>
                        <p className="text-sm text-bone-muted pt-1">
                          Your payment of{" "}
                          <strong className="text-bone">
                            KES {activeOrder.totalKes.toLocaleString()}
                          </strong>{" "}
                          has been authoritatively verified and matched. Reserved tickets have been
                          permanently committed to sold inventory.
                        </p>
                      </div>
                    </div>

                    <div className="border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-bone-muted space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                        <ShieldCheck className="size-4" /> Gate 4 Complete: Payment Engine Ready
                      </div>
                      <p>
                        Order{" "}
                        <strong className="text-bone font-mono">{activeOrder.orderNumber}</strong>{" "}
                        is now in state:{" "}
                        <span className="font-mono text-emerald-300">
                          PAID / READY_FOR_TICKET_ISSUANCE
                        </span>
                        . Ticket QR tokens and delivery mechanisms will be rendered in Gate 5.
                      </p>
                    </div>

                    <div className="pt-2">
                      <Button asChild variant="event" size="xl" className="w-full sm:w-auto">
                        <Link to="/">
                          <ArrowLeft className="mr-2 size-5" /> Return to Event Overview
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}

                {/* PAYMENT STATE 5: FAILED / DECLINED */}
                {paymentPhase === "failed" && (
                  <div className="border border-destructive/60 bg-destructive/10 p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="grid size-12 place-items-center bg-destructive/20 text-destructive border border-destructive/50 shrink-0">
                        <XCircle className="size-6" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-display text-bone">PAYMENT NOT COMPLETED</h2>
                        <p className="text-sm text-destructive-foreground">
                          {paymentError ||
                            "The transaction was cancelled or could not be completed."}
                        </p>
                        <p className="text-xs text-bone-muted pt-1">
                          Your reservation remains active for the time remaining on the timer. You
                          can safely retry your M-Pesa payment.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        variant="event"
                        size="xl"
                        onClick={handleInitiateMpesaPayment}
                        className="w-full sm:w-auto"
                      >
                        <RotateCcw className="mr-2 size-4" /> Retry M-Pesa Payment
                      </Button>
                      <Button
                        variant="spectral"
                        size="xl"
                        onClick={handleCancelReservation}
                        disabled={isCancelling}
                      >
                        Cancel Reservation
                      </Button>
                    </div>
                  </div>
                )}

                {/* PAYMENT STATE 6: TIMED OUT / REVIEW */}
                {(paymentPhase === "timed_out" || paymentPhase === "review") && (
                  <div className="border border-amber-500/50 bg-card p-6 sm:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="grid size-12 place-items-center bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0">
                        <Clock3 className="size-6" />
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-2xl font-display text-bone">PAYMENT STATUS PENDING</h2>
                        <p className="text-sm text-bone-muted">
                          {paymentError ||
                            "We are still checking the network status with Safaricom. If you entered your PIN, please do not pay again while we verify."}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        variant="event"
                        size="xl"
                        onClick={async () => {
                          if (!activeOrder) return;
                          try {
                            const res = await fetch(
                              `/api/payments/status?order_id=${activeOrder.orderId}&token=${activeOrder.checkoutToken}`,
                              {
                                headers: {
                                  Authorization: `Bearer ${activeOrder.checkoutToken}`,
                                },
                              },
                            );
                            const data = await res.json();
                            if (
                              data.success &&
                              (data.orderStatus === "paid" || data.paymentStatus === "successful")
                            ) {
                              setPaymentPhase("paid");
                              setMpesaReceipt(data.mpesaReceipt);
                            }
                          } catch {
                            // noop
                          }
                        }}
                      >
                        <RefreshCw className="mr-2 size-4" /> Check Status Again
                      </Button>
                      <Button
                        variant="spectral"
                        size="xl"
                        onClick={handleInitiateMpesaPayment}
                        disabled={cooldownSeconds > 0}
                      >
                        Retry M-Pesa Prompt
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* STEP 4: RESERVATION EXPIRED */}
            {/* ------------------------------------------------------------- */}
            {step === "expired" && (
              <div className="border border-destructive/40 bg-card p-8 text-center sm:p-12">
                <div className="mx-auto grid size-16 place-items-center bg-destructive/20 text-destructive border border-destructive/40">
                  <Clock3 className="size-8" />
                </div>
                <h1 className="mt-6 font-display text-4xl text-bone sm:text-5xl">
                  Your reservation expired
                </h1>
                <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
                  The 10-minute hold on your selected tickets has elapsed. Reserved inventory has
                  been automatically returned to the pool to allow other attendees to purchase.
                </p>
                <div className="mt-8">
                  <Button variant="event" size="xl" onClick={handleStartAgain}>
                    <RotateCcw className="mr-2 size-4" /> Start Again
                  </Button>
                </div>
              </div>
            )}
          </section>

          {/* --------------------------------------------------------------- */}
          {/* Order Summary Sidebar */}
          {/* --------------------------------------------------------------- */}
          <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-6">
            <p className="text-xs font-bold uppercase tracking-widest text-lavender">
              Order summary
            </p>
            <h2 className="mt-4 font-display text-3xl text-bone">{choice.name}</h2>
            <p className="text-sm text-bone-muted">
              {choice.admitsCount === 1
                ? "1 Guest pass"
                : `Bundle for ${choice.admitsCount} guests`}
            </p>
            <div className="mt-4 space-y-1 text-sm text-muted-foreground border-y border-border/80 py-3">
              <p>31 October 2026 · 4:00 PM</p>
              <p>The Lawns, Nakuru</p>
              <p>Dress Code: Wickedly Fabulous</p>
              <p>Age: 18+ Strictly</p>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Unit Price</span>
                <span className="font-mono text-bone">KES {choice.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Quantity</span>
                <span className="font-mono text-bone">× {quantity}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Total Admissions</span>
                <span className="font-mono text-bone">{quantity * choice.admitsCount} Guests</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between border-t border-border pt-4 items-baseline">
              <div>
                <span className="text-xs uppercase tracking-widest text-lavender block">
                  Total Amount
                </span>
                <span className="text-xs text-muted-foreground">Inclusive of VAT</span>
              </div>
              <strong className="font-display text-3xl text-bone">
                KES {(choice.price * quantity).toLocaleString()}
              </strong>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
