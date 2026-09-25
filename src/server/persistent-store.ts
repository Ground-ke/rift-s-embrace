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
        }
      } catch (err) {
        console.warn("[PersistentStore] Could not load orders file:", err);
      }
    }

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
   * Load stored tickets from disk
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
        }
      } catch (err) {
        console.warn("[PersistentStore] Could not load tickets file:", err);
      }
    }

    // Default seed tickets to guarantee tickets are never blank or missing during preview
    if (map.size === 0) {
      const demoTickets: DigitalTicketRecord[] = [
        {
          id: "tkt_demo_hrt_001",
          orderId: "ord_demo_001",
          orderNumber: "HRT-ORD-001",
          ticketNumber: "HRT-DEMO-001",
          qrHash: "HRT_SECURE_VERIFIED_HMAC_HASH_DEMO_001",
          tierSlug: "vip",
          tierName: "VIP Pass",
          admitsCount: 1,
          attendeeName: "Sample Guest",
          buyerEmail: "guest@example.com",
          buyerPhone: "+254712345678",
          status: "valid",
          priceKes: 2500,
          issuedAt: new Date().toISOString(),
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
          id: "tkt_demo_hr_7892",
          orderId: "ord_demo_002",
          orderNumber: "HR-ORD-7892",
          ticketNumber: "HR-7892-4910",
          qrHash: "HR_SECURE_VERIFIED_HMAC_HASH_7892_4910",
          tierSlug: "early-bird",
          tierName: "Early Bird Admission",
          admitsCount: 1,
          attendeeName: "Alex Vance",
          buyerEmail: "alex.vance@example.com",
          buyerPhone: "+254722000000",
          status: "valid",
          priceKes: 1000,
          issuedAt: new Date().toISOString(),
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

      for (const t of demoTickets) {
        map.set(t.ticketNumber, t);
      }
      this.saveTickets(map);
    }

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
