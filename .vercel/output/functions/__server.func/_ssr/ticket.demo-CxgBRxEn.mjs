import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { ct as Clock3, lt as CircleX, pt as CircleCheck, w as ScanLine } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as VervePresenterBadge, i as VerveLogo, t as VerveBackButton } from "./verve-logo-BPLLpwqY.mjs";
import { t as Button } from "./button-BQ_Bevjg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket.demo-CxgBRxEn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/event/qr-placeholder.tsx";
function QRPlaceholder() {
	const cells = Array.from({ length: 121 }, (_, i) => (i * 7 + Math.floor(i / 11) * 3) % 5 < 2);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative grid aspect-square w-full max-w-44 grid-cols-11 gap-px bg-bone p-3",
		role: "img",
		"aria-label": "QR code design placeholder, not valid for entry",
		children: [cells.map((on, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: on ? "bg-background" : "bg-bone" }, i, false, {
			fileName: _jsxFileName$1,
			lineNumber: 10,
			columnNumber: 9
		}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "absolute inset-x-2 bottom-1 bg-bone text-center text-[8px] font-bold uppercase text-background",
			children: "Design placeholder"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 12,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 4,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/ticket.demo.tsx?tsr-split=component";
function TicketDemo() {
	const [state, setState] = (0, import_react.useState)("valid");
	const [title, sub, Icon] = {
		valid: [
			"Valid ticket",
			"Ready for entry",
			CircleCheck
		],
		used: [
			"Used ticket",
			"Already checked in",
			ScanLine
		],
		cancelled: [
			"Cancelled ticket",
			"Not valid for entry",
			CircleX
		],
		invalid: [
			"Invalid ticket",
			"Unable to verify",
			CircleX
		]
	}[state];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen px-4 py-8 sm:py-14 bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-5xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveBackButton, {
					to: "/",
					label: "Back to Event"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 19,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 20,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 18,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
					className: "gothic-frame poster-grain relative overflow-hidden bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border-b border-dashed border-bone/25 bg-oxblood p-6 sm:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-3",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveLogo, {
										variant: "horizontal",
										size: "sm",
										showCo: true
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 26,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 25,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs font-bold uppercase tracking-[.3em] text-lavender",
									children: "Verve & Co. presents"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 28,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "mt-3 text-5xl leading-[.85] text-bone sm:text-7xl",
									children: [
										"Hauntings",
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 33,
											columnNumber: 17
										}, this),
										"of the Rift"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 31,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 24,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-8 p-6 sm:grid-cols-[1fr_auto] sm:p-10",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2 text-bone",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-5 text-lavender" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 40,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
										className: "uppercase tracking-widest",
										children: title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 41,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 39,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: sub
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 43,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dl", {
									className: "mt-10 grid grid-cols-2 gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Attendee"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 46,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
											className: "mt-1 text-xl text-bone",
											children: "Sample Guest"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 49,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 45,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Ticket"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 52,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
											className: "mt-1 text-xl text-bone",
											children: "Early Bird"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 55,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 51,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Date"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 58,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
											className: "mt-1 text-xl text-bone",
											children: "31 Oct 2026"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 61,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 57,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dt", {
											className: "text-xs uppercase tracking-widest text-muted-foreground",
											children: "Ticket ID"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 64,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("dd", {
											className: "mt-1 text-xl text-bone",
											children: "HRT-DEMO-001"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 67,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 63,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 44,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-8 flex items-center gap-2 border-t border-border pt-5 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock3, { className: "size-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 71,
										columnNumber: 19
									}, this), "4 PM till late · Top Cliff Lounge, Nakuru"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 70,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QRPlaceholder, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border-t border-border bg-background/50 p-4 text-center text-xs uppercase tracking-widest text-muted-foreground",
							children: "Design preview · This QR is not valid for entry"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 23,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-bold uppercase tracking-widest text-lavender",
						children: "Ticket state preview"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 81,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-4 grid gap-2",
						children: [
							"valid",
							"used",
							"cancelled",
							"invalid"
						].map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: state === s ? "event" : "spectral",
							className: "justify-start",
							onClick: () => setState(s),
							children: s
						}, s, false, {
							fileName: _jsxFileName,
							lineNumber: 85,
							columnNumber: 80
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 84,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-6 text-sm text-muted-foreground",
						children: "The production ticket will receive attendee data, a backend-issued ID, entry instructions, and a signed QR payload."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 89,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 80,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 17,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 16,
		columnNumber: 10
	}, this);
}
//#endregion
export { TicketDemo as component };
