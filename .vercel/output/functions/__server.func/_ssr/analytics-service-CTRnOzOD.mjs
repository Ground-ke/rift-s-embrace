import "../_libs/firebase.mjs";
import { a as orderBy, d as doc, i as onSnapshot, o as query, r as limit, s as setDoc, u as collection } from "../_libs/@firebase/firestore+[...].mjs";
import { i as handleFirestoreError, r as db, t as OperationType } from "./config-Lt0fTSJK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-service-CTRnOzOD.js
var COLLECTION_NAME = "analytics_events";
function getClientSessionId() {
	if (typeof window === "undefined") return "server-session";
	const KEY = "rift_analytics_sid";
	let sid = sessionStorage.getItem(KEY);
	if (!sid) {
		sid = "sid-" + Math.random().toString(36).substring(2, 11) + "-" + Date.now().toString(36);
		sessionStorage.setItem(KEY, sid);
	}
	return sid;
}
function detectDevice() {
	if (typeof window === "undefined") return "desktop";
	const ua = navigator.userAgent.toLowerCase();
	if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
	if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) return "mobile";
	return "desktop";
}
/**
* Record a visitor or interaction event in Firestore
* Programmatically enforces volumetric constraints from firebase-blueprint.json
*/
async function logFirebaseAnalyticsEvent(eventName, properties = {}) {
	if (typeof window === "undefined") return;
	const eventId = "evt-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8);
	const path = COLLECTION_NAME;
	try {
		const rawUrl = window.location.href;
		const rawPath = window.location.pathname;
		const referrer = document.referrer || "direct";
		const safeEventName = eventName.slice(0, 64);
		const safePageUrl = rawUrl.slice(0, 256);
		const safePath = rawPath.slice(0, 128);
		const safeSessionId = getClientSessionId().slice(0, 64);
		const safeDeviceType = detectDevice().slice(0, 32);
		const safeSource = referrer.slice(0, 128);
		const timestamp = (/* @__PURE__ */ new Date()).toISOString();
		let safeMetadataJson = "";
		try {
			safeMetadataJson = JSON.stringify(properties).slice(0, 2048);
		} catch {
			safeMetadataJson = "{}";
		}
		const payload = {
			eventName: safeEventName,
			pageUrl: safePageUrl,
			path: safePath,
			sessionId: safeSessionId,
			deviceType: safeDeviceType,
			source: safeSource,
			timestamp,
			metadataJson: safeMetadataJson
		};
		const eventDocRef = doc(db, path, eventId);
		await setDoc(eventDocRef, payload);
	} catch (error) {
		console.debug("[Firebase Analytics] Event dispatch logged:", error);
	}
}
/**
* Subscribe to real-time analytics events for the Admin Portal
* Follows strict handleFirestoreError protocol and auth check
*/
function subscribeToAdminAnalytics(onUpdate, onError, eventLimit = 60) {
	const path = COLLECTION_NAME;
	try {
		const q = query(collection(db, path), orderBy("timestamp", "desc"), limit(eventLimit));
		return onSnapshot(q, (snapshot) => {
			onUpdate(snapshot.docs.map((docSnap) => {
				const data = docSnap.data();
				let parsedMeta = {};
				if (data["metadataJson"]) try {
					parsedMeta = JSON.parse(data["metadataJson"]);
				} catch {}
				return {
					id: docSnap.id,
					eventName: data["eventName"] || "unknown",
					pageUrl: data["pageUrl"] || "",
					path: data["path"] || "",
					sessionId: data["sessionId"] || "",
					deviceType: data["deviceType"] || "desktop",
					source: data["source"] || "direct",
					timestamp: data["timestamp"] || (/* @__PURE__ */ new Date()).toISOString(),
					metadataJson: data["metadataJson"] || "",
					metadata: parsedMeta
				};
			}));
		}, (error) => {
			if (onError) onError(error);
			handleFirestoreError(error, OperationType.GET, path);
		});
	} catch (error) {
		handleFirestoreError(error, OperationType.LIST, path);
	}
}
/**
* Compute real-time analytics summary from stored events
*/
function calculateAnalyticsSummary(events) {
	const uniqueSessions = /* @__PURE__ */ new Set();
	const pageViewMap = {};
	const eventBreakdown = {};
	const deviceBreakdown = {};
	let pageViewsCount = 0;
	let checkoutStartsCount = 0;
	let purchasesCount = 0;
	for (const evt of events) {
		if (evt.sessionId) uniqueSessions.add(evt.sessionId);
		eventBreakdown[evt.eventName] = (eventBreakdown[evt.eventName] || 0) + 1;
		const dev = evt.deviceType || "desktop";
		deviceBreakdown[dev] = (deviceBreakdown[dev] || 0) + 1;
		if (evt.eventName === "page_view" || evt.eventName === "view_event") {
			pageViewsCount++;
			const p = evt.path || "/";
			pageViewMap[p] = (pageViewMap[p] || 0) + 1;
		} else if (evt.eventName === "begin_checkout") checkoutStartsCount++;
		else if (evt.eventName === "purchase") purchasesCount++;
	}
	const topPages = Object.entries(pageViewMap).map(([path, views]) => ({
		path,
		views
	})).sort((a, b) => b.views - a.views).slice(0, 5);
	return {
		totalEvents: events.length,
		uniqueSessions: uniqueSessions.size,
		pageViewsCount,
		checkoutStartsCount,
		purchasesCount,
		recentEvents: events.slice(0, 25),
		topPages,
		eventBreakdown,
		deviceBreakdown
	};
}
//#endregion
export { logFirebaseAnalyticsEvent as n, subscribeToAdminAnalytics as r, calculateAnalyticsSummary as t };
