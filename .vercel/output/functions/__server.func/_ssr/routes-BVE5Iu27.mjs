import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trigger2, i as Root2, n as Header$1, r as Item, t as Content2 } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { Dt as ArrowDown, L as MessageCircle, N as Moon, R as Menu, Tt as ArrowRight, _t as ChevronDown, a as Users, b as Share2, ct as Clock3, et as Facebook, g as Shirt, i as Volume2, m as Sparkles, n as X, ot as Copy, vt as Check, wt as ArrowUpRight, z as MapPin } from "../_libs/lucide-react.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as VervePresenterBadge, i as VerveLogo, r as VerveIcon } from "./verve-logo-BPLLpwqY.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-BQ_Bevjg.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BVE5Iu27.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var rift_night_default = "/assets/rift-night-BRKvgY7C.jpg";
var _jsxFileName$5 = "/app/applet/src/components/ui/accordion.tsx";
var Accordion = Root2;
var AccordionItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item, {
	ref,
	className: cn("border-b", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 13,
	columnNumber: 3
}, void 0));
AccordionItem.displayName = "AccordionItem";
var AccordionTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Header$1, {
	className: "flex",
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trigger2, {
		ref,
		className: cn("flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" }, void 0, false, {
			fileName: _jsxFileName$5,
			lineNumber: 31,
			columnNumber: 7
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$5,
		lineNumber: 22,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
AccordionTrigger.displayName = Trigger2.displayName;
var AccordionContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
	...props,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("pb-4 pt-0", className),
		children
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 46,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$5,
	lineNumber: 41,
	columnNumber: 3
}, void 0));
AccordionContent.displayName = Content2.displayName;
var _jsxFileName$4 = "/app/applet/src/components/ui/sheet.tsx";
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetClose = DialogClose;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 22,
	columnNumber: 3
}, void 0));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetOverlay, {}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 62,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 65,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 66,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 64,
		columnNumber: 7
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$4,
	lineNumber: 63,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$4,
	lineNumber: 61,
	columnNumber: 3
}, void 0));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 75,
	columnNumber: 3
}, void 0);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 80,
	columnNumber: 3
}, void 0);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 91,
	columnNumber: 3
}, void 0));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$4,
	lineNumber: 103,
	columnNumber: 3
}, void 0));
SheetDescription.displayName = DialogDescription.displayName;
var _jsxFileName$3 = "/app/applet/src/components/event/countdown.tsx";
var eventTime = (/* @__PURE__ */ new Date("2026-10-31T16:00:00+03:00")).getTime();
function Countdown({ compact = false }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [remaining, setRemaining] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		setRemaining(Math.max(0, eventTime - Date.now()));
		const timer = window.setInterval(() => {
			setRemaining(Math.max(0, eventTime - Date.now()));
		}, 1e3);
		return () => window.clearInterval(timer);
	}, []);
	const values = [
		[mounted ? Math.floor(remaining / 864e5) : 0, "days"],
		[mounted ? Math.floor(remaining / 36e5 % 24) : 0, "hrs"],
		[mounted ? Math.floor(remaining / 6e4 % 60) : 0, "min"],
		[mounted ? Math.floor(remaining / 1e3 % 60) : 0, "sec"]
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid grid-cols-4 divide-x divide-bone/20 border-y border-bone/20",
		"aria-label": "Countdown to the event",
		children: values.map(([value, label]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: compact ? "px-2 py-2 text-center" : "px-2 py-3 text-center sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				suppressHydrationWarning: true,
				className: compact ? "font-display text-2xl text-bone" : "font-display text-3xl text-bone sm:text-5xl",
				children: mounted ? String(value).padStart(2, "0") : "--"
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 35,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 45,
				columnNumber: 11
			}, this)]
		}, label, true, {
			fileName: _jsxFileName$3,
			lineNumber: 31,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 26,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/event/share-actions.tsx";
var text = "I’m going to Hauntings of the Rift! 31 October • Top Cliff Lounge, Nakuru. Are you coming?";
function ShareActions() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const share = async () => {
		const url = window.location.href;
		if (navigator.share) await navigator.share({
			title: "Hauntings of the Rift",
			text,
			url
		});
		else window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank", "noopener,noreferrer");
	};
	const copy = async () => {
		await navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1800);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-wrap gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "event",
				size: "xl",
				onClick: share,
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageCircle, {}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 28,
					columnNumber: 9
				}, this), " WhatsApp"]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 27,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "spectral",
				size: "xl",
				onClick: copy,
				children: [
					copied ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 31,
						columnNumber: 19
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, {}, void 0, false, {
						fileName: _jsxFileName$2,
						lineNumber: 31,
						columnNumber: 31
					}, this),
					" ",
					copied ? "Copied" : "Copy link"
				]
			}, void 0, true, {
				fileName: _jsxFileName$2,
				lineNumber: 30,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "spectral",
				size: "icon",
				className: "min-h-12 min-w-12",
				"aria-label": "Share on Facebook",
				onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank", "noopener,noreferrer"),
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Facebook, {}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 46,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 33,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "spectral",
				size: "icon",
				className: "min-h-12 min-w-12",
				"aria-label": "Open share menu",
				onClick: share,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, {}, void 0, false, {
					fileName: _jsxFileName$2,
					lineNumber: 55,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$2,
				lineNumber: 48,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$2,
		lineNumber: 26,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "/app/applet/src/components/event/ticket-card.tsx";
function TicketCard({ ticket, featured = false }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
		className: `group relative flex min-h-80 flex-col justify-between overflow-hidden border p-6 transition-transform hover:-translate-y-1 ${featured ? "border-primary bg-oxblood" : "border-border bg-card"}`,
		children: [
			featured && /* @__PURE__ */ (void 0)("span", {
				className: "absolute right-0 top-0 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground",
				children: "Best crew value"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 13,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, {
					className: "mb-8 size-5 text-lavender",
					"aria-hidden": "true"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 18,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-3xl font-semibold text-bone",
					children: ticket.name
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 19,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm uppercase tracking-widest text-muted-foreground",
					children: ticket.people
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 20,
					columnNumber: 9
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 17,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-5 border-t border-bone/15 pt-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-sm text-bone-muted",
						children: "KES"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 26,
						columnNumber: 11
					}, this),
					" ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
						className: "font-display text-4xl text-bone",
						children: ticket.price.toLocaleString()
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 27,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: ticket.note
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 30,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 25,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				asChild: true,
				variant: featured ? "bone" : "event",
				size: "xl",
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/checkout",
					search: { ticket: ticket.name.toLowerCase().replaceAll(" ", "-") },
					children: ["Get ticket ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowUpRight, {}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 34,
						columnNumber: 24
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 33,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 32,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 24,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 9,
		columnNumber: 5
	}, this);
}
function generateEventJsonLd(options = {}) {
	const siteUrl = options.url || "https://hauntingsoftherift.co.ke";
	return {
		"@context": "https://schema.org",
		"@type": "Event",
		name: "Hauntings of the Rift — Halloween Nightlife 2026",
		description: "A premium Halloween nightlife and sensory masquerade experience in Nakuru, presented by Verve & Co. Featuring spine-chilling immersive audio, live DJs, and curated cocktail activations at Top Cliff Lounge.",
		image: [options.imageUrl || `${siteUrl}/rift-night.jpg`],
		startDate: "2026-10-31T16:00:00+03:00",
		endDate: "2026-11-01T04:00:00+03:00",
		eventStatus: "https://schema.org/EventScheduled",
		eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
		location: {
			"@type": "Place",
			name: "Top Cliff Lounge",
			address: {
				"@type": "PostalAddress",
				streetAddress: "Nakuru-Nairobi Highway, Free Area",
				addressLocality: "Nakuru",
				addressRegion: "Rift Valley",
				postalCode: "20100",
				addressCountry: "KE"
			},
			geo: {
				"@type": "GeoCoordinates",
				latitude: -.2833,
				longitude: 36.0667
			}
		},
		offers: {
			"@type": "AggregateOffer",
			url: `${siteUrl}/#tickets`,
			priceCurrency: "KES",
			lowPrice: "1000",
			highPrice: "6500",
			offerCount: "4",
			availability: "https://schema.org/InStock",
			validFrom: "2026-08-01T00:00:00+03:00",
			offers: [
				{
					"@type": "Offer",
					name: "Early Bird",
					price: "1000",
					priceCurrency: "KES",
					availability: "https://schema.org/InStock",
					url: `${siteUrl}/checkout?tier=early-bird`
				},
				{
					"@type": "Offer",
					name: "General Admission",
					price: "2500",
					priceCurrency: "KES",
					availability: "https://schema.org/InStock",
					url: `${siteUrl}/checkout?tier=general-admission`
				},
				{
					"@type": "Offer",
					name: "Couple Pass",
					price: "4500",
					priceCurrency: "KES",
					availability: "https://schema.org/InStock",
					url: `${siteUrl}/checkout?tier=couple-pass`
				},
				{
					"@type": "Offer",
					name: "Hellfire VIP",
					price: "6500",
					priceCurrency: "KES",
					availability: "https://schema.org/InStock",
					url: `${siteUrl}/checkout?tier=hellfire-vip`
				}
			]
		},
		organizer: {
			"@type": "Organization",
			name: "Verve & Co.",
			url: "https://verve.co.ke",
			logo: `${siteUrl}/favicon.svg`
		},
		performer: [{
			"@type": "PerformingGroup",
			name: "Verve Resident DJs & Visual Artists"
		}],
		typicalAgeRange: "21+"
	};
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
var tickets = [
	{
		name: "Early Bird",
		price: 1e3,
		people: "Single entry",
		note: "Limited release pricing"
	},
	{
		name: "Couple",
		price: 1800,
		people: "Entry for two",
		note: "Arrive together"
	},
	{
		name: "Group of Four",
		price: 3600,
		people: "Entry for four",
		note: "Bring the whole crew"
	}
];
var nav = [
	["Experience", "#experience"],
	["Tickets", "#tickets"],
	["Venue", "#venue"],
	["FAQ", "#faq"]
];
var heroFacts = [
	["31 October 2026", Clock3],
	["Top Cliff Lounge · Nakuru", MapPin],
	["4 PM — late", Moon]
];
var experiences = [
	[
		"01",
		"Atmosphere",
		"A dark, cinematic setting inspired by the Rift after hours.",
		Sparkles
	],
	[
		"02",
		"Music",
		"A nightlife soundtrack. Line-up details will be announced by the organizers.",
		Volume2
	],
	[
		"03",
		"Costumes",
		"The brief is simple: arrive wickedly fabulous.",
		Shirt
	],
	[
		"04",
		"Social energy",
		"Come as a couple or gather a crew of four.",
		Users
	]
];
var faqs = [
	["Who can attend?", "This is an 18+ event."],
	["What is the dress code?", "Wickedly Fabulous."],
	["Where is the event?", "Top Cliff Lounge, Nakuru-Nairobi Highway, Free Area, Nakuru."],
	["What time does it start?", "Doors open at 4 PM and the event continues till late."],
	["How much are tickets?", "Early Bird is KES 1,000, Couple is KES 1,800, and Group of Four is KES 3,600."],
	["How do I buy a ticket?", "Online purchase will be connected when the M-Pesa ticketing backend is ready."],
	["What happens after payment?", "This information will be updated by the organizers."],
	["Can I get a refund?", "This information will be updated by the organizers."]
];
function Header() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "absolute inset-x-0 top-0 z-30 border-b border-bone/10 bg-background/35 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							className: "flex items-center gap-2.5 transition-opacity hover:opacity-90",
							"aria-label": "Hauntings of the Rift - Home",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveIcon, { className: "size-8 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-display text-lg sm:text-xl font-bold tracking-tight text-bone leading-none",
									children: "H/R"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 40,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-mono",
									children: "Verve & Co."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 43,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 39,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 37,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden sm:block h-6 w-px bg-border/60 mx-1" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, { className: "hidden md:inline-flex" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 49,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
					className: "hidden items-center gap-7 lg:flex",
					"aria-label": "Primary navigation",
					children: [nav.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						className: "text-sm font-semibold uppercase tracking-widest text-bone-muted hover:text-bone",
						href,
						children: label
					}, href, false, {
						fileName: _jsxFileName,
						lineNumber: 52,
						columnNumber: 39
					}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "event",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/checkout",
							children: "Buy tickets"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 56,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 55,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						className: "min-h-11 min-w-11 lg:hidden",
						variant: "spectral",
						size: "icon",
						"aria-label": "Open menu",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetContent, {
					className: "border-oxblood bg-background",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveLogo, {
							variant: "horizontal",
							size: "sm",
							showCo: true
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 67,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTitle, {
							className: "font-display text-2xl text-bone mt-2",
							children: "Hauntings of the Rift"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 66,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
						className: "mt-8 grid gap-2",
						children: [nav.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetClose, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
								className: "border-b border-border py-4 text-xl uppercase text-bone",
								href,
								children: label
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 74,
								columnNumber: 19
							}, this)
						}, href, false, {
							fileName: _jsxFileName,
							lineNumber: 73,
							columnNumber: 43
						}, this)), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "event",
							size: "xl",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/checkout",
								children: "Buy tickets"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 79,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 72,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 59,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 10
	}, this);
}
function MobileTicketBar({ visible }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: `fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] transition-transform lg:hidden ${visible ? "translate-y-0" : "translate-y-full"}`,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			asChild: true,
			variant: "event",
			size: "xl",
			className: "w-full shadow-2xl",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/checkout",
				children: ["Buy tickets — from KES 1,000 ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 40
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 93,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 92,
		columnNumber: 10
	}, this);
}
function Index() {
	const heroRef = (0, import_react.useRef)(null);
	const [pastHero, setPastHero] = (0, import_react.useState)(false);
	const eventJsonLd = generateEventJsonLd();
	(0, import_react.useEffect)(() => {
		const observer = new IntersectionObserver(([entry]) => setPastHero(!entry?.isIntersecting), { threshold: .12 });
		if (heroRef.current) observer.observe(heroRef.current);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "bg-background pb-20 text-foreground lg:pb-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify(eventJsonLd) }
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 112,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Header, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 115,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				ref: heroRef,
				id: "home",
				className: "poster-grain relative flex min-h-[92svh] items-end overflow-hidden border-b border-oxblood",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: rift_night_default,
						alt: "A moonlit garden venue beneath a crimson Rift Valley sky",
						width: 1536,
						height: 1024,
						fetchPriority: "high",
						className: "absolute inset-0 size-full object-cover object-[62%_center] opacity-80"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 117,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_78%,transparent)_44%,color-mix(in_oklab,var(--oxblood)_35%,transparent)_100%)]" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 118,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "fog-drift absolute -left-1/4 top-1/3 h-40 w-2/3 rounded-full bg-bone/10 blur-3xl" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative z-10 mx-auto w-full max-w-7xl px-4 pb-9 pt-28 sm:px-6 sm:pb-14 lg:px-8",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "max-w-4xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mb-4 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VervePresenterBadge, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 123,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs font-bold uppercase tracking-[.35em] text-lavender",
										children: "Halloween in Nakuru"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 124,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 122,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
									className: "max-w-3xl text-6xl font-semibold leading-[.78] text-bone sm:text-8xl lg:text-[8.2rem]",
									children: ["Hauntings ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "block text-bone-muted",
										children: "of the Rift"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 129,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 128,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-5 font-display text-xl italic text-bone sm:text-3xl",
									children: "Something is stirring beneath Nakuru."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 131,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-6 grid max-w-3xl gap-px bg-bone/20 sm:grid-cols-3",
									children: heroFacts.map(([text, Icon]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex min-h-12 items-center gap-3 bg-background/80 px-4 py-3 text-sm font-bold uppercase tracking-widest text-bone",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-4 text-lavender" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 136,
											columnNumber: 19
										}, this), text]
									}, text, true, {
										fileName: _jsxFileName,
										lineNumber: 135,
										columnNumber: 48
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 134,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-5 max-w-xl",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Countdown, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "mt-6 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										asChild: true,
										variant: "event",
										size: "xl",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
											to: "/checkout",
											children: ["Buy tickets ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 146,
												columnNumber: 31
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 145,
											columnNumber: 17
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 144,
										columnNumber: 15
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										variant: "spectral",
										size: "xl",
										onClick: () => document.querySelector("#share")?.scrollIntoView({ behavior: "smooth" }),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Share2, {}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 152,
											columnNumber: 17
										}, this), " Share event"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 149,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
							href: "#experience",
							"aria-label": "Scroll to event experience",
							className: "absolute bottom-8 right-8 hidden size-12 place-items-center border border-bone/30 text-bone lg:grid",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowDown, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 116,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "border-b border-border bg-oxblood",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-bone/15 sm:grid-cols-4 sm:divide-y-0",
					children: [
						["18+", "Admission"],
						["Wickedly Fabulous", "Dress code"],
						["KES 1,000", "Tickets from"],
						["31 Oct", "Saturday"]
					].map(([big, small]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "px-4 py-6 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "font-display text-2xl text-bone",
							children: big
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-1 text-xs uppercase tracking-widest text-bone-muted",
							children: small
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 166,
							columnNumber: 15
						}, this)]
					}, small, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 149
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 162,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "experience",
				className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-12 lg:grid-cols-[.8fr_1.4fr]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-bold uppercase tracking-[.3em] text-lavender",
							children: "What awaits"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-3 text-5xl text-bone sm:text-6xl",
							children: [
								"One night.",
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 177,
									columnNumber: 15
								}, this),
								"A different Nakuru."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-5 max-w-md text-lg text-muted-foreground",
							children: "A sophisticated Halloween gathering shaped by atmosphere, style, sound and the people you bring with you."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 173,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid gap-px bg-border sm:grid-cols-2",
						children: experiences.map(([n, title, copy, Icon]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							className: "min-h-64 bg-card p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-start justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-xs text-lavender",
										children: n
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 187,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "size-5 text-bone-muted" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 188,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 186,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-16 text-3xl text-bone",
									children: title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 190,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-3 text-muted-foreground",
									children: copy
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 17
								}, this)
							]
						}, title, true, {
							fileName: _jsxFileName,
							lineNumber: 185,
							columnNumber: 58
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 184,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 172,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 171,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "tickets",
				className: "border-y border-border bg-card/45 px-4 py-20 sm:px-6 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto max-w-7xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-bold uppercase tracking-[.3em] text-lavender",
								children: "Secure your place"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 201,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-2 text-5xl text-bone sm:text-6xl",
								children: "Choose your ticket"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 200,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "max-w-sm text-muted-foreground",
								children: "Select a ticket to continue to the frontend checkout preview. Payments are not connected yet."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 206,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 199,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "grid gap-4 lg:grid-cols-3",
							children: tickets.map((ticket, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TicketCard, {
								ticket,
								featured: i === 2
							}, ticket.name, false, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 41
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-8 border border-dashed border-lavender/40 bg-lavender/5 p-5",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "border border-lavender px-2 py-1 text-xs font-bold uppercase text-lavender",
											children: "Promotion system preview"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 218,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "mt-3 text-2xl text-bone",
										children: "Flash-sale module ready for real inventory data"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 222,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-1 text-muted-foreground",
										children: "Sale price, availability, countdown and remaining-ticket progress stay hidden until organizers publish verified promotion data."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 225,
										columnNumber: 17
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									variant: "spectral",
									size: "xl",
									disabled: true,
									children: "Inactive"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 198,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 197,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "share",
				className: "poster-grain relative overflow-hidden bg-oxblood px-4 py-20 sm:px-6 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-bold uppercase tracking-[.3em] text-lavender",
							children: "Who are you going with?"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 241,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-3 max-w-3xl text-6xl leading-[.85] text-bone sm:text-8xl",
							children: "Bring your crew."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 244,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-5 max-w-xl text-lg text-bone-muted",
							children: "Plans are better when the group chat is involved. Send the date. Pick your looks. Meet beneath the Rift."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 247,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mb-4 text-sm uppercase tracking-widest text-bone-muted",
						children: "Share this event"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 253,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShareActions, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 252,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 239,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 238,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "venue",
				className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "gothic-frame grid overflow-hidden lg:grid-cols-[.9fr_1.1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-7 sm:p-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "size-7 text-lavender" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-12 text-xs font-bold uppercase tracking-[.3em] text-lavender",
								children: "The gathering place"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "mt-3 text-5xl text-bone",
								children: "Top Cliff Lounge"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 268,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-4 max-w-md text-lg text-muted-foreground",
								children: "Nakuru-Nairobi Highway, Free Area, Nakuru"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								asChild: true,
								variant: "event",
								size: "xl",
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
									href: "https://www.google.com/maps/search/?api=1&query=Top+Cliff+Lounge+Nakuru",
									target: "_blank",
									rel: "noreferrer",
									children: ["Get directions ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 274,
										columnNumber: 32
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 273,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 272,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 263,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative min-h-72 overflow-hidden border-t border-border lg:border-l lg:border-t-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: rift_night_default,
								alt: "Night view evoking Top Cliff Lounge event setting",
								loading: "lazy",
								width: 1536,
								height: 1024,
								className: "absolute inset-0 size-full object-cover opacity-65 grayscale"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-oxblood/30" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 280,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "absolute bottom-6 left-6 border-l-2 border-lavender pl-4 text-sm uppercase tracking-widest text-bone",
								children: [
									"Nakuru, Kenya",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("br", {}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 283,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-muted-foreground",
										children: "0.3031° S · 36.0800° E"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 284,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 278,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 262,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 261,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				id: "faq",
				className: "border-y border-border bg-card/45 px-4 py-20 sm:px-6 lg:py-28",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-bold uppercase tracking-[.3em] text-lavender",
						children: "Know before you go"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 293,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-3 text-5xl text-bone",
						children: "Questions from the crypt."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 296,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 292,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Accordion, {
						type: "single",
						collapsible: true,
						children: faqs.map(([q, a]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionItem, {
							value: q,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionTrigger, {
								className: "py-6 text-left text-lg text-bone hover:no-underline",
								children: q
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 300,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AccordionContent, {
								className: "pb-6 text-base text-muted-foreground",
								children: a
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 17
							}, this)]
						}, q, true, {
							fileName: _jsxFileName,
							lineNumber: 299,
							columnNumber: 35
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 298,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 291,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 290,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "poster-grain px-4 py-24 text-center sm:px-6 lg:py-36",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-bold uppercase tracking-[.35em] text-lavender",
						children: "31 October 2026 · Top Cliff Lounge"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 312,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mx-auto mt-4 max-w-5xl text-6xl leading-[.85] text-bone sm:text-8xl",
						children: "Nakuru. Are you ready?"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 315,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-5 font-display text-2xl italic text-bone-muted",
						children: "Something is stirring beneath the Rift."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 318,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "event",
							size: "xl",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/checkout",
								children: ["Buy tickets ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, {}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 27
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 323,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 322,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "spectral",
							size: "xl",
							onClick: () => document.querySelector("#share")?.scrollIntoView({ behavior: "smooth" }),
							children: "Share with friends"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 327,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 321,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 311,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
				className: "border-t border-border bg-card/40 px-4 py-12",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(VerveLogo, {
								variant: "horizontal",
								size: "sm",
								showCo: true,
								linkToHome: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "hidden sm:block h-5 w-px bg-border" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: "Verve & Co. presents Hauntings of the Rift."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 339,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 336,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-4 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/recover",
								className: "text-bone-muted hover:text-bone underline",
								children: "Find / Recover Ticket"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 344,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "·" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 347,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "31 October 2026" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 348,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "·" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 349,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Top Cliff Lounge, Nakuru" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 350,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "·" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 351,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "border border-border/80 px-1.5 py-0.5 font-mono text-[10px]",
								children: "18+"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 352,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 343,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 335,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 334,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MobileTicketBar, { visible: pastHero }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 356,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 111,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
