import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as RefreshCw, Et as ArrowLeft, T as RotateCcw, Tt as ArrowRight, ct as Clock3, d as Ticket, h as Smartphone, lt as CircleX, pt as CircleCheck, v as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as VervePresenterBadge, n as VerveErrorState, t as VerveBackButton } from "./verve-logo-BPLLpwqY.mjs";
import { t as Button } from "./button-BQ_Bevjg.mjs";
import { t as Route } from "./pay-CnL77C6u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pay-SfySE5SK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/event/payment-status-card.tsx";
var PaymentStatusCard = ({ orderNumber, buyerName, buyerPhone, ticketName, quantity, totalKes, paymentPhase, paymentError, mpesaReceipt, firstTicketCode, cooldownSeconds = 0, secondsRemaining, onInitiatePayment, onCheckStatusAgain, onCancelReservation }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		id: "payment-status-container",
		children: [
			secondsRemaining !== void 0 && secondsRemaining > 0 && paymentPhase !== "paid" && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center justify-between border border-amber-500/30 bg-amber-950/20 px-4 py-3 text-xs text-amber-200",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(Clock3, { className: "size-4 text-amber-400 shrink-0" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 61,
						columnNumber: 13
					}, void 0), /* @__PURE__ */ (void 0)("span", { children: [
						"Inventory held for your reservation:",
						" ",
						/* @__PURE__ */ (void 0)("strong", {
							className: "font-mono text-amber-300",
							children: [
								Math.floor(secondsRemaining / 60).toString().padStart(2, "0"),
								":",
								(secondsRemaining % 60).toString().padStart(2, "0")
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 64,
							columnNumber: 15
						}, void 0)
					] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 62,
						columnNumber: 13
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 60,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (void 0)("span", {
					className: "text-[10px] uppercase tracking-wider text-muted-foreground hidden sm:inline",
					children: "Active Hold"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 72,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 59,
				columnNumber: 9
			}, void 0),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: "Order Reference"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 82,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-mono text-lg font-bold text-bone",
							children: orderNumber
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 85,
							columnNumber: 13
						}, void 0)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 81,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: "Purchaser"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 88,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-lg text-bone",
							children: buyerName
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 91,
							columnNumber: 13
						}, void 0)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 87,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: "M-Pesa Number"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 94,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-mono text-lg text-bone",
							children: ["+", buyerPhone]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 97,
							columnNumber: 13
						}, void 0)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 93,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: "Pass Selection"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 100,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-lg text-bone",
							children: [
								quantity,
								" × ",
								ticketName
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 103,
							columnNumber: 13
						}, void 0)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 99,
							columnNumber: 11
						}, void 0)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 80,
					columnNumber: 9
				}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 border-t border-border pt-4 flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-sm text-muted-foreground",
						children: "Total Authoritative Due"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 110,
						columnNumber: 11
					}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
						className: "font-display text-3xl text-bone",
						children: ["KES ", totalKes.toLocaleString()]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 111,
						columnNumber: 11
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 109,
					columnNumber: 9
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 79,
				columnNumber: 7
			}, void 0),
			paymentPhase === "idle" && /* @__PURE__ */ (void 0)("div", {
				className: "border border-border bg-card p-6 space-y-6",
				children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
					className: "text-xl font-display text-bone",
					children: "Instant Safaricom M-Pesa STK Prompt"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 121,
					columnNumber: 13
				}, void 0), /* @__PURE__ */ (void 0)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: [
						"Click below to send an authoritative payment prompt directly to",
						" ",
						/* @__PURE__ */ (void 0)("strong", {
							className: "text-bone font-mono",
							children: ["+", buyerPhone]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 124,
							columnNumber: 15
						}, void 0),
						". Enter your M-Pesa PIN on your handset to complete your reservation."
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 122,
					columnNumber: 13
				}, void 0)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 120,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-col sm:flex-row gap-3",
					children: [/* @__PURE__ */ (void 0)(Button, {
						variant: "event",
						size: "xl",
						onClick: onInitiatePayment,
						className: "w-full sm:w-auto",
						id: "pay-mpesa-button",
						children: [/* @__PURE__ */ (void 0)(Smartphone, { className: "mr-2 size-5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 137,
							columnNumber: 15
						}, void 0), " Send M-Pesa Prompt"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 130,
						columnNumber: 13
					}, void 0), onCancelReservation && /* @__PURE__ */ (void 0)(Button, {
						variant: "spectral",
						size: "xl",
						onClick: onCancelReservation,
						children: "Cancel Reservation"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 140,
						columnNumber: 15
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 129,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 119,
				columnNumber: 9
			}, void 0),
			paymentPhase === "initiating" && /* @__PURE__ */ (void 0)("div", {
				className: "border border-border bg-card p-8 text-center space-y-4",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "inline-grid size-12 place-items-center bg-oxblood/20 text-oxblood-light border border-oxblood/40 animate-pulse",
					children: /* @__PURE__ */ (void 0)(RefreshCw, { className: "size-6 animate-spin" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 152,
						columnNumber: 13
					}, void 0)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 151,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
					className: "text-xl font-display text-bone",
					children: "Connecting to Safaricom Daraja..."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 155,
					columnNumber: 13
				}, void 0), /* @__PURE__ */ (void 0)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Authorizing transaction session and pushing prompt to your phone."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 156,
					columnNumber: 13
				}, void 0)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 154,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 150,
				columnNumber: 9
			}, void 0),
			paymentPhase === "waiting_for_pin" && /* @__PURE__ */ (void 0)("div", {
				className: "border border-amber-500/50 bg-amber-950/20 p-6 sm:p-8 space-y-6",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "grid size-12 place-items-center bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0",
							children: /* @__PURE__ */ (void 0)(Smartphone, { className: "size-6 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 168,
								columnNumber: 15
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 167,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "inline-block bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-300 border border-amber-500/30 uppercase tracking-widest",
									children: "STK Prompt Dispatched"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 171,
									columnNumber: 15
								}, void 0),
								/* @__PURE__ */ (void 0)("h2", {
									className: "text-2xl font-display text-bone",
									children: "CHECK YOUR PHONE"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 174,
									columnNumber: 15
								}, void 0),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-bone-muted",
									children: [
										"An M-Pesa prompt has been sent to",
										" ",
										/* @__PURE__ */ (void 0)("strong", {
											className: "text-bone font-mono",
											children: ["+", buyerPhone]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 177,
											columnNumber: 17
										}, void 0),
										". Enter your PIN to authorize ",
										/* @__PURE__ */ (void 0)("strong", {
											className: "text-bone",
											children: ["KES ", totalKes.toLocaleString()]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 178,
											columnNumber: 27
										}, void 0),
										"."
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 175,
									columnNumber: 15
								}, void 0)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 170,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 166,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-center gap-3 border-t border-amber-500/30 pt-4 text-sm text-amber-200/90 font-mono",
						children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-4 animate-spin text-amber-400 shrink-0" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 184,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (void 0)("span", { children: "Awaiting payment verification confirmation..." }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 185,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 183,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (void 0)("div", {
						className: "pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-amber-500/20",
						children: [/* @__PURE__ */ (void 0)(Button, {
							variant: "outline",
							size: "sm",
							className: "text-xs border-amber-500/40 text-bone hover:bg-amber-950/40",
							onClick: onInitiatePayment,
							disabled: cooldownSeconds > 0,
							children: cooldownSeconds > 0 ? `Resend Prompt in ${cooldownSeconds}s` : "Didn't receive prompt? Resend"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 189,
							columnNumber: 13
						}, void 0), onCancelReservation && /* @__PURE__ */ (void 0)(Button, {
							variant: "ghost",
							size: "sm",
							className: "text-xs text-muted-foreground hover:text-bone",
							onClick: onCancelReservation,
							children: "Cancel Reservation"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 201,
							columnNumber: 15
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 188,
						columnNumber: 11
					}, void 0)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 165,
				columnNumber: 9
			}, void 0),
			paymentPhase === "paid" && /* @__PURE__ */ (void 0)("div", {
				className: "border border-emerald-500/60 bg-emerald-950/30 p-6 sm:p-8 space-y-6",
				children: [
					/* @__PURE__ */ (void 0)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "grid size-12 place-items-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shrink-0",
							children: /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-6" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 219,
								columnNumber: 15
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 218,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "inline-block bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 border border-emerald-500/40 uppercase tracking-widest",
									children: "Payment Verified"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 222,
									columnNumber: 15
								}, void 0),
								/* @__PURE__ */ (void 0)("h2", {
									className: "text-3xl font-display text-bone",
									children: "PAYMENT CONFIRMED"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 225,
									columnNumber: 15
								}, void 0),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-emerald-300 font-mono",
									children: [
										"M-Pesa Receipt:",
										" ",
										/* @__PURE__ */ (void 0)("strong", {
											className: "text-bone font-bold",
											children: mpesaReceipt || "VERIFIED"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 228,
											columnNumber: 17
										}, void 0)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 226,
									columnNumber: 15
								}, void 0),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-bone-muted pt-1",
									children: [
										"Your payment of",
										" ",
										/* @__PURE__ */ (void 0)("strong", {
											className: "text-bone",
											children: ["KES ", totalKes.toLocaleString()]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 232,
											columnNumber: 17
										}, void 0),
										" has been settled and your cryptographically signed tickets have been generated."
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 230,
									columnNumber: 15
								}, void 0)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 221,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 217,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (void 0)("div", {
						className: "border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-bone-muted space-y-2",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-2 text-emerald-400 font-semibold text-sm",
							children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "size-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 240,
								columnNumber: 15
							}, void 0), " Cryptographic Digital Pass Issued"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 239,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (void 0)("p", { children: [
							"Order ",
							/* @__PURE__ */ (void 0)("strong", {
								className: "text-bone font-mono",
								children: orderNumber
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 243,
								columnNumber: 21
							}, void 0),
							" has been permanently written to the guest registry. You can view, save, and present your digital ticket now."
						] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 242,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 238,
						columnNumber: 11
					}, void 0),
					/* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col sm:flex-row gap-3 pt-2",
						children: [firstTicketCode ? /* @__PURE__ */ (void 0)(Button, {
							asChild: true,
							variant: "event",
							size: "xl",
							className: "w-full sm:w-auto",
							children: /* @__PURE__ */ (void 0)(Link, {
								to: "/ticket/$code",
								params: { code: firstTicketCode },
								children: [/* @__PURE__ */ (void 0)(Ticket, { className: "mr-2 size-5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 253,
									columnNumber: 19
								}, void 0), " View Digital Ticket & QR"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 252,
								columnNumber: 17
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 251,
							columnNumber: 15
						}, void 0) : /* @__PURE__ */ (void 0)(Button, {
							asChild: true,
							variant: "event",
							size: "xl",
							className: "w-full sm:w-auto",
							children: /* @__PURE__ */ (void 0)(Link, {
								to: "/ticket/$code",
								params: { code: "HR-7892-4910" },
								children: [/* @__PURE__ */ (void 0)(Ticket, { className: "mr-2 size-5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 259,
									columnNumber: 19
								}, void 0), " View Digital Ticket & QR"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 258,
								columnNumber: 17
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 257,
							columnNumber: 15
						}, void 0), /* @__PURE__ */ (void 0)(Button, {
							asChild: true,
							variant: "spectral",
							size: "xl",
							children: /* @__PURE__ */ (void 0)(Link, {
								to: "/",
								children: ["Return Home ", /* @__PURE__ */ (void 0)(ArrowRight, { className: "ml-2 size-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 265,
									columnNumber: 29
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 264,
								columnNumber: 15
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 263,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 249,
						columnNumber: 11
					}, void 0)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 216,
				columnNumber: 9
			}, void 0),
			paymentPhase === "failed" && /* @__PURE__ */ (void 0)("div", {
				className: "border border-destructive/60 bg-destructive/10 p-6 sm:p-8 space-y-6",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid size-12 place-items-center bg-destructive/20 text-destructive border border-destructive/50 shrink-0",
						children: /* @__PURE__ */ (void 0)(CircleX, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 277,
							columnNumber: 15
						}, void 0)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 276,
						columnNumber: 13
					}, void 0), /* @__PURE__ */ (void 0)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "inline-block bg-destructive/20 px-2 py-0.5 text-[11px] font-bold text-destructive-foreground border border-destructive/40 uppercase tracking-widest",
								children: "Transaction Incomplete"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 280,
								columnNumber: 15
							}, void 0),
							/* @__PURE__ */ (void 0)("h2", {
								className: "text-2xl font-display text-bone",
								children: "PAYMENT NOT COMPLETED"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 283,
								columnNumber: 15
							}, void 0),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-destructive-foreground",
								children: paymentError || "The M-Pesa transaction was cancelled or declined on your device."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 284,
								columnNumber: 15
							}, void 0),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-bone-muted pt-1",
								children: "Your reservation remains active while the countdown timer runs. You can safely retry with the same transaction key."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 287,
								columnNumber: 15
							}, void 0)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 279,
						columnNumber: 13
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 275,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-col sm:flex-row gap-3 pt-2",
					children: [/* @__PURE__ */ (void 0)(Button, {
						variant: "event",
						size: "xl",
						onClick: onInitiatePayment,
						className: "w-full sm:w-auto",
						children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "mr-2 size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 301,
							columnNumber: 15
						}, void 0), " Retry M-Pesa Payment"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 295,
						columnNumber: 13
					}, void 0), onCancelReservation && /* @__PURE__ */ (void 0)(Button, {
						variant: "spectral",
						size: "xl",
						onClick: onCancelReservation,
						children: "Cancel Reservation"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 304,
						columnNumber: 15
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 294,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 274,
				columnNumber: 9
			}, void 0),
			(paymentPhase === "timed_out" || paymentPhase === "review") && /* @__PURE__ */ (void 0)("div", {
				className: "border border-amber-500/50 bg-card p-6 sm:p-8 space-y-6",
				children: [/* @__PURE__ */ (void 0)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "grid size-12 place-items-center bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0",
						children: /* @__PURE__ */ (void 0)(Clock3, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 317,
							columnNumber: 15
						}, void 0)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 316,
						columnNumber: 13
					}, void 0), /* @__PURE__ */ (void 0)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-display text-bone",
							children: "STATUS PENDING VERIFICATION"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 320,
							columnNumber: 15
						}, void 0), /* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-bone-muted",
							children: paymentError || "We are reconciling your transaction with Safaricom. If you already entered your PIN, please do not pay again while we complete verification."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 321,
							columnNumber: 15
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 319,
						columnNumber: 13
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 315,
					columnNumber: 11
				}, void 0), /* @__PURE__ */ (void 0)("div", {
					className: "flex flex-col sm:flex-row gap-3 pt-2",
					children: [/* @__PURE__ */ (void 0)(Button, {
						variant: "event",
						size: "xl",
						onClick: onCheckStatusAgain,
						children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "mr-2 size-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 330,
							columnNumber: 15
						}, void 0), " Check Status Again"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 329,
						columnNumber: 13
					}, void 0), /* @__PURE__ */ (void 0)(Button, {
						variant: "spectral",
						size: "xl",
						onClick: onInitiatePayment,
						disabled: cooldownSeconds > 0,
						children: cooldownSeconds > 0 ? `Retry in ${cooldownSeconds}s` : "Resend M-Pesa Prompt"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 332,
						columnNumber: 13
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 328,
					columnNumber: 11
				}, void 0)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 314,
				columnNumber: 9
			}, void 0)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 56,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName = "/app/applet/src/routes/pay.tsx?tsr-split=component";
function PayRouteComponent() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const [order, setOrder] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [paymentPhase, setPaymentPhase] = (0, import_react.useState)("idle");
	const [paymentError, setPaymentError] = (0, import_react.useState)(null);
	const [mpesaReceipt, setMpesaReceipt] = (0, import_react.useState)(null);
	const [firstTicketCode, setFirstTicketCode] = (0, import_react.useState)(null);
	const [cooldownSeconds, setCooldownSeconds] = (0, import_react.useState)(0);
	const [secondsRemaining, setSecondsRemaining] = (0, import_react.useState)(void 0);
	const [idempotencyKey, setIdempotencyKey] = (0, import_react.useState)(() => search.idempotencyKey || "");
	const idempotencyInitialized = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!idempotencyInitialized.current) {
			idempotencyInitialized.current = true;
			if (!search.idempotencyKey) {
				const newKey = `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
				setIdempotencyKey(newKey);
			}
		}
	}, [search.idempotencyKey]);
	(0, import_react.useEffect)(() => {
		if (cooldownSeconds <= 0) return;
		const timer = setInterval(() => {
			setCooldownSeconds((s) => Math.max(0, s - 1));
		}, 1e3);
		return () => clearInterval(timer);
	}, [cooldownSeconds]);
	(0, import_react.useEffect)(() => {
		if (!order || !order.expiresAt) return;
		const updateTimer = () => {
			const remaining = Math.max(0, Math.round((new Date(order.expiresAt).getTime() - Date.now()) / 1e3));
			setSecondsRemaining(remaining);
			if (remaining <= 0 && paymentPhase !== "paid") {
				setPaymentPhase("failed");
				setPaymentError("Your 10-minute reservation has expired. Please select passes again.");
			}
		};
		updateTimer();
		const interval = setInterval(updateTimer, 1e3);
		return () => clearInterval(interval);
	}, [order, paymentPhase]);
	const handleVerifyCompletedPayment = (0, import_react.useCallback)(async (orderId, token, receipt) => {
		try {
			const data = await (await fetch("/api/pay/verify", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					idempotency_key: idempotencyKey,
					order_id: orderId,
					checkout_token: token,
					mpesa_receipt: receipt
				})
			})).json();
			if (data.success && data.tickets && data.tickets.length > 0) setFirstTicketCode(data.tickets[0].ticketNumber);
		} catch (e) {
			console.warn("Could not verify tickets:", e);
		}
	}, [idempotencyKey]);
	(0, import_react.useEffect)(() => {
		async function loadOrder() {
			if (!search.orderId || !search.token) {
				setLoading(false);
				setErrorMessage("No active order or authorization token provided in link.");
				return;
			}
			try {
				setLoading(true);
				const res = await fetch(`/api/orders/${search.orderId}?token=${search.token}`, { headers: { Authorization: `Bearer ${search.token}` } });
				if (!res.ok) {
					const errData = await res.json().catch(() => ({}));
					setErrorMessage(errData.message || "Order reservation not found or authorization expired.");
					setLoading(false);
					return;
				}
				const data = await res.json();
				setOrder(data);
				if (data.status === "paid" || data.status === "approved" || data.status === "completed") {
					setPaymentPhase("paid");
					handleVerifyCompletedPayment(data.orderId, data.checkoutToken);
				}
			} catch {
				setErrorMessage("Network error fetching order details. Please try refreshing.");
			} finally {
				setLoading(false);
			}
		}
		loadOrder();
	}, [
		search.orderId,
		search.token,
		handleVerifyCompletedPayment
	]);
	(0, import_react.useEffect)(() => {
		if (paymentPhase !== "waiting_for_pin" || !order) return;
		const pollInterval = setInterval(async () => {
			try {
				const res = await fetch(`/api/payments/status?order_id=${order.orderId}&token=${order.checkoutToken}`, { headers: { Authorization: `Bearer ${order.checkoutToken}` } });
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
	}, [
		paymentPhase,
		order,
		handleVerifyCompletedPayment
	]);
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
					checkout_token: order.checkoutToken
				})
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
	const handleCheckStatusAgain = async () => {
		if (!order) return;
		try {
			const data = await (await fetch(`/api/payments/status?order_id=${order.orderId}&token=${order.checkoutToken}`, { headers: { Authorization: `Bearer ${order.checkoutToken}` } })).json();
			if (data.success && (data.orderStatus === "paid" || data.paymentStatus === "successful")) {
				setPaymentPhase("paid");
				setMpesaReceipt(data.mpesaReceipt);
				handleVerifyCompletedPayment(order.orderId, order.checkoutToken, data.mpesaReceipt);
			}
		} catch {}
	};
	const handleCancelReservation = async () => {
		if (!order) return;
		try {
			await fetch("/api/orders/cancel", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					order_id: order.orderId,
					token: order.checkoutToken
				})
			});
		} catch {} finally {
			navigate({ to: "/checkout" });
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background px-4 py-16 flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-8 animate-spin text-oxblood-light mx-auto" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 242,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "font-display text-lg text-bone",
				children: "Loading reservation status..."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 243,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 241,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 240,
		columnNumber: 12
	}, this);
	if (errorMessage || !order) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveBackButton, {
					to: "/checkout",
					label: "Return to Ticket Selection"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 251,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 250,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveErrorState, {
				code: "400",
				title: "Reservation Unavailable",
				description: errorMessage || "We could not find an active reservation for this session.",
				actionLabel: "Select Tickets",
				actionTo: "/checkout"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 253,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 249,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 248,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background px-4 py-8 sm:py-14",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b border-bone/15 pb-4 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "text-bone-muted hover:text-bone",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/checkout",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "mr-2 size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 263,
								columnNumber: 15
							}, this), " Change Selection"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 262,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 261,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 266,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 260,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-oxblood-light",
							children: "Secure Payment Gateway"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 271,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-3xl font-display text-bone sm:text-4xl mt-1",
							children: "CONFIRM & PAY"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-bone-muted mt-1",
							children: "Complete your M-Pesa transaction to receive your cryptographic admission pass."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 275,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 270,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PaymentStatusCard, {
					orderId: order.orderId,
					orderNumber: order.orderNumber,
					buyerName: order.buyerName,
					buyerPhone: order.buyerPhone,
					ticketName: order.ticketName,
					quantity: order.quantity,
					totalKes: order.totalKes,
					paymentPhase,
					paymentError,
					mpesaReceipt,
					firstTicketCode,
					cooldownSeconds,
					secondsRemaining,
					onInitiatePayment: handleInitiateMpesaPayment,
					onCheckStatusAgain: handleCheckStatusAgain,
					onCancelReservation: handleCancelReservation
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 281,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 258,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 257,
		columnNumber: 10
	}, this);
}
//#endregion
export { PayRouteComponent as component };
