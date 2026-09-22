import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Et as ArrowLeft, K as KeyRound, Tt as ArrowRight, U as Lock, V as LogOut, _ as Shield, mt as CircleAlert, pt as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { r as VerveIcon } from "./verve-logo-BPLLpwqY.mjs";
import { n as PRESET_ACCOUNTS, r as useAdminAuth } from "./admin-auth-context-Bh46mYen.mjs";
import { t as Button } from "./button-BQ_Bevjg.mjs";
import { t as Input } from "./input-DkOfYy7N.mjs";
import { t as Label } from "./label-CxwSblzR.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.login-DR35XdO8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/admin.login.tsx?tsr-split=component";
function AdminLogin() {
	const navigate = useNavigate();
	const { signIn, signInWithGoogle, signOut, switchTestRole, user, role, isAuthenticated, isAdmin, isLoading } = useAdminAuth();
	const [email, setEmail] = (0, import_react.useState)("erastus.n.gathungu@gmail.com");
	const [password, setPassword] = (0, import_react.useState)("••••••••••••");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isGoogleSigningIn, setIsGoogleSigningIn] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!isLoading && isAuthenticated && isAdmin) {
			const timer = setTimeout(() => {
				navigate({ to: "/admin" });
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [
		isLoading,
		isAuthenticated,
		isAdmin,
		navigate
	]);
	const handleGoogleSignIn = async () => {
		setIsGoogleSigningIn(true);
		setErrorMessage(null);
		try {
			const res = await signInWithGoogle();
			if (res.success) {
				toast.success("Authenticated with Google Auth", { description: "Administrator session established" });
				navigate({ to: "/admin" });
			} else setErrorMessage(res.message || "Failed to sign in with Google.");
		} catch (err) {
			setErrorMessage(err instanceof Error ? err.message : "Google authentication error.");
		} finally {
			setIsGoogleSigningIn(false);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrorMessage(null);
		try {
			const res = await signIn(email, "admin");
			if (res.success) {
				toast.success("Authenticated as Event Administrator", { description: `Logged in as ${email}` });
				navigate({ to: "/admin" });
			} else setErrorMessage(res.message || "Failed to authenticate.");
		} catch {
			setErrorMessage("Authentication failed. Please verify credentials.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleQuickLogin = (targetRole) => {
		switchTestRole(targetRole);
		const account = PRESET_ACCOUNTS[targetRole];
		toast.success(`Active profile set to: ${targetRole.toUpperCase()}`, { description: account.email });
		if (targetRole === "admin") navigate({ to: "/admin" });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-oxblood-darker flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] bg-oxblood/20 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 99,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute bottom-10 right-10 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 100,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-center mb-8 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/",
						className: "inline-flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveIcon, { className: "w-8 h-8 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-display text-2xl text-bone tracking-wide",
							children: "Verve & Co."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 106,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 104,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "font-display text-3xl sm:text-4xl text-bone tracking-tight",
						children: "Admin Portal Authentication"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs uppercase tracking-widest text-muted-foreground font-mono mt-1",
						children: "Hauntings of the Rift · Operations & Access Control Gateway"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-full max-w-md border border-lavender/20 bg-card/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative z-10",
				children: [
					isAuthenticated && isAdmin && /* @__PURE__ */ (void 0)("div", {
						className: "mb-6 p-4 border border-emerald-500/40 bg-emerald-950/40 text-emerald-200 text-xs rounded-none",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2 font-semibold text-emerald-300 mb-1",
								children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 15
								}, this), "Active Admin Session Detected"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 120,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-[11px] text-emerald-200/80 mb-3",
								children: [
									"Signed in as ",
									/* @__PURE__ */ (void 0)("span", {
										className: "font-mono text-emerald-100",
										children: user?.email
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 125,
										columnNumber: 28
									}, this),
									" (",
									user?.name || "Administrator",
									")."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 124,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									onClick: () => navigate({ to: "/admin" }),
									className: "bg-emerald-600 hover:bg-emerald-500 text-bone text-xs font-mono h-8 flex-1",
									children: ["Go to Dashboard", /* @__PURE__ */ (void 0)(ArrowRight, { className: "w-3.5 h-3.5 ml-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 132,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)(Button, {
									size: "sm",
									variant: "outline",
									onClick: signOut,
									className: "border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/60 text-xs h-8",
									children: [/* @__PURE__ */ (void 0)(LogOut, { className: "w-3.5 h-3.5 mr-1" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 17
									}, this), "Sign Out"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 127,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 40
					}, this),
					errorMessage && /* @__PURE__ */ (void 0)("div", {
						className: "mb-5 p-3.5 border border-red-500/50 bg-red-950/40 flex items-start gap-3 text-red-200 text-xs",
						children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "w-4 h-4 text-red-400 shrink-0 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 142,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (void 0)("p", {
								className: "font-medium text-red-300",
								children: "Authentication Alert"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 144,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-[11px] leading-relaxed text-red-200/90",
								children: errorMessage
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 145,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 141,
						columnNumber: 26
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3 mb-5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							onClick: handleGoogleSignIn,
							disabled: isGoogleSigningIn || isSubmitting,
							className: "w-full bg-white text-stone-900 hover:bg-stone-100 font-sans tracking-normal h-11 border border-stone-300 shadow-sm flex items-center justify-center gap-3 transition-colors active:scale-[0.99]",
							children: isGoogleSigningIn ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-medium flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-3.5 h-3.5 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 153,
									columnNumber: 17
								}, this), "Signing in with Google..."]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 152,
								columnNumber: 34
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
								className: "w-4 h-4 shrink-0",
								viewBox: "0 0 24 24",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "#4285F4",
										d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 157,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "#34A853",
										d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 158,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "#FBBC05",
										d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 159,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
										fill: "#EA4335",
										d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 160,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 156,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs font-semibold",
								children: "Sign In with Google"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 162,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 155,
								columnNumber: 25
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 my-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px bg-border/80 flex-1" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 167,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground",
									children: "or organizer credentials"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 168,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-px bg-border/80 flex-1" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 171,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 166,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 150,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleSubmit,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "admin-email",
									className: "text-xs text-lavender uppercase font-mono tracking-wider",
									children: "Administrator Email"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 177,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "admin-email",
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "admin@verve.co.ke",
										required: true,
										className: "bg-background border-border text-bone font-mono text-sm pl-9"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 181,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 182,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
										htmlFor: "admin-pass",
										className: "text-xs text-lavender uppercase font-mono tracking-wider",
										children: "Access Token / Password"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 188,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-[10px] text-muted-foreground font-mono",
										children: "256-Bit Encrypted"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 191,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
										id: "admin-pass",
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "••••••••••••",
										required: true,
										className: "bg-background border-border text-bone font-mono text-sm pl-9"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 194,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 195,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 193,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 186,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "submit",
								disabled: isSubmitting,
								className: "w-full bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 font-sans tracking-wide mt-2 h-11",
								children: isSubmitting ? "Authenticating Credentials..." : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Access Management Console" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 201,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 202,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 200,
									columnNumber: 63
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 pt-6 border-t border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-3 text-center",
							children: "One-Click Testing Accounts"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => handleQuickLogin("admin"),
								className: "text-xs font-mono border-border bg-background/50 hover:bg-card text-lavender hover:text-bone h-9",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "w-3.5 h-3.5 mr-1.5 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 15
								}, this), "Organizer (Superadmin)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 213,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => handleQuickLogin("scanner"),
								className: "text-xs font-mono border-border bg-background/50 hover:bg-card text-lavender hover:text-bone h-9",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "w-3.5 h-3.5 mr-1.5 text-blue-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 218,
									columnNumber: 15
								}, this), "Gate Staff (Scanner)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 208,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-6 flex items-start gap-2 text-[11px] text-muted-foreground font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Protected by Cloud Firestore access rules, rate-limited tokens, and immutable audit logs." }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 227,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 225,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 117,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-6 text-center relative z-10",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-bone transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "w-3.5 h-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Return to Hauntings of the Rift Ticket Experience" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 235,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 234,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
				className: "mt-8 text-center text-xs text-muted-foreground font-mono relative z-10",
				children: "Verve & Co. Operational Systems · Nakuru, Kenya · 2026"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 241,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 97,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminLogin as component };
