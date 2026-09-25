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
