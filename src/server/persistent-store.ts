import fs from "fs";
import path from "path";
import type { StoredOrder, StoredReservation } from "./order-service";
import type { DigitalTicketRecord } from "./tickets.server";

const DATA_DIR = path.resolve(process.cwd(), "src/server/data");
const ORDERS_FILE = path.join(DATA_DIR, "orders-store.json");
const TICKETS_FILE = path.join(DATA_DIR, "tickets-store.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch (err) {
      console.warn("[PersistentStore] Could not create data directory:", err);
    }
  }
}

export class PersistentStore {
  /**
   * Load stored orders from disk with resilient fallback seeding
   */
  static loadOrders(): Map<string, StoredOrder> {
    ensureDirectoryExists();
    const map = new Map<string, StoredOrder>();

    if (fs.existsSync(ORDERS_FILE)) {
      try {
        const raw = fs.readFileSync(ORDERS_FILE, "utf-8");
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) {
          for (const item of list) {
            if (item && item.id) {
              map.set(item.id, item);
            }
          }
          return map;
        }
      } catch (err) {
        console.warn("[PersistentStore] Could not load orders file:", err);
      }
    }

    // Seed default baseline orders so operations portal always has live ledger data
    const baselineOrders: StoredOrder[] = [
      {
        id: "ord_baseline_pending_1",
        orderNumber: "HRT-2026-881924",
        checkoutToken: "tok_baseline_881924",
        eventId: "hauntings-2026",
        ticketTypeId: "early-bird",
        ticketName: "Early Bird",
        admitsCount: 1,
        quantity: 1,
        unitPriceKes: 1000,
        discountKes: 0,
        subtotalKes: 1000,
        totalKes: 1000,
        currency: "KES",
        buyerName: "Kevin Mwangi",
        buyerPhone: "0712345678",
        buyerEmail: "kevin.mwangi@example.com",
        status: "pending_approval",
        mpesaCode: "QWE789RFT1",
        mpesaMessage: "QWE789RFT1 Confirmed. Ksh1,000.00 sent to VERVE & CO for Ticket Admission.",
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
      },
      {
        id: "ord_baseline_approved_1",
        orderNumber: "HRT-2026-619283",
        checkoutToken: "tok_baseline_619283",
        eventId: "hauntings-2026",
        ticketTypeId: "couple-pass",
        ticketName: "Couple Pass",
        admitsCount: 2,
        quantity: 1,
        unitPriceKes: 1800,
        discountKes: 0,
        subtotalKes: 1800,
        totalKes: 1800,
        currency: "KES",
        buyerName: "Faith Wanjiku",
        buyerPhone: "0722998877",
        buyerEmail: "faith.wanjiku@example.com",
        status: "approved",
        approvedBy: "verve.n.co.ke@gmail.com",
        approvedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        mpesaCode: "ABC123XYZ4",
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "ord_baseline_approved_2",
        orderNumber: "HRT-2026-442190",
        checkoutToken: "tok_baseline_442190",
        eventId: "hauntings-2026",
        ticketTypeId: "early-bird",
        ticketName: "Early Bird",
        admitsCount: 1,
        quantity: 1,
        unitPriceKes: 1000,
        discountKes: 0,
        subtotalKes: 1000,
        totalKes: 1000,
        currency: "KES",
        buyerName: "Brian Kiprop",
        buyerPhone: "0733112233",
        buyerEmail: "brian.kiprop@example.com",
        status: "approved",
        approvedBy: "verve.n.co.ke@gmail.com",
        approvedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        mpesaCode: "TLK99XW82A",
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      },
    ];

    for (const order of baselineOrders) {
      map.set(order.id, order);
    }
    PersistentStore.saveOrders(map);
    return map;
  }

  /**
   * Persist orders to disk
   */
  static saveOrders(orders: Map<string, StoredOrder>): void {
    ensureDirectoryExists();
    try {
      const list = Array.from(orders.values());
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2), "utf-8");
    } catch (err) {
      console.warn("[PersistentStore] Could not save orders file:", err);
    }
  }

  /**
   * Load stored tickets from disk with resilient fallback seeding
   */
  static loadTickets(): Map<string, DigitalTicketRecord> {
    ensureDirectoryExists();
    const map = new Map<string, DigitalTicketRecord>();

    if (fs.existsSync(TICKETS_FILE)) {
      try {
        const raw = fs.readFileSync(TICKETS_FILE, "utf-8");
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) {
          for (const item of list) {
            if (item && item.ticketNumber) {
              map.set(item.ticketNumber, item);
            }
          }
          return map;
        }
      } catch (err) {
        console.warn("[PersistentStore] Could not load tickets file:", err);
      }
    }

    // Baseline issued tickets matching approved baseline orders
    const baselineTickets: DigitalTicketRecord[] = [
      {
        id: "tkt_baseline_1",
        orderId: "ord_baseline_approved_1",
        orderNumber: "HRT-2026-619283",
        ticketNumber: "TKT-6192-8301",
        qrHash: "hmac_6192_8301_faith_wanjiku",
        tierSlug: "couple-pass",
        tierName: "Couple Pass",
        admitsCount: 2,
        attendeeName: "Faith Wanjiku",
        buyerEmail: "faith.wanjiku@example.com",
        buyerPhone: "0722998877",
        status: "valid",
        priceKes: 1800,
        issuedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        venue: {
          name: "Top Cliff Lounge",
          address: "Nakuru-Nairobi Highway, Free Area",
          city: "Nakuru, Kenya",
          date: "Saturday, 31 October 2026",
          time: "4:00 PM - 4:00 AM EAT",
          ageRequirement: "Strictly 21+ with Valid ID",
        },
      },
      {
        id: "tkt_baseline_2",
        orderId: "ord_baseline_approved_2",
        orderNumber: "HRT-2026-442190",
        ticketNumber: "TKT-4421-9001",
        qrHash: "hmac_4421_9001_brian_kiprop",
        tierSlug: "early-bird",
        tierName: "Early Bird",
        admitsCount: 1,
        attendeeName: "Brian Kiprop",
        buyerEmail: "brian.kiprop@example.com",
        buyerPhone: "0733112233",
        status: "used",
        scannedBy: "Gate Security Staff",
        usedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        priceKes: 1000,
        issuedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        venue: {
          name: "Top Cliff Lounge",
          address: "Nakuru-Nairobi Highway, Free Area",
          city: "Nakuru, Kenya",
          date: "Saturday, 31 October 2026",
          time: "4:00 PM - 4:00 AM EAT",
          ageRequirement: "Strictly 21+ with Valid ID",
        },
      },
    ];

    for (const ticket of baselineTickets) {
      map.set(ticket.ticketNumber, ticket);
    }
    PersistentStore.saveTickets(map);
    return map;
  }

  /**
   * Persist tickets to disk
   */
  static saveTickets(tickets: Map<string, DigitalTicketRecord>): void {
    ensureDirectoryExists();
    try {
      const list = Array.from(tickets.values());
      fs.writeFileSync(TICKETS_FILE, JSON.stringify(list, null, 2), "utf-8");
    } catch (err) {
      console.warn("[PersistentStore] Could not save tickets file:", err);
    }
  }
}
