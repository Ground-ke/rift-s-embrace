import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Receipt, E as RefreshCw, J as Funnel, Ot as ArrowDownRight, Q as FileSpreadsheet, S as Search, T as RotateCcw, Z as FileText, at as CreditCard, it as DollarSign, l as TrendingUp, mt as CircleAlert, pt as CircleCheck, v as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as VerveErrorState } from "./verve-logo-BPLLpwqY.mjs";
import { t as AdminAuthProvider } from "./admin-auth-context-Bh46mYen.mjs";
import { n as logFirebaseAnalyticsEvent } from "./analytics-service-CTRnOzOD.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$7 } from "./checkout-DmmZQFCU.mjs";
import { t as Route$8 } from "./pay-CnL77C6u.mjs";
import { t as Route$9 } from "./recover-CpaeIgn9.mjs";
import { n as Route$10 } from "./admin.scan-D1QMRVGk.mjs";
import { t as Route$11 } from "./ticket._code-Cr_hSG0Z.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CRHL32Hh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_jspdf_node_min = require_jspdf_node_min();
var styles_default = "/assets/styles-Dt045Rf_.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var AnalyticsService = class {
	isInitialized = false;
	constructor() {
		if (typeof window !== "undefined") this.isInitialized = true;
	}
	/**
	* Dispatch a generic analytics event to GA4, Plausible, and local telemetry
	*/
	trackEvent(name, properties = {}) {
		if (typeof window === "undefined") return;
		const payload = {
			...properties,
			timestamp: (/* @__PURE__ */ new Date()).toISOString(),
			url: window.location.href
		};
		if (typeof window.gtag === "function") try {
			window.gtag("event", name, payload);
		} catch (err) {
			console.debug("[Analytics] GA4 dispatch error:", err);
		}
		try {
			logFirebaseAnalyticsEvent(name, payload);
		} catch (err) {
			console.debug("[Analytics] Firebase dispatch error:", err);
		}
		if (typeof window.plausible === "function") try {
			window.plausible(name, { props: payload });
		} catch (err) {
			console.debug("[Analytics] Plausible dispatch error:", err);
		}
		console.log(`%c[Analytics Event] ${name}`, "color: #e6a23c; font-weight: bold;", payload);
	}
	/**
	* Track page navigation or initial entry
	*/
	trackPageView(path) {
		this.trackEvent("page_view", {
			path: path || (typeof window !== "undefined" ? window.location.pathname : "/"),
			title: typeof document !== "undefined" ? document.title : ""
		});
	}
	/**
	* Track User viewing the event landing page or experience section
	*/
	trackViewEvent(eventId = "hauntings-of-the-rift-2026", eventName = "Hauntings of the Rift") {
		this.trackEvent("view_event", {
			event_id: eventId,
			event_name: eventName,
			location: "Top Cliff Lounge, Nakuru",
			date: "2026-10-31"
		});
	}
	/**
	* Track user entering the ticket checkout flow
	*/
	trackBeginCheckout(tierSlug, quantity, totalKes) {
		this.trackEvent("begin_checkout", {
			tier_slug: tierSlug,
			quantity,
			value_kes: totalKes,
			currency: "KES"
		});
	}
	/**
	* Track successful ticket purchase
	*/
	trackPurchaseCompleted(orderId, totalKes, ticketCount, paymentMethod = "mpesa") {
		this.trackEvent("purchase", {
			transaction_id: orderId,
			value_kes: totalKes,
			currency: "KES",
			items_count: ticketCount,
			payment_type: paymentMethod
		});
	}
	/**
	* Track Gate Check-in Scan result
	*/
	trackScanTicket(ticketCode, status, tier = "") {
		this.trackEvent("scan_ticket", {
			ticket_code: ticketCode,
			scan_status: status,
			ticket_tier: tier
		});
	}
	/**
	* Track Refund Processing
	*/
	trackRefundIssued(orderId, amountKes, reason) {
		this.trackEvent("refund_processed", {
			order_id: orderId,
			amount_kes: amountKes,
			reason,
			currency: "KES"
		});
	}
};
var analytics = new AnalyticsService();
var _jsxFileName$1 = "/app/applet/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveErrorState, {
		code: "404",
		title: "Page Not Found",
		description: "The page you're looking for doesn't exist or has moved from the Rift.",
		actionLabel: "Return to Event",
		actionTo: "/"
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveErrorState, {
		code: "500",
		title: "This Page Didn't Load",
		description: "Something went wrong on our end. You can try refreshing or head back to the main event.",
		actionLabel: "Return to Event",
		actionTo: "/",
		onRetry: () => {
			router.invalidate();
			reset();
		}
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 39,
		columnNumber: 5
	}, this);
}
var Route$6 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Hauntings of the Rift — Verve & Co." },
			{
				name: "description",
				content: "A premium Halloween nightlife experience in Nakuru presented by Verve & Co."
			},
			{
				name: "author",
				content: "Verve & Co."
			},
			{
				property: "og:title",
				content: "Hauntings of the Rift — Verve & Co."
			},
			{
				property: "og:description",
				content: "Something is stirring beneath Nakuru. Presented by Verve & Co."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@VerveAndCo"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "any"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.svg"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 99,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 98,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 103,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 101,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 97,
		columnNumber: 5
	}, this);
}
function RootComponent() {
	const { queryClient } = Route$6.useRouteContext();
	const location = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		analytics.trackPageView(location);
	}, [location]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminAuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 122,
			columnNumber: 11
		}, this) }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 120,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
			richColors: true,
			position: "top-right",
			theme: "dark"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 124,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 119,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 118,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$4 = () => import("./routes-BVE5Iu27.mjs");
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Hauntings of the Rift — Verve & Co. in Nakuru" },
		{
			name: "description",
			content: "Hauntings of the Rift at Top Cliff Lounge, Nakuru. 31 October 2026 from 4 PM. Presented by Verve & Co. Tickets from KES 1,000."
		},
		{
			property: "og:title",
			content: "Hauntings of the Rift — Verve & Co."
		},
		{
			property: "og:description",
			content: "Something is stirring beneath Nakuru. Presented by Verve & Co. Tickets from KES 1,000."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin-BmnQymob.mjs");
var Route$4 = createFileRoute("/admin")({
	head: () => ({ meta: [
		{ title: "Admin Operations Portal — Verve & Co. | Hauntings of the Rift" },
		{
			name: "description",
			content: "Authoritative event operations, ticket ledger management, gate check-in, and promotional campaign administration."
		},
		{
			property: "og:title",
			content: "Hauntings of the Rift Admin Portal — Verve & Co."
		},
		{
			property: "og:description",
			content: "Executive event operations & gate security."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./scanner-DiroRm5q.mjs");
var Route$3 = createFileRoute("/scanner")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.login-DR35XdO8.mjs");
var Route$2 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Admin Portal Sign In — Verve & Co. | Hauntings of the Rift" }, {
		name: "description",
		content: "Secure organizer and security checkpoint authentication gateway."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
/**
* Executive Data Export Utilities (CSV & PDF)
* Supports Attendee Manifest and Financial Reconciliation reports.
*/
/**
* Escapes values for standard RFC 4180 CSV compliance
*/
function escapeCsvValue(val) {
	if (val === null || val === void 0) return "\"\"";
	return `"${String(val).replace(/"/g, "\"\"")}"`;
}
/**
* Trigger direct client-side file download
*/
function triggerDownload(content, filename, mimeType) {
	const blob = new Blob([content], { type: mimeType });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
function exportFinancialReconciliationCsv(transactions, totals) {
	const headers = [
		"Date & Time",
		"Gateway Ref / M-Pesa",
		"Order ID",
		"Customer Name",
		"Ticket Tier",
		"Gross Amount (KES)",
		"Gateway Fee (KES)",
		"Net Payout (KES)",
		"Reconciliation Status"
	];
	const rows = transactions.map((t) => [
		escapeCsvValue(new Date(t.createdAt).toLocaleString("en-KE")),
		escapeCsvValue(t.gatewayRef),
		escapeCsvValue(t.orderNumber),
		escapeCsvValue(t.attendeeName),
		escapeCsvValue(t.tierName),
		escapeCsvValue(t.amountKes),
		escapeCsvValue(t.gatewayFeeKes),
		escapeCsvValue(t.netRevenueKes),
		escapeCsvValue(t.status)
	]);
	let summarySection = "";
	if (totals) summarySection = [
		"",
		"--- FINANCIAL RECONCILIATION SUMMARY ---",
		`Gross Volume (KES),${totals.grossRevenueKes}`,
		`Total Refunds (KES),${totals.totalRefundsKes}`,
		`Gateway Fees (KES),${totals.platformFeesKes}`,
		`Net Settled Revenue (KES),${totals.netRevenueKes}`,
		`Total Tickets Issued,${totals.totalTicketsSold}`,
		""
	].join("\r\n");
	triggerDownload("﻿" + (summarySection ? summarySection + "\r\n" : "") + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n"), `Hauntings_Rift_Financial_Reconciliation_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`, "text/csv;charset=utf-8;");
}
function exportFinancialReconciliationPdf(transactions, totals) {
	const doc = new import_jspdf_node_min.jsPDF({
		orientation: "portrait",
		unit: "pt",
		format: "a4"
	});
	const primaryColor = [
		22,
		20,
		24
	];
	const pageWidth = doc.internal.pageSize.width;
	doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
	doc.rect(0, 0, pageWidth, 75, "F");
	doc.setTextColor(255, 255, 255);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(15);
	doc.text("HAUNTINGS OF THE RIFT 2026 — FINANCIAL RECONCILIATION", 36, 32);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9);
	doc.setTextColor(210, 210, 210);
	doc.text(`Audited Gateway Payout Ledger | Presenter: Verve & Co. | Generated: ${(/* @__PURE__ */ new Date()).toLocaleString("en-KE")}`, 36, 50);
	const cardY = 90;
	const cardW = (pageWidth - 72 - 30) / 4;
	const cardH = 50;
	[
		{
			label: "GROSS REVENUE",
			val: `KES ${totals.grossRevenueKes.toLocaleString()}`,
			color: [
				30,
				41,
				59
			]
		},
		{
			label: "TOTAL REFUNDS",
			val: `KES ${totals.totalRefundsKes.toLocaleString()}`,
			color: [
				153,
				27,
				27
			]
		},
		{
			label: "GATEWAY FEES (2.5%)",
			val: `KES ${totals.platformFeesKes.toLocaleString()}`,
			color: [
				180,
				83,
				9
			]
		},
		{
			label: "NET SETTLED",
			val: `KES ${totals.netRevenueKes.toLocaleString()}`,
			color: [
				21,
				128,
				61
			]
		}
	].forEach((kpi, idx) => {
		const x = 36 + idx * (cardW + 10);
		doc.setFillColor(245, 245, 247);
		doc.roundedRect(x, cardY, cardW, cardH, 4, 4, "F");
		doc.setFont("helvetica", "bold");
		doc.setFontSize(7);
		doc.setTextColor(100, 100, 100);
		doc.text(kpi.label, x + 8, 106);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2]);
		doc.text(kpi.val, x + 8, 126);
	});
	const tableHeaders = [[
		"Date",
		"M-Pesa / Ref",
		"Order #",
		"Attendee",
		"Gross (KES)",
		"Fee (KES)",
		"Net (KES)",
		"Status"
	]];
	const tableData = transactions.map((t) => [
		new Date(t.createdAt).toLocaleDateString("en-KE", {
			month: "short",
			day: "numeric"
		}),
		t.gatewayRef,
		t.orderNumber,
		t.attendeeName,
		t.amountKes.toLocaleString(),
		t.gatewayFeeKes.toLocaleString(),
		t.netRevenueKes.toLocaleString(),
		t.status
	]);
	autoTable(doc, {
		head: tableHeaders,
		body: tableData,
		startY: 155,
		theme: "striped",
		headStyles: {
			fillColor: [
				30,
				26,
				36
			],
			textColor: [
				255,
				255,
				255
			],
			fontStyle: "bold",
			fontSize: 8
		},
		bodyStyles: {
			fontSize: 8,
			textColor: [
				40,
				40,
				40
			]
		},
		alternateRowStyles: { fillColor: [
			248,
			248,
			250
		] },
		margin: {
			left: 36,
			right: 36
		},
		didDrawCell: (data) => {
			if (data.section === "body" && data.column.index === 7) {
				const val = String(data.cell.raw);
				if (val === "Matched") doc.setTextColor(21, 128, 61);
				else if (val === "Refunded") doc.setTextColor(185, 28, 28);
				else doc.setTextColor(194, 65, 12);
			}
		}
	});
	const filename = `Hauntings_Rift_Financial_Reconciliation_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf`;
	doc.save(filename);
}
var exportFinancialReportPDF = exportFinancialReconciliationPdf;
var exportFinancialLedgerCSV = exportFinancialReconciliationCsv;
var _jsxFileName = "/app/applet/src/routes/admin.reconciliation.tsx";
var Route$1 = createFileRoute("/admin/reconciliation")({ component: AdminReconciliationPage });
function AdminReconciliationPage() {
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [totals, setTotals] = (0, import_react.useState)({
		grossRevenueKes: 245e3,
		totalRefundsKes: 1800,
		platformFeesKes: 6125,
		netRevenueKes: 237075,
		totalTicketsSold: 65,
		totalRefundsCount: 1
	});
	const [ledger, setLedger] = (0, import_react.useState)([]);
	const [refunds, setRefunds] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const [isRefundModalOpen, setIsRefundModalOpen] = (0, import_react.useState)(false);
	const [refundOrderId, setRefundOrderId] = (0, import_react.useState)("");
	const [refundTicketCode, setRefundTicketCode] = (0, import_react.useState)("");
	const [refundAmount, setRefundAmount] = (0, import_react.useState)(1800);
	const [refundReason, setRefundReason] = (0, import_react.useState)("");
	const [refundType, setRefundType] = (0, import_react.useState)("full");
	const [isProcessingRefund, setIsProcessingRefund] = (0, import_react.useState)(false);
	const [refundFeedback, setRefundFeedback] = (0, import_react.useState)(null);
	const fetchReconciliationData = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/admin/reconciliation");
			if (res.ok) {
				const data = await res.json();
				if (data.totals) setTotals(data.totals);
				if (data.ledger) setLedger(data.ledger);
				if (data.refunds) setRefunds(data.refunds);
			}
		} catch (err) {
			console.warn("Error loading reconciliation ledger:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchReconciliationData();
	}, []);
	const handleProcessRefund = async (e) => {
		e.preventDefault();
		if (!refundReason || !refundOrderId && !refundTicketCode) return;
		setIsProcessingRefund(true);
		setRefundFeedback(null);
		try {
			const res = await fetch("/api/admin/refunds/process", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					orderId: refundOrderId || void 0,
					ticketNumber: refundTicketCode || void 0,
					amountKes: Number(refundAmount),
					reason: refundReason,
					refundType,
					actorEmail: "admin@verve.co.ke"
				})
			});
			const result = await res.json();
			if (res.ok && result.success) {
				setRefundFeedback({
					success: true,
					message: result.message
				});
				setTimeout(() => {
					setIsRefundModalOpen(false);
					setRefundReason("");
					setRefundOrderId("");
					setRefundTicketCode("");
					fetchReconciliationData();
				}, 1500);
			} else setRefundFeedback({
				success: false,
				message: result.message || "Failed to execute refund."
			});
		} catch {
			setRefundFeedback({
				success: false,
				message: "Network error executing refund gateway transaction."
			});
		} finally {
			setIsProcessingRefund(false);
		}
	};
	const filteredLedger = ledger.filter((item) => {
		const matchesSearch = item.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || item.attendeeName.toLowerCase().includes(searchQuery.toLowerCase()) || item.gatewayRef.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter === "ALL" || item.status.toUpperCase() === statusFilter.toUpperCase();
		return matchesSearch && matchesStatus;
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		id: "reconciliation-page",
		className: "min-h-screen bg-[#07090E] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-7xl mx-auto space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 text-emerald-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Receipt, { className: "w-6 h-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 154,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-2xl font-bold tracking-tight text-white font-serif",
							children: "Financial Reconciliation & Settlement"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 157,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-slate-400",
							children: "M-Pesa B2C payout verification, platform fee audits, and refund ledger"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								id: "open-refund-modal-btn",
								onClick: () => {
									setRefundFeedback(null);
									setIsRefundModalOpen(true);
								},
								className: "px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600/30 hover:bg-rose-600/40 border border-rose-500/40 text-rose-300 flex items-center gap-2 transition",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 176,
									columnNumber: 15
								}, this), "Process Refund"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								id: "export-pdf-btn",
								onClick: () => exportFinancialReportPDF(totals, ledger, refunds),
								className: "px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 flex items-center gap-2 transition",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 15
								}, this), "PDF Audit"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								id: "export-csv-btn",
								onClick: () => exportFinancialLedgerCSV(ledger),
								className: "px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 flex items-center gap-2 transition",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileSpreadsheet, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 194,
									columnNumber: 15
								}, this), "CSV Ledger"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 189,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								id: "refresh-recon-btn",
								onClick: fetchReconciliationData,
								className: "p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 transition",
								title: "Refresh ledger",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `w-4 h-4 ${loading ? "animate-spin" : ""}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 198,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					id: "financial-summary-cards",
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-5 relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs text-slate-400 mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Gross Ticket Revenue" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DollarSign, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 215,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-2xl font-bold text-white tracking-tight",
									children: ["KES ", totals.grossRevenueKes.toLocaleString()]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 219,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-emerald-400 mt-2 flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "w-3.5 h-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 223,
											columnNumber: 15
										}, this),
										totals.totalTicketsSold,
										" tickets issued across all tiers"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-5 relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs text-slate-400 mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total Refunds Processed" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 230,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowDownRight, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 231,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 229,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-2xl font-bold text-rose-400 tracking-tight",
									children: ["KES ", totals.totalRefundsKes.toLocaleString()]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 233,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-slate-400 mt-2",
									children: [totals.totalRefundsCount, " transaction(s) reversed"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 228,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-5 relative overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs text-slate-400 mb-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "M-Pesa Gateway Fee (2.5%)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 243,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CreditCard, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 244,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 242,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-2xl font-bold text-amber-400 tracking-tight",
									children: ["KES ", totals.platformFeesKes.toLocaleString()]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 246,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-slate-400 mt-2",
									children: "Daraja B2C processing fees"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 241,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-gradient-to-br from-emerald-950/40 to-slate-900/80 border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden shadow-xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs text-emerald-400 mb-1.5 font-medium",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Net Settled Revenue" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 253,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-2xl font-bold text-emerald-300 tracking-tight",
									children: ["KES ", totals.netRevenueKes.toLocaleString()]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-emerald-400/80 mt-2",
									children: "Available for payout disbursement"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 260,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 252,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 210,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative w-full sm:w-80",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							id: "recon-search-input",
							type: "text",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "Search Order #, Name, M-Pesa...",
							className: "w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 269,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "w-4 h-4 text-slate-500 absolute left-3 top-2.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 277,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 w-full sm:w-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Funnel, { className: "w-4 h-4 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs text-slate-400",
								children: "Status:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 282,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
								id: "status-filter-select",
								value: statusFilter,
								onChange: (e) => setStatusFilter(e.target.value),
								className: "px-3 py-1.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-slate-200 focus:outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "ALL",
										children: [
											"All Statuses (",
											ledger.length,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 289,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "MATCHED",
										children: "Matched"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 290,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "REFUNDED",
										children: "Refunded"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 291,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "DISCREPANCY",
										children: "Discrepancy"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 292,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
										value: "PENDING SETTLEMENT",
										children: "Pending Settlement"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 293,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 283,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 280,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 267,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-slate-900/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 border-b border-white/10 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-sm font-bold text-white uppercase tracking-wider",
							children: "Transaction Reconciliation Ledger"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 302,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-slate-400",
							children: "Audited against Safaricom Daraja M-Pesa receipts"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 301,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs font-mono text-slate-400",
							children: [
								"Showing ",
								filteredLedger.length,
								" of ",
								ledger.length,
								" entries"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 309,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 300,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
								className: "bg-slate-950/80 text-slate-400 uppercase tracking-wider border-b border-white/10 font-semibold",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4",
										children: "Order #"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 318,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4",
										children: "Gateway Ref"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 319,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4",
										children: "Customer"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 320,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4",
										children: "Pass Tier"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4 text-right",
										children: "Gross (KES)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 322,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4 text-right",
										children: "Fee (KES)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 323,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4 text-right",
										children: "Net (KES)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4 text-center",
										children: "Status"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
										className: "py-3 px-4 text-right",
										children: "Actions"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 326,
										columnNumber: 19
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 317,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 316,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
								className: "divide-y divide-white/5",
								children: filteredLedger.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
									colSpan: 9,
									className: "py-8 text-center text-slate-500",
									children: "No reconciliation records matching your filter."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 332,
									columnNumber: 21
								}, this) }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 331,
									columnNumber: 19
								}, this) : filteredLedger.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
									className: "hover:bg-white/[0.02] transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 font-mono font-medium text-slate-200",
											children: item.orderNumber
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 339,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 font-mono text-slate-400",
											children: item.gatewayRef
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 342,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 font-semibold text-white",
											children: item.attendeeName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 343,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-slate-300",
											children: item.tierName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 344,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-right font-medium text-white",
											children: item.amountKes.toLocaleString()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 345,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-right text-slate-400",
											children: item.gatewayFeeKes.toLocaleString()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 348,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-right font-bold text-emerald-400",
											children: item.netRevenueKes.toLocaleString()
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 351,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-center",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: `inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.status === "Matched" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : item.status === "Refunded" ? "bg-rose-500/20 text-rose-300 border border-rose-500/30" : item.status === "Discrepancy" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-blue-500/20 text-blue-300 border border-blue-500/30"}`,
												children: item.status
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 355,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 354,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
											className: "py-3.5 px-4 text-right",
											children: item.status !== "Refunded" && /* @__PURE__ */ (void 0)("button", {
												onClick: () => {
													setRefundOrderId(item.orderNumber);
													setRefundAmount(item.amountKes);
													setIsRefundModalOpen(true);
												},
												className: "px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/20 transition",
												children: "Refund"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 371,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 369,
											columnNumber: 23
										}, this)
									]
								}, item.transactionId, true, {
									fileName: _jsxFileName,
									lineNumber: 338,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 329,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 315,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 314,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 299,
					columnNumber: 9
				}, this),
				isRefundModalOpen && /* @__PURE__ */ (void 0)("div", {
					className: "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "bg-slate-900 border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between border-b border-white/10 pb-4",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center gap-2.5 text-rose-400 font-bold font-serif text-lg",
									children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "w-5 h-5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 397,
										columnNumber: 19
									}, this), "Process Ticket Refund"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("button", {
									onClick: () => setIsRefundModalOpen(false),
									className: "text-slate-400 hover:text-white text-xs font-semibold px-2 py-1 rounded-lg",
									children: "✕ Close"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 400,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 395,
								columnNumber: 15
							}, this),
							refundFeedback && /* @__PURE__ */ (void 0)("div", {
								className: `p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${refundFeedback.success ? "bg-emerald-950/50 border border-emerald-500/40 text-emerald-300" : "bg-rose-950/50 border border-rose-500/40 text-rose-300"}`,
								children: [refundFeedback.success ? /* @__PURE__ */ (void 0)(CircleCheck, { className: "w-4 h-4 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 417,
									columnNumber: 21
								}, this) : /* @__PURE__ */ (void 0)(CircleAlert, { className: "w-4 h-4 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 419,
									columnNumber: 21
								}, this), refundFeedback.message]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 409,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (void 0)("form", {
								onSubmit: handleProcessRefund,
								className: "space-y-4 text-xs",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)("label", {
											className: "text-slate-300 font-semibold",
											children: "Order Number or Ticket Code"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 427,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("input", {
											type: "text",
											required: true,
											value: refundOrderId || refundTicketCode,
											onChange: (e) => {
												setRefundOrderId(e.target.value);
												setRefundTicketCode(e.target.value);
											},
											placeholder: "e.g. HR-2026-9042 or HR-7892-4910",
											className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono uppercase focus:outline-none focus:ring-1 focus:ring-rose-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 430,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 426,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)("label", {
												className: "text-slate-300 font-semibold",
												children: "Refund Type"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 445,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("select", {
												value: refundType,
												onChange: (e) => setRefundType(e.target.value),
												className: "w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-slate-200 focus:outline-none",
												children: [/* @__PURE__ */ (void 0)("option", {
													value: "full",
													children: "Full Reversal"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 451,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("option", {
													value: "partial",
													children: "Partial Refund"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 452,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 446,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 444,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "space-y-1.5",
											children: [/* @__PURE__ */ (void 0)("label", {
												className: "text-slate-300 font-semibold",
												children: "Amount (KES)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 457,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("input", {
												type: "number",
												required: true,
												min: 1,
												value: refundAmount,
												onChange: (e) => setRefundAmount(Number(e.target.value)),
												className: "w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono focus:outline-none focus:ring-1 focus:ring-rose-500"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 458,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 456,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 443,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (void 0)("label", {
											className: "text-slate-300 font-semibold",
											children: "Reason for Refund"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 470,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("textarea", {
											required: true,
											rows: 3,
											value: refundReason,
											onChange: (e) => setRefundReason(e.target.value),
											placeholder: "e.g. Customer travel cancellation request within valid policy window.",
											className: "w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 471,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 469,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "pt-2 flex items-center justify-end gap-3",
										children: [/* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setIsRefundModalOpen(false),
											className: "px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold",
											children: "Cancel"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 482,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("button", {
											type: "submit",
											disabled: isProcessingRefund,
											className: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50",
											children: [isProcessingRefund ? /* @__PURE__ */ (void 0)(RefreshCw, { className: "w-4 h-4 animate-spin" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 495,
												columnNumber: 23
											}, this) : /* @__PURE__ */ (void 0)(RotateCcw, { className: "w-4 h-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 497,
												columnNumber: 23
											}, this), "Execute Refund"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 489,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 481,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 425,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 394,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 393,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 148,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 144,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter = () => import("./ticket.demo-CxgBRxEn.mjs");
var Route = createFileRoute("/ticket/demo")({
	head: () => ({ meta: [
		{ title: "Digital Ticket Design — Verve & Co. | Hauntings of the Rift" },
		{
			name: "description",
			content: "Digital ticket interface preview for Hauntings of the Rift presented by Verve & Co."
		},
		{
			property: "og:title",
			content: "Hauntings of the Rift Digital Ticket — Verve & Co."
		},
		{
			property: "og:description",
			content: "Frontend preview of the event ticket experience."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$6
});
var AdminRoute = Route$4.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$6
});
var CheckoutRoute = Route$7.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$6
});
var PayRoute = Route$8.update({
	id: "/pay",
	path: "/pay",
	getParentRoute: () => Route$6
});
var RecoverRoute = Route$9.update({
	id: "/recover",
	path: "/recover",
	getParentRoute: () => Route$6
});
var ScannerRoute = Route$3.update({
	id: "/scanner",
	path: "/scanner",
	getParentRoute: () => Route$6
});
var AdminLoginRoute = Route$2.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var AdminReconciliationRoute = Route$1.update({
	id: "/reconciliation",
	path: "/reconciliation",
	getParentRoute: () => AdminRoute
});
var AdminScanRoute = Route$10.update({
	id: "/scan",
	path: "/scan",
	getParentRoute: () => AdminRoute
});
var TicketCodeRoute = Route$11.update({
	id: "/ticket/$code",
	path: "/ticket/$code",
	getParentRoute: () => Route$6
});
var TicketDemoRoute = Route.update({
	id: "/ticket/demo",
	path: "/ticket/demo",
	getParentRoute: () => Route$6
});
var AdminRouteChildren = {
	AdminLoginRoute,
	AdminReconciliationRoute,
	AdminScanRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	CheckoutRoute,
	PayRoute,
	RecoverRoute,
	ScannerRoute,
	TicketCodeRoute,
	TicketDemoRoute
};
var routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
