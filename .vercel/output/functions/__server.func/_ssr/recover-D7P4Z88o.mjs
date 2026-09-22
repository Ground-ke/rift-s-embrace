import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Mail, E as RefreshCw, Et as ArrowLeft, Tt as ArrowRight, a as Users, d as Ticket, mt as CircleAlert, nt as ExternalLink, st as Clock, v as ShieldCheck, x as Send } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as VervePresenterBadge, n as VerveErrorState, t as VerveBackButton } from "./verve-logo-BPLLpwqY.mjs";
import { t as Button } from "./button-BQ_Bevjg.mjs";
import { t as Input } from "./input-DkOfYy7N.mjs";
import { t as Route } from "./recover-CpaeIgn9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recover-D7P4Z88o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/recover.tsx?tsr-split=component";
function RecoverRouteComponent() {
	const token = Route.useSearch().token;
	const [email, setEmail] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [submittedEmail, setSubmittedEmail] = (0, import_react.useState)("");
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [rateLimited, setRateLimited] = (0, import_react.useState)(false);
	const [previewToken, setPreviewToken] = (0, import_react.useState)(null);
	const [verifyingToken, setVerifyingToken] = (0, import_react.useState)(false);
	const [tokenExpired, setTokenExpired] = (0, import_react.useState)(false);
	const [tokenError, setTokenError] = (0, import_react.useState)(null);
	const [recoveredTickets, setRecoveredTickets] = (0, import_react.useState)([]);
	const [recoveredEmail, setRecoveredEmail] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function verifyToken() {
			if (!token) return;
			try {
				setVerifyingToken(true);
				setTokenError(null);
				setTokenExpired(false);
				const res = await fetch(`/api/tickets/recover/verify?token=${encodeURIComponent(token)}`);
				const data = await res.json();
				if (!res.ok || !data.success) {
					if (data.expired) setTokenExpired(true);
					setTokenError(data.message || "Invalid or expired recovery link.");
					return;
				}
				setRecoveredTickets(data.tickets || []);
				setRecoveredEmail(data.email);
			} catch {
				setTokenError("Network error validating recovery link. Please try again.");
			} finally {
				setVerifyingToken(false);
			}
		}
		verifyToken();
	}, [token]);
	const handleRecoverSubmit = async (e) => {
		e.preventDefault();
		setFormError(null);
		const trimmedEmail = email.trim();
		if (!trimmedEmail || !trimmedEmail.includes("@")) {
			setFormError("Please enter a valid email address.");
			return;
		}
		setIsSubmitting(true);
		try {
			const res = await fetch("/api/tickets/recover", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: trimmedEmail })
			});
			const data = await res.json();
			if (!res.ok && data.code === "RATE_LIMITED") {
				setRateLimited(true);
				setFormError(data.message || "Too many recovery attempts. Please try again in 1 hour.");
				return;
			}
			setSubmitted(true);
			setSubmittedEmail(trimmedEmail);
			if (data.previewToken) setPreviewToken(data.previewToken);
		} catch {
			setFormError("Network error initiating ticket recovery. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};
	if (token) {
		if (verifyingToken) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-h-screen bg-background px-4 py-20 flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-8 animate-spin text-oxblood-light mx-auto" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-display text-lg text-bone",
					children: "Verifying secure recovery link..."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 101,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 98,
			columnNumber: 14
		}, this);
		if (tokenError || tokenExpired) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-h-screen bg-background px-4 py-12",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-xl",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveBackButton, {
						to: "/",
						label: "Back to Event"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 108,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveErrorState, {
					code: tokenExpired ? "410" : "401",
					title: tokenExpired ? "Link Expired" : "Invalid Link",
					description: tokenError || "This ticket recovery link is no longer valid. Security links expire after 1 hour.",
					actionLabel: "Request New Recovery Link",
					actionTo: "/recover"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 112,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 107,
				columnNumber: 11
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 106,
			columnNumber: 14
		}, this);
		return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-h-screen bg-background px-4 py-8 sm:py-14",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between border-b border-bone/15 pb-4 mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "text-bone-muted hover:text-bone",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "mr-2 size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 122,
									columnNumber: 17
								}, this), " Return to Event"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 125,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-950/30 px-3 py-1 text-xs font-bold text-emerald-300 uppercase tracking-widest mb-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 130,
										columnNumber: 15
									}, this),
									" Identity Verified: ",
									recoveredEmail
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 129,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "text-3xl font-display text-bone sm:text-4xl",
								children: "YOUR RECOVERED PASSES"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 132,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-bone-muted mt-1",
								children: "Select any ticket pass below to view its official QR code and event entry details."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 133,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 11
					}, this),
					recoveredTickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-card p-8 text-center space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-bone-muted",
							children: [
								"No active tickets found matching",
								" ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-bone",
									children: recoveredEmail
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 142,
									columnNumber: 17
								}, this),
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "event",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/checkout",
								children: "Browse Tickets & Passes"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 139,
						columnNumber: 44
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: recoveredTickets.map((tkt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border border-bone/20 bg-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition hover:border-bone/40",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono font-bold text-oxblood-light text-sm",
											children: tkt.ticketNumber
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 151,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border ${tkt.status === "valid" ? "border-emerald-500/50 bg-emerald-950/40 text-emerald-300" : "border-amber-500/50 bg-amber-950/40 text-amber-300"}`,
											children: tkt.status === "valid" ? "VALID PASS" : "USED"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 154,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 150,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "font-display text-xl text-bone",
										children: tkt.tierName
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 158,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["Attendee: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
												className: "text-bone",
												children: tkt.attendeeName
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 161,
												columnNumber: 35
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 160,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "•" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 163,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-3" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 165,
														columnNumber: 25
													}, this),
													" ",
													tkt.admitsCount,
													" Admits"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 164,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 159,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 149,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								variant: "event",
								size: "default",
								className: "w-full sm:w-auto",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: "/ticket/$code",
									params: { code: tkt.ticketNumber },
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ticket, { className: "mr-2 size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 175,
										columnNumber: 25
									}, this), " Open Digital Pass"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 21
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 19
							}, this)]
						}, tkt.ticketNumber, true, {
							fileName: _jsxFileName,
							lineNumber: 148,
							columnNumber: 44
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 147,
						columnNumber: 22
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-10 border-t border-bone/15 pt-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "text-xs text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/recover",
								children: "Look up a different email address"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 184,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 117,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 116,
			columnNumber: 12
		}, this);
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background px-4 py-8 sm:py-14",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between border-b border-bone/15 pb-4 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					className: "text-bone-muted hover:text-bone",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "mr-2 size-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 196,
							columnNumber: 15
						}, this), " Back to Event"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 195,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 194,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 199,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 193,
				columnNumber: 9
			}, this), !submitted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-bold uppercase tracking-[0.25em] text-oxblood-light",
						children: "Self-Service Security"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 205,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-3xl font-display text-bone sm:text-4xl mt-1",
						children: "TICKET RECOVERY"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-bone-muted mt-2",
						children: "Lost your ticket email or link? Enter the email address you used when booking. We will dispatch a cryptographic one-time access link to your inbox."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 209,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 204,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					onSubmit: handleRecoverSubmit,
					className: "space-y-4 border border-border bg-card p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								htmlFor: "recovery-email",
								className: "text-xs uppercase tracking-widest text-muted-foreground block",
								children: "Purchaser Email Address"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "recovery-email",
									type: "email",
									required: true,
									placeholder: "name@example.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									disabled: isSubmitting || rateLimited,
									className: "pl-10 h-12 bg-background border-border text-bone placeholder:text-muted-foreground/60 text-base"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 220,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 15
						}, this),
						formError && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-start gap-2.5 border border-destructive/50 bg-destructive/10 p-3 text-xs text-destructive-foreground",
							children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-4 shrink-0 mt-0.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", { children: formError }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 228,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 29
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							variant: "event",
							size: "xl",
							className: "w-full",
							disabled: isSubmitting || rateLimited,
							children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "mr-2 size-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 21
							}, this), " Verifying Records..."] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 232,
								columnNumber: 33
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "mr-2 size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 21
							}, this), " Send Secure Recovery Link"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 234,
								columnNumber: 25
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 231,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border-t border-border pt-4 text-[11px] text-muted-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-4 text-oxblood-light shrink-0" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Rate limited to 3 recovery requests per hour for guest privacy." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 239,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 215,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 203,
				columnNumber: 23
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-bone/20 bg-card p-6 sm:p-8 space-y-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mx-auto grid size-12 place-items-center bg-oxblood/20 text-oxblood-light border border-oxblood/40",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "size-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 246,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-2xl font-display text-bone",
							children: "CHECK YOUR INBOX"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 251,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-bone-muted max-w-md mx-auto",
							children: [
								"If active tickets exist for ",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-bone",
									children: submittedEmail
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 253,
									columnNumber: 45
								}, this),
								", a secure one-click recovery link has been dispatched to your email."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 252,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-bone/10 bg-background/50 p-4 text-xs text-muted-foreground space-y-2 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 text-bone font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "size-4 text-oxblood-light" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 260,
								columnNumber: 17
							}, this), " Security Notice"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 259,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "The recovery link is cryptographically signed with HMAC SHA-256 and will automatically expire in 1 hour." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 262,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 258,
						columnNumber: 13
					}, this),
					previewToken && /* @__PURE__ */ (void 0)("div", {
						className: "border border-oxblood/40 bg-oxblood/10 p-4 space-y-2 text-left",
						children: [
							/* @__PURE__ */ (void 0)("span", {
								className: "text-[10px] uppercase tracking-widest text-oxblood-light font-bold block",
								children: "Quick Access (Preview Token)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 270,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-bone-muted",
								children: "For your convenience, you can open your recovery session immediately:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 273,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)(Button, {
								asChild: true,
								variant: "event",
								size: "sm",
								className: "w-full",
								children: /* @__PURE__ */ (void 0)(Link, {
									to: "/recover",
									search: { token: previewToken },
									children: ["Open Recovered Passes Now ", /* @__PURE__ */ (void 0)(ExternalLink, { className: "ml-2 size-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 280,
										columnNumber: 47
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 277,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 276,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 269,
						columnNumber: 30
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "pt-4 flex flex-col sm:flex-row gap-3 justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "default",
							className: "border-bone/20 text-bone hover:bg-bone/10",
							onClick: () => {
								setSubmitted(false);
								setEmail("");
								setPreviewToken(null);
							},
							children: "Look Up Another Email"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 286,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "ghost",
							size: "default",
							className: "text-bone-muted hover:text-bone",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/",
								children: ["Return to Event ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "ml-2 size-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 295,
									columnNumber: 35
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 294,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 285,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 245,
				columnNumber: 7
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 191,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 190,
		columnNumber: 10
	}, this);
}
//#endregion
export { RecoverRouteComponent as component };
