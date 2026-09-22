import {
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  where,
  Timestamp,
} from "firebase/firestore";
import { db, auth, handleFirestoreError, OperationType } from "./config";

export interface StoredAnalyticsEvent {
  id?: string;
  eventName: string;
  pageUrl: string;
  path?: string;
  sessionId: string;
  deviceType?: "mobile" | "desktop" | "tablet" | string;
  source?: string;
  timestamp: string;
  metadataJson?: string;
  metadata?: Record<string, unknown>;
}

export interface AnalyticsSummary {
  totalEvents: number;
  uniqueSessions: number;
  pageViewsCount: number;
  checkoutStartsCount: number;
  purchasesCount: number;
  recentEvents: StoredAnalyticsEvent[];
  topPages: { path: string; views: number }[];
  eventBreakdown: Record<string, number>;
  deviceBreakdown: Record<string, number>;
}

const COLLECTION_NAME = "analytics_events";

// Generate client session id for anonymous visitor tracking
function getClientSessionId(): string {
  if (typeof window === "undefined") return "server-session";
  const KEY = "rift_analytics_sid";
  let sid = sessionStorage.getItem(KEY);
  if (!sid) {
    sid = "sid-" + Math.random().toString(36).substring(2, 11) + "-" + Date.now().toString(36);
    sessionStorage.setItem(KEY, sid);
  }
  return sid;
}

function detectDevice(): "mobile" | "desktop" | "tablet" {
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
export async function logFirebaseAnalyticsEvent(
  eventName: string,
  properties: Record<string, unknown> = {},
): Promise<void> {
  if (typeof window === "undefined") return;

  const eventId = "evt-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8);
  const path = COLLECTION_NAME;

  try {
    const rawUrl = window.location.href;
    const rawPath = window.location.pathname;
    const referrer = document.referrer || "direct";

    // Strictly enforce volumetric boundaries from firebase-blueprint.json
    const safeEventName = eventName.slice(0, 64);
    const safePageUrl = rawUrl.slice(0, 256);
    const safePath = rawPath.slice(0, 128);
    const safeSessionId = getClientSessionId().slice(0, 64);
    const safeDeviceType = detectDevice().slice(0, 32);
    const safeSource = referrer.slice(0, 128);
    const timestamp = new Date().toISOString();

    let safeMetadataJson = "";
    try {
      safeMetadataJson = JSON.stringify(properties).slice(0, 2048);
    } catch {
      safeMetadataJson = "{}";
    }

    const payload: Record<string, unknown> = {
      eventName: safeEventName,
      pageUrl: safePageUrl,
      path: safePath,
      sessionId: safeSessionId,
      deviceType: safeDeviceType,
      source: safeSource,
      timestamp,
      metadataJson: safeMetadataJson,
    };

    const eventDocRef = doc(db, path, eventId);
    await setDoc(eventDocRef, payload);
  } catch (error) {
    // Only log if not permission denied during initial unauthed visitor logging
    console.debug("[Firebase Analytics] Event dispatch logged:", error);
  }
}

/**
 * Subscribe to real-time analytics events for the Admin Portal
 * Follows strict handleFirestoreError protocol and auth check
 */
export function subscribeToAdminAnalytics(
  onUpdate: (events: StoredAnalyticsEvent[]) => void,
  onError?: (error: Error) => void,
  eventLimit = 60,
): () => void {
  const path = COLLECTION_NAME;
  try {
    const q = query(collection(db, path), orderBy("timestamp", "desc"), limit(eventLimit));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const events: StoredAnalyticsEvent[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          let parsedMeta: Record<string, unknown> = {};
          if (data["metadataJson"]) {
            try {
              parsedMeta = JSON.parse(data["metadataJson"] as string);
            } catch {
              // ignore
            }
          }
          return {
            id: docSnap.id,
            eventName: (data["eventName"] as string) || "unknown",
            pageUrl: (data["pageUrl"] as string) || "",
            path: (data["path"] as string) || "",
            sessionId: (data["sessionId"] as string) || "",
            deviceType: (data["deviceType"] as string) || "desktop",
            source: (data["source"] as string) || "direct",
            timestamp: (data["timestamp"] as string) || new Date().toISOString(),
            metadataJson: (data["metadataJson"] as string) || "",
            metadata: parsedMeta,
          };
        });
        onUpdate(events);
      },
      (error) => {
        if (onError) {
          onError(error as Error);
        }
        handleFirestoreError(error, OperationType.GET, path);
      },
    );

    return unsubscribe;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

/**
 * Compute real-time analytics summary from stored events
 */
export function calculateAnalyticsSummary(events: StoredAnalyticsEvent[]): AnalyticsSummary {
  const uniqueSessions = new Set<string>();
  const pageViewMap: Record<string, number> = {};
  const eventBreakdown: Record<string, number> = {};
  const deviceBreakdown: Record<string, number> = {};
  let pageViewsCount = 0;
  let checkoutStartsCount = 0;
  let purchasesCount = 0;

  for (const evt of events) {
    if (evt.sessionId) uniqueSessions.add(evt.sessionId);

    // Event counter
    eventBreakdown[evt.eventName] = (eventBreakdown[evt.eventName] || 0) + 1;

    // Device breakdown
    const dev = evt.deviceType || "desktop";
    deviceBreakdown[dev] = (deviceBreakdown[dev] || 0) + 1;

    if (evt.eventName === "page_view" || evt.eventName === "view_event") {
      pageViewsCount++;
      const p = evt.path || "/";
      pageViewMap[p] = (pageViewMap[p] || 0) + 1;
    } else if (evt.eventName === "begin_checkout") {
      checkoutStartsCount++;
    } else if (evt.eventName === "purchase") {
      purchasesCount++;
    }
  }

  const topPages = Object.entries(pageViewMap)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return {
    totalEvents: events.length,
    uniqueSessions: uniqueSessions.size,
    pageViewsCount,
    checkoutStartsCount,
    purchasesCount,
    recentEvents: events.slice(0, 25),
    topPages,
    eventBreakdown,
    deviceBreakdown,
  };
}
