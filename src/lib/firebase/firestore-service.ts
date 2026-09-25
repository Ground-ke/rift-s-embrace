import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db, auth, handleFirestoreError, OperationType } from "./config";

export interface FirestoreTicket {
  ticketNumber: string;
  orderId: string;
  orderNumber?: string;
  attendeeName: string;
  attendeeEmail?: string;
  buyerPhone?: string;
  tierSlug?: string;
  tierName?: string;
  admitsCount?: number;
  priceKes?: number;
  qrHash?: string;
  status: "valid" | "used" | "cancelled" | "refunded";
  scannedAt?: string;
  scannedBy?: string;
  createdAt?: string;
}

export interface FirestoreOrder {
  orderId: string;
  orderNumber?: string;
  customerName?: string;
  customerEmail: string;
  customerPhone?: string;
  ticketTypeId?: string;
  ticketName?: string;
  admitsCount?: number;
  quantity?: number;
  totalKes: number;
  status:
    | "pending"
    | "pending_approval"
    | "completed"
    | "approved"
    | "rejected"
    | "cancelled"
    | "refunded";
  mpesaCode?: string;
  mpesaMessage?: string;
  rejectionReason?: string;
  approvedBy?: string;
  approvedAt?: string;
  emailSent?: boolean;
  paymentReference?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FirestoreAdminRecord {
  email: string;
  name?: string;
  role: "admin" | "superadmin" | "scanner";
  createdAt?: string;
}

/**
 * Check if the current user has an admin record in Firestore
 */
export async function checkIsFirestoreAdmin(uid: string, email?: string | null): Promise<boolean> {
  // Bootstrapped organizer superadmin email check
  if (email && email.toLowerCase() === "erastus.n.gathungu@gmail.com") {
    return true;
  }

  const path = `admins/${uid}`;
  try {
    const adminDoc = await getDoc(doc(db, "admins", uid));
    if (adminDoc.exists()) {
      return true;
    }
    return false;
  } catch {
    // If not readable or doesn't exist, return false
    return false;
  }
}

/**
 * Bootstrap or ensure an admin record exists in Firestore for the organizer
 */
export async function ensureOrganizerAdminRecord(
  uid: string,
  email: string,
  name = "Erastus Gathungu",
): Promise<void> {
  const path = `admins/${uid}`;
  try {
    await setDoc(
      doc(db, "admins", uid),
      {
        email: email.toLowerCase(),
        name,
        role: "admin",
        createdAt: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    console.debug("[Firestore] ensureOrganizerAdminRecord warning:", error);
  }
}

/**
 * Synchronize or save ticket pass in Firestore
 */
export async function saveTicketToFirestore(ticket: FirestoreTicket): Promise<void> {
  const path = `tickets/${ticket.ticketNumber}`;
  try {
    await setDoc(doc(db, "tickets", ticket.ticketNumber), {
      ...ticket,
      createdAt: ticket.createdAt || new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Gate scanner validation in Firestore
 */
export async function scanTicketInFirestore(
  ticketNumber: string,
  scannedBy = "Gate Staff",
): Promise<{ success: boolean; status: string; ticket?: FirestoreTicket; message: string }> {
  const path = `tickets/${ticketNumber}`;
  try {
    const ticketRef = doc(db, "tickets", ticketNumber);
    const snap = await getDoc(ticketRef);

    if (!snap.exists()) {
      return {
        success: false,
        status: "not_found",
        message: "Ticket not found in central registry.",
      };
    }

    const data = snap.data() as FirestoreTicket;

    if (data.status === "used") {
      return {
        success: false,
        status: "duplicate",
        ticket: data,
        message: `Already scanned on ${data.scannedAt || "earlier"} by ${data.scannedBy || "Gate Staff"}.`,
      };
    }

    if (data.status === "cancelled" || data.status === "refunded") {
      return {
        success: false,
        status: data.status,
        ticket: data,
        message: `Ticket pass has been invalidated (${data.status}).`,
      };
    }

    const scannedAt = new Date().toISOString();
    await updateDoc(ticketRef, {
      status: "used",
      scannedAt,
      scannedBy,
    });

    return {
      success: true,
      status: "valid",
      ticket: { ...data, status: "used", scannedAt, scannedBy },
      message: `Pass verified! Welcome ${data.attendeeName} to Hauntings of the Rift.`,
    };
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

/**
 * Subscribe to real-time tickets from Firestore
 */
export function subscribeToTickets(
  onTickets: (tickets: FirestoreTicket[]) => void,
  limitCount = 50,
): () => void {
  const path = "tickets";
  try {
    if (!db) return () => {};
    const q = query(collection(db, path), limit(limitCount));
    return onSnapshot(
      q,
      (snapshot) => {
        const tickets = snapshot.docs.map((docSnap) => docSnap.data() as FirestoreTicket);
        onTickets(tickets);
      },
      (error) => {
        console.warn("[Firestore] Tickets subscription non-fatal note:", error);
      },
    );
  } catch (error) {
    console.warn("[Firestore] Tickets subscription init note:", error);
    return () => {};
  }
}

/**
 * Persist or create an order in Firestore
 */
export async function saveOrderToFirestore(order: FirestoreOrder): Promise<void> {
  const path = `orders/${order.orderId}`;
  try {
    if (!db) return;
    await setDoc(
      doc(db, "orders", order.orderId),
      {
        ...order,
        createdAt: order.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    console.warn("[Firestore] saveOrderToFirestore note:", error);
  }
}

/**
 * Fetch a single order from Firestore by ID
 */
export async function getOrderFromFirestore(orderId: string): Promise<FirestoreOrder | null> {
  const path = `orders/${orderId}`;
  try {
    const snap = await getDoc(doc(db, "orders", orderId));
    if (!snap.exists()) return null;
    return snap.data() as FirestoreOrder;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Submit M-Pesa transaction code or message from buyer
 */
export async function submitMpesaCodeToFirestore(params: {
  orderId: string;
  mpesaCode: string;
  mpesaMessage?: string;
  customerEmail?: string;
  orderNumber?: string;
  customerName?: string;
  customerPhone?: string;
  ticketTypeId?: string;
  ticketName?: string;
  admitsCount?: number;
  quantity?: number;
  totalKes?: number;
}): Promise<void> {
  const {
    orderId,
    mpesaCode,
    mpesaMessage,
    customerEmail,
    orderNumber,
    customerName,
    customerPhone,
    ticketTypeId,
    ticketName,
    admitsCount,
    quantity,
    totalKes,
  } = params;
  const path = `orders/${orderId}`;
  try {
    const updateData: Record<string, unknown> = {
      orderId,
      mpesaCode: mpesaCode.trim().toUpperCase(),
      status: "pending_approval",
      customerEmail:
        customerEmail && customerEmail.trim()
          ? customerEmail.trim().toLowerCase()
          : "pending-delivery@verve.co.ke",
      totalKes: typeof totalKes === "number" && totalKes >= 0 ? totalKes : 1000,
      updatedAt: new Date().toISOString(),
    };
    if (mpesaMessage) updateData.mpesaMessage = mpesaMessage.trim();
    if (orderNumber) updateData.orderNumber = orderNumber;
    if (customerName) updateData.customerName = customerName;
    if (customerPhone) updateData.customerPhone = customerPhone;
    if (ticketTypeId) updateData.ticketTypeId = ticketTypeId;
    if (ticketName) updateData.ticketName = ticketName;
    if (admitsCount !== undefined) updateData.admitsCount = admitsCount;
    if (quantity !== undefined) updateData.quantity = quantity;

    await setDoc(doc(db, "orders", orderId), updateData, { merge: true });
  } catch (error) {
    console.warn("[Firestore] submitMpesaCodeToFirestore note:", error);
  }
}

/**
 * Real-time listener for a specific order (used on checkout page)
 */
export function subscribeToOrder(
  orderId: string,
  onOrder: (order: FirestoreOrder | null) => void,
): () => void {
  const path = `orders/${orderId}`;
  try {
    if (!db) return () => {};
    return onSnapshot(
      doc(db, "orders", orderId),
      (snap) => {
        if (snap.exists()) {
          onOrder(snap.data() as FirestoreOrder);
        } else {
          onOrder(null);
        }
      },
      (error) => {
        console.warn("[Firestore] Order subscription non-fatal note:", error);
      },
    );
  } catch (error) {
    console.warn("[Firestore] Failed to initiate order subscription:", error);
    return () => {};
  }
}

/**
 * Real-time listener for pending M-Pesa approval queue in Admin portal
 */
export function subscribeToPendingOrders(onOrders: (orders: FirestoreOrder[]) => void): () => void {
  const path = "orders";
  try {
    if (!db) return () => {};
    const q = query(collection(db, path), where("status", "==", "pending_approval"));
    return onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((d) => d.data() as FirestoreOrder);
        onOrders(orders);
      },
      (error) => {
        console.warn("[Firestore] Pending orders subscription non-fatal note:", error);
      },
    );
  } catch (error) {
    console.warn("[Firestore] Failed to initiate pending orders subscription:", error);
    return () => {};
  }
}

/**
 * Real-time listener for all orders in Admin portal
 */
export function subscribeToAllOrders(
  onOrders: (orders: FirestoreOrder[]) => void,
  limitCount = 100,
): () => void {
  const path = "orders";
  try {
    if (!db) return () => {};
    const q = query(collection(db, path), limit(limitCount));
    return onSnapshot(
      q,
      (snapshot) => {
        const orders = snapshot.docs.map((d) => d.data() as FirestoreOrder);
        onOrders(orders);
      },
      (error) => {
        console.warn("[Firestore] All orders subscription non-fatal note:", error);
      },
    );
  } catch (error) {
    console.warn("[Firestore] Failed to initiate all orders subscription:", error);
    return () => {};
  }
}

/**
 * Admin approves an order and issues ticket records in Firestore
 */
export async function approveOrderInFirestore(params: {
  orderId: string;
  adminEmail: string;
  tickets: FirestoreTicket[];
}): Promise<void> {
  const { orderId, adminEmail, tickets } = params;
  const path = `orders/${orderId}`;
  try {
    if (!db) return;
    const orderRef = doc(db, "orders", orderId);
    await setDoc(
      orderRef,
      {
        status: "approved",
        approvedBy: adminEmail,
        approvedAt: new Date().toISOString(),
        emailSent: true,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );

    // Write all issued tickets in parallel
    if (Array.isArray(tickets) && tickets.length > 0) {
      await Promise.all(
        tickets.map((ticket) =>
          saveTicketToFirestore(ticket).catch((tErr) => {
            console.debug("[Firestore] Ticket sync note:", tErr);
          }),
        ),
      );
    }
  } catch (error) {
    console.warn("[Firestore] approveOrderInFirestore note:", error);
  }
}

/**
 * Admin rejects an order with reason
 */
export async function rejectOrderInFirestore(params: {
  orderId: string;
  reason: string;
  adminEmail: string;
}): Promise<void> {
  const { orderId, reason, adminEmail } = params;
  const path = `orders/${orderId}`;
  try {
    if (!db) return;
    const orderRef = doc(db, "orders", orderId);
    await setDoc(
      orderRef,
      {
        status: "rejected",
        rejectionReason: reason,
        approvedBy: adminEmail,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    );
  } catch (error) {
    console.warn("[Firestore] rejectOrderInFirestore note:", error);
  }
}
