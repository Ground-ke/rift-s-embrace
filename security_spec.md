# Security Specification & Test Payloads — Hauntings of the Rift

## 1. Data Invariants
- Admin records in `/admins/{adminId}` can only be read or modified by authenticated, verified administrators or the bootstrapped superadmin (`erastus.n.gathungu@gmail.com`).
- User profile records in `/users/{userId}` can only be read/updated by the authenticated owner (`request.auth.uid == userId`) or an admin. Users cannot escalate their own role.
- Analytics events in `/analytics_events/{eventId}` can be created by visitors (page view and telemetry tracking) with strict schema and rate/size boundaries (e.g. valid event name, max length strings), but can ONLY be read and queried by verified admins.
- Tickets in `/tickets/{ticketId}` and Orders in `/orders/{orderId}` can only be modified by admins/scanners or server routines. Unauthenticated or non-admin clients cannot tamper with prices, status, or scanned markers.

## 2. The "Dirty Dozen" Malicious Payloads
1. **Unauthenticated Admin Read**: Attempt to read `/admins/{adminId}` without Firebase auth token. (Must fail PERMISSION_DENIED).
2. **Privilege Escalation**: Non-admin user writing `role: "admin"` to `/users/{userId}`. (Must fail PERMISSION_DENIED).
3. **Ghost Field Poisoning**: Inserting `{ evilBackdoor: true }` into `/users/{userId}`. (Must fail PERMISSION_DENIED).
4. **Forged Ticket Status**: Unauthenticated client updating `/tickets/{ticketId}` with `status: "used"` or fake validation. (Must fail PERMISSION_DENIED).
5. **Analytics Event Overflow**: Creating an analytics event with 50KB payload violating `maxLength` constraints. (Must fail PERMISSION_DENIED).
6. **Analytics Read Snooping**: Non-admin user querying `/analytics_events`. (Must fail PERMISSION_DENIED).
7. **Order Amount Alteration**: User mutating `totalKes: 0` on an order. (Must fail PERMISSION_DENIED).
8. **Admin Creation by Impersonator**: Regular user attempting to create an entry in `/admins/attackerUid`. (Must fail PERMISSION_DENIED).
9. **Fake Email Verified Claim**: User with `email_verified: false` claiming administrative actions. (Must fail PERMISSION_DENIED).
10. **ID Poisoning in Path**: Attempting to query an invalid path with 1KB non-alphanumeric document ID. (Must fail PERMISSION_DENIED).
11. **Ticket Creation Bypass**: Client attempting to mint their own free VIP tickets without order completion. (Must fail PERMISSION_DENIED).
12. **Batch Mutation Corruption**: Attempting to delete ticket audit logs without admin credentials. (Must fail PERMISSION_DENIED).
