import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link, m as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as RefreshCw, M as OctagonAlert, S as Search, T as RotateCcw, X as FlashlightOff, Y as Flashlight, a as Users, bt as Camera, c as TriangleAlert, d as Ticket, h as Smartphone, i as Volume2, pt as CircleCheck, r as VolumeX, s as UserCheck, st as Clock, t as Zap, v as ShieldCheck, x as Send, xt as CameraOff } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as Html5QrcodeSupportedFormats, t as Html5Qrcode } from "../_libs/html5-qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.scan-D1QMRVGk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
/**
* Web Audio API and Haptic Feedback Engine for Gate Security Scanners
* Provides instant tactile and audio feedback for valid, duplicate, and invalid scans.
*/
var ScannerAudioEngine = class {
	audioCtx = null;
	getAudioContext() {
		if (typeof window === "undefined") return null;
		try {
			const AudioContextClass = window.AudioContext || window.webkitAudioContext;
			if (!this.audioCtx && AudioContextClass) this.audioCtx = new AudioContextClass();
			if (this.audioCtx && this.audioCtx.state === "suspended") this.audioCtx.resume().catch(() => {});
			return this.audioCtx;
		} catch {
			return null;
		}
	}
	/**
	* Play uplifting harmonic chime for valid admission pass
	*/
	playSuccessChime() {
		const ctx = this.getAudioContext();
		if (!ctx) return;
		try {
			const now = ctx.currentTime;
			const osc1 = ctx.createOscillator();
			const gain1 = ctx.createGain();
			osc1.type = "sine";
			osc1.frequency.setValueAtTime(880, now);
			gain1.gain.setValueAtTime(.15, now);
			gain1.gain.exponentialRampToValueAtTime(.001, now + .35);
			osc1.connect(gain1);
			gain1.connect(ctx.destination);
			osc1.start(now);
			osc1.stop(now + .35);
			const osc2 = ctx.createOscillator();
			const gain2 = ctx.createGain();
			osc2.type = "sine";
			osc2.frequency.setValueAtTime(1320, now + .08);
			gain2.gain.setValueAtTime(.2, now + .08);
			gain2.gain.exponentialRampToValueAtTime(.001, now + .5);
			osc2.connect(gain2);
			gain2.connect(ctx.destination);
			osc2.start(now + .08);
			osc2.stop(now + .5);
		} catch (e) {
			console.warn("Audio playback error:", e);
		}
		this.triggerHaptic([100]);
	}
	/**
	* Play duplicate/already scanned warning buzzer
	*/
	playDuplicateTone() {
		const ctx = this.getAudioContext();
		if (!ctx) return;
		try {
			const now = ctx.currentTime;
			const osc1 = ctx.createOscillator();
			const gain1 = ctx.createGain();
			osc1.type = "sawtooth";
			osc1.frequency.setValueAtTime(220, now);
			gain1.gain.setValueAtTime(.25, now);
			gain1.gain.exponentialRampToValueAtTime(.01, now + .25);
			osc1.connect(gain1);
			gain1.connect(ctx.destination);
			osc1.start(now);
			osc1.stop(now + .25);
			const osc2 = ctx.createOscillator();
			const gain2 = ctx.createGain();
			osc2.type = "sawtooth";
			osc2.frequency.setValueAtTime(165, now + .15);
			gain2.gain.setValueAtTime(.3, now + .15);
			gain2.gain.exponentialRampToValueAtTime(.01, now + .45);
			osc2.connect(gain2);
			gain2.connect(ctx.destination);
			osc2.start(now + .15);
			osc2.stop(now + .45);
		} catch (e) {
			console.warn("Audio playback error:", e);
		}
		this.triggerHaptic([
			200,
			100,
			200
		]);
	}
	/**
	* Play invalid / counterfeit alert tone
	*/
	playErrorTone() {
		const ctx = this.getAudioContext();
		if (!ctx) return;
		try {
			const now = ctx.currentTime;
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "square";
			osc.frequency.setValueAtTime(180, now);
			osc.frequency.linearRampToValueAtTime(120, now + .3);
			gain.gain.setValueAtTime(.2, now);
			gain.gain.exponentialRampToValueAtTime(.01, now + .35);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(now);
			osc.stop(now + .35);
		} catch (e) {
			console.warn("Audio playback error:", e);
		}
		this.triggerHaptic([
			300,
			100,
			300
		]);
	}
	triggerHaptic(pattern) {
		if (typeof window !== "undefined" && "navigator" in window && navigator.vibrate) try {
			navigator.vibrate(pattern);
		} catch {}
	}
};
var scannerAudio = new ScannerAudioEngine();
var _jsxFileName = "/app/applet/src/routes/admin.scan.tsx";
var Route = createFileRoute("/admin/scan")({ component: AdminScannerPage });
function AdminScannerPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("camera");
	const [cameraActive, setCameraActive] = (0, import_react.useState)(false);
	const [cameraFacing, setCameraFacing] = (0, import_react.useState)("environment");
	const [torchOn, setTorchOn] = (0, import_react.useState)(false);
	const [soundEnabled, setSoundEnabled] = (0, import_react.useState)(true);
	const [scannerReady, setScannerReady] = (0, import_react.useState)(false);
	const [manualCode, setManualCode] = (0, import_react.useState)("");
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [lastScanResult, setLastScanResult] = (0, import_react.useState)(null);
	const [staffName, setStaffName] = (0, import_react.useState)("Gate Security Staff");
	const [gateLocation, setGateLocation] = (0, import_react.useState)("Main Top Cliff Entrance");
	const [stats, setStats] = (0, import_react.useState)({
		totalIssued: 65,
		checkedInCount: 18,
		remainingValid: 47,
		admittedPercentage: 28
	});
	const [recentScans, setRecentScans] = (0, import_react.useState)([]);
	const [isWhatsAppSending, setIsWhatsAppSending] = (0, import_react.useState)(false);
	const [whatsAppSuccess, setWhatsAppSuccess] = (0, import_react.useState)(null);
	const scannerRef = (0, import_react.useRef)(null);
	const scannerElementId = "qr-reader-container";
	const fetchStats = async () => {
		try {
			const res = await fetch("/api/tickets/stats");
			if (res.ok) {
				const data = await res.json();
				setStats({
					totalIssued: data.totalIssued || 65,
					checkedInCount: data.checkedInCount || 18,
					remainingValid: data.remainingValid || 47,
					admittedPercentage: data.admittedPercentage || 28
				});
				if (data.recentScans) setRecentScans(data.recentScans);
			}
		} catch {}
	};
	(0, import_react.useEffect)(() => {
		fetchStats();
		const interval = setInterval(fetchStats, 1e4);
		return () => clearInterval(interval);
	}, []);
	const startCamera = async (facingMode = cameraFacing) => {
		try {
			if (scannerRef.current) try {
				await scannerRef.current.stop();
			} catch {}
			const html5QrCode = new Html5Qrcode(scannerElementId, {
				formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.CODE_128],
				verbose: false
			});
			scannerRef.current = html5QrCode;
			await html5QrCode.start({ facingMode }, {
				fps: 15,
				qrbox: {
					width: 260,
					height: 260
				},
				aspectRatio: 1
			}, (decodedText) => {
				handleScannedPayload(decodedText);
			}, () => {});
			setCameraActive(true);
			setScannerReady(true);
		} catch (err) {
			console.warn("Unable to start HTML5 camera:", err);
			setCameraActive(false);
			setScannerReady(false);
		}
	};
	const stopCamera = async () => {
		if (scannerRef.current && cameraActive) {
			try {
				await scannerRef.current.stop();
				scannerRef.current.clear();
			} catch {}
			setCameraActive(false);
			setTorchOn(false);
		}
	};
	const toggleCameraFacing = async () => {
		const nextFacing = cameraFacing === "environment" ? "user" : "environment";
		setCameraFacing(nextFacing);
		if (cameraActive) await startCamera(nextFacing);
	};
	const toggleFlashlight = async () => {
		if (!scannerRef.current || !cameraActive) return;
		try {
			const nextTorch = !torchOn;
			await scannerRef.current.applyVideoConstraints({ advanced: [{ torch: nextTorch }] });
			setTorchOn(nextTorch);
		} catch (err) {
			console.warn("Flashlight / Torch not supported on this device:", err);
		}
	};
	const handleScannedPayload = async (rawCode) => {
		if (isProcessing) return;
		setIsProcessing(true);
		let extractedCode = rawCode.trim();
		let extractedHash = "";
		try {
			if (rawCode.includes("http://") || rawCode.includes("https://")) {
				const parsedUrl = new URL(rawCode);
				const codeInPath = parsedUrl.pathname.split("/").pop();
				if (codeInPath && codeInPath !== "ticket") extractedCode = codeInPath;
				extractedHash = parsedUrl.searchParams.get("h") || "";
			}
		} catch {}
		try {
			const response = await fetch("/api/tickets/validate", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					ticket_code: extractedCode,
					qr_hash: extractedHash || void 0,
					event_id: "hauntings-of-the-rift-2026",
					staff_name: staffName,
					gate_location: gateLocation
				})
			});
			const data = await response.json();
			setLastScanResult(data);
			if (response.ok && data.success) {
				if (soundEnabled) scannerAudio.playSuccess();
			} else if (response.status === 409 || data.status === "already_used") {
				if (soundEnabled) scannerAudio.playWarning();
			} else if (soundEnabled) scannerAudio.playError();
			fetchStats();
		} catch {
			if (soundEnabled) scannerAudio.playError();
			setLastScanResult({
				success: false,
				status: "not_found",
				httpStatus: 500,
				message: "Network error connecting to gate validation server."
			});
		} finally {
			setTimeout(() => {
				setIsProcessing(false);
			}, 1800);
		}
	};
	const handleManualSubmit = (e) => {
		e.preventDefault();
		if (!manualCode.trim()) return;
		handleScannedPayload(manualCode);
	};
	const handleSendWhatsAppNotification = async (phone, attendeeName) => {
		if (!phone || isWhatsAppSending) return;
		setIsWhatsAppSending(true);
		setWhatsAppSuccess(null);
		try {
			if ((await fetch("/api/notifications/whatsapp", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					phone,
					templateType: "gate_alert",
					attendeeName,
					ticketCode: lastScanResult?.ticket?.ticketNumber
				})
			})).ok) setWhatsAppSuccess(`Check-in alert sent to ${phone}`);
		} catch {} finally {
			setIsWhatsAppSending(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (activeTab === "camera") startCamera(cameraFacing);
		else stopCamera();
		return () => {
			stopCamera();
		};
	}, [activeTab]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		id: "admin-scanner-view",
		className: "min-h-screen bg-[#07090E] text-slate-100 p-4 sm:p-6 lg:p-8",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-6xl mx-auto space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30 text-amber-400",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "w-6 h-6" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 345,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 344,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-2xl font-bold tracking-tight text-white flex items-center gap-2 font-serif",
							children: "Gate Check-in & Pass Scanner"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 348,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-slate-400",
							children: "Cryptographic ticket validation, duplicate detection, and live admissions"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 351,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 347,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 342,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								id: "toggle-sound-btn",
								onClick: () => setSoundEnabled(!soundEnabled),
								className: `px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition ${soundEnabled ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300" : "bg-slate-900 border-white/10 text-slate-400"}`,
								title: soundEnabled ? "Audio chime active" : "Audio muted",
								children: [soundEnabled ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Volume2, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 369,
									columnNumber: 31
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VolumeX, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 369,
									columnNumber: 65
								}, this), soundEnabled ? "Audio FX On" : "Muted"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 359,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/admin/tickets",
								className: "px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 transition",
								children: "Ticket Directory"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 373,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/admin/reconciliation",
								className: "px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 transition",
								children: "Reconciliation"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 380,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 358,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 341,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					id: "scanner-live-stats",
					className: "grid grid-cols-2 md:grid-cols-4 gap-3.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs text-slate-400 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total Admitted" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 393,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 394,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 392,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-2xl font-bold text-emerald-400",
									children: stats.checkedInCount
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 396,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-slate-400 mt-1",
									children: [stats.admittedPercentage, "% of sold passes"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 397,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 391,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs text-slate-400 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Remaining Valid" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 404,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Ticket, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 405,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 403,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-2xl font-bold text-white",
									children: stats.remainingValid
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 407,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-slate-400 mt-1",
									children: "Pending arrival at gate"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 408,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 402,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs text-slate-400 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Total Issued" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 413,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 414,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 412,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-2xl font-bold text-white",
									children: stats.totalIssued
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 416,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-slate-400 mt-1",
									children: "Authorized ledger tickets"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 417,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 411,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between text-xs text-slate-400 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Gate Station" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 422,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Zap, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 423,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 421,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-sm font-semibold text-white truncate",
									children: gateLocation
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 425,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-slate-400 mt-1 truncate",
									children: ["Staff: ", staffName]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 426,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 420,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 390,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-7 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/80 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-md",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between gap-2 mb-4 bg-slate-950/80 p-1.5 rounded-xl border border-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										id: "tab-camera-btn",
										onClick: () => setActiveTab("camera"),
										className: `flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${activeTab === "camera" ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Camera, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 446,
											columnNumber: 19
										}, this), "Camera Scanner"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 437,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										id: "tab-manual-btn",
										onClick: () => setActiveTab("manual"),
										className: `flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition ${activeTab === "manual" ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 458,
											columnNumber: 19
										}, this), "Manual Code Search"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 449,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 436,
									columnNumber: 15
								}, this),
								activeTab === "camera" && /* @__PURE__ */ (void 0)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "relative rounded-2xl overflow-hidden bg-black aspect-square max-h-[380px] flex items-center justify-center border border-white/10 shadow-inner",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												id: scannerElementId,
												className: "w-full h-full"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 467,
												columnNumber: 21
											}, this),
											cameraActive && /* @__PURE__ */ (void 0)("div", {
												className: "pointer-events-none absolute inset-0 border-2 border-orange-500/40 rounded-2xl flex flex-col justify-between p-6",
												children: [
													/* @__PURE__ */ (void 0)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (void 0)("div", { className: "w-8 h-8 border-t-2 border-l-2 border-orange-400" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 473,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("div", { className: "w-8 h-8 border-t-2 border-r-2 border-orange-400" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 474,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 472,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", { className: "w-full h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse shadow-[0_0_12px_#f97316]" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 476,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: "flex justify-between",
														children: [/* @__PURE__ */ (void 0)("div", { className: "w-8 h-8 border-b-2 border-l-2 border-orange-400" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 478,
															columnNumber: 27
														}, this), /* @__PURE__ */ (void 0)("div", { className: "w-8 h-8 border-b-2 border-r-2 border-orange-400" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 479,
															columnNumber: 27
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 477,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 471,
												columnNumber: 23
											}, this),
											!cameraActive && /* @__PURE__ */ (void 0)("div", {
												className: "text-center p-6 space-y-3",
												children: [
													/* @__PURE__ */ (void 0)(CameraOff, { className: "w-12 h-12 text-slate-500 mx-auto" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 486,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("p", {
														className: "text-sm text-slate-400",
														children: "Camera preview inactive or permission required"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 487,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ (void 0)("button", {
														onClick: () => startCamera(cameraFacing),
														className: "px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-semibold shadow-lg",
														children: "Activate Camera"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 490,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 485,
												columnNumber: 23
											}, this),
											isProcessing && /* @__PURE__ */ (void 0)("div", {
												className: "absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-2 z-20",
												children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: "w-8 h-8 text-orange-400 animate-spin" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 501,
													columnNumber: 25
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "text-xs font-medium uppercase tracking-wider",
													children: "Verifying HMAC Pass..."
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 502,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 500,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 466,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex items-center justify-between gap-2 pt-2",
										children: [/* @__PURE__ */ (void 0)("button", {
											id: "toggle-camera-btn",
											onClick: () => cameraActive ? stopCamera() : startCamera(cameraFacing),
											className: "px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 flex items-center gap-2 transition",
											children: [cameraActive ? /* @__PURE__ */ (void 0)(CameraOff, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 517,
												columnNumber: 25
											}, this) : /* @__PURE__ */ (void 0)(Camera, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 519,
												columnNumber: 25
											}, this), cameraActive ? "Stop Camera" : "Start Camera"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 511,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (void 0)("button", {
												id: "toggle-facing-btn",
												onClick: toggleCameraFacing,
												className: "p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition",
												title: "Switch Front/Rear Camera",
												children: /* @__PURE__ */ (void 0)(RotateCcw, { className: "w-4 h-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 531,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 525,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("button", {
												id: "toggle-torch-btn",
												onClick: toggleFlashlight,
												disabled: !cameraActive,
												className: `p-2.5 rounded-xl border transition ${torchOn ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_#f59e0b]" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-white/10"} ${!cameraActive ? "opacity-50 cursor-not-allowed" : ""}`,
												title: "Toggle Flashlight / Torch",
												children: torchOn ? /* @__PURE__ */ (void 0)(Flashlight, { className: "w-4 h-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 546,
													columnNumber: 27
												}, this) : /* @__PURE__ */ (void 0)(FlashlightOff, { className: "w-4 h-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 548,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 534,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 524,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 510,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 465,
									columnNumber: 17
								}, this),
								activeTab === "manual" && /* @__PURE__ */ (void 0)("form", {
									onSubmit: handleManualSubmit,
									className: "space-y-4 py-2",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (void 0)("label", {
												className: "text-xs font-semibold uppercase text-slate-400 tracking-wider",
												children: "Enter Ticket Pass Code or Order ID"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 560,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (void 0)("input", {
													id: "manual-ticket-input",
													type: "text",
													value: manualCode,
													onChange: (e) => setManualCode(e.target.value.toUpperCase()),
													placeholder: "e.g. HR-7892-4910 or HR-2026-9042",
													className: "w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-base tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 uppercase"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 564,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(Search, { className: "w-5 h-5 text-slate-500 absolute right-3.5 top-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 572,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 563,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-xs text-slate-500",
												children: "Supports full ticket numbers (HR-XXXX-XXXX) or Order Confirmation numbers."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 574,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 559,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("button", {
										id: "submit-manual-code-btn",
										type: "submit",
										disabled: !manualCode.trim() || isProcessing,
										className: "w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-semibold text-sm shadow-xl flex items-center justify-center gap-2 transition disabled:opacity-50",
										children: [isProcessing ? /* @__PURE__ */ (void 0)(RefreshCw, { className: "w-4 h-4 animate-spin" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 586,
											columnNumber: 23
										}, this) : /* @__PURE__ */ (void 0)(ShieldCheck, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 588,
											columnNumber: 23
										}, this), "Verify & Admit Pass"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 579,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 558,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 434,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-slate-400",
									children: "Staff Operator:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 599,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "text",
									value: staffName,
									onChange: (e) => setStaffName(e.target.value),
									className: "px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-white text-xs"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 600,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 598,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-slate-400",
									children: "Gate Location:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 608,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
									value: gateLocation,
									onChange: (e) => setGateLocation(e.target.value),
									className: "px-2.5 py-1 rounded-lg bg-slate-950 border border-white/10 text-white text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Main Top Cliff Entrance",
											children: "Main Top Cliff Entrance"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 614,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "VIP & Masquerade Fast-Track",
											children: "VIP & Masquerade Fast-Track"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 615,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
											value: "Backstage & Artist Gate",
											children: "Backstage & Artist Gate"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 616,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 609,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 607,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 597,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 433,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-5 space-y-4",
						children: [lastScanResult ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							id: "scan-result-card",
							className: `rounded-2xl p-6 border transition-all duration-300 shadow-2xl ${lastScanResult.success && lastScanResult.status === "valid" ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-100" : lastScanResult.status === "already_used" ? "bg-amber-950/40 border-amber-500/50 text-amber-100" : "bg-rose-950/40 border-rose-500/50 text-rose-100"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: `p-3 rounded-2xl ${lastScanResult.success && lastScanResult.status === "valid" ? "bg-emerald-500 text-black shadow-[0_0_20px_#10b981]" : lastScanResult.status === "already_used" ? "bg-amber-500 text-black shadow-[0_0_20px_#f59e0b]" : "bg-rose-500 text-white shadow-[0_0_20px_#ef4444]"}`,
									children: lastScanResult.success && lastScanResult.status === "valid" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-8 h-8" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 648,
										columnNumber: 23
									}, this) : lastScanResult.status === "already_used" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TriangleAlert, { className: "w-8 h-8" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 650,
										columnNumber: 23
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OctagonAlert, { className: "w-8 h-8" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 652,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 638,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: `inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-1 ${lastScanResult.success && lastScanResult.status === "valid" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : lastScanResult.status === "already_used" ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"}`,
										children: lastScanResult.success ? "ADMISSION GRANTED" : lastScanResult.status === "already_used" ? "DUPLICATE PASS DETECTED" : "ADMISSION REJECTED"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 657,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "text-lg font-bold truncate",
										children: lastScanResult.message
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 672,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 656,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 637,
								columnNumber: 17
							}, this), (lastScanResult.ticket || lastScanResult.attendee) && /* @__PURE__ */ (void 0)("div", {
								className: "mt-5 pt-4 border-t border-white/10 space-y-3 text-sm",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-slate-400",
											children: "Attendee Name:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 680,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-bold text-white text-base",
											children: lastScanResult.attendee?.name || lastScanResult.ticket?.attendeeName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 681,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 679,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-slate-400",
											children: "Pass Tier:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 687,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-semibold text-amber-300",
											children: lastScanResult.attendee?.tier || lastScanResult.ticket?.tierName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 688,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 686,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-slate-400",
											children: "Admits:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 694,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "px-2 py-0.5 rounded-md bg-white/10 font-mono font-bold text-white",
											children: [
												lastScanResult.attendee?.admitsCount || lastScanResult.ticket?.admitsCount || 1,
												" ",
												"Guest(s)"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 695,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 693,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-slate-400",
											children: "Ticket Number:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 704,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "font-mono text-xs text-slate-300",
											children: lastScanResult.ticket?.ticketNumber || "Verified"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 705,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 703,
										columnNumber: 21
									}, this),
									lastScanResult.checkInDetails && /* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-center text-xs",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-slate-400",
											children: "Scanned At:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 712,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: "text-slate-300",
											children: new Date(lastScanResult.checkInDetails.scannedAt).toLocaleTimeString("en-KE")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 713,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 711,
										columnNumber: 23
									}, this),
									lastScanResult.ticket?.buyerPhone && /* @__PURE__ */ (void 0)("div", {
										className: "pt-2",
										children: [/* @__PURE__ */ (void 0)("button", {
											onClick: () => handleSendWhatsAppNotification(lastScanResult.ticket?.buyerPhone || "", lastScanResult.ticket?.attendeeName || "Guest"),
											disabled: isWhatsAppSending,
											className: "w-full py-2 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-2 transition",
											children: [/* @__PURE__ */ (void 0)(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 734,
												columnNumber: 27
											}, this), isWhatsAppSending ? "Dispatching WhatsApp..." : `Send WhatsApp Gate Alert to ${lastScanResult.ticket?.buyerPhone}`]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 724,
											columnNumber: 25
										}, this), whatsAppSuccess && /* @__PURE__ */ (void 0)("p", {
											className: "text-[11px] text-emerald-400 text-center mt-1",
											children: ["✓ ", whatsAppSuccess]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 740,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 723,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 678,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 626,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/40 border border-white/10 rounded-2xl p-8 text-center space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Smartphone, { className: "w-12 h-12 text-slate-600 mx-auto" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 751,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "text-base font-semibold text-slate-300",
									children: "Ready to Scan"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 752,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-slate-400 max-w-xs mx-auto",
									children: "Align attendee digital QR pass within the camera frame or enter pass number manually."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 753,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 750,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-2xl p-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between border-b border-white/10 pb-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", {
									className: "text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "w-3.5 h-3.5 text-orange-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 764,
										columnNumber: 19
									}, this), "Recent Gate Scans Stream"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 763,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									onClick: fetchStats,
									className: "p-1 rounded text-slate-400 hover:text-white",
									title: "Refresh activity",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RefreshCw, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 772,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 767,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 762,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-2 max-h-[260px] overflow-y-auto pr-1",
								children: recentScans.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-slate-500 text-center py-4",
									children: "No gate scans recorded yet."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 778,
									columnNumber: 19
								}, this) : recentScans.map((scan) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-2.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "min-w-0 pr-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "font-semibold text-white truncate",
											children: scan.attendeeName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 788,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-slate-400 font-mono text-[11px]",
											children: [
												scan.ticketNumber,
												" • ",
												scan.tierName
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 789,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 787,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-right shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: `inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${scan.status === "valid" ? "bg-emerald-500/20 text-emerald-400" : scan.status === "duplicate" ? "bg-amber-500/20 text-amber-400" : "bg-rose-500/20 text-rose-400"}`,
											children: scan.status
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 794,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "text-[10px] text-slate-500 mt-0.5",
											children: new Date(scan.scannedAt).toLocaleTimeString("en-KE")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 805,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 793,
										columnNumber: 23
									}, this)]
								}, scan.id, true, {
									fileName: _jsxFileName,
									lineNumber: 783,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 776,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 761,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 623,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 431,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 339,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 335,
		columnNumber: 5
	}, this);
}
//#endregion
export { Route as n, AdminScannerPage as t };
