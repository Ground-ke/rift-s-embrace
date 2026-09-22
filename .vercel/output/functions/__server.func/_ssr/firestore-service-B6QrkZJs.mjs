import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import "../_libs/firebase.mjs";
import { c as updateDoc, d as doc, i as onSnapshot, l as where, o as query, s as setDoc, u as collection } from "../_libs/@firebase/firestore+[...].mjs";
import { i as handleFirestoreError, r as db, t as OperationType } from "./config-Lt0fTSJK.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./button-BQ_Bevjg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firestore-service-B6QrkZJs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ui/badge.tsx";
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 29,
		columnNumber: 10
	}, this);
}
var _jsxFileName = "/app/applet/src/components/ui/textarea.tsx";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 8,
		columnNumber: 7
	}, void 0);
});
Textarea.displayName = "Textarea";
/**
* Synchronize or save ticket pass in Firestore
*/
async function saveTicketToFirestore(ticket) {
	const path = `tickets/${ticket.ticketNumber}`;
	try {
		await setDoc(doc(db, "tickets", ticket.ticketNumber), {
			...ticket,
			createdAt: ticket.createdAt || (/* @__PURE__ */ new Date()).toISOString()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, path);
	}
}
/**
* Persist or create an order in Firestore
*/
async function saveOrderToFirestore(order) {
	const path = `orders/${order.orderId}`;
	try {
		await setDoc(doc(db, "orders", order.orderId), {
			...order,
			createdAt: order.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		}, { merge: true });
	} catch (error) {
		handleFirestoreError(error, OperationType.WRITE, path);
	}
}
/**
* Submit M-Pesa transaction code or message from buyer
*/
async function submitMpesaCodeToFirestore(params) {
	const { orderId, mpesaCode, mpesaMessage, customerEmail } = params;
	const path = `orders/${orderId}`;
	try {
		const updateData = {
			mpesaCode: mpesaCode.trim().toUpperCase(),
			status: "pending_approval",
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		if (mpesaMessage) updateData.mpesaMessage = mpesaMessage.trim();
		if (customerEmail) updateData.customerEmail = customerEmail.trim().toLowerCase();
		await updateDoc(doc(db, "orders", orderId), updateData);
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, path);
	}
}
/**
* Real-time listener for a specific order (used on checkout page)
*/
function subscribeToOrder(orderId, onOrder) {
	const path = `orders/${orderId}`;
	try {
		return onSnapshot(doc(db, "orders", orderId), (snap) => {
			if (snap.exists()) onOrder(snap.data());
			else onOrder(null);
		}, (error) => {
			handleFirestoreError(error, OperationType.GET, path);
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.GET, path);
	}
}
/**
* Real-time listener for pending M-Pesa approval queue in Admin portal
*/
function subscribeToPendingOrders(onOrders) {
	const path = "orders";
	try {
		const q = query(collection(db, path), where("status", "==", "pending_approval"));
		return onSnapshot(q, (snapshot) => {
			onOrders(snapshot.docs.map((d) => d.data()));
		}, (error) => {
			handleFirestoreError(error, OperationType.LIST, path);
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
/**
* Admin approves an order and issues ticket records in Firestore
*/
async function approveOrderInFirestore(params) {
	const { orderId, adminEmail, tickets } = params;
	const path = `orders/${orderId}`;
	try {
		const orderRef = doc(db, "orders", orderId);
		await updateDoc(orderRef, {
			status: "approved",
			approvedBy: adminEmail,
			approvedAt: (/* @__PURE__ */ new Date()).toISOString(),
			emailSent: true,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		for (const ticket of tickets) await saveTicketToFirestore(ticket);
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, path);
	}
}
/**
* Admin rejects an order with reason
*/
async function rejectOrderInFirestore(params) {
	const { orderId, reason, adminEmail } = params;
	const path = `orders/${orderId}`;
	try {
		const orderRef = doc(db, "orders", orderId);
		await updateDoc(orderRef, {
			status: "rejected",
			rejectionReason: reason,
			approvedBy: adminEmail,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString()
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.UPDATE, path);
	}
}
//#endregion
export { saveOrderToFirestore as a, subscribeToPendingOrders as c, rejectOrderInFirestore as i, Textarea as n, submitMpesaCodeToFirestore as o, approveOrderInFirestore as r, subscribeToOrder as s, Badge as t };
