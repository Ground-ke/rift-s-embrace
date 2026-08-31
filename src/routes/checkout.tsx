import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  Info,
  LockKeyhole,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ticketNames = ["early-bird", "couple", "group-of-four"] as const;
const searchSchema = z.object({ ticket: z.enum(ticketNames).optional().catch(undefined) });
export const Route = createFileRoute("/checkout")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Ticket Checkout Preview — Hauntings of the Rift" },
      {
        name: "description",
        content: "Preview the future M-Pesa ticket checkout for Hauntings of the Rift.",
      },
      { property: "og:title", content: "Hauntings of the Rift Ticket Checkout" },
      { property: "og:description", content: "Choose your ticket for 31 October in Nakuru." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Checkout,
});

const options = [
  { id: "early-bird", name: "Early Bird", price: 1000 },
  { id: "couple", name: "Couple", price: 1800 },
  { id: "group-of-four", name: "Group of Four", price: 3600 },
] as const;
function Checkout() {
  const { ticket } = Route.useSearch();
  const [selected, setSelected] = useState(ticket ?? "early-bird");
  const [step, setStep] = useState<"select" | "details" | "payment" | "waiting" | "success">(
    "select",
  );
  const choice = options.find((o) => o.id === selected) ?? options[0];
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="min-h-11 min-w-11"
            aria-label="Back to event"
          >
            <Link to="/">
              <ArrowLeft />
            </Link>
          </Button>
          <div className="min-w-0">
            <p className="truncate font-display text-xl text-bone">Hauntings of the Rift</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Checkout design preview
            </p>
          </div>
          <LockKeyhole className="size-4 text-muted-foreground" />
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8 lg:py-14">
        <div className="mb-8 border border-lavender/30 bg-lavender/5 p-4 text-sm text-bone-muted">
          <Info className="mr-2 inline size-4 text-lavender" />
          Design preview only. No payment request will be sent and no ticket will be issued.
        </div>
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
          <section>
            <div className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              {["Ticket", "Details", "M-Pesa", "Ready"].map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 ${i <= ["select", "details", "payment", "waiting", "success"].indexOf(step) ? "text-bone" : "text-muted-foreground"}`}
                >
                  <span className="grid size-6 place-items-center border border-current">
                    {i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                  {i < 3 && <ChevronRight className="size-3" />}
                </div>
              ))}
            </div>
            {step === "select" && (
              <div>
                <h1 className="text-5xl text-bone">Choose your ticket</h1>
                <div className="mt-8 grid gap-3">
                  {options.map((o) => (
                    <button
                      key={o.id}
                      onClick={() => setSelected(o.id)}
                      className={`grid min-h-20 w-full grid-cols-[minmax(0,1fr)_auto] items-center border p-4 text-left ${selected === o.id ? "border-primary bg-oxblood" : "border-border bg-card"}`}
                    >
                      <span>
                        <strong className="block text-xl text-bone">{o.name}</strong>
                        <span className="text-sm text-muted-foreground">
                          {o.id === "couple"
                            ? "Entry for two"
                            : o.id === "group-of-four"
                              ? "Entry for four"
                              : "Single entry"}
                        </span>
                      </span>
                      <span className="font-display text-2xl text-bone">
                        KES {o.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
                <Button
                  variant="event"
                  size="xl"
                  className="mt-6 w-full sm:w-auto"
                  onClick={() => setStep("details")}
                >
                  Continue <ChevronRight />
                </Button>
              </div>
            )}
            {step === "details" && (
              <div>
                <h1 className="text-5xl text-bone">Buyer details</h1>
                <p className="mt-3 text-muted-foreground">
                  These fields will identify the buyer and receive the M-Pesa prompt.
                </p>
                <div className="mt-8 grid gap-6">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" className="mt-2 h-12 bg-card" placeholder="Your full name" />
                  </div>
                  <div>
                    <Label htmlFor="phone">M-Pesa phone number</Label>
                    <Input
                      id="phone"
                      className="mt-2 h-12 bg-card"
                      placeholder="07XX XXX XXX"
                      inputMode="tel"
                    />
                  </div>
                  <Button variant="event" size="xl" onClick={() => setStep("payment")}>
                    Review payment <ChevronRight />
                  </Button>
                </div>
              </div>
            )}
            {step === "payment" && (
              <div>
                <Smartphone className="size-10 text-lavender" />
                <h1 className="mt-6 text-5xl text-bone">Pay with M-Pesa</h1>
                <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                  Enter your M-Pesa number and we’ll send a payment request to your phone. This
                  action is disabled in the frontend preview.
                </p>
                <div className="mt-8 border border-border bg-card p-5">
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <strong className="text-bone">KES {choice.price.toLocaleString()}</strong>
                  </div>
                </div>
                <Button variant="event" size="xl" className="mt-6" disabled>
                  Send payment request
                </Button>
                <Button
                  variant="spectral"
                  size="xl"
                  className="mt-6 ml-3"
                  onClick={() => setStep("waiting")}
                >
                  Preview waiting state
                </Button>
              </div>
            )}
            {step === "waiting" && (
              <div>
                <Clock3 className="size-10 text-lavender" />
                <h1 className="mt-6 text-5xl text-bone">Waiting for payment…</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Check your phone and enter your M-Pesa PIN.
                </p>
                <div className="mt-8 h-1 overflow-hidden bg-muted">
                  <div className="h-full w-2/3 bg-primary" />
                </div>
                <Button
                  variant="spectral"
                  size="xl"
                  className="mt-8"
                  onClick={() => setStep("success")}
                >
                  Preview successful state
                </Button>
              </div>
            )}
            {step === "success" && (
              <div>
                <div className="grid size-14 place-items-center bg-primary text-primary-foreground">
                  <Check />
                </div>
                <h1 className="mt-6 text-5xl text-bone">Payment successful</h1>
                <p className="mt-3 text-xl text-bone-muted">Your ticket is ready.</p>
                <p className="mt-4 text-muted-foreground">
                  Preview state only — no payment was processed and this is not a valid ticket.
                </p>
                <Button asChild variant="event" size="xl" className="mt-8">
                  <Link to="/ticket/demo">View ticket design</Link>
                </Button>
              </div>
            )}
          </section>
          <aside className="h-fit border border-border bg-card p-6 lg:sticky lg:top-6">
            <p className="text-xs font-bold uppercase tracking-widest text-lavender">
              Order summary
            </p>
            <h2 className="mt-6 text-3xl text-bone">{choice.name}</h2>
            <p className="text-muted-foreground">31 October 2026 · 4 PM</p>
            <p className="text-muted-foreground">The Lawns, Nakuru</p>
            <div className="mt-8 flex justify-between border-t border-border pt-5">
              <span>Total</span>
              <strong className="font-display text-3xl text-bone">
                KES {choice.price.toLocaleString()}
              </strong>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
