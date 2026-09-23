import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

export const GMAIL_SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
  "https://www.googleapis.com/auth/gmail.addons.current.message.action",
  "https://www.googleapis.com/auth/gmail.addons.current.message.metadata",
  "https://www.googleapis.com/auth/gmail.addons.current.message.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.insert",
  "https://www.googleapis.com/auth/gmail.labels",
  "https://www.googleapis.com/auth/gmail.metadata",
  "https://www.googleapis.com/auth/gmail.modify",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.settings.basic",
  "https://www.googleapis.com/auth/gmail.settings.sharing",
];

// In-memory token cache (NEVER persisted to localStorage or sessionStorage per security guidelines)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize listener to clean up cache on signout
if (typeof window !== "undefined") {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      cachedAccessToken = null;
    }
  });
}

export function getCachedGmailToken(): string | null {
  return cachedAccessToken;
}

export function setCachedGmailToken(token: string | null): void {
  cachedAccessToken = token;
}

export async function signInWithGmail(): Promise<{ user: User; accessToken: string }> {
  if (isSigningIn) {
    throw new Error("Authentication request already in progress.");
  }

  isSigningIn = true;
  try {
    const provider = new GoogleAuthProvider();
    for (const scope of GMAIL_SCOPES) {
      provider.addScope(scope);
    }
    // Set custom parameters to prompt user for consent if needed
    provider.setCustomParameters({
      prompt: "consent",
      access_type: "offline",
    });

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential?.accessToken) {
      throw new Error(
        "Could not acquire Google OAuth access token from Firebase authentication result.",
      );
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (err: unknown) {
    const code =
      typeof err === "object" && err !== null && "code" in err
        ? String((err as { code: unknown }).code)
        : "";
    if (code === "auth/unauthorized-domain") {
      throw new Error(
        "Firebase Auth unauthorized-domain: The domain '" +
          (typeof window !== "undefined"
            ? window.location.hostname
            : "verve-hauntings.vercel.app") +
          "' is not registered in Firebase Console > Authentication > Settings > Authorized Domains.",
      );
    }
    throw err;
  } finally {
    isSigningIn = false;
  }
}

export async function disconnectGmail(): Promise<void> {
  cachedAccessToken = null;
}

export interface GmailProfile {
  emailAddress: string;
  messagesTotal: number;
  threadsTotal: number;
  historyId: string;
}

export async function fetchGmailProfile(accessToken: string): Promise<GmailProfile> {
  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gmail API error (${res.status}): ${errorText}`);
  }

  return (await res.json()) as GmailProfile;
}

export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet?: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  unread?: boolean;
}

export async function listGmailMessages(
  accessToken: string,
  options?: { maxResults?: number; query?: string; labelIds?: string[] },
): Promise<{ messages: GmailMessageSummary[]; nextPageToken?: string }> {
  const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
  url.searchParams.set("maxResults", String(options?.maxResults || 15));
  if (options?.query) {
    url.searchParams.set("q", options.query);
  }
  if (options?.labelIds && options.labelIds.length > 0) {
    for (const label of options.labelIds) {
      url.searchParams.append("labelIds", label);
    }
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gmail API error (${res.status}): ${errorText}`);
  }

  const data = (await res.json()) as {
    messages?: Array<{ id: string; threadId: string }>;
    nextPageToken?: string;
  };
  if (!data.messages || data.messages.length === 0) {
    return { messages: [] };
  }

  // Fetch summary metadata in parallel
  const details = await Promise.all(
    data.messages.slice(0, 15).map(async (msg) => {
      try {
        const itemRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Date`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json",
            },
          },
        );
        if (!itemRes.ok) return { id: msg.id, threadId: msg.threadId };
        const itemData = (await itemRes.json()) as {
          snippet?: string;
          labelIds?: string[];
          payload?: {
            headers?: Array<{ name: string; value: string }>;
          };
        };

        const headers = itemData.payload?.headers || [];
        const subject =
          headers.find((h) => h.name.toLowerCase() === "subject")?.value || "(No Subject)";
        const from = headers.find((h) => h.name.toLowerCase() === "from")?.value || "";
        const to = headers.find((h) => h.name.toLowerCase() === "to")?.value || "";
        const date = headers.find((h) => h.name.toLowerCase() === "date")?.value || "";
        const unread = itemData.labelIds?.includes("UNREAD") ?? false;

        return {
          id: msg.id,
          threadId: msg.threadId,
          snippet: itemData.snippet,
          subject,
          from,
          to,
          date,
          unread,
        };
      } catch {
        return { id: msg.id, threadId: msg.threadId };
      }
    }),
  );

  return { messages: details, nextPageToken: data.nextPageToken };
}

/**
 * Creates RFC 2822 base64url-encoded email message
 */
function createRawEmail(params: {
  to: string;
  from?: string;
  subject: string;
  bodyHtml: string;
  bodyText?: string;
}): string {
  const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  const textContent = params.bodyText || params.bodyHtml.replace(/<[^>]+>/g, " ");

  const headers = [
    `To: ${params.to}`,
    params.from ? `From: ${params.from}` : "",
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(params.subject)))}?=`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
  ]
    .filter(Boolean)
    .join("\r\n");

  const message = [
    headers,
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    textContent,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    params.bodyHtml,
    "",
    `--${boundary}--`,
  ].join("\r\n");

  // Base64url encode
  const base64 = btoa(unescape(encodeURIComponent(message)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Sends an email using the user's authenticated Gmail account
 */
export async function sendGmailMessage(
  accessToken: string,
  params: {
    to: string;
    subject: string;
    bodyHtml: string;
    bodyText?: string;
  },
): Promise<{ id: string; threadId: string }> {
  const raw = createRawEmail(params);

  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ raw }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gmail Send Error (${res.status}): ${errorText}`);
  }

  return (await res.json()) as { id: string; threadId: string };
}
