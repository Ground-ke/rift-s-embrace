import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as RefreshCw, Et as ArrowLeft, St as Calendar, a as Users, mt as CircleAlert, nt as ExternalLink, ot as Copy, pt as CircleCheck, rt as Download, st as Clock, ut as CircleQuestionMark, v as ShieldCheck, vt as Check, z as MapPin } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as VervePresenterBadge, i as VerveLogo, n as VerveErrorState, t as VerveBackButton } from "./verve-logo-BPLLpwqY.mjs";
import { t as Button } from "./button-BQ_Bevjg.mjs";
import { t as QRCodeSVG } from "../_libs/qrcode.react.mjs";
import { t as Route } from "./ticket._code-Cr_hSG0Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket._code-CypfvD65.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/event/digital-ticket.tsx";
var DigitalTicket = ({ ticket, showAdminActions = false, onStatusChange }) => {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [isDownloading, setIsDownloading] = (0, import_react.useState)(false);
	const [isScanning, setIsScanning] = (0, import_react.useState)(false);
	const ticketRef = (0, import_react.useRef)(null);
	const isValid = ticket.status === "valid";
	const isUsed = ticket.status === "used";
	const qrPayload = JSON.stringify({
		code: ticket.ticketNumber,
		hash: ticket.qrHash,
		tier: ticket.tierName,
		holder: ticket.attendeeName,
		admits: ticket.admitsCount,
		v: 1
	});
	const handleCopyCode = async () => {
		try {
			await navigator.clipboard.writeText(ticket.ticketNumber);
			setCopied(true);
			setTimeout(() => setCopied(false), 2e3);
		} catch {}
	};
	const handleDownloadQr = () => {
		setIsDownloading(true);
		try {
			const svg = document.getElementById(`ticket-qr-${ticket.ticketNumber}`);
			if (!svg) return;
			const svgData = new XMLSerializer().serializeToString(svg);
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			const img = new Image();
			img.onload = () => {
				canvas.width = img.width + 80;
				canvas.height = img.height + 140;
				if (!ctx) return;
				ctx.fillStyle = "#0A080F";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = "#F5F2EB";
				ctx.font = "bold 16px sans-serif";
				ctx.textAlign = "center";
				ctx.fillText("HAUNTINGS OF THE RIFT", canvas.width / 2, 35);
				ctx.fillStyle = "#C9A84C";
				ctx.font = "12px monospace";
				ctx.fillText(`${ticket.tierName} • Code: ${ticket.ticketNumber}`, canvas.width / 2, 55);
				ctx.drawImage(img, 40, 70);
				ctx.fillStyle = "#A09BA8";
				ctx.font = "11px sans-serif";
				ctx.fillText(`Guest: ${ticket.attendeeName} (${ticket.admitsCount} Admits)`, canvas.width / 2, canvas.height - 25);
				ctx.fillText("31 Oct 2026 • Top Cliff Lounge, Nakuru", canvas.width / 2, canvas.height - 10);
				const a = document.createElement("a");
				a.download = `hauntings-ticket-${ticket.ticketNumber}.png`;
				a.href = canvas.toDataURL("image/png");
				a.click();
				setIsDownloading(false);
			};
			img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
		} catch (e) {
			console.warn("Download fallback:", e);
			setIsDownloading(false);
		}
	};
	const handleAddToCalendar = () => {
		const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Hauntings of the Rift: Halloween Nightlife 2026")}&dates=20261031T130000Z/20261101T010000Z&details=${encodeURIComponent(`Verve & Co. Presents Hauntings of the Rift.\nTicket Code: ${ticket.ticketNumber}\nHolder: ${ticket.attendeeName}\nVenue: Top Cliff Lounge, Nakuru.`)}&location=${encodeURIComponent("Top Cliff Lounge, Nakuru-Nairobi Highway, Nakuru, Kenya")}`;
		window.open(url, "_blank", "noopener,noreferrer");
	};
	const handleSimulateCheckin = async () => {
		setIsScanning(true);
		try {
			if ((await (await fetch("/api/tickets/checkin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					code: ticket.ticketNumber,
					staff_name: "Gate Scanner"
				})
			})).json()).success && onStatusChange) onStatusChange("used");
		} catch {} finally {
			setIsScanning(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-lg",
		id: `digital-ticket-${ticket.ticketNumber}`,
		ref: ticketRef,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative overflow-hidden border border-bone/20 bg-card shadow-2xl backdrop-blur-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative border-b border-bone/20 bg-background/80 px-6 py-4 flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveLogo, { className: "size-6 text-oxblood-light" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 177,
								columnNumber: 13
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground block",
								children: "Official Event Admission"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 179,
								columnNumber: 15
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-display text-lg tracking-wide text-bone",
								children: "HAUNTINGS OF THE RIFT"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 182,
								columnNumber: 15
							}, void 0)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 178,
								columnNumber: 13
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 176,
							columnNumber: 11
						}, void 0),
						isValid && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5 border border-emerald-500/50 bg-emerald-950/40 px-2.5 py-1 text-xs font-bold text-emerald-300 uppercase tracking-widest",
							children: [/* @__PURE__ */ (void 0)("span", { className: "size-2 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 191,
								columnNumber: 15
							}, void 0), "VALID PASS"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 190,
							columnNumber: 13
						}, void 0),
						isUsed && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5 border border-amber-500/50 bg-amber-950/40 px-2.5 py-1 text-xs font-bold text-amber-300 uppercase tracking-widest",
							children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "size-3 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 197,
								columnNumber: 15
							}, void 0), "USED / CHECKED IN"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 196,
							columnNumber: 13
						}, void 0),
						!isValid && !isUsed && /* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-1.5 border border-destructive/50 bg-destructive/20 px-2.5 py-1 text-xs font-bold text-destructive-foreground uppercase tracking-widest",
							children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "size-3" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 203,
								columnNumber: 15
							}, void 0), ticket.status.toUpperCase()]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 202,
							columnNumber: 13
						}, void 0)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 175,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mx-auto my-2 inline-block rounded-lg border-2 border-bone/30 bg-white p-4 shadow-inner",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QRCodeSVG, {
								id: `ticket-qr-${ticket.ticketNumber}`,
								value: qrPayload,
								size: 200,
								level: "H",
								marginSize: 0,
								className: "mx-auto"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 212,
								columnNumber: 13
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 211,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-3 flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs uppercase tracking-widest text-muted-foreground",
									children: "Pass Code:"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 224,
									columnNumber: 13
								}, void 0),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-mono text-xl font-bold tracking-wider text-bone",
									children: ticket.ticketNumber
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 227,
									columnNumber: 13
								}, void 0),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "ghost",
									size: "icon",
									className: "size-8 text-muted-foreground hover:text-bone",
									onClick: handleCopyCode,
									title: "Copy Ticket Code",
									children: copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "size-4 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 237,
										columnNumber: 25
									}, void 0) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 237,
										columnNumber: 73
									}, void 0)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 230,
									columnNumber: 13
								}, void 0)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 223,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-[11px] text-bone/60",
							children: "Present this QR code on your mobile device at the main entry gate."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 241,
							columnNumber: 11
						}, void 0)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 210,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative flex items-center justify-between px-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-6 -translate-x-3 rounded-full bg-background border border-bone/20" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 248,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex-1 border-t-2 border-dashed border-bone/20" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 249,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "size-6 translate-x-3 rounded-full bg-background border border-bone/20" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 250,
							columnNumber: 11
						}, void 0)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 247,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6 space-y-4 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-4 border-b border-bone/10 pb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] uppercase tracking-widest text-muted-foreground block",
									children: "Attendee Name"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 257,
									columnNumber: 15
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-bone text-base",
									children: ticket.attendeeName
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 260,
									columnNumber: 15
								}, void 0)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 256,
									columnNumber: 13
								}, void 0),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] uppercase tracking-widest text-muted-foreground block",
									children: "Pass Tier"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 263,
									columnNumber: 15
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-oxblood-light text-base",
									children: ticket.tierName
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 266,
									columnNumber: 15
								}, void 0)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 262,
									columnNumber: 13
								}, void 0),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] uppercase tracking-widest text-muted-foreground block",
									children: "Admissions"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 269,
									columnNumber: 15
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "flex items-center gap-1.5 font-semibold text-bone",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "size-4 text-muted-foreground" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 273,
											columnNumber: 17
										}, void 0),
										ticket.admitsCount,
										" ",
										ticket.admitsCount === 1 ? "Guest" : "Guests"
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 272,
									columnNumber: 15
								}, void 0)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 268,
									columnNumber: 13
								}, void 0),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] uppercase tracking-widest text-muted-foreground block",
									children: "Age Requirement"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 278,
									columnNumber: 15
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-bone",
									children: ticket.venue.ageRequirement
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 281,
									columnNumber: 15
								}, void 0)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 277,
									columnNumber: 13
								}, void 0)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 255,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2 pt-1 text-xs text-bone-muted",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "size-4 text-oxblood-light shrink-0 mt-0.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 288,
									columnNumber: 15
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-bone block",
									children: ticket.venue.date
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 290,
									columnNumber: 17
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ticket.venue.time }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 291,
									columnNumber: 17
								}, void 0)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 289,
									columnNumber: 15
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 287,
								columnNumber: 13
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-4 text-oxblood-light shrink-0 mt-0.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 295,
									columnNumber: 15
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
									className: "text-bone block",
									children: ticket.venue.name
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 297,
									columnNumber: 17
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
									ticket.venue.address,
									", ",
									ticket.venue.city
								] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 298,
									columnNumber: 17
								}, void 0)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 296,
									columnNumber: 15
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 294,
								columnNumber: 13
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 286,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "rounded border border-bone/10 bg-background/50 p-3 text-[10px] font-mono text-muted-foreground flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "size-3.5 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 308,
									columnNumber: 15
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Cryptographic HMAC SHA-256 Verified" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 309,
									columnNumber: 15
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 307,
								columnNumber: 13
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "opacity-70 truncate max-w-[120px]",
								children: ticket.qrHash ? ticket.qrHash.substring(0, 12) + "..." : "SECURE"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 311,
								columnNumber: 13
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 306,
							columnNumber: 11
						}, void 0)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 254,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border-t border-bone/20 bg-background/70 p-4 flex flex-wrap gap-2 justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							className: "border-bone/20 text-xs text-bone hover:bg-bone/10",
							onClick: handleDownloadQr,
							disabled: isDownloading,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "mr-1.5 size-3.5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 326,
								columnNumber: 13
							}, void 0), isDownloading ? "Saving..." : "Save Ticket Image"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 319,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							className: "border-bone/20 text-xs text-bone hover:bg-bone/10",
							onClick: handleAddToCalendar,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "mr-1.5 size-3.5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 336,
								columnNumber: 13
							}, void 0), " Add to Calendar"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 330,
							columnNumber: 11
						}, void 0),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							className: "border-bone/20 text-xs text-bone hover:bg-bone/10",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								href: "https://maps.google.com/?q=Top+Cliff+Lounge+Nakuru",
								target: "_blank",
								rel: "noopener noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "mr-1.5 size-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 350,
									columnNumber: 15
								}, void 0), " Directions"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 345,
								columnNumber: 13
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 339,
							columnNumber: 11
						}, void 0)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 318,
					columnNumber: 9
				}, void 0),
				showAdminActions && /* @__PURE__ */ (void 0)("div", {
					className: "border-t border-dashed border-bone/20 bg-oxblood/10 p-3 text-center",
					children: isValid ? /* @__PURE__ */ (void 0)(Button, {
						variant: "destructive",
						size: "sm",
						className: "text-xs",
						onClick: handleSimulateCheckin,
						disabled: isScanning,
						children: isScanning ? "Validating..." : "Simulate Gate Check-in (Mark Used)"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 359,
						columnNumber: 15
					}, void 0) : /* @__PURE__ */ (void 0)("span", {
						className: "text-xs text-amber-300 font-mono",
						children: ["Ticket already redeemed at ", ticket.usedAt || "Gate Scan"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 369,
						columnNumber: 15
					}, void 0)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 357,
					columnNumber: 11
				}, void 0)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 173,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 171,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName = "/app/applet/src/routes/ticket.$code.tsx?tsr-split=component";
function TicketCodeRouteComponent() {
	const { code } = Route.useParams();
	const [ticket, setTicket] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function loadTicket() {
			if (!code) {
				setErrorMessage("No ticket code was specified.");
				setLoading(false);
				return;
			}
			try {
				setLoading(true);
				const res = await fetch(`/api/tickets/${code}`);
				const data = await res.json();
				if (!res.ok || !data.success || !data.ticket) {
					setErrorMessage(data.message || `No valid ticket pass found for code "${code}".`);
					setLoading(false);
					return;
				}
				setTicket(data.ticket);
			} catch {
				setErrorMessage("Network error verifying ticket pass. Please check your connection.");
			} finally {
				setLoading(false);
			}
		}
		loadTicket();
	}, [code]);
	const handleStatusChange = (newStatus) => {
		if (ticket) setTicket({
			...ticket,
			status: newStatus,
			usedAt: newStatus === "used" ? (/* @__PURE__ */ new Date()).toISOString() : ticket.usedAt
		});
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background px-4 py-20 flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "text-center space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "size-8 animate-spin text-oxblood-light mx-auto" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 52,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "font-display text-lg text-bone",
				children: "Authenticating cryptographic pass..."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 51,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 12
	}, this);
	if (errorMessage || !ticket) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-6 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveBackButton, {
						to: "/",
						label: "Back to Event"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 62,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveErrorState, {
					code: "404",
					title: "Ticket Not Found",
					description: errorMessage || `No ticket record exists for code ${code}.`,
					actionLabel: "Recover Your Tickets",
					actionTo: "/recover"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "text-xs text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/recover",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleQuestionMark, { className: "mr-1.5 size-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 68,
								columnNumber: 17
							}, this), " Lost your ticket? Use Ticket Recovery"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 59,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 58,
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
							to: "/",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "mr-2 size-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 81,
								columnNumber: 15
							}, this), " Return to Event"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 80,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-center mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-bold uppercase tracking-[0.25em] text-oxblood-light",
							children: "Verified Digital Admission"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 89,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-3xl font-display text-bone sm:text-4xl mt-1",
							children: "YOUR EVENT PASS"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-bone-muted mt-1",
							children: "Save or screenshot this pass. You will need to present this QR code at the entrance."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DigitalTicket, {
					ticket,
					showAdminActions: true,
					onStatusChange: handleStatusChange
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 99,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 text-center border-t border-bone/10 pt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"Need to look up other tickets or change your email?",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/recover",
								className: "text-bone underline hover:text-oxblood-light ml-1",
								children: "Access Ticket Recovery"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 105,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 102,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 76,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 75,
		columnNumber: 10
	}, this);
}
//#endregion
export { TicketCodeRouteComponent as component };
