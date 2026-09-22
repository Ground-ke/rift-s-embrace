import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as FileCode, A as Plus, B as Mail, C as Scan, Ct as Ban, D as Receipt, E as RefreshCw, Et as ArrowLeft, G as LayoutDashboard, H as LogIn, I as MessageSquare, O as Radio, P as Monitor, R as Menu, S as Search, V as LogOut, Z as FileText, _ as Shield, _t as ChevronDown, a as Users, bt as Camera, c as TriangleAlert, d as Ticket, dt as CirclePlus, f as Tag, ft as CircleDollarSign, gt as ChevronRight, h as Smartphone, ht as ChevronUp, j as Percent, k as QrCode, kt as Activity, l as TrendingUp, lt as CircleX, m as Sparkles, mt as CircleAlert, n as X, nt as ExternalLink, o as User, ot as Copy, p as Tablet, pt as CircleCheck, s as UserCheck, st as Clock, t as Zap, tt as Eye, u as Trash2, v as ShieldCheck, vt as Check, x as Send, y as ShieldAlert, yt as ChartColumn } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as VerveIcon } from "./verve-logo-BPLLpwqY.mjs";
import { r as useAdminAuth } from "./admin-auth-context-Bh46mYen.mjs";
import { n as logFirebaseAnalyticsEvent, r as subscribeToAdminAnalytics, t as calculateAnalyticsSummary } from "./analytics-service-CTRnOzOD.mjs";
import { n as cn, t as Button } from "./button-BQ_Bevjg.mjs";
import { t as Input } from "./input-DkOfYy7N.mjs";
import { t as Label } from "./label-CxwSblzR.mjs";
import { c as subscribeToPendingOrders, i as rejectOrderInFirestore, n as Textarea, r as approveOrderInFirestore, t as Badge } from "./firestore-service-B6QrkZJs.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { t as QRCodeSVG } from "../_libs/qrcode.react.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BmnQymob.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$13 = "/app/applet/src/components/admin/protected-admin-route.tsx";
function ProtectedAdminRoute({ children }) {
	const { user, role, isLoading, isAuthenticated, isAdmin, switchTestRole } = useAdminAuth();
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-oxblood-darker flex flex-col items-center justify-center p-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-16 h-16 rounded-full border border-amber-500/30 animate-ping absolute inset-0" }, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 20,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-16 h-16 rounded-full border-2 border-amber-500/80 border-t-transparent animate-spin flex items-center justify-center bg-card/60",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveIcon, { className: "w-7 h-7 text-amber-400" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 22,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 21,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$13,
				lineNumber: 19,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "font-display text-xl text-bone uppercase tracking-wider",
				children: "Verifying Rift Security Credentials"
			}, void 0, false, {
				fileName: _jsxFileName$13,
				lineNumber: 25,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs text-muted-foreground mt-2 font-mono",
				children: "Authorizing administrative roles and cryptographic tokens..."
			}, void 0, false, {
				fileName: _jsxFileName$13,
				lineNumber: 28,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$13,
		lineNumber: 18,
		columnNumber: 7
	}, this);
	if (!isAuthenticated || !user) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-oxblood-darker flex flex-col items-center justify-center p-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md w-full border border-lavender/20 bg-card/90 p-8 shadow-2xl backdrop-blur-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "w-6 h-6" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 41,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 40,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-2xl text-bone tracking-wide",
					children: "Organizer Authentication Required"
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 44,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground mt-2 font-sans",
					children: "You must be authenticated as an authorized event administrator to access the Hauntings of the Rift operations portal."
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 47,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/admin/login",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							className: "w-full bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 font-sans tracking-wide",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogIn, { className: "w-4 h-4 mr-2" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 55,
								columnNumber: 17
							}, this), "Go to Admin Sign In"]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 54,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 53,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							className: "w-full text-muted-foreground hover:text-bone text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "w-3.5 h-3.5 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 65,
								columnNumber: 17
							}, this), "Return to Public Event"]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 61,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 60,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 52,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$13,
			lineNumber: 39,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$13,
		lineNumber: 38,
		columnNumber: 7
	}, this);
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-oxblood-darker flex flex-col items-center justify-center p-6 text-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-lg w-full border border-red-500/40 bg-card/95 p-8 shadow-2xl backdrop-blur-md relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" }, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 80,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-950/60 border border-red-500/50 text-red-400",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "w-7 h-7 animate-pulse" }, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 83,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 82,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "inline-flex items-center gap-2 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "border-red-500/60 bg-red-950/50 text-red-300 font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5",
						children: "HTTP 403 Forbidden"
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 87,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "border-border bg-background/80 text-muted-foreground font-mono text-[10px] uppercase tracking-widest px-2.5 py-0.5",
						children: ["Role: ", role?.toUpperCase() || "CUSTOMER"]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 93,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 86,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-3xl text-bone tracking-wide",
					children: "Access Denied"
				}, void 0, false, {
					fileName: _jsxFileName$13,
					lineNumber: 101,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-lavender/80 mt-3 font-sans leading-relaxed",
					children: [
						"Your account (",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-bone font-mono",
							children: user.email
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 104,
							columnNumber: 27
						}, this),
						") holds the",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-amber-400 font-bold uppercase font-mono",
							children: role
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 105,
							columnNumber: 13
						}, this),
						" role, but this area strictly requires elevated",
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-red-400 font-bold font-mono",
							children: "ADMIN"
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 107,
							columnNumber: 13
						}, this),
						" permissions."
					]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 103,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "my-6 border-t border-b border-border/60 py-4 bg-background/40 px-4 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground uppercase font-mono tracking-wider mb-2",
						children: "Instant Sandbox Role Switcher (Evaluation Only):"
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 111,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							className: "bg-amber-950/30 border-amber-500/40 text-amber-300 hover:bg-amber-900/50 text-xs font-mono",
							onClick: () => switchTestRole("admin"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, { className: "w-3.5 h-3.5 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 121,
								columnNumber: 17
							}, this), "Switch to Admin Role"]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 115,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							size: "sm",
							variant: "outline",
							className: "bg-card border-border text-muted-foreground hover:text-bone text-xs font-mono",
							onClick: () => switchTestRole("scanner"),
							children: "Switch to Scanner"
						}, void 0, false, {
							fileName: _jsxFileName$13,
							lineNumber: 124,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$13,
						lineNumber: 114,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 110,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row gap-3 justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/admin/login",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							className: "w-full sm:w-auto bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs font-sans",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 138,
								columnNumber: 17
							}, this), "Sign In With Another Account"]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 137,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 136,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							className: "w-full sm:w-auto text-muted-foreground hover:text-bone text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "w-3.5 h-3.5 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName$13,
								lineNumber: 147,
								columnNumber: 17
							}, this), "Return to Public Site"]
						}, void 0, true, {
							fileName: _jsxFileName$13,
							lineNumber: 143,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$13,
						lineNumber: 142,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$13,
					lineNumber: 135,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$13,
			lineNumber: 79,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$13,
		lineNumber: 78,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children }, void 0, false, {
		fileName: _jsxFileName$13,
		lineNumber: 158,
		columnNumber: 10
	}, this);
}
var _jsxFileName$12 = "/app/applet/src/components/ui/table.tsx";
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$12,
		lineNumber: 8,
		columnNumber: 7
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$12,
	lineNumber: 7,
	columnNumber: 5
}, void 0));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$12,
	lineNumber: 18,
	columnNumber: 3
}, void 0));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$12,
	lineNumber: 26,
	columnNumber: 3
}, void 0));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$12,
	lineNumber: 34,
	columnNumber: 3
}, void 0));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$12,
	lineNumber: 44,
	columnNumber: 5
}, void 0));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$12,
	lineNumber: 60,
	columnNumber: 3
}, void 0));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$12,
	lineNumber: 75,
	columnNumber: 3
}, void 0));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$12,
	lineNumber: 90,
	columnNumber: 3
}, void 0));
TableCaption.displayName = "TableCaption";
var _jsxFileName$11 = "/app/applet/src/components/ui/dialog.tsx";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 37,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 48,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName$11,
			lineNumber: 49,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$11,
		lineNumber: 47,
		columnNumber: 7
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$11,
	lineNumber: 38,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$11,
	lineNumber: 36,
	columnNumber: 3
}, void 0));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 57,
	columnNumber: 3
}, void 0);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 62,
	columnNumber: 3
}, void 0);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 73,
	columnNumber: 3
}, void 0));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 85,
	columnNumber: 3
}, void 0));
DialogDescription.displayName = DialogDescription$1.displayName;
var _jsxFileName$10 = "/app/applet/src/components/ui/select.tsx";
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 opacity-50" }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 29,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 28,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$10,
	lineNumber: 19,
	columnNumber: 3
}, void 0));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronUp, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 44,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 39,
	columnNumber: 3
}, void 0));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4" }, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 58,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 53,
	columnNumber: 3
}, void 0));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollUpButton, {}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 79,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 80,
			columnNumber: 7
		}, void 0),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectScrollDownButton, {}, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 89,
			columnNumber: 7
		}, void 0)
	]
}, void 0, true, {
	fileName: _jsxFileName$10,
	lineNumber: 68,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 67,
	columnNumber: 3
}, void 0));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 99,
	columnNumber: 3
}, void 0));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 121,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$10,
			lineNumber: 120,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 119,
		columnNumber: 5
	}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItemText, { children }, void 0, false, {
		fileName: _jsxFileName$10,
		lineNumber: 124,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$10,
	lineNumber: 111,
	columnNumber: 3
}, void 0));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 133,
	columnNumber: 3
}, void 0));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var _jsxFileName$9 = "/app/applet/src/components/admin/ticket-management-tab.tsx";
function TicketManagementTab() {
	const { user } = useAdminAuth();
	const [tickets, setTickets] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const [tierFilter, setTierFilter] = (0, import_react.useState)("all");
	const [eventFilter, setEventFilter] = (0, import_react.useState)("hauntings-2026");
	const [selectedTicket, setSelectedTicket] = (0, import_react.useState)(null);
	const [isRevokeModalOpen, setIsRevokeModalOpen] = (0, import_react.useState)(false);
	const [revokeReason, setRevokeReason] = (0, import_react.useState)("");
	const [isRevoking, setIsRevoking] = (0, import_react.useState)(false);
	const [isQrModalOpen, setIsQrModalOpen] = (0, import_react.useState)(false);
	const [isAuditModalOpen, setIsAuditModalOpen] = (0, import_react.useState)(false);
	const [ticketAuditLogs, setTicketAuditLogs] = (0, import_react.useState)([]);
	const [isLoadingAudit, setIsLoadingAudit] = (0, import_react.useState)(false);
	const [isResending, setIsResending] = (0, import_react.useState)(null);
	const fetchTickets = async () => {
		setIsLoading(true);
		try {
			const data = await (await fetch("/api/admin/tickets")).json();
			if (data.success && Array.isArray(data.tickets)) setTickets(data.tickets);
		} catch (err) {
			console.error("Failed to load tickets:", err);
			toast.error("Could not fetch tickets from server.");
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchTickets();
	}, []);
	const filteredTickets = (0, import_react.useMemo)(() => {
		return tickets.filter((t) => {
			if (statusFilter !== "all" && t.status !== statusFilter) return false;
			if (tierFilter !== "all" && t.tierSlug !== tierFilter) return false;
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase().trim();
				const matchesCode = t.ticketNumber.toLowerCase().includes(q);
				const matchesName = t.attendeeName.toLowerCase().includes(q);
				const matchesEmail = t.buyerEmail?.toLowerCase().includes(q) || false;
				const matchesPhone = t.buyerPhone.toLowerCase().includes(q);
				const matchesOrder = t.orderNumber.toLowerCase().includes(q);
				if (!matchesCode && !matchesName && !matchesEmail && !matchesPhone && !matchesOrder) return false;
			}
			return true;
		});
	}, [
		tickets,
		statusFilter,
		tierFilter,
		searchQuery
	]);
	const handleCopy = (text, label) => {
		navigator.clipboard.writeText(text);
		toast.success(`${label} copied to clipboard`, { description: text });
	};
	const handleResendEmail = async (ticket) => {
		if (!ticket.buyerEmail) {
			toast.error("Ticket does not have an associated email address.");
			return;
		}
		setIsResending(ticket.ticketNumber);
		try {
			const data = await (await fetch("/api/admin/tickets/resend", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					code: ticket.ticketNumber,
					actor_email: user?.email || "admin@verve.co.ke",
					actor_id: user?.id
				})
			})).json();
			if (data.success) toast.success("Admission Ticket Email Dispatched", { description: `Re-sent pass ${ticket.ticketNumber} to ${ticket.buyerEmail}` });
			else toast.error(data.message || "Failed to resend ticket email.");
		} catch {
			toast.error("Network error while resending email.");
		} finally {
			setIsResending(null);
		}
	};
	const handleConfirmRevoke = async () => {
		if (!selectedTicket) return;
		setIsRevoking(true);
		try {
			const data = await (await fetch("/api/admin/tickets/revoke", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					code: selectedTicket.ticketNumber,
					reason: revokeReason || "Manual organizer revocation",
					actor_email: user?.email || "admin@verve.co.ke",
					actor_id: user?.id
				})
			})).json();
			if (data.success) {
				toast.error("Ticket Pass Invalidated", { description: `Pass ${selectedTicket.ticketNumber} has been permanently cancelled.` });
				setIsRevokeModalOpen(false);
				setRevokeReason("");
				fetchTickets();
			} else toast.error(data.message || "Failed to revoke ticket.");
		} catch {
			toast.error("Network error while revoking ticket.");
		} finally {
			setIsRevoking(false);
		}
	};
	const handleOpenAuditLog = async (ticket) => {
		setSelectedTicket(ticket);
		setIsAuditModalOpen(true);
		setIsLoadingAudit(true);
		try {
			const data = await (await fetch("/api/admin/audit-logs")).json();
			if (data.success && Array.isArray(data.logs)) {
				const related = data.logs.filter((l) => l.targetId === ticket.ticketNumber || l.targetId === ticket.id || l.targetId === ticket.orderNumber);
				setTicketAuditLogs(related);
			}
		} catch (err) {
			console.warn("Audit logs error:", err);
		} finally {
			setIsLoadingAudit(false);
		}
	};
	const stats = (0, import_react.useMemo)(() => {
		return {
			total: tickets.length,
			valid: tickets.filter((t) => t.status === "valid").length,
			used: tickets.filter((t) => t.status === "used").length,
			cancelled: tickets.filter((t) => t.status === "cancelled").length
		};
	}, [tickets]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-card/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-muted-foreground uppercase font-mono tracking-wider",
							children: "Total Passes"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 246,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-display text-bone mt-1",
							children: stats.total
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 249,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 245,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-green-500/30 bg-green-950/20 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-green-400 uppercase font-mono tracking-wider flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 253,
								columnNumber: 13
							}, this), "Valid Active"]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 252,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-display text-green-300 mt-1",
							children: stats.valid
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 256,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 251,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-amber-500/30 bg-amber-950/20 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-amber-400 uppercase font-mono tracking-wider flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 260,
								columnNumber: 13
							}, this), "Checked In (Used)"]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 259,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-display text-amber-300 mt-1",
							children: stats.used
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 263,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 258,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-red-500/30 bg-red-950/20 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-red-400 uppercase font-mono tracking-wider flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ban, { className: "w-3 h-3 text-red-400" }, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 267,
								columnNumber: 13
							}, this), "Revoked / Cancelled"]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 266,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-display text-red-300 mt-1",
							children: stats.cancelled
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 270,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 265,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 244,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border bg-card/80 p-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 279,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							placeholder: "Search by Ticket Code (HR-...), Attendee Name, Email, Phone, Order #...",
							className: "pl-9 bg-background border-border text-xs font-mono h-10"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 280,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 278,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: fetchTickets,
						disabled: isLoading,
						className: "border-border text-lavender hover:text-bone text-xs h-10 px-3 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}` }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 295,
							columnNumber: 13
						}, this), "Refresh Data"]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 288,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 276,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/60",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] text-muted-foreground uppercase font-mono tracking-wider block mb-1",
							children: "Event Selection"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 303,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: eventFilter,
							onValueChange: setEventFilter,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "h-9 bg-background border-border text-xs text-bone",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "Event" }, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 308,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 307,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, {
								className: "bg-card border-border text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "hauntings-2026",
									children: "Hauntings of the Rift (31 Oct 2026)"
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 311,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
									value: "all-events",
									children: "All Historical Events"
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 312,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 310,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 306,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 302,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] text-muted-foreground uppercase font-mono tracking-wider block mb-1",
							children: "Admission Status"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 318,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: statusFilter,
							onValueChange: setStatusFilter,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "h-9 bg-background border-border text-xs text-bone",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "All Statuses" }, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 323,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 322,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, {
								className: "bg-card border-border text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "all",
										children: [
											"All Statuses (",
											tickets.length,
											")"
										]
									}, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 326,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "valid",
										children: "Valid Passes Only"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 327,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "used",
										children: "Used / Checked In"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 328,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "cancelled",
										children: "Revoked / Cancelled"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 329,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 325,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 321,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 317,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] text-muted-foreground uppercase font-mono tracking-wider block mb-1",
							children: "Ticket Tier Category"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 335,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
							value: tierFilter,
							onValueChange: setTierFilter,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
								className: "h-9 bg-background border-border text-xs text-bone",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, { placeholder: "All Pass Tiers" }, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 340,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 339,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, {
								className: "bg-card border-border text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "all",
										children: "All Pass Tiers"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 343,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "hellfire-vip",
										children: "Hellfire VIP"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 344,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "couple-pass",
										children: "Couple Pass (2 Guests)"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 345,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "general-admission",
										children: "General Admission"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 346,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "rift-coven",
										children: "Rift Coven Group (5 Guests)"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 347,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
										value: "early-bird",
										children: "Early Bat"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 348,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 342,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 338,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 334,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 301,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$9,
				lineNumber: 275,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border bg-card overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, {
					className: "bg-background/80",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
						className: "border-b border-border hover:bg-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground py-3",
								children: "Ticket Code"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 360,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Attendee & Contact"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 363,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Pass Tier & Admits"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 366,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Price (KES)"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 369,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Admission Status"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 372,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Timestamp"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 375,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground text-right",
								children: "Actions"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 378,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$9,
						lineNumber: 359,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 358,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
					colSpan: 7,
					className: "h-32 text-center text-muted-foreground text-xs font-mono",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" }, void 0, false, {
						fileName: _jsxFileName$9,
						lineNumber: 390,
						columnNumber: 19
					}, this), "Loading authoritative ticket ledger..."]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 386,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 385,
					columnNumber: 15
				}, this) : filteredTickets.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
					colSpan: 7,
					className: "h-32 text-center text-muted-foreground text-xs font-mono",
					children: "No tickets found matching your filter criteria."
				}, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 396,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 395,
					columnNumber: 15
				}, this) : filteredTickets.map((ticket) => {
					const isValid = ticket.status === "valid";
					const isUsed = ticket.status === "used";
					const isCancelled = ticket.status === "cancelled";
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
						className: "border-b border-border/60 hover:bg-background/50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "font-mono text-xs text-bone font-medium py-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-amber-400 font-bold",
										children: ticket.ticketNumber
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 417,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => handleCopy(ticket.ticketNumber, "Ticket code"),
										className: "text-muted-foreground hover:text-bone p-1",
										title: "Copy ticket code",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "w-3 h-3" }, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 423,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 418,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 416,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-muted-foreground block font-mono",
									children: ["Ord: ", ticket.orderNumber]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 426,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 415,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "font-medium text-bone",
										children: ticket.attendeeName
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 433,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[11px] text-muted-foreground font-mono",
										children: ticket.buyerEmail || "—"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 434,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-[10px] text-muted-foreground/70 font-mono",
										children: ["+", ticket.buyerPhone]
									}, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 437,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 432,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-medium text-lavender",
									children: ticket.tierName
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 444,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-muted-foreground font-mono",
									children: [
										"Admits ",
										ticket.admitsCount,
										" ",
										ticket.admitsCount > 1 ? "Guests" : "Guest"
									]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 445,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 443,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "font-mono text-xs text-bone font-medium",
								children: ["KES ", ticket.priceKes.toLocaleString()]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 451,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: [
								isValid && /* @__PURE__ */ (void 0)(Badge, {
									variant: "outline",
									className: "border-green-500/50 bg-green-950/40 text-green-300 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5",
									children: [/* @__PURE__ */ (void 0)("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1.5" }, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 462,
										columnNumber: 27
									}, this), "Valid"]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 458,
									columnNumber: 25
								}, this),
								isUsed && /* @__PURE__ */ (void 0)(Badge, {
									variant: "outline",
									className: "border-amber-500/50 bg-amber-950/40 text-amber-300 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5",
									children: [
										"Used (",
										ticket.scannedBy || "Gate",
										")"
									]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 467,
									columnNumber: 25
								}, this),
								isCancelled && /* @__PURE__ */ (void 0)(Badge, {
									variant: "outline",
									className: "border-red-500/50 bg-red-950/40 text-red-300 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5",
									children: "Revoked"
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 475,
									columnNumber: 25
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 456,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "font-mono text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: new Date(ticket.issuedAt).toLocaleDateString() }, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 486,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[10px]",
									children: new Date(ticket.issuedAt).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									})
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 487,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 485,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-end gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "icon",
											variant: "ghost",
											onClick: () => {
												setSelectedTicket(ticket);
												setIsQrModalOpen(true);
											},
											className: "size-8 text-lavender hover:text-bone hover:bg-oxblood/30",
											title: "View Digital QR Pass",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "w-4 h-4" }, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 509,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 499,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "icon",
											variant: "ghost",
											disabled: isResending === ticket.ticketNumber || !ticket.buyerEmail,
											onClick: () => handleResendEmail(ticket),
											className: "size-8 text-lavender hover:text-bone hover:bg-oxblood/30",
											title: "Resend Ticket Email to Buyer",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: `w-4 h-4 ${isResending === ticket.ticketNumber ? "animate-spin" : ""}` }, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 521,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 513,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "icon",
											variant: "ghost",
											onClick: () => handleOpenAuditLog(ticket),
											className: "size-8 text-lavender hover:text-bone hover:bg-oxblood/30",
											title: "View Ticket Audit Log",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "w-4 h-4" }, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 534,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 527,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											size: "icon",
											variant: "ghost",
											disabled: ticket.status === "cancelled",
											onClick: () => {
												setSelectedTicket(ticket);
												setIsRevokeModalOpen(true);
											},
											className: "size-8 text-red-400/80 hover:text-red-300 hover:bg-red-950/40 disabled:opacity-30",
											title: "Manually Invalidate / Revoke Ticket",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ban, { className: "w-4 h-4" }, void 0, false, {
												fileName: _jsxFileName$9,
												lineNumber: 549,
												columnNumber: 27
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 538,
											columnNumber: 25
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 497,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 496,
								columnNumber: 21
							}, this)
						]
					}, ticket.ticketNumber, true, {
						fileName: _jsxFileName$9,
						lineNumber: 410,
						columnNumber: 19
					}, this);
				}) }, void 0, false, {
					fileName: _jsxFileName$9,
					lineNumber: 383,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 357,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 356,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: isRevokeModalOpen,
				onOpenChange: setIsRevokeModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "bg-card border-red-500/40 text-bone max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "font-display text-xl text-red-400 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ban, { className: "w-5 h-5" }, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 566,
								columnNumber: 15
							}, this), "Revoke Admission Pass"]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 565,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: "This action permanently invalidates the ticket at gate scanners and records a cryptographic audit log."
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 569,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 564,
							columnNumber: 11
						}, this),
						selectedTicket && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-3 my-2 text-xs",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "bg-background/80 p-3 border border-border space-y-1 font-mono",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: [
										"Ticket:",
										" ",
										/* @__PURE__ */ (void 0)("span", {
											className: "text-amber-400 font-bold",
											children: selectedTicket.ticketNumber
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 580,
											columnNumber: 19
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 578,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: ["Attendee: ", /* @__PURE__ */ (void 0)("span", {
										className: "text-bone",
										children: selectedTicket.attendeeName
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 583,
										columnNumber: 29
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 582,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: ["Tier: ", /* @__PURE__ */ (void 0)("span", {
										className: "text-lavender",
										children: selectedTicket.tierName
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 586,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 585,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 577,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
								className: "text-[10px] text-muted-foreground uppercase font-mono tracking-wider block mb-1",
								children: "Reason for Revocation (Required for Audit Trail)"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 591,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)(Input, {
								value: revokeReason,
								onChange: (e) => setRevokeReason(e.target.value),
								placeholder: "e.g. Fraudulent chargeback, Duplicate reissue, Customer requested cancellation",
								className: "bg-background border-border text-xs font-mono"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 594,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 590,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 576,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setIsRevokeModalOpen(false),
								className: "text-xs text-muted-foreground hover:text-bone",
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 605,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "destructive",
								size: "sm",
								disabled: isRevoking,
								onClick: handleConfirmRevoke,
								className: "bg-red-900 hover:bg-red-800 text-bone text-xs border border-red-500/50",
								children: isRevoking ? "Revoking Pass..." : "Confirm Revocation"
							}, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 613,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 604,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 563,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 562,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: isQrModalOpen,
				onOpenChange: setIsQrModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "bg-card border-lavender/30 text-bone max-w-sm text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "font-display text-xl text-bone",
							children: "Digital Admission Pass"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 630,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground font-mono",
							children: "Cryptographic HMAC SHA-256 Gate QR"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 633,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 629,
							columnNumber: 11
						}, this),
						selectedTicket && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4 my-2 flex flex-col items-center",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "p-4 bg-white rounded-lg shadow-inner",
									children: /* @__PURE__ */ (void 0)(QRCodeSVG, {
										value: selectedTicket.ticketNumber,
										size: 180,
										level: "H",
										includeMargin: true
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 641,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 640,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "text-center font-mono space-y-1",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "text-lg font-bold text-amber-400",
											children: selectedTicket.ticketNumber
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 650,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "text-xs text-bone font-medium",
											children: selectedTicket.attendeeName
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 653,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "text-[11px] text-lavender",
											children: selectedTicket.tierName
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 654,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "text-[10px] text-muted-foreground",
											children: [
												"Admits ",
												selectedTicket.admitsCount,
												" Guests"
											]
										}, void 0, true, {
											fileName: _jsxFileName$9,
											lineNumber: 655,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 649,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "w-full bg-background/80 p-2.5 border border-border text-[10px] text-left font-mono space-y-0.5",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "text-muted-foreground",
										children: "HMAC Integrity Digest:"
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 661,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "truncate text-amber-400/90",
										children: selectedTicket.qrHash
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 662,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 660,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 639,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setIsQrModalOpen(false),
							className: "w-full text-xs font-mono border-border",
							children: "Close Pass Preview"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 668,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 667,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 628,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 627,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: isAuditModalOpen,
				onOpenChange: setIsAuditModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "bg-card border-lavender/30 text-bone max-w-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "font-display text-xl text-bone flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName$9,
								lineNumber: 685,
								columnNumber: 15
							}, this), "Ticket Audit History"]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 684,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground font-mono",
							children: ["Immutable ledger trail for Pass ", selectedTicket?.ticketNumber]
						}, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 688,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$9,
							lineNumber: 683,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3 max-h-80 overflow-y-auto pr-1",
							children: isLoadingAudit ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "py-8 text-center text-xs font-mono text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-4 h-4 animate-spin mx-auto mb-2 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName$9,
									lineNumber: 696,
									columnNumber: 17
								}, this), "Loading audit trail entries..."]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 695,
								columnNumber: 15
							}, this) : ticketAuditLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "py-8 text-center text-xs font-mono text-muted-foreground bg-background/50 border border-border p-4",
								children: ["No recorded administrative interventions for this ticket yet.", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[10px] text-muted-foreground/70 mt-1",
									children: [
										"Issued automatically via checkout engine on",
										" ",
										selectedTicket?.issuedAt ? new Date(selectedTicket.issuedAt).toLocaleString() : "event launch",
										"."
									]
								}, void 0, true, {
									fileName: _jsxFileName$9,
									lineNumber: 702,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$9,
								lineNumber: 700,
								columnNumber: 15
							}, this) : ticketAuditLogs.map((log) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "border border-border/80 bg-background/60 p-3 space-y-1.5 font-mono text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between text-[11px]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-amber-400 font-bold uppercase",
											children: log.action
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 717,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground",
											children: new Date(log.createdAt).toLocaleString()
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 718,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 716,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-muted-foreground text-[10px]",
										children: ["Actor: ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-bone",
											children: log.actorEmail
										}, void 0, false, {
											fileName: _jsxFileName$9,
											lineNumber: 723,
											columnNumber: 28
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$9,
										lineNumber: 722,
										columnNumber: 19
									}, this),
									log.metadata && Object.keys(log.metadata).length > 0 && /* @__PURE__ */ (void 0)("pre", {
										className: "bg-card/80 p-2 text-[10px] text-lavender overflow-x-auto rounded border border-border/40",
										children: JSON.stringify(log.metadata, null, 2)
									}, void 0, false, {
										fileName: _jsxFileName$9,
										lineNumber: 726,
										columnNumber: 21
									}, this)
								]
							}, log.id, true, {
								fileName: _jsxFileName$9,
								lineNumber: 712,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 693,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => setIsAuditModalOpen(false),
							className: "text-xs font-mono border-border",
							children: "Close"
						}, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 736,
							columnNumber: 13
						}, this) }, void 0, false, {
							fileName: _jsxFileName$9,
							lineNumber: 735,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$9,
					lineNumber: 682,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$9,
				lineNumber: 681,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$9,
		lineNumber: 242,
		columnNumber: 5
	}, this);
}
var _jsxFileName$8 = "/app/applet/src/components/ui/switch.tsx";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") }, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 18,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$8,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Switch.displayName = Switch$1.displayName;
var _jsxFileName$7 = "/app/applet/src/components/ui/progress.tsx";
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	}, void 0, false, {
		fileName: _jsxFileName$7,
		lineNumber: 17,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 12,
	columnNumber: 3
}, void 0));
Progress.displayName = Root.displayName;
var _jsxFileName$6 = "/app/applet/src/components/admin/promotion-management-tab.tsx";
function PromotionManagementTab() {
	const { user } = useAdminAuth();
	const [promotions, setPromotions] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isCreateModalOpen, setIsCreateModalOpen] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [code, setCode] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [discountType, setDiscountType] = (0, import_react.useState)("percentage");
	const [discountValue, setDiscountValue] = (0, import_react.useState)("20");
	const [maxUses, setMaxUses] = (0, import_react.useState)("100");
	const [expiresAt, setExpiresAt] = (0, import_react.useState)("");
	const [isActive, setIsActive] = (0, import_react.useState)(true);
	const fetchPromotions = async () => {
		setIsLoading(true);
		try {
			const data = await (await fetch("/api/admin/promotions")).json();
			if (data.success && Array.isArray(data.promotions)) setPromotions(data.promotions);
		} catch (err) {
			console.error("Failed to load promotions:", err);
			toast.error("Could not fetch promotion codes.");
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchPromotions();
	}, []);
	const handleToggleActive = async (promo, nextChecked) => {
		setPromotions((prev) => prev.map((p) => p.id === promo.id ? {
			...p,
			isActive: nextChecked
		} : p));
		try {
			const data = await (await fetch("/api/admin/promotions/toggle", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					code: promo.code,
					is_active: nextChecked,
					actor_email: user?.email || "admin@verve.co.ke",
					actor_id: user?.id
				})
			})).json();
			if (data.success) toast.success(nextChecked ? `Promo code ${promo.code} activated` : `Promo code ${promo.code} deactivated`, { description: nextChecked ? "Customers can now apply this discount at checkout." : "Checkout will now reject this promotional discount." });
			else {
				fetchPromotions();
				toast.error(data.message || "Failed to update status.");
			}
		} catch {
			fetchPromotions();
			toast.error("Network error toggling promo code status.");
		}
	};
	const handleDelete = async (promo) => {
		if (!confirm(`Are you sure you want to delete promo code ${promo.code}?`)) return;
		try {
			const data = await (await fetch("/api/admin/promotions/delete", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ code: promo.code })
			})).json();
			if (data.success) {
				toast.success(`Promo code ${promo.code} deleted`);
				fetchPromotions();
			} else toast.error(data.message || "Could not delete promo code.");
		} catch {
			toast.error("Network error deleting promo code.");
		}
	};
	const handleCreatePromo = async (e) => {
		e.preventDefault();
		const cleanCode = code.trim().toUpperCase();
		if (!cleanCode) {
			toast.error("Promo code string is required.");
			return;
		}
		const numValue = parseFloat(discountValue);
		if (isNaN(numValue) || numValue <= 0) {
			toast.error("Discount value must be greater than zero.");
			return;
		}
		if (discountType === "percentage" && numValue > 100) {
			toast.error("Percentage discount cannot exceed 100%.");
			return;
		}
		const numMax = parseInt(maxUses, 10);
		if (isNaN(numMax) || numMax <= 0) {
			toast.error("Max usage cap must be a positive integer.");
			return;
		}
		setIsSubmitting(true);
		try {
			const data = await (await fetch("/api/admin/promotions", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					code: cleanCode,
					name: name.trim() || `${cleanCode} Special Campaign`,
					discount_type: discountType,
					discount_value: numValue,
					max_uses: numMax,
					expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
					is_active: isActive,
					actor_email: user?.email || "admin@verve.co.ke",
					actor_id: user?.id
				})
			})).json();
			if (data.success) {
				toast.success(`Promo code ${cleanCode} created successfully!`, { description: discountType === "percentage" ? `${numValue}% discount capped at ${numMax} redemptions.` : `KES ${numValue.toLocaleString()} fixed discount capped at ${numMax} redemptions.` });
				setIsCreateModalOpen(false);
				setCode("");
				setName("");
				setDiscountValue("20");
				setMaxUses("100");
				setExpiresAt("");
				setIsActive(true);
				fetchPromotions();
			} else toast.error(data.message || "Failed to create promo code.");
		} catch {
			toast.error("Network error creating promo code.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleCopy = (text) => {
		navigator.clipboard.writeText(text);
		toast.success("Promo code copied to clipboard", { description: text });
	};
	const stats = (0, import_react.useMemo)(() => {
		return {
			total: promotions.length,
			active: promotions.filter((p) => p.isActive).length,
			totalRedeemed: promotions.reduce((sum, p) => sum + p.currentUses, 0)
		};
	}, [promotions]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-card/70 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tag, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 241,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-xl text-bone tracking-wide",
						children: "Promotional Discount Codes"
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 242,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 240,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground font-mono mt-1",
					children: "Manage flash sales, affiliate discount tokens, and VIP passes for Hauntings of the Rift."
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 246,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 239,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: fetchPromotions,
						disabled: isLoading,
						className: "border-border text-lavender hover:text-bone text-xs h-9",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}` }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 259,
							columnNumber: 13
						}, this), "Refresh"]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 252,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => setIsCreateModalOpen(true),
						className: "bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs h-9 font-sans",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "w-4 h-4 mr-1.5" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 267,
							columnNumber: 13
						}, this), "Create New Promo Code"]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 263,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 251,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 238,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-card/60 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-muted-foreground uppercase font-mono tracking-wider",
							children: "Total Codes"
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 276,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-display text-bone mt-1",
							children: stats.total
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 279,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 275,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-green-500/30 bg-green-950/20 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-green-400 uppercase font-mono tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-2 h-2 rounded-full bg-green-400 animate-pulse" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 283,
								columnNumber: 13
							}, this), "Active Campaigns"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 282,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-display text-green-300 mt-1",
							children: stats.active
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 286,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 281,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-amber-500/30 bg-amber-950/20 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-amber-400 uppercase font-mono tracking-wider flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 290,
								columnNumber: 13
							}, this), "Total Redemptions"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 289,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-2xl font-display text-amber-300 mt-1",
							children: [stats.totalRedeemed, " Uses"]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 293,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 288,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 274,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border bg-card overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, {
					className: "bg-background/80",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
						className: "border-b border-border hover:bg-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground py-3",
								children: "Promo Code & Campaign"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 302,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Discount Benefit"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 305,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-60",
								children: "Usage Capacity"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 308,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Expiration"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 311,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Status Toggle"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 314,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground text-right",
								children: "Actions"
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 317,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 301,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 300,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
					colSpan: 6,
					className: "h-32 text-center text-muted-foreground text-xs font-mono",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 329,
						columnNumber: 19
					}, this), "Loading promotion ledger..."]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 325,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 324,
					columnNumber: 15
				}, this) : promotions.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
					colSpan: 6,
					className: "h-32 text-center text-muted-foreground text-xs font-mono",
					children: "No promotional codes configured. Click \"Create New Promo Code\" to launch a discount."
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 335,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 334,
					columnNumber: 15
				}, this) : promotions.map((promo) => {
					const percentUsed = Math.min(100, Math.round(promo.currentUses / Math.max(1, promo.maxUses) * 100));
					const isCapped = promo.currentUses >= promo.maxUses;
					const isExpired = promo.expiresAt && new Date(promo.expiresAt).getTime() < Date.now();
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
						className: "border-b border-border/60 hover:bg-background/50 transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "py-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono font-bold text-sm text-amber-400 bg-background/80 px-2 py-0.5 border border-amber-500/30",
										children: promo.code
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 361,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										onClick: () => handleCopy(promo.code),
										className: "text-muted-foreground hover:text-bone p-1",
										title: "Copy promo code",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 369,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 364,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 360,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-bone mt-1 font-medium",
									children: promo.name
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 372,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 359,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: promo.discountType === "percentage" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "border-amber-500/50 bg-amber-950/30 text-amber-300 font-mono text-xs font-bold px-2.5 py-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Percent, { className: "w-3 h-3 mr-1" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 382,
										columnNumber: 27
									}, this),
									promo.discountValue,
									"% OFF"
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 378,
								columnNumber: 25
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								variant: "outline",
								className: "border-green-500/50 bg-green-950/30 text-green-300 font-mono text-xs font-bold px-2.5 py-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleDollarSign, { className: "w-3 h-3 mr-1" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 390,
										columnNumber: 27
									}, this),
									"KES ",
									promo.discountValue.toLocaleString(),
									" OFF"
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 386,
								columnNumber: 25
							}, this) }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 376,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-between text-xs font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-bone font-medium",
											children: [
												promo.currentUses,
												" / ",
												promo.maxUses,
												" uses"
											]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 400,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `text-[11px] ${isCapped ? "text-red-400 font-bold" : percentUsed > 75 ? "text-amber-400 font-bold" : "text-muted-foreground"}`,
											children: [percentUsed, "%"]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 403,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 399,
										columnNumber: 25
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Progress, {
										value: percentUsed,
										className: `h-2 bg-background border border-border/80 ${isCapped ? "[&>div]:bg-red-500" : percentUsed > 75 ? "[&>div]:bg-amber-500" : "[&>div]:bg-green-500"}`
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 415,
										columnNumber: 25
									}, this),
									isCapped && /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] text-red-400 font-mono block",
										children: "Capacity Reached (Limit Capped)"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 426,
										columnNumber: 27
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 398,
								columnNumber: 23
							}, this) }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 397,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "text-xs font-mono",
								children: promo.expiresAt ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: isExpired ? "text-red-400 font-bold" : "text-bone",
									children: new Date(promo.expiresAt).toLocaleDateString()
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 437,
									columnNumber: 27
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-muted-foreground",
									children: isExpired ? "Expired" : `${Math.ceil((new Date(promo.expiresAt).getTime() - Date.now()) / 864e5)} days left`
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 440,
									columnNumber: 27
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 436,
									columnNumber: 25
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "No Expiry (Open)"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 447,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 434,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
									checked: promo.isActive,
									onCheckedChange: (checked) => handleToggleActive(promo, checked),
									"aria-label": `Toggle active state for ${promo.code}`
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 454,
									columnNumber: 25
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `text-xs font-mono font-medium ${promo.isActive ? "text-green-400" : "text-muted-foreground"}`,
									children: promo.isActive ? "ACTIVE" : "PAUSED"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 459,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 453,
								columnNumber: 23
							}, this) }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 452,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									size: "icon",
									variant: "ghost",
									onClick: () => handleDelete(promo),
									className: "size-8 text-muted-foreground hover:text-red-400 hover:bg-red-950/40",
									title: "Delete promo code",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 478,
										columnNumber: 25
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 471,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 470,
								columnNumber: 21
							}, this)
						]
					}, promo.id, true, {
						fileName: _jsxFileName$6,
						lineNumber: 354,
						columnNumber: 19
					}, this);
				}) }, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 322,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 299,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 298,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: isCreateModalOpen,
				onOpenChange: setIsCreateModalOpen,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "bg-card border-lavender/30 text-bone max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
						className: "font-display text-2xl text-bone flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 494,
							columnNumber: 15
						}, this), "Create New Promo Code"]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 493,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
						className: "text-xs text-muted-foreground",
						children: "Define a new promotional discount campaign for Hauntings of the Rift checkout."
					}, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 497,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 492,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleCreatePromo,
						className: "space-y-4 my-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "promo-code",
									className: "text-xs text-lavender font-mono uppercase tracking-wider",
									children: "Promo Code (Auto-Uppercase) *"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 505,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "promo-code",
									value: code,
									onChange: (e) => setCode(e.target.value.toUpperCase()),
									placeholder: "e.g. RIFT20, EARLYGHOST, COVEN50",
									required: true,
									className: "bg-background border-border font-mono text-sm uppercase tracking-wider text-amber-400 font-bold"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 511,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 504,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "promo-name",
									className: "text-xs text-lavender font-mono uppercase tracking-wider",
									children: "Campaign Name / Description"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 523,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "promo-name",
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "e.g. VIP Halloween Flash Sale",
									className: "bg-background border-border text-xs"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 529,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 522,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										className: "text-xs text-lavender font-mono uppercase tracking-wider",
										children: "Discount Type"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 541,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Select, {
										value: discountType,
										onValueChange: (val) => setDiscountType(val),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectTrigger, {
											className: "bg-background border-border text-xs text-bone",
											children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectValue, {}, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 549,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$6,
											lineNumber: 548,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectContent, {
											className: "bg-card border-border text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "percentage",
												children: "Percentage (% Off)"
											}, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 552,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SelectItem, {
												value: "fixed",
												children: "Fixed Amount (KES Off)"
											}, void 0, false, {
												fileName: _jsxFileName$6,
												lineNumber: 553,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$6,
											lineNumber: 551,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 544,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 540,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "promo-value",
										className: "text-xs text-lavender font-mono uppercase tracking-wider",
										children: [discountType === "percentage" ? "Percentage (% 1-100)" : "Amount (KES)", " *"]
									}, void 0, true, {
										fileName: _jsxFileName$6,
										lineNumber: 559,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "promo-value",
										type: "number",
										min: "1",
										max: discountType === "percentage" ? "100" : "100000",
										value: discountValue,
										onChange: (e) => setDiscountValue(e.target.value),
										required: true,
										className: "bg-background border-border font-mono text-xs text-bone"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 565,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 558,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 539,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "promo-cap",
										className: "text-xs text-lavender font-mono uppercase tracking-wider",
										children: "Max Usage Cap *"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 581,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "promo-cap",
										type: "number",
										min: "1",
										value: maxUses,
										onChange: (e) => setMaxUses(e.target.value),
										placeholder: "100",
										required: true,
										className: "bg-background border-border font-mono text-xs text-bone"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 587,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 580,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "promo-expiry",
										className: "text-xs text-lavender font-mono uppercase tracking-wider",
										children: "Expiration Date (Optional)"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 600,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "promo-expiry",
										type: "date",
										value: expiresAt,
										onChange: (e) => setExpiresAt(e.target.value),
										className: "bg-background border-border font-mono text-xs text-bone"
									}, void 0, false, {
										fileName: _jsxFileName$6,
										lineNumber: 606,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 599,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 579,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between p-3 border border-border bg-background/60",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-mono text-bone font-medium block",
									children: "Activate Immediately"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 619,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "Available for customers at checkout upon creation"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 622,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$6,
									lineNumber: 618,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
									checked: isActive,
									onCheckedChange: setIsActive
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 626,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 617,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
								className: "gap-2 sm:gap-0 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => setIsCreateModalOpen(false),
									className: "text-xs text-muted-foreground hover:text-bone",
									children: "Cancel"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 630,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									type: "submit",
									disabled: isSubmitting,
									className: "bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs",
									children: isSubmitting ? "Creating Campaign..." : "Publish Promo Code"
								}, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 639,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 629,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 502,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$6,
					lineNumber: 491,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 490,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$6,
		lineNumber: 236,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/admin/scanner-management-tab.tsx";
function ScannerManagementTab() {
	const { user } = useAdminAuth();
	const [scanners, setScanners] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [scanCode, setScanCode] = (0, import_react.useState)("");
	const [isScanning, setIsScanning] = (0, import_react.useState)(false);
	const [scanResult, setScanResult] = (0, import_react.useState)(null);
	const fetchScanners = async () => {
		setIsLoading(true);
		try {
			const data = await (await fetch("/api/admin/scanners")).json();
			if (data.success && Array.isArray(data.scanners)) setScanners(data.scanners);
		} catch (err) {
			console.warn("Failed to load scanner fleet:", err);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchScanners();
	}, []);
	const handleSimulateScan = async (e) => {
		e.preventDefault();
		if (!scanCode.trim()) return;
		setIsScanning(true);
		setScanResult(null);
		try {
			const data = await (await fetch("/api/tickets/checkin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					code: scanCode.trim().toUpperCase(),
					staff_name: user?.name || "Gate Security Staff"
				})
			})).json();
			setScanResult(data);
			if (data.success) {
				toast.success("Gate Check-in Approved", { description: `${data.ticket.attendeeName} (${data.ticket.tierName})` });
				fetchScanners();
			} else if (data.status === "already_used") toast.warning("Duplicate Entry Denied", { description: data.message });
			else toast.error("Invalid Admission Pass", { description: data.message });
		} catch {
			toast.error("Scanner communication timeout.");
		} finally {
			setIsScanning(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "border border-border bg-card/70 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 116,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl text-bone tracking-wide",
					children: "Gate Scanners & Admission Checkpoint Fleet"
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 117,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 115,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs text-muted-foreground font-mono mt-1",
				children: "Real-time optical scanners deployed across Top Cliff Lounge venue ingress perimeters."
			}, void 0, false, {
				fileName: _jsxFileName$5,
				lineNumber: 121,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 114,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "outline",
				size: "sm",
				onClick: fetchScanners,
				disabled: isLoading,
				className: "border-border text-lavender hover:text-bone text-xs h-9",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}` }, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 133,
					columnNumber: 11
				}, this), "Refresh Fleet"]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 126,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 113,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-1 border border-amber-500/40 bg-card/90 p-5 space-y-4 shadow-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 pb-3 border-b border-border",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scan, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 143,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display text-lg text-bone",
							children: "Live Gate Scanner Simulator"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 144,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 142,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs text-muted-foreground font-sans",
						children: "Test ticket validation, HMAC signature inspection, and duplicate check-in detection."
					}, void 0, false, {
						fileName: _jsxFileName$5,
						lineNumber: 146,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleSimulateScan,
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
							className: "text-[10px] text-lavender uppercase font-mono tracking-wider block mb-1",
							children: "Enter Ticket Code (or Paste QR String)"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 152,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
							value: scanCode,
							onChange: (e) => setScanCode(e.target.value.toUpperCase()),
							placeholder: "e.g. HR-7892-4910",
							className: "font-mono text-sm uppercase bg-background border-border text-amber-400 font-bold"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 155,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 151,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							disabled: isScanning || !scanCode.trim(),
							className: "w-full bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs font-sans",
							children: isScanning ? "Verifying Cryptographic HMAC..." : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "w-4 h-4 mr-2" }, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 172,
								columnNumber: 19
							}, this), "Simulate Gate Scan"] }, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 171,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 163,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 150,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "pt-3 border-t border-border/80 space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[10px] text-muted-foreground uppercase font-mono block",
							children: "Quick Test Pass Presets:"
						}, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 181,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-wrap gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-[11px] font-mono h-7 px-2 border-border bg-background hover:bg-card",
									onClick: () => setScanCode("HR-7892-4910"),
									children: "HR-7892-4910 (Valid)"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 185,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-[11px] font-mono h-7 px-2 border-border bg-background hover:bg-card",
									onClick: () => setScanCode("HR-3184-9022"),
									children: "HR-3184-9022 (Used)"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 193,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "outline",
									size: "sm",
									className: "text-[11px] font-mono h-7 px-2 border-border bg-background hover:bg-card",
									onClick: () => setScanCode("HR-9999-FAKE"),
									children: "HR-9999-FAKE (Invalid)"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 201,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$5,
							lineNumber: 184,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 180,
						columnNumber: 11
					}, this),
					scanResult && /* @__PURE__ */ (void 0)("div", {
						className: `p-4 border text-xs font-mono space-y-2 mt-4 ${scanResult.success ? "bg-green-950/40 border-green-500/50 text-green-200" : scanResult.status === "already_used" ? "bg-amber-950/40 border-amber-500/50 text-amber-200" : "bg-red-950/40 border-red-500/50 text-red-200"}`,
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 font-bold uppercase text-sm",
								children: scanResult.success ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "w-4 h-4 text-green-400" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 226,
									columnNumber: 21
								}, this), "ADMISSION GRANTED"] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 225,
									columnNumber: 19
								}, this) : scanResult.status === "already_used" ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 231,
									columnNumber: 21
								}, this), "TICKET ALREADY USED"] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 230,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "w-4 h-4 text-red-400" }, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 236,
									columnNumber: 21
								}, this), "ACCESS REJECTED"] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 235,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 223,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-[11px]",
								children: scanResult.message
							}, void 0, false, {
								fileName: _jsxFileName$5,
								lineNumber: 241,
								columnNumber: 15
							}, this),
							scanResult.ticket && /* @__PURE__ */ (void 0)("div", {
								className: "pt-2 border-t border-border/50 text-[11px] space-y-0.5 text-bone",
								children: [
									/* @__PURE__ */ (void 0)("div", { children: ["Attendee: ", scanResult.ticket.attendeeName] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 244,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: ["Tier: ", scanResult.ticket.tierName] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 245,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", { children: [
										"Admits: ",
										scanResult.ticket.admitsCount,
										" Person(s)"
									] }, void 0, true, {
										fileName: _jsxFileName$5,
										lineNumber: 246,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 243,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$5,
						lineNumber: 214,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 141,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-2 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "font-display text-lg text-bone flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName$5,
							lineNumber: 256,
							columnNumber: 13
						}, this),
						"Active Handheld Terminals (",
						scanners.length,
						")"
					]
				}, void 0, true, {
					fileName: _jsxFileName$5,
					lineNumber: 255,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-4",
					children: scanners.map((dev) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-card p-4 space-y-3 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "font-display text-base text-bone font-medium",
									children: dev.name
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 268,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] text-muted-foreground font-mono block",
									children: ["Operator: ", dev.operatorName]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 269,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 267,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
									variant: "outline",
									className: `font-mono text-[10px] uppercase tracking-wider ${dev.status === "active" ? "border-green-500/60 bg-green-950/40 text-green-300" : "border-border text-muted-foreground"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { className: `w-2.5 h-2.5 mr-1 ${dev.status === "active" ? "text-green-400 animate-pulse" : ""}` }, void 0, false, {
										fileName: _jsxFileName$5,
										lineNumber: 282,
										columnNumber: 21
									}, this), dev.status]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 274,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 266,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-xs text-lavender font-mono bg-background/60 p-2.5 border border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-muted-foreground text-[10px] uppercase",
									children: "Location:"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 290,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-bone",
									children: dev.gateLocation
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 291,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 289,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-xs font-mono pt-2 border-t border-border/60",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "Scans Processed:"
								}, void 0, false, {
									fileName: _jsxFileName$5,
									lineNumber: 295,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-amber-400 font-bold text-sm",
									children: [dev.scansCount, " Passes"]
								}, void 0, true, {
									fileName: _jsxFileName$5,
									lineNumber: 296,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$5,
								lineNumber: 294,
								columnNumber: 17
							}, this)
						]
					}, dev.id, true, {
						fileName: _jsxFileName$5,
						lineNumber: 262,
						columnNumber: 15
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName$5,
					lineNumber: 260,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$5,
				lineNumber: 254,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$5,
			lineNumber: 139,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 111,
		columnNumber: 5
	}, this);
}
var _jsxFileName$4 = "/app/applet/src/components/admin/audit-log-tab.tsx";
function AuditLogTab() {
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const fetchLogs = async () => {
		setIsLoading(true);
		try {
			const data = await (await fetch("/api/admin/audit-logs")).json();
			if (data.success && Array.isArray(data.logs)) setLogs(data.logs);
		} catch (err) {
			console.warn("Failed to load audit logs:", err);
		} finally {
			setIsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchLogs();
	}, []);
	const filteredLogs = logs.filter((log) => {
		if (!search.trim()) return true;
		const q = search.toLowerCase().trim();
		return log.action.toLowerCase().includes(q) || log.actorEmail.toLowerCase().includes(q) || log.targetId.toLowerCase().includes(q) || log.targetTable.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border bg-card/70 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 63,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-xl text-bone tracking-wide",
						children: "Immutable System Audit Log"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 64,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 62,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground font-mono mt-1",
					children: "Real-time chronological record of administrative revocations, promo campaigns, and gate check-ins."
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 68,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 61,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "outline",
					size: "sm",
					onClick: fetchLogs,
					disabled: isLoading,
					className: "border-border text-lavender hover:text-bone text-xs h-9",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}` }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 81,
						columnNumber: 11
					}, this), "Refresh Log Trail"]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 74,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 60,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 88,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
					value: search,
					onChange: (e) => setSearch(e.target.value),
					placeholder: "Filter audit events by Action, Actor Email, Target ID...",
					className: "pl-9 bg-card border-border font-mono text-xs text-bone h-10"
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 89,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$4,
				lineNumber: 87,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border bg-card overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Table, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHeader, {
					className: "bg-background/80",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
						className: "border-b border-border hover:bg-transparent",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground py-3",
								children: "Timestamp"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 102,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Action Event"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 105,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Authorized Actor"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 108,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Target Entity"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 111,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableHead, {
								className: "font-mono text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Payload Details"
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 114,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 101,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 100,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableBody, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
					colSpan: 5,
					className: "h-32 text-center text-muted-foreground text-xs font-mono",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 126,
						columnNumber: 19
					}, this), "Streaming audit ledger..."]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 122,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 121,
					columnNumber: 15
				}, this) : filteredLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
					colSpan: 5,
					className: "h-32 text-center text-muted-foreground text-xs font-mono",
					children: "No matching audit records."
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 132,
					columnNumber: 17
				}, this) }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 131,
					columnNumber: 15
				}, this) : filteredLogs.map((log) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableRow, {
					className: "border-b border-border/60 hover:bg-background/50 font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
							className: "text-muted-foreground text-[11px] py-3",
							children: new Date(log.createdAt).toLocaleString()
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 145,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
							variant: "outline",
							className: "border-amber-500/40 bg-amber-950/30 text-amber-300 uppercase tracking-wider text-[10px]",
							children: log.action
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 149,
							columnNumber: 21
						}, this) }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 148,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-bone font-medium",
							children: log.actorEmail
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 157,
							columnNumber: 21
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[10px] text-muted-foreground uppercase",
							children: [
								log.actorRole,
								" · ",
								log.ipAddress
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 158,
							columnNumber: 21
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 156,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, {
							className: "text-lavender",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground text-[10px] uppercase block",
								children: log.targetTable
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 163,
								columnNumber: 21
							}, this), log.targetId]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 162,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TableCell, { children: log.metadata && Object.keys(log.metadata).length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("pre", {
							className: "text-[10px] text-muted-foreground max-w-xs truncate",
							children: JSON.stringify(log.metadata)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 170,
							columnNumber: 23
						}, this) : "—" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 168,
							columnNumber: 19
						}, this)
					]
				}, log.id, true, {
					fileName: _jsxFileName$4,
					lineNumber: 141,
					columnNumber: 17
				}, this)) }, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 119,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 99,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 98,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 58,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/admin/notification-center-tab.tsx";
function NotificationCenterTab() {
	const [activeChannel, setActiveChannel] = (0, import_react.useState)("whatsapp");
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)("booking_confirmation");
	const [testPhone, setTestPhone] = (0, import_react.useState)("+254712345678");
	const [testEmail, setTestEmail] = (0, import_react.useState)("guest@verve.co.ke");
	const [customerName, setCustomerName] = (0, import_react.useState)("Mwangi Karanja");
	const [passTier, setPassTier] = (0, import_react.useState)("VIP Rift Access Pass");
	const [quantity, setQuantity] = (0, import_react.useState)("2");
	const [orderId, setOrderId] = (0, import_react.useState)("HR-2026-9042");
	const [totalKes, setTotalKes] = (0, import_react.useState)("7000");
	const [refundReason, setRefundReason] = (0, import_react.useState)("Customer cancellation request prior to cut-off");
	const [paymentRef, setPaymentRef] = (0, import_react.useState)("REV-MPESA-98842");
	const [isSending, setIsSending] = (0, import_react.useState)(false);
	const [isBroadcasting, setIsBroadcasting] = (0, import_react.useState)(false);
	const [dispatchLogs, setDispatchLogs] = (0, import_react.useState)([{
		id: "log-seed-1",
		time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
		channel: "WhatsApp (Meta API)",
		template: "booking_confirmation",
		recipient: "+254712345678",
		status: "sent",
		details: "Meta parameters {{1..4}} successfully delivered"
	}, {
		id: "log-seed-2",
		time: (/* @__PURE__ */ new Date(Date.now() - 12e4)).toLocaleTimeString(),
		channel: "Resend Email",
		template: "booking_confirmation",
		recipient: "mwangi@verve.co.ke",
		status: "sent",
		details: "HTML transactional email delivered"
	}]);
	const getPlaintextPreview = (type) => {
		switch (type) {
			case "booking_confirmation": return `🎃 *HAUNTINGS OF THE RIFT — TICKET CONFIRMED* 🎃\n\nHey ${customerName}! Your entry pass is secured. Get ready for an unforgettable night at the Rift.\n\n🎟️ *Pass Details:* ${passTier} (x${quantity})\n🧾 *Order ID:* ${orderId}\n\n👇 *Access Your Digital Pass & QR Code:*\nhttps://hauntingsoftherift.co.ke/ticket/HR-1049-9941\n\n⚠️ *Important Gate Rules:*\n• Bring a valid ID matching your registration details.\n• Keep your QR code saved offline or loaded before arrival at the gate.\n• Passes are single-entry only.\n\nNeed help? Reply directly to this message.`;
			case "event_reminder_24h": return `⏰ *TOMORROW AT THE RIFT* ⏰\n\nHey ${customerName}, the gates open in 24 hours for Hauntings of the Rift!\n\n📍 *Venue:* Top Cliff Lounge, Nakuru\n🚪 *Gate Opens:* 18:00 EAT\n\n👇 *Have your QR code ready at the gate:*\nhttps://hauntingsoftherift.co.ke/ticket/HR-1049-9941\n\nDress code: Halloween costumes encouraged. Strict 21+ verification at entry.`;
			case "refund_notice": return `🧾 *REFUND PROCESSED — HAUNTINGS OF THE RIFT* 🧾\n\nHi ${customerName},\n\nYour refund of *KES ${Number(totalKes).toLocaleString()}* has been successfully processed.\n\n*Reference:* ${paymentRef}\n*Details:* ${refundReason}\n\nNote: Associated passes for order ${orderId} are now invalidated. Reach out to support@verve.co.ke for assistance.`;
		}
	};
	const getMetaParameters = (type) => {
		switch (type) {
			case "booking_confirmation": return [
				{
					placeholder: "{{1}}",
					label: "Customer Name",
					value: customerName
				},
				{
					placeholder: "{{2}}",
					label: "Pass Tier & Qty",
					value: `${passTier} (x${quantity})`
				},
				{
					placeholder: "{{3}}",
					label: "Order ID",
					value: orderId
				},
				{
					placeholder: "{{4}}",
					label: "Ticket Access URL",
					value: `https://hauntingsoftherift.co.ke/ticket/HR-1049-9941`
				}
			];
			case "event_reminder_24h": return [
				{
					placeholder: "{{1}}",
					label: "Customer Name",
					value: customerName
				},
				{
					placeholder: "{{2}}",
					label: "Venue Location",
					value: "Top Cliff Lounge, Nakuru"
				},
				{
					placeholder: "{{3}}",
					label: "Gate Opening Time",
					value: "18:00 EAT"
				},
				{
					placeholder: "{{4}}",
					label: "Fast Pass Link",
					value: `https://hauntingsoftherift.co.ke/ticket/HR-1049-9941`
				}
			];
			case "refund_notice": return [
				{
					placeholder: "{{1}}",
					label: "Customer Name",
					value: customerName
				},
				{
					placeholder: "{{2}}",
					label: "Amount (KES)",
					value: `KES ${Number(totalKes).toLocaleString()}`
				},
				{
					placeholder: "{{3}}",
					label: "Gateway Ref No",
					value: paymentRef
				},
				{
					placeholder: "{{4}}",
					label: "Reason/Details",
					value: refundReason
				}
			];
		}
	};
	const handleSendTestNotification = async () => {
		setIsSending(true);
		try {
			if (activeChannel === "whatsapp") {
				const payload = {
					phone: testPhone,
					templateType: selectedTemplate,
					customerName,
					passTierAndQuantity: `${passTier} (x${quantity})`,
					orderId,
					ticketAccessUrl: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941",
					venueNameOrLocation: "Top Cliff Lounge, Nakuru",
					gateOpeningTime: "18:00 EAT",
					fastPassLink: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941",
					refundAmountKes: totalKes,
					paymentProviderRef: paymentRef,
					reasonOrDetails: refundReason
				};
				const data = await (await fetch("/api/notifications/whatsapp", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				})).json();
				if (data.success) {
					toast.success(`WhatsApp notification dispatched: ${data.message}`);
					setDispatchLogs((prev) => [{
						id: `log-${Date.now()}`,
						time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
						channel: "WhatsApp (Meta API)",
						template: selectedTemplate,
						recipient: testPhone,
						status: data.simulated ? "simulated" : "sent",
						details: `Parameters {{1..4}} passed. Result ID: ${data.messageId || "simulated"}`
					}, ...prev]);
				} else toast.error(data.message || "Failed to dispatch WhatsApp message");
			} else {
				const payload = {
					to: testEmail,
					templateType: selectedTemplate,
					customer_name: customerName,
					ticket_tier: passTier,
					quantity: Number(quantity) || 1,
					total_amount: totalKes,
					order_id: orderId,
					event_date: "Saturday, 31 October 2026",
					ticket_url: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941",
					venue_name: "Top Cliff Lounge, Nakuru",
					gate_opening_time: "18:00 EAT",
					refund_amount: totalKes,
					payment_ref: paymentRef,
					refund_reason: refundReason
				};
				const data = await (await fetch("/api/notifications/email", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				})).json();
				if (data.success) {
					toast.success("Transactional HTML email dispatched via Resend");
					setDispatchLogs((prev) => [{
						id: `log-${Date.now()}`,
						time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
						channel: "Resend Email",
						template: selectedTemplate,
						recipient: testEmail,
						status: data.result?.simulated ? "simulated" : "sent",
						details: `Subject: ${selectedTemplate}. ID: ${data.result?.id || "simulated"}`
					}, ...prev]);
				} else toast.error(data.message || "Failed to dispatch email");
			}
		} catch (err) {
			toast.error("Failed to connect to notification gateway.");
		} finally {
			setIsSending(false);
		}
	};
	const handleBroadcast24hReminders = async () => {
		setIsBroadcasting(true);
		try {
			const data = await (await fetch("/api/notifications/reminder-24h", { method: "POST" })).json();
			if (data.success) {
				toast.success(data.message);
				setDispatchLogs((prev) => [{
					id: `log-broadcast-${Date.now()}`,
					time: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
					channel: "Batch Dual Broadcast",
					template: "event_reminder_24h",
					recipient: `${data.count} attendees`,
					status: "sent",
					details: "Omni-channel 24h countdown blast completed."
				}, ...prev]);
			} else toast.error("Could not complete broadcast.");
		} catch {
			toast.error("Network error during broadcast.");
		} finally {
			setIsBroadcasting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "font-display text-xl text-bone tracking-wide",
					children: "Notification Gateway & Template Studio"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 256,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-mono text-muted-foreground mt-1",
					children: "Meta Cloud API WhatsApp Templates • Resend HTML Transactional Email System"
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 259,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 255,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: handleBroadcast24hReminders,
						disabled: isBroadcasting,
						className: "border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-mono text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { className: `w-3.5 h-3.5 mr-2 ${isBroadcasting ? "animate-pulse text-red-500" : ""}` }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 272,
							columnNumber: 13
						}, this), isBroadcasting ? "Broadcasting..." : "Trigger 24h Reminder Broadcast"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 265,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 264,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 254,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card/60 border border-border/70 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-3",
								children: "Delivery Channel"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 286,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setActiveChannel("whatsapp"),
									className: `flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium border transition-all ${activeChannel === "whatsapp" ? "bg-emerald-950/40 border-emerald-500 text-emerald-400 font-semibold" : "border-border/60 text-muted-foreground hover:text-bone hover:border-border"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 298,
										columnNumber: 17
									}, this), "WhatsApp (Meta)"]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 290,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setActiveChannel("email"),
									className: `flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium border transition-all ${activeChannel === "email" ? "bg-orange-950/40 border-orange-500 text-orange-400 font-semibold" : "border-border/60 text-muted-foreground hover:text-bone hover:border-border"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 309,
										columnNumber: 17
									}, this), "HTML Email (Resend)"]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 301,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 289,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 285,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card/60 border border-border/70 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-3",
								children: "Registered Templates"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 317,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2",
								children: [
									{
										id: "booking_confirmation",
										label: "Booking Confirmation",
										desc: "Ticket issuance & gate QR code"
									},
									{
										id: "event_reminder_24h",
										label: "24-Hour Event Reminder",
										desc: "Venue logistics & gate opening times"
									},
									{
										id: "refund_notice",
										label: "Refund Notice",
										desc: "Order reversal & pass invalidation"
									}
								].map((tmpl) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: () => setSelectedTemplate(tmpl.id),
									className: `w-full text-left p-3 border transition-all ${selectedTemplate === tmpl.id ? "bg-oxblood/40 border-amber-500/70 text-bone shadow-sm" : "border-border/40 text-muted-foreground hover:bg-card/80 hover:text-bone"}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-medium text-bone",
											children: tmpl.label
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 348,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
											variant: "outline",
											className: "text-[9px] font-mono",
											children: tmpl.id
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 349,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 347,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-[11px] text-muted-foreground mt-1",
										children: tmpl.desc
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 353,
										columnNumber: 19
									}, this)]
								}, tmpl.id, true, {
									fileName: _jsxFileName$3,
									lineNumber: 338,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 320,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 316,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card/60 border border-border/70 p-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between border-b border-border/50 pb-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-[11px] font-mono uppercase tracking-widest text-muted-foreground",
										children: "Dispatch Test Runner"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 362,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "outline",
										className: "text-[10px] text-amber-400 border-amber-500/40",
										children: "Live Test Mode"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 365,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 361,
									columnNumber: 13
								}, this),
								activeChannel === "whatsapp" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-[11px] text-muted-foreground block mb-1",
									children: "Recipient Phone"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 372,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: testPhone,
									onChange: (e) => setTestPhone(e.target.value),
									placeholder: "+254...",
									className: "bg-background/80 font-mono text-xs h-9"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 375,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 371,
									columnNumber: 15
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-[11px] text-muted-foreground block mb-1",
									children: "Recipient Email"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 384,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									value: testEmail,
									onChange: (e) => setTestEmail(e.target.value),
									placeholder: "name@domain.com",
									className: "bg-background/80 font-mono text-xs h-9"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 387,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 383,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-[10px] text-muted-foreground block mb-1",
										children: "Customer Name"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 398,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: customerName,
										onChange: (e) => setCustomerName(e.target.value),
										className: "bg-background/80 font-mono text-xs h-8"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 401,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 397,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-[10px] text-muted-foreground block mb-1",
										children: "Order Ref"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 408,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										value: orderId,
										onChange: (e) => setOrderId(e.target.value),
										className: "bg-background/80 font-mono text-xs h-8"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 409,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 407,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 396,
									columnNumber: 13
								}, this),
								selectedTemplate === "refund_notice" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-3 pt-2 border-t border-border/40",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[10px] text-muted-foreground block mb-1",
										children: "Refund Ref"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 420,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										value: paymentRef,
										onChange: (e) => setPaymentRef(e.target.value),
										className: "bg-background/80 font-mono text-xs h-8"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 421,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 419,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[10px] text-muted-foreground block mb-1",
										children: "Reason / Note"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 428,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)(Input, {
										value: refundReason,
										onChange: (e) => setRefundReason(e.target.value),
										className: "bg-background/80 font-mono text-xs h-8"
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 431,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 427,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 418,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									onClick: handleSendTestNotification,
									disabled: isSending,
									className: "w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs h-10 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "w-3.5 h-3.5 mr-2" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 445,
										columnNumber: 15
									}, this), isSending ? "Dispatching..." : `Send Test ${activeChannel === "whatsapp" ? "WhatsApp" : "Email"}`]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 440,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 360,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 283,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "lg:col-span-2 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card/70 border border-border/80 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileCode, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 459,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-mono font-semibold text-bone",
									children: "Meta Cloud API Structured Payload Mapping"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 460,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 458,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
								className: "bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono",
								children: ["template: ", selectedTemplate]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 464,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 457,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: getMetaParameters(selectedTemplate).map((param) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "p-2.5 bg-background/90 border border-border/50 rounded-none flex flex-col justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-[11px] font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-amber-400 font-bold",
										children: param.placeholder
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 476,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground text-[10px]",
										children: param.label
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 477,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 475,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-bone font-medium mt-1.5 truncate",
									children: param.value
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 479,
									columnNumber: 19
								}, this)]
							}, param.placeholder, true, {
								fileName: _jsxFileName$3,
								lineNumber: 471,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 469,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 456,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card/70 border border-border/80 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between border-b border-border/60 pb-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "w-4 h-4 text-lavender" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 489,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-mono font-semibold text-bone",
									children: activeChannel === "whatsapp" ? "WhatsApp Screen Preview" : "Responsive Email Render"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 490,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 488,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								className: "h-7 text-[10px] font-mono text-muted-foreground hover:text-bone",
								onClick: () => {
									navigator.clipboard.writeText(getPlaintextPreview(selectedTemplate));
									toast.success("Plaintext copied to clipboard");
								},
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "w-3 h-3 mr-1" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 505,
									columnNumber: 17
								}, this), "Copy Text"]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 496,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 487,
							columnNumber: 13
						}, this), activeChannel === "whatsapp" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "max-w-md mx-auto bg-[#0b141a] border border-[#222d34] rounded-2xl p-4 shadow-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 border-b border-[#202c33] pb-3 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs",
									children: "HR"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 515,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs font-bold text-[#e9edef] flex items-center gap-1.5",
									children: ["Hauntings of the Rift", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 521,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 519,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[10px] text-[#8696a0] font-mono",
									children: "Official Verified Business"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 523,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 518,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 514,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-[#005c4b] text-[#e9edef] rounded-lg rounded-tl-none p-3.5 text-xs font-sans whitespace-pre-wrap leading-relaxed shadow-md",
								children: [getPlaintextPreview(selectedTemplate), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[9px] text-[#8696a0] text-right mt-2 font-mono",
									children: [(/* @__PURE__ */ new Date()).toLocaleTimeString([], {
										hour: "2-digit",
										minute: "2-digit"
									}), " ✓✓"]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 532,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 530,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 512,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "border border-border/80 bg-[#0d0d0d] p-4 max-h-[460px] overflow-y-auto rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "max-w-lg mx-auto bg-[#171717] border border-[#262626] rounded-xl p-6 text-gray-200",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-center pb-4 border-b border-[#262626]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-amber-500 font-black text-lg tracking-wider uppercase",
											children: "Hauntings of the Rift"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 542,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[11px] text-gray-400 uppercase tracking-widest mt-0.5",
											children: "Verve & Co. Official Communication"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 545,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 541,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "py-4 text-xs leading-relaxed text-gray-300",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "mb-2",
												children: [
													"Hi ",
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: customerName }, void 0, false, {
														fileName: _jsxFileName$3,
														lineNumber: 552,
														columnNumber: 26
													}, this),
													","
												]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 551,
												columnNumber: 21
											}, this),
											selectedTemplate === "booking_confirmation" && /* @__PURE__ */ (void 0)("p", { children: "Your booking has been verified. Below is your official ticket summary. Present your digital QR code at the gate check-in point for access." }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 555,
												columnNumber: 23
											}, this),
											selectedTemplate === "event_reminder_24h" && /* @__PURE__ */ (void 0)("p", { children: [
												"We are finalizing preparations for ",
												/* @__PURE__ */ (void 0)("strong", { children: "Hauntings of the Rift" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 562,
													columnNumber: 60
												}, this),
												". Here is everything you need to know for a seamless arrival tomorrow."
											] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 561,
												columnNumber: 23
											}, this),
											selectedTemplate === "refund_notice" && /* @__PURE__ */ (void 0)("p", { children: [
												"This email confirms that a refund has been issued for your booking with",
												" ",
												/* @__PURE__ */ (void 0)("strong", { children: "Hauntings of the Rift" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 569,
													columnNumber: 25
												}, this),
												"."
											] }, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 567,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 550,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "bg-[#0d0d0d] border border-dashed border-amber-500/40 rounded-lg p-3 my-2 text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between items-center pb-2 border-b border-white/5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] text-gray-400 uppercase",
												children: "Details"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 577,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-semibold text-white",
												children: passTier
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 578,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 576,
											columnNumber: 21
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex justify-between items-center pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-[10px] text-gray-400 uppercase",
												children: "Order Ref"
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 581,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "font-mono text-amber-400",
												children: orderId
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 582,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 580,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 575,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-center py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "inline-block bg-amber-500 text-black font-bold text-[11px] px-6 py-2.5 rounded uppercase tracking-wider",
											children: selectedTemplate === "refund_notice" ? "View Order Status" : "Access Digital Pass & QR Code"
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 587,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 586,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "pt-4 border-t border-[#262626] text-[10px] text-gray-500 text-center",
										children: "© 2026 Hauntings of the Rift. Managed by Verve & Co."
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 594,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 540,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 539,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 486,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 454,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 281,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card/70 border border-border/80 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between border-b border-border/60 pb-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "w-4 h-4 text-lavender" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 608,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-xs font-mono font-semibold text-bone uppercase tracking-wider",
							children: "Recent Automated Notification Logs"
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 609,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 607,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "text-[10px] font-mono",
						children: [dispatchLogs.length, " Records"]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 613,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 606,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full text-left text-xs font-sans",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
							className: "border-b border-border/60 text-muted-foreground font-mono text-[10px] uppercase",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Timestamp"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 622,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Channel"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 623,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Template"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 624,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Recipient"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 625,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Delivery Status"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 626,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Metadata"
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 627,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 621,
							columnNumber: 15
						}, this) }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 620,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y divide-border/40",
							children: dispatchLogs.map((log) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-background/40 transition-colors font-mono text-[11px]",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 text-muted-foreground",
										children: log.time
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 636,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 font-semibold text-bone",
										children: log.channel
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 637,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 text-amber-400",
										children: log.template
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 638,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 text-lavender",
										children: log.recipient
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 639,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `inline-flex items-center gap-1 px-2 py-0.5 text-[10px] ${log.status === "sent" ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/40" : log.status === "simulated" ? "bg-blue-950/60 text-blue-400 border border-blue-500/40" : "bg-red-950/60 text-red-400 border border-red-500/40"}`,
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 650,
												columnNumber: 23
											}, this), log.status.toUpperCase()]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 641,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 640,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 text-muted-foreground text-[10px] truncate max-w-xs",
										children: log.details
									}, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 654,
										columnNumber: 19
									}, this)
								]
							}, log.id, true, {
								fileName: _jsxFileName$3,
								lineNumber: 632,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 630,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 619,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 618,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 605,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 252,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/admin/analytics-live-tab.tsx";
function AnalyticsLiveTab() {
	const [events, setEvents] = (0, import_react.useState)([]);
	const [summary, setSummary] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [isLiveConnected, setIsLiveConnected] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [isSimulating, setIsSimulating] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsLoading(true);
		const unsubscribe = subscribeToAdminAnalytics((newEvents) => {
			setEvents(newEvents);
			setSummary(calculateAnalyticsSummary(newEvents));
			setIsLoading(false);
			setIsLiveConnected(true);
			setErrorMessage(null);
		}, (error) => {
			setIsLoading(false);
			setIsLiveConnected(false);
			setErrorMessage(error.message);
		}, 60);
		return () => {
			if (unsubscribe) unsubscribe();
		};
	}, []);
	const handleSendTestTelemetry = async () => {
		setIsSimulating(true);
		try {
			await logFirebaseAnalyticsEvent("admin_telemetry_ping", {
				origin: "Admin Portal",
				action: "live_sync_verification",
				triggeredAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			toast.success("Page Telemetry Dispatched", { description: "Sent to Firestore /analytics_events stream" });
		} catch (err) {
			toast.error("Telemetry Dispatch Error", { description: err instanceof Error ? err.message : "Failed to emit event" });
		} finally {
			setIsSimulating(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-display text-2xl text-bone tracking-tight",
						children: "Real-time Page Analytics"
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 86,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: `inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded border ${isLiveConnected ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/30" : "bg-amber-950/40 text-amber-400 border-amber-500/30"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `w-1.5 h-1.5 rounded-full ${isLiveConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}` }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 96,
							columnNumber: 15
						}, this), isLiveConnected ? "Live Firestore Stream" : "Connecting..."]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 89,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 85,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-lavender/70 font-sans mt-1",
					children: "Real-time telemetry and user behavior stream dispatched directly from visitor pages to the admin console."
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 104,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 84,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: handleSendTestTelemetry,
						disabled: isSimulating,
						size: "sm",
						className: "bg-oxblood hover:bg-oxblood/90 text-bone border border-amber-500/30 text-xs font-mono h-9",
						children: [isSimulating ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 118,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Radio, { className: "w-3.5 h-3.5 mr-1.5 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 120,
							columnNumber: 15
						}, this), "Send Test Ping"]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 111,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 110,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 83,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-3.5 border border-border/70 bg-card/60 rounded-none flex flex-wrap items-center justify-between gap-3 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "w-4 h-4 text-amber-400 shrink-0" }, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 130,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "font-mono text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Project: "
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 132,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-bone font-semibold",
								children: "robotic-synapse-43t6m"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 133,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground mx-2",
								children: "·"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 134,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Region: "
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 135,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-bone",
								children: "europe-west2"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 136,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground mx-2",
								children: "·"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 137,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Database: "
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 138,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-emerald-400 font-semibold",
								children: "Firestore Active"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 139,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 131,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 129,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "text-[11px] font-mono text-lavender/60",
					children: "Target: Top Cliff Lounge, Nakuru"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 142,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 128,
				columnNumber: 7
			}, this),
			errorMessage && /* @__PURE__ */ (void 0)("div", {
				className: "p-4 border border-red-500/40 bg-red-950/30 text-red-200 text-xs flex items-start gap-3",
				children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "w-4 h-4 text-red-400 shrink-0 mt-0.5" }, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 149,
					columnNumber: 11
				}, this), /* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
					className: "font-bold",
					children: "Firestore Stream Notification"
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 151,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("div", {
					className: "text-red-300/80 mt-0.5",
					children: errorMessage
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 152,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 150,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 148,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border/80 bg-card/80 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-mono uppercase tracking-wider",
									children: "Total Events"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 161,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Activity, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 162,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 160,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-2xl sm:text-3xl text-bone",
								children: summary?.totalEvents ?? 0
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 164,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-muted-foreground font-mono mt-1",
								children: "Logged to Firestore"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 167,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 159,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border/80 bg-card/80 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-mono uppercase tracking-wider",
									children: "Unique Sessions"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 174,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 175,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 173,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-2xl sm:text-3xl text-bone",
								children: summary?.uniqueSessions ?? 0
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 177,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-emerald-400/80 font-mono mt-1",
								children: "Active visitors"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 180,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 172,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border/80 bg-card/80 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-mono uppercase tracking-wider",
									children: "Page Views"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 185,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 186,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 184,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-2xl sm:text-3xl text-bone",
								children: summary?.pageViewsCount ?? 0
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 188,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-muted-foreground font-mono mt-1",
								children: "Site route impressions"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 191,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 183,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border/80 bg-card/80 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between text-muted-foreground mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] font-mono uppercase tracking-wider",
									children: "Checkouts"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 198,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 199,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$2,
								lineNumber: 197,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-2xl sm:text-3xl text-bone",
								children: summary?.checkoutStartsCount ?? 0
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 201,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-[10px] text-amber-400/80 font-mono mt-1",
								children: "Ticket funnel starts"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 204,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 196,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 158,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid md:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border border-border/80 bg-card/80 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center justify-between mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display text-base text-bone tracking-wide",
							children: "Top Visited Page Paths"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 213,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[10px] font-mono text-muted-foreground uppercase",
							children: "Ranked Views"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 216,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 212,
						columnNumber: 11
					}, this), summary && summary.topPages.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3",
						children: summary.topPages.map((item, idx) => {
							const percentage = summary.pageViewsCount > 0 ? Math.round(item.views / summary.pageViewsCount * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-bone truncate max-w-[200px]",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-amber-400 mr-2",
											children: ["#", idx + 1]
										}, void 0, true, {
											fileName: _jsxFileName$2,
											lineNumber: 232,
											columnNumber: 25
										}, this), item.path]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 231,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-lavender",
										children: [
											item.views,
											" views (",
											percentage,
											"%)"
										]
									}, void 0, true, {
										fileName: _jsxFileName$2,
										lineNumber: 235,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 230,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-full h-1.5 bg-background overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "h-full bg-amber-500/80 transition-all duration-500",
										style: { width: `${percentage}%` }
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 240,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 239,
									columnNumber: 21
								}, this)]
							}, item.path, true, {
								fileName: _jsxFileName$2,
								lineNumber: 229,
								columnNumber: 19
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 222,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "py-8 text-center text-xs text-muted-foreground font-mono",
						children: "Awaiting live route navigation events..."
					}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 250,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 211,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border border-border/80 bg-card/80 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "font-display text-base text-bone tracking-wide",
								children: "Device Telemetry"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 259,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] font-mono text-muted-foreground uppercase",
								children: "Breakdown"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 260,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 258,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "border border-border/60 bg-background/50 p-3 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "w-5 h-5 text-amber-400 mx-auto mb-1" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 265,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[11px] font-mono text-muted-foreground",
											children: "Mobile"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 266,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-display text-lg text-bone mt-0.5",
											children: summary?.deviceBreakdown["mobile"] ?? 0
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 267,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 264,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "border border-border/60 bg-background/50 p-3 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Monitor, { className: "w-5 h-5 text-sky-400 mx-auto mb-1" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 273,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[11px] font-mono text-muted-foreground",
											children: "Desktop"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 274,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-display text-lg text-bone mt-0.5",
											children: summary?.deviceBreakdown["desktop"] ?? 0
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 275,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 272,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "border border-border/60 bg-background/50 p-3 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tablet, { className: "w-5 h-5 text-emerald-400 mx-auto mb-1" }, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 281,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[11px] font-mono text-muted-foreground",
											children: "Tablet"
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 282,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-display text-lg text-bone mt-0.5",
											children: summary?.deviceBreakdown["tablet"] ?? 0
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 283,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$2,
									lineNumber: 280,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 263,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 pt-3 border-t border-border/50 text-[11px] text-muted-foreground flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Event Ingestion Rate" }, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 290,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-mono text-bone text-emerald-400",
								children: "Normal (Sub-second)"
							}, void 0, false, {
								fileName: _jsxFileName$2,
								lineNumber: 291,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 289,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 257,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 209,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border/80 bg-card/80 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Activity, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 300,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display text-base text-bone tracking-wide",
							children: "Live Visitor Event Ledger"
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 301,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 299,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[11px] font-mono text-muted-foreground",
						children: [
							"Displaying latest ",
							events.length,
							" events"
						]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 305,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$2,
					lineNumber: 298,
					columnNumber: 9
				}, this), events.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "py-12 text-center text-xs text-muted-foreground font-mono border border-dashed border-border/60",
					children: "No events recorded yet. Click \"Send Test Ping\" or visit the public page to see real-time data appear instantly."
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 311,
					columnNumber: 11
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full text-left text-xs font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
							className: "border-b border-border/80 text-[10px] uppercase text-muted-foreground tracking-wider",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Timestamp"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 320,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Event Name"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 321,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Page Path"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 322,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Device"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 323,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "py-2.5 px-3",
									children: "Session ID"
								}, void 0, false, {
									fileName: _jsxFileName$2,
									lineNumber: 324,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$2,
							lineNumber: 319,
							columnNumber: 17
						}, this) }, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 318,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y divide-border/40",
							children: events.map((evt) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-background/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 text-muted-foreground whitespace-nowrap",
										children: new Date(evt.timestamp).toLocaleTimeString()
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 330,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-amber-950/40 text-amber-300 border border-amber-500/20",
											children: evt.eventName
										}, void 0, false, {
											fileName: _jsxFileName$2,
											lineNumber: 334,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 333,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 text-bone truncate max-w-[180px]",
										children: evt.path || evt.pageUrl || "/"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 338,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 text-lavender/80 uppercase text-[10px]",
										children: evt.deviceType || "desktop"
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 341,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "py-2.5 px-3 text-muted-foreground truncate max-w-[120px]",
										children: evt.sessionId
									}, void 0, false, {
										fileName: _jsxFileName$2,
										lineNumber: 344,
										columnNumber: 21
									}, this)
								]
							}, evt.id || Math.random().toString(), true, {
								fileName: _jsxFileName$2,
								lineNumber: 329,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$2,
							lineNumber: 327,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$2,
						lineNumber: 317,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 316,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 297,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 81,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/admin/manual-verification-tab.tsx";
function ManualVerificationTab() {
	const { user } = useAdminAuth();
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [copiedCode, setCopiedCode] = (0, import_react.useState)(null);
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const [isApproving, setIsApproving] = (0, import_react.useState)(false);
	const [approvalNotes, setApprovalNotes] = (0, import_react.useState)("");
	const [rejectingOrder, setRejectingOrder] = (0, import_react.useState)(null);
	const [rejectionReason, setRejectionReason] = (0, import_react.useState)("M-Pesa transaction reference not found on merchant statement.");
	const [isRejecting, setIsRejecting] = (0, import_react.useState)(false);
	const [isSeeding, setIsSeeding] = (0, import_react.useState)(false);
	const fetchPendingOrders = async () => {
		setLoading(true);
		try {
			const data = await (await fetch("/api/admin/orders/pending")).json();
			if (data.success && Array.isArray(data.orders)) {
				const mapped = data.orders.map((o) => ({
					id: String(o.id || o.orderId || ""),
					orderNumber: String(o.orderNumber || o.id || ""),
					customerName: String(o.buyerName || o.customerName || "Customer"),
					customerEmail: String(o.buyerEmail || o.customerEmail || "No email provided"),
					customerPhone: String(o.buyerPhone || o.customerPhone || ""),
					ticketName: String(o.ticketName || "General Admission"),
					quantity: Number(o.quantity || 1),
					totalKes: Number(o.totalKes || 0),
					mpesaCode: o.mpesaCode ? String(o.mpesaCode) : void 0,
					mpesaMessage: o.mpesaMessage ? String(o.mpesaMessage) : void 0,
					status: String(o.status || "pending"),
					createdAt: String(o.createdAt || (/* @__PURE__ */ new Date()).toISOString()),
					updatedAt: o.updatedAt ? String(o.updatedAt) : void 0,
					rejectionReason: o.rejectionReason ? String(o.rejectionReason) : void 0,
					approvedBy: o.approvedBy ? String(o.approvedBy) : void 0
				}));
				setOrders(mapped);
			}
		} catch (err) {
			console.warn("Failed to fetch pending orders from API:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchPendingOrders();
		const unsubscribe = subscribeToPendingOrders((firestoreOrders) => {
			if (firestoreOrders && firestoreOrders.length > 0) setOrders((prev) => {
				const merged = [...prev];
				for (const fo of firestoreOrders) {
					const idx = merged.findIndex((o) => o.id === fo.orderId);
					const item = {
						id: fo.orderId,
						orderNumber: fo.orderNumber || fo.orderId,
						customerName: fo.customerName || "Customer",
						customerEmail: fo.customerEmail || "",
						customerPhone: fo.customerPhone || "",
						ticketName: fo.ticketName || "General Admission",
						quantity: fo.quantity || 1,
						totalKes: fo.totalKes || 0,
						mpesaCode: fo.mpesaCode,
						mpesaMessage: fo.mpesaMessage,
						status: fo.status,
						createdAt: fo.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
						updatedAt: fo.updatedAt,
						rejectionReason: fo.rejectionReason,
						approvedBy: fo.approvedBy
					};
					if (idx >= 0) merged[idx] = item;
					else merged.unshift(item);
				}
				return merged;
			});
		});
		return () => {
			if (unsubscribe) unsubscribe();
		};
	}, []);
	const filteredOrders = (0, import_react.useMemo)(() => {
		if (!searchQuery.trim()) return orders;
		const q = searchQuery.toLowerCase();
		return orders.filter((o) => o.orderNumber.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.customerEmail.toLowerCase().includes(q) || o.customerPhone.includes(q) || o.mpesaCode && o.mpesaCode.toLowerCase().includes(q));
	}, [orders, searchQuery]);
	const handleCopyCode = (code) => {
		navigator.clipboard.writeText(code);
		setCopiedCode(code);
		toast.success(`Copied code: ${code}`);
		setTimeout(() => setCopiedCode(null), 2e3);
	};
	const handleSeedDemoOrder = async () => {
		setIsSeeding(true);
		try {
			const data = await (await fetch("/api/admin/orders/seed-demo", { method: "POST" })).json();
			if (data.success) {
				toast.success("Sample order created for verification testing!");
				await fetchPendingOrders();
			} else toast.error("Could not seed demo order: " + data.message);
		} catch (err) {
			toast.error("Error creating demo order");
		} finally {
			setIsSeeding(false);
		}
	};
	const handleApproveOrder = async () => {
		if (!selectedOrder) return;
		setIsApproving(true);
		try {
			const res = await fetch("/api/admin/orders/approve", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					order_id: selectedOrder.id,
					admin_email: user?.email || "admin@verve.co.ke",
					notes: approvalNotes
				})
			});
			const data = await res.json();
			if (!res.ok || !data.success) {
				toast.error(data.message || "Failed to approve order.");
				setIsApproving(false);
				return;
			}
			try {
				await approveOrderInFirestore({
					orderId: selectedOrder.id,
					adminEmail: user?.email || "admin@verve.co.ke",
					tickets: (data.tickets || []).map((t) => ({
						ticketNumber: String(t.ticketNumber || ""),
						orderId: selectedOrder.id,
						orderNumber: selectedOrder.orderNumber,
						attendeeName: selectedOrder.customerName,
						attendeeEmail: selectedOrder.customerEmail,
						buyerPhone: selectedOrder.customerPhone,
						tierName: selectedOrder.ticketName,
						admitsCount: Number(t.admitsCount || 1),
						priceKes: Number(t.priceKes || selectedOrder.totalKes),
						qrHash: String(t.qrHash || ""),
						status: "valid"
					}))
				});
			} catch (fErr) {
				console.warn("Firestore sync warning on approve:", fErr);
			}
			toast.success(`Order ${selectedOrder.orderNumber} approved! Ticket email sent to ${selectedOrder.customerEmail}`, { duration: 5e3 });
			setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
			setSelectedOrder(null);
			setApprovalNotes("");
		} catch (err) {
			toast.error("Network error during approval.");
		} finally {
			setIsApproving(false);
		}
	};
	const handleRejectOrder = async () => {
		if (!rejectingOrder) return;
		setIsRejecting(true);
		try {
			const res = await fetch("/api/admin/orders/reject", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					order_id: rejectingOrder.id,
					reason: rejectionReason,
					admin_email: user?.email || "admin@verve.co.ke"
				})
			});
			const data = await res.json();
			if (!res.ok || !data.success) {
				toast.error(data.message || "Failed to reject order.");
				setIsRejecting(false);
				return;
			}
			try {
				await rejectOrderInFirestore({
					orderId: rejectingOrder.id,
					reason: rejectionReason,
					adminEmail: user?.email || "admin@verve.co.ke"
				});
			} catch (fErr) {
				console.warn("Firestore sync warning on reject:", fErr);
			}
			toast.info(`Order ${rejectingOrder.orderNumber} marked as rejected.`);
			setOrders((prev) => prev.filter((o) => o.id !== rejectingOrder.id));
			setRejectingOrder(null);
		} catch (err) {
			toast.error("Network error during rejection.");
		} finally {
			setIsRejecting(false);
		}
	};
	const totalQueueKes = (0, import_react.useMemo)(() => {
		return orders.reduce((sum, o) => sum + (o.totalKes || 0), 0);
	}, [orders]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/80 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-2xl text-bone",
						children: "M-Pesa Verification Queue"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 320,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
						variant: "outline",
						className: "border-amber-500/50 text-amber-400 bg-amber-950/20 font-mono text-xs",
						children: [orders.length, " Awaiting Approval"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 321,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 319,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs text-muted-foreground font-mono mt-1 max-w-2xl",
					children: "Confirm customer-submitted M-Pesa transaction reference codes against your Safaricom statement. Approving instantly generates cryptographic QR passes and triggers automated email delivery."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 328,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 318,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: handleSeedDemoOrder,
						disabled: isSeeding,
						className: "text-xs border-amber-500/40 text-amber-300 hover:bg-amber-950/30",
						children: [isSeeding ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 344,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CirclePlus, { className: "w-3.5 h-3.5 mr-1.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 346,
							columnNumber: 15
						}, this), "Test Sample Order"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 336,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: fetchPendingOrders,
						disabled: loading,
						className: "text-xs text-bone hover:bg-card border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}` }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 358,
							columnNumber: 13
						}, this), "Refresh"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 351,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 335,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 317,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-card p-4 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] font-mono uppercase tracking-wider text-muted-foreground",
								children: "Pending Orders"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 367,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-2xl text-amber-400",
								children: [
									orders.length,
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-normal text-muted-foreground",
										children: "in queue"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 372,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 370,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-muted-foreground font-mono",
								children: "Requires admin confirmation"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 374,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 366,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-card p-4 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] font-mono uppercase tracking-wider text-muted-foreground",
								children: "Queued Revenue"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 378,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "font-display text-2xl text-bone",
								children: ["KES ", totalQueueKes.toLocaleString()]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 381,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-muted-foreground font-mono",
								children: "Awaiting manual settlement"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 384,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 377,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "border border-border bg-card p-4 space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[11px] font-mono uppercase tracking-wider text-muted-foreground",
								children: "Automated Delivery"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 388,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5 text-emerald-400 font-mono text-sm pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 392,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Resend / Email Active" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 393,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 391,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-muted-foreground font-mono",
								children: "Tickets sent to buyer's email on approval"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 395,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 387,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 365,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3 bg-card border border-border px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "w-4 h-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 403,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						placeholder: "Search by M-Pesa code, order number, customer name, email, or phone...",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						className: "bg-transparent border-0 focus-visible:ring-0 text-sm text-bone placeholder:text-muted-foreground/60 h-8"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 404,
						columnNumber: 9
					}, this),
					searchQuery && /* @__PURE__ */ (void 0)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setSearchQuery(""),
						className: "text-xs text-muted-foreground hover:text-bone h-7 px-2",
						children: "Clear"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 411,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 402,
				columnNumber: 7
			}, this),
			loading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border bg-card p-12 text-center space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-8 h-8 animate-spin mx-auto text-amber-400" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 425,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm font-mono text-muted-foreground",
					children: "Synchronizing pending verification queue..."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 426,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 424,
				columnNumber: 9
			}, this) : filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "border border-border/60 bg-card/50 p-12 text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-12 h-12 rounded-full bg-emerald-950/40 border border-emerald-500/30 grid place-items-center mx-auto text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-6 h-6" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 433,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 432,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "font-display text-lg text-bone",
							children: "Queue is all clear!"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 436,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground font-mono max-w-md mx-auto",
							children: "No orders are currently waiting for M-Pesa approval. New buyer checkout submissions will appear here in real-time."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 437,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 435,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: handleSeedDemoOrder,
						disabled: isSeeding,
						className: "text-xs border-amber-500/30 text-amber-300 hover:bg-amber-950/20",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CirclePlus, { className: "w-3.5 h-3.5 mr-1.5" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 449,
							columnNumber: 13
						}, this), "Create Sample Order to Test Flow"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 442,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 431,
				columnNumber: 9
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: filteredOrders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "border border-border bg-card p-5 transition-all hover:border-border/90 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-10 h-10 rounded bg-amber-950/40 border border-amber-500/40 grid place-items-center text-amber-400 shrink-0 font-mono font-bold text-xs",
									children: "M-PESA"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 463,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-mono text-sm font-bold text-bone",
										children: order.orderNumber
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 468,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
										variant: "outline",
										className: "border-amber-500/40 text-amber-400 bg-amber-950/30 text-[10px] font-mono uppercase",
										children: "Pending Review"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 471,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 467,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[11px] text-muted-foreground font-mono flex items-center gap-1.5 mt-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "w-3 h-3" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 479,
											columnNumber: 23
										}, this),
										"Submitted ",
										new Date(order.createdAt).toLocaleString()
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 478,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 466,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 462,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-left sm:text-right",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground font-mono",
									children: "Amount to Verify"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 487,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-display text-2xl text-amber-400",
									children: ["KES ", order.totalKes.toLocaleString()]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 488,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 486,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 461,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-background/50 border border-border/80 p-3.5 rounded space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, { className: "w-3.5 h-3.5 text-lavender" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 499,
										columnNumber: 21
									}, this), "Customer & Ticket Info"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 498,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "grid grid-cols-2 gap-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground block text-[10px]",
											children: "Name"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 505,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
											className: "text-bone font-medium",
											children: order.customerName
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 506,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 504,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-muted-foreground block text-[10px]",
											children: "Phone"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 509,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
											className: "text-bone font-mono",
											children: ["+", order.customerPhone]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 510,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 508,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "col-span-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-muted-foreground block text-[10px]",
												children: "Delivery Email (Ticket Target)"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 513,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-1.5 text-lavender font-mono",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "w-3.5 h-3.5 shrink-0" }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 517,
													columnNumber: 25
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "truncate",
													children: order.customerEmail
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 518,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 516,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 512,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "col-span-2 border-t border-border/50 pt-1.5 mt-1 flex justify-between items-center",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-muted-foreground",
												children: "Tier & Quantity:"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 522,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-bone font-mono font-semibold",
												children: [
													order.quantity,
													"x ",
													order.ticketName
												]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 523,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 521,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 503,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 497,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-background/50 border border-amber-500/30 p-3.5 rounded space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-[11px] font-mono uppercase tracking-wider text-amber-400 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 534,
											columnNumber: 23
										}, this), "M-Pesa Identifier"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 533,
										columnNumber: 21
									}, this), order.mpesaCode && /* @__PURE__ */ (void 0)("span", {
										className: "text-[10px] text-muted-foreground",
										children: "Click code to copy"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 538,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 532,
									columnNumber: 19
								}, this), order.mpesaCode ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between bg-amber-950/30 border border-amber-500/40 px-3 py-2 rounded",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "font-mono text-base font-bold tracking-widest text-amber-300",
											children: order.mpesaCode
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 545,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => handleCopyCode(order.mpesaCode),
											className: "h-7 px-2 text-xs text-amber-300 hover:text-bone hover:bg-amber-900/40",
											children: copiedCode === order.mpesaCode ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "w-3.5 h-3.5 mr-1 text-emerald-400" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 556,
												columnNumber: 31
											}, this), "Copied"] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 555,
												columnNumber: 29
											}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, { className: "w-3.5 h-3.5 mr-1" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 561,
												columnNumber: 31
											}, this), "Copy"] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 560,
												columnNumber: 29
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 548,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 544,
										columnNumber: 23
									}, this), order.mpesaMessage && /* @__PURE__ */ (void 0)("div", {
										className: "text-[11px] text-bone-muted bg-card/80 border border-border/60 p-2.5 rounded font-mono leading-relaxed max-h-24 overflow-y-auto",
										children: [
											/* @__PURE__ */ (void 0)("span", {
												className: "text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5",
												children: "Customer Message / SMS:"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 570,
												columnNumber: 27
											}, this),
											"“",
											order.mpesaMessage,
											"”"
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 569,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 543,
									columnNumber: 21
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-amber-300/80 font-mono py-2",
									children: "No code submitted yet (awaiting customer input)"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 578,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 531,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 495,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setRejectingOrder(order),
								className: "w-full sm:w-auto text-xs border-destructive/40 text-destructive-foreground hover:bg-destructive/10",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "w-3.5 h-3.5 mr-1.5 text-destructive" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 593,
									columnNumber: 19
								}, this), "Reject Order"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 587,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "event",
								size: "sm",
								onClick: () => setSelectedOrder(order),
								className: "w-full sm:w-auto text-xs font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-4 h-4 mr-1.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 603,
									columnNumber: 19
								}, this), "Approve & Dispatch Ticket Email"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 597,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 586,
							columnNumber: 15
						}, this)
					]
				}, order.id, true, {
					fileName: _jsxFileName$1,
					lineNumber: 456,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 454,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: !!selectedOrder,
				onOpenChange: (open) => !open && setSelectedOrder(null),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "border-border bg-card sm:max-w-lg text-bone",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "font-display text-xl text-bone flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 617,
								columnNumber: 15
							}, this), "Confirm Payment & Issue Tickets"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 616,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground font-mono",
							children: ["Order ", selectedOrder?.orderNumber]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 620,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 615,
							columnNumber: 11
						}, this),
						selectedOrder && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4 py-2",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "border border-border/80 bg-background/60 p-3.5 rounded space-y-2 text-xs",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Customer:"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 629,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("strong", {
												className: "text-bone",
												children: selectedOrder.customerName
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 630,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 628,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Delivery Email:"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 633,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("strong", {
												className: "text-lavender font-mono",
												children: selectedOrder.customerEmail
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 634,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 632,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Ticket Tier:"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 637,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("strong", {
												className: "text-bone font-mono",
												children: [
													selectedOrder.quantity,
													"x ",
													selectedOrder.ticketName
												]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 638,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 636,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "Amount Paid:"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 643,
												columnNumber: 19
											}, this), /* @__PURE__ */ (void 0)("strong", {
												className: "text-amber-400 font-mono font-bold text-sm",
												children: ["KES ", selectedOrder.totalKes.toLocaleString()]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 644,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 642,
											columnNumber: 17
										}, this),
										selectedOrder.mpesaCode && /* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between border-t border-border/60 pt-1.5",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-muted-foreground",
												children: "M-Pesa Reference:"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 650,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)("strong", {
												className: "text-amber-300 font-mono font-bold",
												children: selectedOrder.mpesaCode
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 651,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 649,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 627,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "border border-emerald-500/40 bg-emerald-950/20 p-3 rounded text-xs text-bone-muted space-y-1",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-1.5 text-emerald-400 font-semibold font-mono",
										children: [/* @__PURE__ */ (void 0)(Mail, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 660,
											columnNumber: 19
										}, this), " Automated Delivery Dispatch"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 659,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("p", { children: [
										"Upon approval, cryptographic HMAC tickets are minted and automatically emailed to",
										" ",
										/* @__PURE__ */ (void 0)("strong", {
											className: "text-bone font-mono",
											children: selectedOrder.customerEmail
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 664,
											columnNumber: 19
										}, this),
										". The order status in Firestore will transition to",
										" ",
										/* @__PURE__ */ (void 0)("span", {
											className: "text-emerald-300 font-mono",
											children: "approved"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 666,
											columnNumber: 19
										}, this),
										"."
									] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 662,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 658,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-mono text-muted-foreground",
										children: "Verification Notes (Optional audit log):"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 671,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(Input, {
										placeholder: "e.g., Verified against statement ref #...",
										value: approvalNotes,
										onChange: (e) => setApprovalNotes(e.target.value),
										className: "bg-background border-border text-xs text-bone"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 674,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 670,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 626,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setSelectedOrder(null),
								disabled: isApproving,
								className: "text-muted-foreground hover:text-bone text-xs",
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 685,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "event",
								size: "sm",
								onClick: handleApproveOrder,
								disabled: isApproving,
								className: "text-xs",
								children: isApproving ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 703,
									columnNumber: 19
								}, this), "Approving & Sending Email..."] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 702,
									columnNumber: 17
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-4 h-4 mr-1.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 708,
									columnNumber: 19
								}, this), "Confirm Approval & Send Tickets"] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 707,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 694,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 684,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 614,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 613,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
				open: !!rejectingOrder,
				onOpenChange: (open) => !open && setRejectingOrder(null),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
					className: "border-border bg-card sm:max-w-md text-bone",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "font-display text-xl text-destructive-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "w-5 h-5 text-destructive" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 722,
								columnNumber: 15
							}, this), "Reject Order"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 721,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground font-mono",
							children: ["Order ", rejectingOrder?.orderNumber]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 725,
							columnNumber: 13
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 720,
							columnNumber: 11
						}, this),
						rejectingOrder && /* @__PURE__ */ (void 0)("div", {
							className: "space-y-4 py-2",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-bone-muted leading-relaxed",
								children: "Provide a reason for rejecting this order. The order will be marked as rejected in the central ledger."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 732,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (void 0)("label", {
										className: "text-[11px] font-mono text-muted-foreground",
										children: "Select or enter reason:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 738,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-1.5",
										children: [
											"M-Pesa transaction reference not found on merchant statement.",
											"Payment amount does not match order total.",
											"Duplicate transaction code already claimed.",
											"Transaction reversed or cancelled on Safaricom."
										].map((r, i) => /* @__PURE__ */ (void 0)("button", {
											type: "button",
											onClick: () => setRejectionReason(r),
											className: `w-full text-left text-xs p-2 rounded border transition-colors ${rejectionReason === r ? "bg-destructive/10 border-destructive/50 text-bone" : "bg-background/50 border-border text-muted-foreground hover:bg-background hover:text-bone"}`,
											children: r
										}, i, false, {
											fileName: _jsxFileName$1,
											lineNumber: 748,
											columnNumber: 21
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 741,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)(Textarea, {
										value: rejectionReason,
										onChange: (e) => setRejectionReason(e.target.value),
										placeholder: "Custom rejection reason...",
										className: "bg-background border-border text-xs text-bone h-20 mt-2"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 763,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 737,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 731,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
							className: "gap-2 sm:gap-0",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => setRejectingOrder(null),
								disabled: isRejecting,
								className: "text-muted-foreground hover:text-bone text-xs",
								children: "Cancel"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 774,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "destructive",
								size: "sm",
								onClick: handleRejectOrder,
								disabled: isRejecting,
								className: "text-xs",
								children: isRejecting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-3.5 h-3.5 mr-1.5 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 792,
									columnNumber: 19
								}, this), "Rejecting..."] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 791,
									columnNumber: 17
								}, this) : "Confirm Rejection"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 783,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 773,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 719,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 718,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 315,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/admin.tsx?tsr-split=component";
function AdminPage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProtectedAdminRoute, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminDashboardContent, {}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 7
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 10
	}, this);
}
function AdminDashboardContent() {
	const { user, role, signOut, switchTestRole } = useAdminAuth();
	const [mobileNavOpen, setMobileNavOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const [metrics, setMetrics] = (0, import_react.useState)(null);
	const [isLoadingMetrics, setIsLoadingMetrics] = (0, import_react.useState)(true);
	const fetchMetrics = async () => {
		setIsLoadingMetrics(true);
		try {
			const data = await (await fetch("/api/admin/overview")).json();
			if (data.success) setMetrics({
				totalRevenueKes: data.totalRevenueKes,
				totalTicketsSold: data.totalTicketsSold,
				checkedInCount: data.checkedInCount,
				remainingCapacity: data.remainingCapacity,
				activePromotionsCount: data.activePromotionsCount,
				activeScannersCount: data.activeScannersCount,
				hourlySalesTrend: data.hourlySalesTrend || []
			});
		} catch (err) {
			console.warn("Failed to load metrics:", err);
		} finally {
			setIsLoadingMetrics(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchMetrics();
	}, []);
	const handleSignOut = async () => {
		await signOut();
		toast.info("Signed out of Admin Portal");
	};
	const navItems = [
		{
			id: "overview",
			label: "Dashboard Overview",
			icon: LayoutDashboard
		},
		{
			id: "verifications",
			label: "M-Pesa Verification",
			icon: ShieldCheck,
			badge: "Pending"
		},
		{
			id: "analytics",
			label: "Live Page Analytics",
			icon: ChartColumn,
			badge: "Firebase"
		},
		{
			id: "tickets",
			label: "Ticket Management",
			icon: Ticket,
			badge: metrics ? `${metrics.totalTicketsSold}` : void 0
		},
		{
			id: "notifications",
			label: "Notification Gateway",
			icon: MessageSquare,
			badge: "WhatsApp & Email"
		},
		{
			id: "promotions",
			label: "Promotion Codes",
			icon: Tag,
			badge: metrics ? `${metrics.activePromotionsCount} Active` : void 0
		},
		{
			id: "scanners",
			label: "Gate Terminals",
			icon: QrCode,
			badge: metrics ? `${metrics.activeScannersCount} Active` : void 0
		},
		{
			id: "audit",
			label: "Audit Ledger",
			icon: FileText
		}
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-oxblood-darker lg:grid lg:grid-cols-[16rem_1fr] text-bone",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: `${mobileNavOpen ? "fixed inset-0 z-50 block" : "hidden"} border-r border-border/80 bg-card/95 p-5 backdrop-blur-md lg:static lg:block flex flex-col justify-between`,
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "flex items-center gap-2.5",
					"aria-label": "Return to public site",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveIcon, { className: "w-7 h-7 text-amber-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display text-lg text-bone tracking-wide block leading-none",
						children: "Verve & Co."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 132,
						columnNumber: 17
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5 block",
						children: "Admin Portal"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					className: "lg:hidden",
					variant: "ghost",
					size: "icon",
					"aria-label": "Close admin menu",
					onClick: () => setMobileNavOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "w-5 h-5 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 141,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 140,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 128,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "mt-8 space-y-1",
				children: [navItems.map(({ id, label, icon: Icon, badge }) => {
					const isActive = activeTab === id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => {
							setActiveTab(id);
							setMobileNavOpen(false);
						},
						className: `w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-sans rounded-none transition-colors ${isActive ? "bg-oxblood text-bone font-medium border-l-2 border-amber-400 shadow-sm" : "text-muted-foreground hover:bg-background/80 hover:text-bone"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `w-4 h-4 ${isActive ? "text-amber-400" : "text-lavender/60"}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 159,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: label }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 19
						}, this), badge && /* @__PURE__ */ (void 0)("span", {
							className: "text-[10px] font-mono bg-background/80 px-1.5 py-0.5 rounded border border-border text-lavender",
							children: badge
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 162,
							columnNumber: 29
						}, this)]
					}, id, true, {
						fileName: _jsxFileName,
						lineNumber: 154,
						columnNumber: 20
					}, this);
				}), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "pt-3 border-t border-border/50 space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/admin/scan",
						className: "w-full block",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							className: "w-full flex items-center justify-between px-3.5 py-2 text-xs font-sans text-amber-300 bg-amber-950/30 hover:bg-amber-950/50 border border-amber-500/30 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Camera, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 172,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Live Gate Scanner" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 173,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1 rounded",
								children: "LIVE"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 175,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/admin/reconciliation",
						className: "w-full block",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							className: "w-full flex items-center justify-between px-3.5 py-2 text-xs font-sans text-emerald-300 bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/30 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Receipt, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 184,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Reconciliation" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 185,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-1 rounded",
								children: "AUDIT"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 182,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 181,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 146,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-8 pt-4 border-t border-border/80 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between text-xs font-mono",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-muted-foreground truncate",
						children: user?.email
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 199,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 198,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "outline",
							size: "sm",
							className: "w-full text-[11px] font-mono border-border text-muted-foreground hover:text-bone h-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ExternalLink, { className: "w-3 h-3 mr-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 17
							}, this), "Public Site"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 204,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: handleSignOut,
						className: "text-[11px] font-mono text-red-400/80 hover:text-red-300 hover:bg-red-950/40 h-8 px-2",
						title: "Sign Out",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 210,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 209,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 202,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 197,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 125,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-w-0 flex flex-col min-h-screen",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
				className: "h-16 border-b border-border/80 bg-card/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "lg:hidden size-9",
						variant: "ghost",
						size: "icon",
						"aria-label": "Open admin menu",
						onClick: () => setMobileNavOpen(true),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { className: "w-5 h-5 text-bone" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 221,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "truncate font-display text-base sm:text-lg text-bone tracking-wide",
								children: "Hauntings of the Rift"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 227,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "hidden sm:inline text-xs text-muted-foreground font-mono",
								children: "· 31 Oct 2026"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 230,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[10px] text-muted-foreground font-mono truncate hidden sm:block",
							children: "Top Cliff Lounge, Nakuru · Official Organizer Console"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 220,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 sm:gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-1.5 border border-amber-500/50 bg-amber-950/40 px-2.5 py-1 rounded-none shadow-[0_0_12px_rgba(245,158,11,0.15)]",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "w-3.5 h-3.5 text-amber-400 animate-pulse" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[11px] font-mono font-bold uppercase tracking-wider text-amber-300",
							children: ["ROLE: ", role?.toUpperCase() || "ADMIN"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 245,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 243,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						size: "sm",
						onClick: fetchMetrics,
						className: "border-border text-lavender hover:text-bone text-xs h-8 px-2.5 hidden sm:flex items-center",
						title: "Refresh Dashboard",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: `w-3.5 h-3.5 ${isLoadingMetrics ? "animate-spin" : ""}` }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 251,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 250,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 241,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 219,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 p-4 sm:p-6 lg:p-8 space-y-6",
				children: [
					activeTab === "overview" && /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "border border-border bg-card p-5 space-y-2",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between text-muted-foreground",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-mono uppercase tracking-wider",
												children: "Gross Revenue"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 264,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)(CircleDollarSign, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 267,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 263,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "font-display text-3xl text-bone",
											children: ["KES ", metrics ? metrics.totalRevenueKes.toLocaleString() : "—"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 269,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-muted-foreground font-mono",
											children: "Direct M-Pesa Daraja 2.0 Settlement"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 272,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "border border-border bg-card p-5 space-y-2",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between text-muted-foreground",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-mono uppercase tracking-wider",
												children: "Passes Issued"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 279,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)(Ticket, { className: "w-4 h-4 text-lavender" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 282,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 278,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "font-display text-3xl text-bone",
											children: [metrics ? metrics.totalTicketsSold : "—", " Passes"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 284,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-muted-foreground font-mono",
											children: "Cryptographic HMAC QR Passes"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 287,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 277,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "border border-green-500/30 bg-card p-5 space-y-2",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between text-green-400",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-mono uppercase tracking-wider",
												children: "Gate Check-ins"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 294,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)(CircleCheck, { className: "w-4 h-4 text-green-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 297,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 293,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "font-display text-3xl text-green-300",
											children: [
												metrics ? metrics.checkedInCount : "—",
												" /",
												" ",
												metrics ? metrics.totalTicketsSold : "—"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 299,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-muted-foreground font-mono",
											children: "Admitted at Security Perimeters"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 303,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 292,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "border border-border bg-card p-5 space-y-2",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between text-muted-foreground",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "text-xs font-mono uppercase tracking-wider",
												children: "Available Capacity"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 310,
												columnNumber: 21
											}, this), /* @__PURE__ */ (void 0)(Users, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 313,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 309,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "font-display text-3xl text-bone",
											children: [metrics ? metrics.remainingCapacity : "—", " / 1,200"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 315,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-muted-foreground font-mono",
											children: "Max Venue Fire Marshall Limit"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 318,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 308,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 261,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "grid gap-6 xl:grid-cols-[1.6fr_1fr]",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "border border-border bg-card p-5 space-y-4",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
										className: "font-display text-lg text-bone flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(TrendingUp, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 331,
											columnNumber: 25
										}, this), "Hourly Ticket Sales Trend"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 330,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground font-mono mt-0.5",
										children: "Live checkout velocity on 31 October 2026"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 334,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 329,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)(Badge, {
										variant: "outline",
										className: "border-border text-[10px] font-mono",
										children: "Real-Time"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 338,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 328,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "mt-6 flex h-48 items-end gap-2 border-b border-l border-border/80 px-2 pb-2",
									children: (metrics?.hourlySalesTrend || [
										{
											hour: "10:00",
											sales: 12e3,
											count: 6
										},
										{
											hour: "12:00",
											sales: 24e3,
											count: 12
										},
										{
											hour: "14:00",
											sales: 48e3,
											count: 20
										},
										{
											hour: "16:00",
											sales: 85e3,
											count: 35
										},
										{
											hour: "18:00",
											sales: 14e4,
											count: 58
										},
										{
											hour: "20:00",
											sales: 22e4,
											count: 85
										},
										{
											hour: "22:00",
											sales: 31e4,
											count: 110
										}
									]).map((item, idx) => {
										const heightPercent = Math.max(12, Math.round(item.sales / 35e4 * 100));
										return /* @__PURE__ */ (void 0)("div", {
											className: "flex-1 flex flex-col items-center gap-1 group relative",
											children: [
												/* @__PURE__ */ (void 0)("div", {
													className: "opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-background border border-border px-2 py-1 text-[10px] font-mono text-bone whitespace-nowrap z-10 pointer-events-none",
													children: [
														"KES ",
														item.sales.toLocaleString(),
														" (",
														item.count,
														" tickets)"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 377,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "w-full bg-gradient-to-t from-oxblood via-oxblood/80 to-amber-500/80 hover:to-amber-400 transition-all rounded-t-none",
													style: { height: `${heightPercent}%` }
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 380,
													columnNumber: 27
												}, this),
												/* @__PURE__ */ (void 0)("span", {
													className: "text-[9px] font-mono text-muted-foreground",
													children: item.hour
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 383,
													columnNumber: 27
												}, this)
											]
										}, idx, true, {
											fileName: _jsxFileName,
											lineNumber: 375,
											columnNumber: 26
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "border border-border bg-card p-5 space-y-4",
								children: [
									/* @__PURE__ */ (void 0)("h2", {
										className: "font-display text-lg text-bone flex items-center gap-2",
										children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 394,
											columnNumber: 21
										}, this), "Quick Operations"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 393,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground font-mono",
										children: "Instant access to event administrator workflows."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 397,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "space-y-2 pt-2",
										children: [
											/* @__PURE__ */ (void 0)("button", {
												onClick: () => setActiveTab("analytics"),
												className: "w-full flex items-center justify-between p-3 border border-amber-500/30 bg-amber-950/20 hover:bg-amber-950/40 text-left transition-colors group",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
													className: "text-xs font-medium text-amber-300 group-hover:text-amber-200 transition-colors flex items-center gap-1.5",
													children: [/* @__PURE__ */ (void 0)(ChartColumn, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 405,
														columnNumber: 27
													}, this), /* @__PURE__ */ (void 0)("span", { children: "Live Page Analytics & Telemetry" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 406,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 404,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "text-[10px] text-muted-foreground font-mono",
													children: "View real-time visitors, telemetry streams, and checkout funnels from Firebase"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 408,
													columnNumber: 25
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 403,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "w-4 h-4 text-amber-400 group-hover:text-bone transition-transform group-hover:translate-x-0.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 413,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 402,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("button", {
												onClick: () => setActiveTab("tickets"),
												className: "w-full flex items-center justify-between p-3 border border-border/80 bg-background/60 hover:bg-background text-left transition-colors group",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
													className: "text-xs font-medium text-bone group-hover:text-amber-400 transition-colors",
													children: "Manage & Invalidate Passes"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 418,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "text-[10px] text-muted-foreground font-mono",
													children: "Search attendees, resend emails, or revoke admission"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 421,
													columnNumber: 25
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 417,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-bone transition-transform group-hover:translate-x-0.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 425,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 416,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("button", {
												onClick: () => setActiveTab("promotions"),
												className: "w-full flex items-center justify-between p-3 border border-border/80 bg-background/60 hover:bg-background text-left transition-colors group",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
													className: "text-xs font-medium text-bone group-hover:text-amber-400 transition-colors",
													children: "Launch Promotion Code"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 430,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "text-[10px] text-muted-foreground font-mono",
													children: "Configure flash sale percentage or fixed KES discounts"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 433,
													columnNumber: 25
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 429,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-bone transition-transform group-hover:translate-x-0.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 437,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 428,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("button", {
												onClick: () => setActiveTab("scanners"),
												className: "w-full flex items-center justify-between p-3 border border-border/80 bg-background/60 hover:bg-background text-left transition-colors group",
												children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("div", {
													className: "text-xs font-medium text-bone group-hover:text-amber-400 transition-colors",
													children: "Launch Gate Scanner Terminal"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 442,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("div", {
													className: "text-[10px] text-muted-foreground font-mono",
													children: "Simulate optical HMAC verification and duplicate check-in"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 445,
													columnNumber: 25
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 441,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-bone transition-transform group-hover:translate-x-0.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 449,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 440,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 401,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 392,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 325,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 259,
						columnNumber: 40
					}, this),
					activeTab === "analytics" && /* @__PURE__ */ (void 0)(AnalyticsLiveTab, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 457,
						columnNumber: 41
					}, this),
					activeTab === "verifications" && /* @__PURE__ */ (void 0)(ManualVerificationTab, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 460,
						columnNumber: 45
					}, this),
					activeTab === "tickets" && /* @__PURE__ */ (void 0)(TicketManagementTab, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 463,
						columnNumber: 39
					}, this),
					activeTab === "notifications" && /* @__PURE__ */ (void 0)(NotificationCenterTab, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 466,
						columnNumber: 45
					}, this),
					activeTab === "promotions" && /* @__PURE__ */ (void 0)(PromotionManagementTab, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 469,
						columnNumber: 42
					}, this),
					activeTab === "scanners" && /* @__PURE__ */ (void 0)(ScannerManagementTab, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 472,
						columnNumber: 40
					}, this),
					activeTab === "audit" && /* @__PURE__ */ (void 0)(AuditLogTab, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 475,
						columnNumber: 37
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 257,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 217,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 123,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPage as component };
