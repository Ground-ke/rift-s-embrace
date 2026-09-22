import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Plus, B as Mail, E as RefreshCw, Et as ArrowLeft, F as Minus, T as RotateCcw, W as LockKeyhole, ct as Clock3, d as Ticket, gt as ChevronRight, h as Smartphone, lt as CircleX, mt as CircleAlert, ot as Copy, pt as CircleCheck, q as Info, v as ShieldCheck, vt as Check, x as Send } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as VerveIcon, t as VerveBackButton } from "./verve-logo-BPLLpwqY.mjs";
import { t as Button } from "./button-BQ_Bevjg.mjs";
import { t as Input } from "./input-DkOfYy7N.mjs";
import { t as Label } from "./label-CxwSblzR.mjs";
import { a as saveOrderToFirestore, n as Textarea, o as submitMpesaCodeToFirestore, s as subscribeToOrder, t as Badge } from "./firestore-service-B6QrkZJs.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as validateAndNormalizeKenyanPhone } from "./ssr.mjs";
import { t as Route } from "./checkout-DmmZQFCU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DArB9BjC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/checkout.tsx?tsr-split=component";
var options = [
	{
		id: "early-bird",
		name: "Early Bird",
		price: 1e3,
		admitsCount: 1,
		description: "Single entry pass"
	},
	{
		id: "couple-pass",
		name: "Couple Pass",
		price: 1800,
		admitsCount: 2,
		description: "Admits 2 guests together (1 QR bundle)"
	},
	{
		id: "group-of-four",
		name: "Group of Four",
		price: 3600,
		admitsCount: 4,
		description: "Admits 4 guests together (1 QR bundle)"
	}
];
function Checkout() {
	const { ticket, orderId: routeOrderId, token: routeToken } = Route.useSearch();
	const navigate = useNavigate();
	const initialSelected = (0, import_react.useMemo)(() => {
		if (ticket === "couple") return "couple-pass";
		if (options.some((o) => o.id === ticket)) return ticket;
		return "early-bird";
	}, [ticket]);
	const [selected, setSelected] = (0, import_react.useState)(initialSelected);
	const [quantity, setQuantity] = (0, import_react.useState)(1);
	const [step, setStep] = (0, import_react.useState)("select");
	const [buyerName, setBuyerName] = (0, import_react.useState)("");
	const [buyerPhone, setBuyerPhone] = (0, import_react.useState)("");
	const [buyerEmail, setBuyerEmail] = (0, import_react.useState)("");
	const [nameTouched, setNameTouched] = (0, import_react.useState)(false);
	const [phoneTouched, setPhoneTouched] = (0, import_react.useState)(false);
	const [emailTouched, setEmailTouched] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [activeOrder, setActiveOrder] = (0, import_react.useState)(null);
	const [secondsRemaining, setSecondsRemaining] = (0, import_react.useState)(600);
	const [mpesaRawInput, setMpesaRawInput] = (0, import_react.useState)("");
	const [isSubmittingMpesaCode, setIsSubmittingMpesaCode] = (0, import_react.useState)(false);
	const [mpesaInputError, setMpesaInputError] = (0, import_react.useState)(null);
	const [submittedCode, setSubmittedCode] = (0, import_react.useState)(null);
	const [copiedField, setCopiedField] = (0, import_react.useState)(null);
	const [paymentPhase, setPaymentPhase] = (0, import_react.useState)("idle");
	const [mpesaReceipt, setMpesaReceipt] = (0, import_react.useState)(null);
	const [paymentError, setPaymentError] = (0, import_react.useState)(null);
	const [isCancelling, setIsCancelling] = (0, import_react.useState)(false);
	const choice = options.find((o) => o.id === selected) ?? options[0];
	const phoneValidation = (0, import_react.useMemo)(() => {
		if (!buyerPhone) return null;
		return validateAndNormalizeKenyanPhone(buyerPhone);
	}, [buyerPhone]);
	(0, import_react.useMemo)(() => {
		if (!buyerEmail) return null;
		const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail.trim());
		return {
			isValid,
			error: isValid ? null : "Please enter a valid email address."
		};
	}, [buyerEmail]);
	const extractedCode = (0, import_react.useMemo)(() => {
		if (!mpesaRawInput) return null;
		const match = mpesaRawInput.match(/\b([A-Za-z0-9]{10})\b/);
		return match ? match[1].toUpperCase() : null;
	}, [mpesaRawInput]);
	const [idempotencyKey, setIdempotencyKey] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		setIdempotencyKey(`idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
	}, []);
	(0, import_react.useEffect)(() => {
		if (step !== "payment" || !activeOrder || paymentPhase === "paid") return;
		const interval = setInterval(() => {
			const targetTime = new Date(activeOrder.expiresAt).getTime();
			const diff = Math.max(0, Math.round((targetTime - Date.now()) / 1e3));
			setSecondsRemaining(diff);
			if (diff <= 0) {
				clearInterval(interval);
				setStep("expired");
			}
		}, 1e3);
		return () => clearInterval(interval);
	}, [
		step,
		activeOrder,
		paymentPhase
	]);
	(0, import_react.useEffect)(() => {
		const currentOrderId = activeOrder?.orderId || routeOrderId;
		if (!currentOrderId) return;
		const unsubscribe = subscribeToOrder(currentOrderId, (order) => {
			if (!order) return;
			if (!activeOrder) {
				setActiveOrder({
					success: true,
					orderId: order.orderId,
					orderNumber: order.orderNumber,
					checkoutToken: routeToken || "",
					eventId: "hauntings-2026",
					ticketTypeId: order.ticketTypeId,
					ticketName: order.ticketName,
					admitsCount: order.admitsCount,
					quantity: order.quantity,
					unitPriceKes: Math.round(order.totalKes / order.quantity),
					discountKes: 0,
					subtotalKes: order.totalKes,
					totalKes: order.totalKes,
					currency: "KES",
					buyerName: order.customerName,
					buyerPhone: order.customerPhone,
					buyerEmail: order.customerEmail,
					status: order.status,
					mpesaCode: order.mpesaCode,
					mpesaMessage: order.mpesaMessage,
					rejectionReason: order.rejectionReason,
					approvedBy: order.approvedBy,
					approvedAt: order.approvedAt,
					expiresAt: new Date(Date.now() + 6e5).toISOString(),
					ttlSeconds: 600
				});
				if (order.customerEmail && !buyerEmail) setBuyerEmail(order.customerEmail);
				if (order.mpesaCode && !submittedCode) setSubmittedCode(order.mpesaCode);
				setStep("payment");
			}
			if (order.status === "approved" || order.status === "completed") {
				setPaymentPhase("paid");
				setMpesaReceipt(order.mpesaCode || "APPROVED");
				toast.success("Payment verified! Your tickets have been issued and emailed.");
			} else if (order.status === "rejected") {
				setPaymentPhase("failed");
				setPaymentError(order.rejectionReason || "Your M-Pesa transaction code could not be verified by the admin.");
				toast.error("M-Pesa payment rejected. Please check details and retry.");
			} else if (order.status === "pending_approval") {
				setPaymentPhase("pending_approval");
				if (order.mpesaCode) setSubmittedCode(order.mpesaCode);
			}
		});
		return () => unsubscribe();
	}, [
		activeOrder?.orderId,
		routeOrderId,
		routeToken,
		buyerEmail,
		submittedCode,
		activeOrder
	]);
	const handleCreateReservation = async () => {
		setNameTouched(true);
		setPhoneTouched(true);
		setEmailTouched(true);
		setErrorMessage(null);
		if (!buyerName.trim() || buyerName.trim().length < 2) {
			setErrorMessage("Please enter a valid full name (at least 2 characters).");
			return;
		}
		if (!phoneValidation?.isValid) {
			setErrorMessage(phoneValidation?.error || "Please enter a valid Kenyan phone number.");
			return;
		}
		if (!buyerEmail.trim() || !buyerEmail.includes("@") || !buyerEmail.includes(".")) {
			setErrorMessage("Please enter a valid delivery email address where your tickets will be sent.");
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
					buyer_email: buyerEmail.trim().toLowerCase(),
					idempotency_key: idempotencyKey
				})
			});
			const data = await response.json();
			if (!response.ok || !data.success) {
				setErrorMessage(data.message || "We couldn't complete your reservation. Please try again.");
				setIsSubmitting(false);
				return;
			}
			setActiveOrder(data);
			try {
				await saveOrderToFirestore({
					orderId: data.orderId,
					orderNumber: data.orderNumber,
					customerName: buyerName.trim(),
					customerEmail: buyerEmail.trim().toLowerCase(),
					customerPhone: phoneValidation.normalized,
					ticketTypeId: choice.id,
					ticketName: choice.name,
					admitsCount: choice.admitsCount,
					quantity,
					totalKes: data.totalKes,
					status: "pending"
				});
			} catch (fErr) {
				console.debug("[Firestore] Order sync warning:", fErr);
			}
			navigate({
				search: {
					ticket: choice.id,
					orderId: data.orderId,
					token: data.checkoutToken
				},
				replace: true
			});
			const initialTtl = Math.max(0, Math.round((new Date(data.expiresAt).getTime() - Date.now()) / 1e3));
			setSecondsRemaining(initialTtl);
			setPaymentPhase("idle");
			setStep("payment");
		} catch {
			setErrorMessage("Network error connecting to the ticket reservation service. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleSubmitMpesaCode = async () => {
		if (!activeOrder) return;
		setMpesaInputError(null);
		const cleanInput = mpesaRawInput.trim();
		if (!cleanInput || cleanInput.length < 5) {
			setMpesaInputError("Please paste your M-Pesa confirmation SMS or enter your 10-digit transaction code.");
			return;
		}
		const codeToSubmit = extractedCode || cleanInput.toUpperCase();
		if (codeToSubmit.length < 6) {
			setMpesaInputError("M-Pesa transaction codes consist of 10 alphanumeric characters (e.g. TLK99XW82A).");
			return;
		}
		if (!buyerEmail || !buyerEmail.includes("@")) {
			setMpesaInputError("Please provide a valid email address where your approved tickets will be delivered.");
			return;
		}
		setIsSubmittingMpesaCode(true);
		try {
			const res = await fetch("/api/orders/submit-mpesa-code", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${activeOrder.checkoutToken}`
				},
				body: JSON.stringify({
					order_id: activeOrder.orderId,
					mpesa_code: codeToSubmit,
					mpesa_message: cleanInput,
					buyer_email: buyerEmail.trim().toLowerCase(),
					token: activeOrder.checkoutToken
				})
			});
			const data = await res.json();
			if (!res.ok || !data.success) {
				setMpesaInputError(data.message || "Failed to submit M-Pesa code. Please try again.");
				setIsSubmittingMpesaCode(false);
				return;
			}
			try {
				await submitMpesaCodeToFirestore({
					orderId: activeOrder.orderId,
					mpesaCode: codeToSubmit,
					mpesaMessage: cleanInput,
					customerEmail: buyerEmail.trim().toLowerCase()
				});
			} catch (fErr) {
				console.debug("[Firestore] Sync note:", fErr);
			}
			setSubmittedCode(codeToSubmit);
			setPaymentPhase("pending_approval");
			toast.success("M-Pesa code submitted. Awaiting admin approval.");
		} catch (err) {
			setMpesaInputError("Network error submitting M-Pesa code. Please try again.");
		} finally {
			setIsSubmittingMpesaCode(false);
		}
	};
	const handleCopy = (text, field) => {
		navigator.clipboard.writeText(text);
		setCopiedField(field);
		toast.success(`Copied ${field} to clipboard`);
		setTimeout(() => setCopiedField(null), 2e3);
	};
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
					token: activeOrder.checkoutToken
				})
			});
		} catch (e) {
			console.warn("Cancel order warning:", e);
		} finally {
			setIsCancelling(false);
			handleStartAgain();
		}
	};
	const formatCountdown = (secs) => {
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
		setSubmittedCode(null);
		setMpesaRawInput("");
		setMpesaInputError(null);
		setStep("select");
		navigate({
			search: { ticket: choice.id },
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "border-b border-border bg-card/60 backdrop-blur sticky top-0 z-30",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto grid h-16 max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveBackButton, {
						to: "/",
						label: "Event"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 394,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "hidden sm:flex items-center gap-2 border-r border-border pr-3",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveIcon, { className: "size-6 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 397,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 396,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "truncate font-display text-xl text-bone",
							children: "Hauntings of the Rift"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 400,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground font-mono",
							children: "Verve & Co. Official Ticket Checkout"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 401,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 399,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 395,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LockKeyhole, { className: "size-4 text-lavender" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 407,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "hidden sm:inline",
							children: "256-bit Encrypted"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 408,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 406,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 393,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 392,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "mx-auto max-w-6xl px-4 py-8 lg:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest",
				children: [
					{
						id: "select",
						label: "Ticket"
					},
					{
						id: "details",
						label: "Buyer Details"
					},
					{
						id: "payment",
						label: "Payment (Gate 4)"
					}
				].map((s, i) => {
					const isCompleted = [
						"select",
						"details",
						"payment",
						"expired"
					].indexOf(step) > i;
					const isCurrent = step === s.id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: `flex items-center gap-2 ${isCurrent ? "text-primary" : isCompleted ? "text-bone" : "text-muted-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `grid size-6 place-items-center border text-xs font-mono transition-colors ${isCurrent ? "border-primary bg-primary text-primary-foreground font-bold" : isCompleted ? "border-bone text-bone" : "border-border text-muted-foreground"}`,
								children: isCompleted ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 432,
									columnNumber: 34
								}, this) : i + 1
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 431,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "hidden sm:inline",
								children: s.label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 434,
								columnNumber: 17
							}, this),
							i < 2 && /* @__PURE__ */ (void 0)(ChevronRight, { className: "size-3 text-muted-foreground/60" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 435,
								columnNumber: 27
							}, this)
						]
					}, s.id, true, {
						fileName: _jsxFileName,
						lineNumber: 430,
						columnNumber: 18
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 415,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-8 lg:grid-cols-[1fr_22rem]",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
					step === "select" && /* @__PURE__ */ (void 0)("div", { children: [
						/* @__PURE__ */ (void 0)("h1", {
							className: "font-display text-4xl text-bone sm:text-5xl",
							children: "Choose your ticket"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 447,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Select your preferred tier. Ticket quantity is reserved for 10 minutes upon proceeding."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 448,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-8 grid gap-4",
							role: "radiogroup",
							"aria-label": "Ticket options",
							children: options.map((o) => {
								return /* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => {
										setSelected(o.id);
										setQuantity(1);
									},
									className: `group relative grid min-h-24 w-full grid-cols-[minmax(0,1fr)_auto] items-center border p-5 text-left transition-all ${selected === o.id ? "border-primary bg-oxblood/80 shadow-[0_0_24px_rgba(114,35,53,0.35)]" : "border-border bg-card hover:border-lavender/40 hover:bg-card/80"}`,
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (void 0)("strong", {
											className: "font-display text-2xl text-bone",
											children: o.name
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 462,
											columnNumber: 29
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "border border-border/80 bg-background/60 px-2 py-0.5 text-xs text-bone-muted uppercase tracking-wider",
											children: o.admitsCount === 1 ? "1 Guest" : `Admits ${o.admitsCount}`
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 463,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 461,
										columnNumber: 27
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: o.description
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 467,
										columnNumber: 27
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 460,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-right",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-display text-2xl text-bone sm:text-3xl",
											children: ["KES ", o.price.toLocaleString()]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 470,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "block text-xs uppercase tracking-widest text-lavender",
											children: o.admitsCount > 1 ? "Per Bundle" : "Per Pass"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 473,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 469,
										columnNumber: 25
									}, this)]
								}, o.id, true, {
									fileName: _jsxFileName,
									lineNumber: 456,
									columnNumber: 24
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 453,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-8 border border-border bg-card p-6",
							children: /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
									className: "text-base text-bone font-medium",
									children: "Quantity"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 485,
									columnNumber: 23
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground",
									children: choice.admitsCount > 1 ? `Each bundle admits ${choice.admitsCount} guests` : "Single pass per guest"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 486,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 484,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (void 0)(Button, {
											type: "button",
											variant: "outline",
											size: "icon",
											className: "size-11 border-border bg-background text-bone hover:border-lavender",
											onClick: () => setQuantity((q) => Math.max(1, q - 1)),
											disabled: quantity <= 1,
											"aria-label": "Decrease quantity",
											children: /* @__PURE__ */ (void 0)(Minus, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 492,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 491,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)("span", {
											className: "min-w-10 text-center font-display text-2xl font-bold text-bone",
											children: quantity
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 494,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (void 0)(Button, {
											type: "button",
											variant: "outline",
											size: "icon",
											className: "size-11 border-border bg-background text-bone hover:border-lavender",
											onClick: () => setQuantity((q) => q + 1),
											"aria-label": "Increase quantity",
											children: /* @__PURE__ */ (void 0)(Plus, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 498,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 497,
											columnNumber: 23
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 490,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 483,
								columnNumber: 19
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 482,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)(Button, {
							variant: "event",
							size: "xl",
							className: "mt-8 w-full sm:w-auto",
							onClick: () => setStep("details"),
							children: ["Continue to Buyer Details ", /* @__PURE__ */ (void 0)(ChevronRight, { className: "ml-2 size-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 505,
								columnNumber: 45
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 504,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 446,
						columnNumber: 35
					}, this),
					step === "details" && /* @__PURE__ */ (void 0)("div", { children: [
						/* @__PURE__ */ (void 0)("h1", {
							className: "font-display text-4xl text-bone sm:text-5xl",
							children: "Buyer details"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 513,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Provide your official details and delivery email. Your tickets will be reserved and issued to this email upon payment verification."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 514,
							columnNumber: 17
						}, this),
						errorMessage && /* @__PURE__ */ (void 0)("div", {
							className: "mt-6 flex items-start gap-3 border border-destructive/40 bg-destructive/10 p-4 text-sm text-red-200",
							children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-5 shrink-0 text-destructive mt-0.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 520,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("strong", {
								className: "block font-bold",
								children: "Unable to proceed"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 522,
								columnNumber: 23
							}, this), /* @__PURE__ */ (void 0)("span", { children: errorMessage }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 523,
								columnNumber: 23
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 521,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 519,
							columnNumber: 34
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "mt-8 grid gap-6",
							children: [
								/* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "buyer-name",
										className: "text-bone",
										children: ["Full Name ", /* @__PURE__ */ (void 0)("span", {
											className: "text-primary",
											children: "*"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 530,
											columnNumber: 33
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 529,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)(Input, {
										id: "buyer-name",
										className: "mt-2 h-12 bg-card border-border text-bone placeholder:text-muted-foreground focus:border-primary",
										placeholder: "e.g. Amani Mwangi",
										value: buyerName,
										onChange: (e) => {
											setBuyerName(e.target.value);
											if (errorMessage) setErrorMessage(null);
										},
										onBlur: () => setNameTouched(true)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 532,
										columnNumber: 21
									}, this),
									nameTouched && (!buyerName.trim() || buyerName.trim().length < 2) && /* @__PURE__ */ (void 0)("p", {
										className: "mt-1.5 text-xs text-red-400",
										children: "Please enter a valid full name (minimum 2 characters)."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 536,
										columnNumber: 91
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 528,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "buyer-phone",
										className: "text-bone",
										children: ["M-Pesa Phone Number ", /* @__PURE__ */ (void 0)("span", {
											className: "text-primary",
											children: "*"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 543,
											columnNumber: 43
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 542,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)(Input, {
										id: "buyer-phone",
										type: "tel",
										inputMode: "tel",
										className: "mt-2 h-12 bg-card border-border text-bone placeholder:text-muted-foreground focus:border-primary font-mono",
										placeholder: "07XX XXX XXX or 01XX XXX XXX",
										value: buyerPhone,
										onChange: (e) => {
											setBuyerPhone(e.target.value);
											if (errorMessage) setErrorMessage(null);
										},
										onBlur: () => setPhoneTouched(true)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 545,
										columnNumber: 21
									}, this),
									phoneValidation && phoneValidation.isValid ? /* @__PURE__ */ (void 0)("p", {
										className: "mt-1.5 flex items-center gap-1.5 text-xs text-emerald-400",
										children: [
											/* @__PURE__ */ (void 0)(Check, { className: "size-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 550,
												columnNumber: 25
											}, this),
											" Canonical: ",
											phoneValidation.formatted,
											" (",
											phoneValidation.operator,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 549,
										columnNumber: 67
									}, this) : phoneTouched && buyerPhone ? /* @__PURE__ */ (void 0)("p", {
										className: "mt-1.5 text-xs text-red-400",
										children: phoneValidation?.error || "Enter a valid Kenyan number (e.g. 0712 345 678)."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 552,
										columnNumber: 59
									}, this) : /* @__PURE__ */ (void 0)("p", {
										className: "mt-1.5 text-xs text-muted-foreground",
										children: "Accepts formats: 07XXXXXXXX, 01XXXXXXXX, or +254XXXXXXXXX."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 554,
										columnNumber: 30
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 541,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", { children: [
									/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "buyer-email",
										className: "text-bone flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (void 0)(Mail, { className: "size-4 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 561,
												columnNumber: 23
											}, this),
											" Delivery Email Address",
											" ",
											/* @__PURE__ */ (void 0)("span", {
												className: "text-primary",
												children: "*"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 562,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 560,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)(Input, {
										id: "buyer-email",
										type: "email",
										className: "mt-2 h-12 bg-card border-border text-bone placeholder:text-muted-foreground focus:border-primary font-mono",
										placeholder: "e.g. amani.mwangi@example.com",
										value: buyerEmail,
										onChange: (e) => {
											setBuyerEmail(e.target.value);
											if (errorMessage) setErrorMessage(null);
										},
										onBlur: () => setEmailTouched(true)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 564,
										columnNumber: 21
									}, this),
									emailTouched && (!buyerEmail.trim() || !buyerEmail.includes("@") || !buyerEmail.includes(".")) ? /* @__PURE__ */ (void 0)("p", {
										className: "mt-1.5 text-xs text-red-400",
										children: "Please enter a valid email address. Your digital tickets will be sent here."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 568,
										columnNumber: 119
									}, this) : /* @__PURE__ */ (void 0)("p", {
										className: "mt-1.5 text-xs text-muted-foreground",
										children: "Upon M-Pesa approval by admin, your official ticket pass with QR code is dispatched to this inbox."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 570,
										columnNumber: 30
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 559,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "border border-lavender/30 bg-lavender/5 p-4 text-sm text-bone-muted",
									children: [
										/* @__PURE__ */ (void 0)(ShieldCheck, { className: "mr-2 inline size-4 text-lavender" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 577,
											columnNumber: 21
										}, this),
										"Upon clicking reserve, your ",
										quantity,
										" ",
										choice.name,
										" ",
										choice.admitsCount > 1 ? "bundle" : "pass",
										" will be locked in the inventory engine for exactly 10 minutes."
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 576,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex flex-col gap-4 sm:flex-row sm:items-center",
									children: [/* @__PURE__ */ (void 0)(Button, {
										variant: "event",
										size: "xl",
										className: "w-full sm:w-auto",
										disabled: isSubmitting,
										onClick: handleCreateReservation,
										children: isSubmitting ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "mr-2 size-4 animate-spin" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 586,
											columnNumber: 27
										}, this), "Locking Inventory..."] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 585,
											columnNumber: 39
										}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: ["Reserve & Review Payment ", /* @__PURE__ */ (void 0)(ChevronRight, { className: "ml-2 size-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 589,
											columnNumber: 52
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 588,
											columnNumber: 31
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 584,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Button, {
										type: "button",
										variant: "ghost",
										size: "xl",
										className: "text-bone hover:bg-card",
										onClick: () => setStep("select"),
										disabled: isSubmitting,
										children: "Change Ticket"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 592,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 583,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 527,
							columnNumber: 17
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 512,
						columnNumber: 36
					}, this),
					step === "payment" && activeOrder && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: `grid size-12 place-items-center border ${paymentPhase === "paid" ? "bg-emerald-950 text-emerald-400 border-emerald-500/60" : paymentPhase === "pending_approval" ? "bg-amber-950/60 text-amber-400 border-amber-500/60" : "bg-oxblood text-lavender border-lavender/40"}`,
									children: paymentPhase === "paid" ? /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 606,
										columnNumber: 48
									}, this) : paymentPhase === "pending_approval" ? /* @__PURE__ */ (void 0)(Clock3, { className: "size-6 animate-pulse" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 606,
										columnNumber: 124
									}, this) : /* @__PURE__ */ (void 0)(Smartphone, { className: "size-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 606,
										columnNumber: 170
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 605,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h1", {
									className: "font-display text-3xl text-bone sm:text-4xl",
									children: paymentPhase === "paid" ? "Payment Verified & Tickets Sent" : paymentPhase === "pending_approval" ? "Awaiting Admin Verification" : "M-Pesa Payment Verification"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 609,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: `text-xs uppercase tracking-widest font-mono ${paymentPhase === "paid" ? "text-emerald-400 font-bold" : paymentPhase === "pending_approval" ? "text-amber-400 font-bold" : "text-lavender"}`,
									children: [
										"Status:",
										" ",
										paymentPhase === "paid" ? "APPROVED & DISPATCHED" : paymentPhase === "pending_approval" ? "IN ADMIN APPROVAL QUEUE" : "AWAITING M-PESA CONFIRMATION CODE"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 612,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 608,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 604,
								columnNumber: 17
							}, this),
							paymentPhase !== "paid" && /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col justify-between gap-4 border border-lavender/40 bg-card p-5 sm:flex-row sm:items-center",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (void 0)(Clock3, { className: "size-6 text-lavender animate-pulse" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 622,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
										className: "text-xs uppercase tracking-widest text-muted-foreground",
										children: "Inventory Hold Timer"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 624,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-bone",
										children: "Tickets are reserved exclusively for you while awaiting payment verification."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 627,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 623,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 621,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "font-mono text-3xl font-bold text-lavender",
										children: formatCountdown(secondsRemaining)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 634,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "block text-[10px] uppercase tracking-widest text-muted-foreground",
										children: "Time Remaining"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 637,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 633,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 620,
								columnNumber: 45
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "border border-border bg-card p-6",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Order Reference"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 647,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-lg font-bold text-bone",
											children: activeOrder.orderNumber
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 650,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 646,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Buyer Name"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 655,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-lg text-bone",
											children: activeOrder.buyerName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 658,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 654,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "M-Pesa Phone"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 661,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-lg text-bone",
											children: ["+", activeOrder.buyerPhone]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 664,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 660,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Delivery Email"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 667,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-mono text-lg text-bone truncate",
											children: buyerEmail || activeOrder.buyerEmail || "Not specified"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 670,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 666,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Total Admissions"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 675,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-lg text-bone",
											children: [
												activeOrder.quantity * activeOrder.admitsCount,
												" Guests (",
												activeOrder.quantity,
												" ",
												activeOrder.ticketName,
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 678,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 674,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 645,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-6 border-t border-border pt-4 flex justify-between items-center",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-sm text-muted-foreground",
										children: "Amount Payable"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 686,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("strong", {
										className: "font-display text-3xl text-amber-400",
										children: ["KES ", activeOrder.totalKes.toLocaleString()]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 687,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 685,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 644,
								columnNumber: 17
							}, this),
							paymentPhase === "idle" && /* @__PURE__ */ (void 0)("div", {
								className: "border border-border bg-card p-6 space-y-6",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
										className: "text-xl font-display text-bone flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(Smartphone, { className: "size-5 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 697,
											columnNumber: 25
										}, this), "1. Pay via Safaricom Lipa na M-Pesa"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 696,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-muted-foreground mt-1",
										children: "Use the Paybill details below to transfer the exact ticket amount, then paste your M-Pesa SMS or transaction code below to submit for instant verification."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 700,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 695,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "grid gap-3 sm:grid-cols-3 bg-background/60 border border-amber-500/30 p-4",
										children: [
											/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-mono block",
												children: "Paybill / Business No."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 710,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between mt-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-mono text-xl font-bold text-amber-300",
													children: "5428200"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 714,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => handleCopy("5428200", "Paybill"),
													className: "h-7 px-2 text-xs text-amber-300 hover:bg-amber-950/40",
													children: copiedField === "Paybill" ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 718,
														columnNumber: 58
													}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 718,
														columnNumber: 108
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 717,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 713,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 709,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-mono block",
												children: "Account Number"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 724,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between mt-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-mono text-xl font-bold text-bone",
													children: activeOrder.orderNumber
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 728,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => handleCopy(activeOrder.orderNumber, "Account"),
													className: "h-7 px-2 text-xs text-bone hover:bg-card",
													children: copiedField === "Account" ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 732,
														columnNumber: 58
													}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 732,
														columnNumber: 108
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 731,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 727,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 723,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-[11px] uppercase tracking-wider text-muted-foreground font-mono block",
												children: "Amount Due"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 738,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between mt-1",
												children: [/* @__PURE__ */ (void 0)("span", {
													className: "font-mono text-xl font-bold text-amber-400",
													children: ["KES ", activeOrder.totalKes.toLocaleString()]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 742,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(Button, {
													variant: "ghost",
													size: "sm",
													onClick: () => handleCopy(String(activeOrder.totalKes), "Amount"),
													className: "h-7 px-2 text-xs text-amber-400 hover:bg-amber-950/40",
													children: copiedField === "Amount" ? /* @__PURE__ */ (void 0)(Check, { className: "size-3.5 text-emerald-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 746,
														columnNumber: 57
													}, this) : /* @__PURE__ */ (void 0)(Copy, { className: "size-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 746,
														columnNumber: 107
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 745,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 741,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 737,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 708,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "border border-border/80 bg-card/40 p-4 text-xs font-mono text-muted-foreground space-y-2",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 text-bone font-semibold",
											children: [/* @__PURE__ */ (void 0)(Info, { className: "size-4 text-amber-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 755,
												columnNumber: 25
											}, this), " M-Pesa Steps:"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 754,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("ol", {
											className: "list-decimal list-inside space-y-1 text-bone-muted pl-1",
											children: [
												/* @__PURE__ */ (void 0)("li", { children: "Open M-Pesa on your phone → Select Lipa na M-Pesa → Paybill" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 758,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("li", { children: ["Enter Business Number: ", /* @__PURE__ */ (void 0)("strong", {
													className: "text-bone",
													children: "5428200"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 762,
													columnNumber: 50
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 761,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("li", { children: [
													"Enter Account Number:",
													" ",
													/* @__PURE__ */ (void 0)("strong", {
														className: "text-bone",
														children: activeOrder.orderNumber
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 766,
														columnNumber: 27
													}, this)
												] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 764,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("li", { children: [
													"Enter Amount:",
													" ",
													/* @__PURE__ */ (void 0)("strong", {
														className: "text-bone",
														children: ["KES ", activeOrder.totalKes.toLocaleString()]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 770,
														columnNumber: 27
													}, this)
												] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 768,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("li", { children: "Enter your M-Pesa PIN and confirm the transaction" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 774,
													columnNumber: 25
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 757,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 753,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "border-t border-border pt-6 space-y-4",
										children: [
											/* @__PURE__ */ (void 0)("div", { children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (void 0)(Label, {
														htmlFor: "mpesa-code",
														className: "text-bone font-medium",
														children: "2. Paste M-Pesa Confirmation SMS or 10-Digit Code *"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 782,
														columnNumber: 27
													}, this), extractedCode && /* @__PURE__ */ (void 0)(Badge, {
														variant: "outline",
														className: "border-amber-500/50 bg-amber-950/30 text-amber-300 font-mono text-[11px]",
														children: ["Identified Code: ", extractedCode]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 785,
														columnNumber: 45
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 781,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)(Textarea, {
													id: "mpesa-code",
													rows: 3,
													className: "mt-2 bg-background border-border text-bone font-mono text-sm placeholder:text-muted-foreground focus:border-amber-400",
													placeholder: "e.g. TLK99XW82A or paste the entire SMS: TLK99XW82A Confirmed. Ksh1,000 sent to Verve & Co. on 31/10/26...",
													value: mpesaRawInput,
													onChange: (e) => {
														setMpesaRawInput(e.target.value);
														if (mpesaInputError) setMpesaInputError(null);
													}
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 789,
													columnNumber: 25
												}, this),
												mpesaInputError && /* @__PURE__ */ (void 0)("p", {
													className: "mt-1.5 text-xs text-red-400",
													children: mpesaInputError
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 793,
													columnNumber: 45
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 780,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)(Label, {
												htmlFor: "confirm-email",
												className: "text-xs text-muted-foreground",
												children: "Delivery Email (Ticket will be dispatched here immediately after approval)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 797,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "relative mt-1",
												children: [/* @__PURE__ */ (void 0)(Input, {
													id: "confirm-email",
													type: "email",
													className: "bg-background border-border text-bone font-mono text-xs pl-8",
													value: buyerEmail,
													onChange: (e) => setBuyerEmail(e.target.value),
													placeholder: "your.email@example.com"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 801,
													columnNumber: 27
												}, this), /* @__PURE__ */ (void 0)(Mail, { className: "absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 802,
													columnNumber: 27
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 800,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 796,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex flex-col sm:flex-row gap-3 pt-2",
												children: [/* @__PURE__ */ (void 0)(Button, {
													variant: "event",
													size: "xl",
													onClick: handleSubmitMpesaCode,
													disabled: isSubmittingMpesaCode,
													className: "w-full sm:w-auto",
													children: isSubmittingMpesaCode ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "mr-2 size-4 animate-spin" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 809,
														columnNumber: 31
													}, this), " Submitting for Verification..."] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 808,
														columnNumber: 52
													}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Send, { className: "mr-2 size-4" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 812,
														columnNumber: 31
													}, this), " Submit M-Pesa Code for Verification"] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 811,
														columnNumber: 35
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 807,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)(Button, {
													variant: "spectral",
													size: "xl",
													onClick: handleCancelReservation,
													disabled: isCancelling,
													children: isCancelling ? "Releasing..." : "Cancel Reservation"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 815,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 806,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 779,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 694,
								columnNumber: 45
							}, this),
							paymentPhase === "pending_approval" && /* @__PURE__ */ (void 0)("div", {
								className: "border border-amber-500/60 bg-amber-950/20 p-6 sm:p-8 space-y-6",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "grid size-12 place-items-center bg-amber-500/20 text-amber-400 border border-amber-500/40 shrink-0",
											children: /* @__PURE__ */ (void 0)(Clock3, { className: "size-6 animate-pulse" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 826,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 825,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "space-y-1",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (void 0)("h2", {
														className: "text-2xl font-display text-bone tracking-wide",
														children: "VERIFICATION IN PROGRESS"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 830,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)(Badge, {
														variant: "outline",
														className: "border-amber-500/40 text-amber-300 font-mono text-xs",
														children: "Live Firestore Sync"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 833,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 829,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "text-sm text-bone-muted leading-relaxed",
													children: [
														"We have received your M-Pesa transaction reference:",
														" ",
														/* @__PURE__ */ (void 0)("strong", {
															className: "text-amber-300 font-mono font-bold",
															children: submittedCode || extractedCode || "SUBMITTED"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 839,
															columnNumber: 27
														}, this),
														". It is currently being reviewed by the event administrator."
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 837,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "text-xs text-amber-300 font-mono pt-1 flex items-center gap-1.5",
													children: [
														/* @__PURE__ */ (void 0)(Mail, { className: "size-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 845,
															columnNumber: 27
														}, this),
														"Upon approval, your official admission pass will be delivered to:",
														" ",
														/* @__PURE__ */ (void 0)("strong", {
															className: "text-bone",
															children: buyerEmail
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 847,
															columnNumber: 27
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 844,
													columnNumber: 25
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 828,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 824,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "border border-amber-500/30 bg-card/80 p-4 text-xs font-mono text-muted-foreground space-y-2",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 text-amber-400 font-semibold",
											children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "size-4 animate-spin text-amber-400 shrink-0" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 854,
												columnNumber: 25
											}, this), "Listening to Central Verification Ledger"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 853,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("p", { children: "This screen updates automatically the instant the administrator verifies your payment. No page refresh is required." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 857,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 852,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-amber-500/20",
										children: [/* @__PURE__ */ (void 0)(Button, {
											variant: "outline",
											size: "sm",
											className: "text-xs border-amber-500/40 text-bone hover:bg-amber-950/40",
											onClick: () => setPaymentPhase("idle"),
											children: "Edit or Re-enter M-Pesa Code"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 864,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)(Button, {
											variant: "ghost",
											size: "sm",
											className: "text-xs text-muted-foreground hover:text-bone",
											onClick: handleCancelReservation,
											disabled: isCancelling,
											children: "Cancel Reservation"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 867,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 863,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 823,
								columnNumber: 57
							}, this),
							paymentPhase === "paid" && /* @__PURE__ */ (void 0)("div", {
								className: "border border-emerald-500/60 bg-emerald-950/30 p-6 sm:p-8 space-y-6",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "grid size-12 place-items-center bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shrink-0",
											children: /* @__PURE__ */ (void 0)(CircleCheck, { className: "size-6" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 877,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 876,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "space-y-1",
											children: [
												/* @__PURE__ */ (void 0)("h2", {
													className: "text-3xl font-display text-bone",
													children: "PAYMENT APPROVED & TICKETS ISSUED"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 880,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "text-sm text-emerald-300 font-mono",
													children: [
														"M-Pesa Reference:",
														" ",
														/* @__PURE__ */ (void 0)("strong", {
															className: "text-bone font-bold",
															children: mpesaReceipt || submittedCode || "CONFIRMED"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 885,
															columnNumber: 27
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 883,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (void 0)("p", {
													className: "text-sm text-bone-muted pt-1",
													children: [
														"Your payment of",
														" ",
														/* @__PURE__ */ (void 0)("strong", {
															className: "text-bone",
															children: ["KES ", activeOrder.totalKes.toLocaleString()]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 891,
															columnNumber: 27
														}, this),
														" ",
														"has been verified by the event admin. Reserved tickets have been permanently committed to sold inventory."
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 889,
													columnNumber: 25
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 879,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 875,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "border border-emerald-500/30 bg-emerald-950/40 p-4 text-xs text-bone-muted space-y-2",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2 text-emerald-400 font-semibold text-sm",
											children: [/* @__PURE__ */ (void 0)(Mail, { className: "size-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 902,
												columnNumber: 25
											}, this), " Ticket Sent to Email"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 901,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("p", { children: [
											"Your cryptographic admission ticket pass with QR token has been delivered to",
											" ",
											/* @__PURE__ */ (void 0)("strong", {
												className: "text-bone font-mono",
												children: buyerEmail
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 906,
												columnNumber: 25
											}, this),
											". You can also view and save your digital pass immediately below."
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 904,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 900,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "pt-2 flex flex-col sm:flex-row gap-3",
										children: [/* @__PURE__ */ (void 0)(Button, {
											asChild: true,
											variant: "event",
											size: "xl",
											className: "w-full sm:w-auto",
											children: /* @__PURE__ */ (void 0)(Link, {
												to: "/pay",
												search: {
													orderId: activeOrder.orderId,
													token: activeOrder.checkoutToken
												},
												children: [/* @__PURE__ */ (void 0)(Ticket, { className: "mr-2 size-5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 917,
													columnNumber: 27
												}, this), " View Digital Ticket Pass"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 913,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 912,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)(Button, {
											asChild: true,
											variant: "spectral",
											size: "xl",
											children: /* @__PURE__ */ (void 0)(Link, {
												to: "/",
												children: [/* @__PURE__ */ (void 0)(ArrowLeft, { className: "mr-2 size-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 922,
													columnNumber: 27
												}, this), " Return to Event"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 921,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 920,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 911,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 874,
								columnNumber: 45
							}, this),
							paymentPhase === "failed" && /* @__PURE__ */ (void 0)("div", {
								className: "border border-destructive/60 bg-destructive/10 p-6 sm:p-8 space-y-6",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "grid size-12 place-items-center bg-destructive/20 text-destructive border border-destructive/50 shrink-0",
										children: /* @__PURE__ */ (void 0)(CircleX, { className: "size-6" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 932,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 931,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (void 0)("h2", {
												className: "text-2xl font-display text-bone",
												children: "VERIFICATION NOT APPROVED"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 935,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-sm text-destructive-foreground",
												children: paymentError || "The transaction code could not be verified by the admin."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 938,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-xs text-bone-muted pt-1",
												children: "Your reservation remains active for the time remaining on the timer. Please verify your M-Pesa transaction code and retry."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 941,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 934,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 930,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-col sm:flex-row gap-3 pt-2",
									children: [/* @__PURE__ */ (void 0)(Button, {
										variant: "event",
										size: "xl",
										onClick: () => {
											setPaymentPhase("idle");
											setPaymentError(null);
										},
										className: "w-full sm:w-auto",
										children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "mr-2 size-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 953,
											columnNumber: 25
										}, this), " Re-enter M-Pesa Code"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 949,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)(Button, {
										variant: "spectral",
										size: "xl",
										onClick: handleCancelReservation,
										disabled: isCancelling,
										children: "Cancel Reservation"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 955,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 948,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 929,
								columnNumber: 47
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 602,
						columnNumber: 51
					}, this),
					step === "expired" && /* @__PURE__ */ (void 0)("div", {
						className: "border border-destructive/40 bg-card p-8 text-center sm:p-12",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "mx-auto grid size-16 place-items-center bg-destructive/20 text-destructive border border-destructive/40",
								children: /* @__PURE__ */ (void 0)(Clock3, { className: "size-8" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 967,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 966,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("h1", {
								className: "mt-6 font-display text-4xl text-bone sm:text-5xl",
								children: "Your reservation expired"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 969,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "mx-auto mt-4 max-w-md text-base text-muted-foreground",
								children: "The 10-minute hold on your selected tickets has elapsed. Reserved inventory has been automatically returned to the pool to allow other attendees to purchase."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 972,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "mt-8",
								children: /* @__PURE__ */ (void 0)(Button, {
									variant: "event",
									size: "xl",
									onClick: handleStartAgain,
									children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "mr-2 size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 978,
										columnNumber: 21
									}, this), " Start Again"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 977,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 976,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 965,
						columnNumber: 36
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 442,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
					className: "h-fit border border-border bg-card p-6 lg:sticky lg:top-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-bold uppercase tracking-widest text-lavender",
							children: "Order summary"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 988,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-4 font-display text-3xl text-bone",
							children: choice.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 991,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-bone-muted",
							children: choice.admitsCount === 1 ? "1 Guest pass" : `Bundle for ${choice.admitsCount} guests`
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 992,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 space-y-1 text-sm text-muted-foreground border-y border-border/80 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "31 October 2026 · 4:00 PM" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 996,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Top Cliff Lounge, Nakuru" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 997,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Dress Code: Wickedly Fabulous" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 998,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Age: 18+ Strictly" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 999,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 995,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Unit Price" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1004,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-bone",
										children: ["KES ", choice.price.toLocaleString()]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1005,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1003,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Quantity" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1008,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-bone",
										children: ["× ", quantity]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1009,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1007,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex justify-between text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total Admissions" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1012,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-bone",
										children: [quantity * choice.admitsCount, " Guests"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1013,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1011,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1002,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-6 flex justify-between border-t border-border pt-4 items-baseline",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs uppercase tracking-widest text-lavender block",
								children: "Total Amount"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1019,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs text-muted-foreground",
								children: "Inclusive of VAT"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1022,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1018,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
								className: "font-display text-3xl text-bone",
								children: ["KES ", (choice.price * quantity).toLocaleString()]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1024,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1017,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 987,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 440,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 413,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 391,
		columnNumber: 10
	}, this);
}
//#endregion
export { Checkout as component };
