# Hauntings of the Rift frontend foundation

## Goal
Create a premium, mobile-first event experience that translates the supplied poster into a modern gothic nightlife system, while keeping every payment, ticket, QR, and admin interaction explicitly in design/demo mode.

## Public event page
- Replace the placeholder home route with a long-form event page: compact navigation, cinematic hero, live event countdown, event facts, experience cards, ticket tiers, reusable dormant flash-sale treatment, social sharing, venue, FAQ, and final CTA.
- Keep the core facts in semantic HTML: Hauntings of the Rift, 31 October 2026, 4 PM till late, The Lawns in Nakuru, 18+, dress code, and the three supplied ticket prices.
- Use the generated high-contrast venue artwork as the hero visual, with lightweight CSS grain, fog, ornament, and restrained motion rather than embedding the poster.
- Add a mobile ticket bar that appears only after the hero and preserves safe-area spacing.

## Ticketing frontend
- Add a `/checkout` route with ticket selection, buyer details, M-Pesa instructions, waiting, successful, and ticket-ready visual states.
- Make progression clearly demonstrative: no payment request, success simulation, database write, or ticket issuance.
- Add a `/ticket/demo` route with branded digital-ticket examples and visual states for valid, used, cancelled, and invalid tickets; the QR is explicitly a design placeholder.

## Admin frontend
- Add an `/admin` route with a compact organizer shell, responsive sidebar/navigation, overview stats, sales chart treatment, tickets/orders view, promotions, check-in result examples, and event-control/settings panels.
- Use static sample values only where needed to demonstrate layout, labeling all operational data as preview/demo content rather than live event data.

## Design system and components
- Define poster-derived semantic tokens in `src/styles.css`: near-black, oxblood/crimson, aged bone, muted lavender, smoke neutrals, focused borders/shadows, sharp-to-small radii, grain and motion utilities.
- Use a dramatic serif display face with a compact readable sans-serif UI face; load them through root-route font links.
- Extend the shared Button with event-specific variants and build reusable Countdown, TicketCard, FlashSale, ShareActions, DigitalTicket, QRPlaceholder, and admin primitives.
- Keep keyboard focus, contrast, semantic controls, reduced-motion behavior, and 44px mobile targets intact.

## Validation
- Verify navigation, FAQ, share/copy behavior, countdown, mobile sticky CTA, and checkout state switching in the browser.
- Inspect at 360, 390, 430, tablet, laptop, and desktop widths for overflow, clipping, overlap, and readable countdown/ticket layouts.
- Confirm every content route has unique title, description, Open Graph, and Twitter metadata.

## Future integration seams
- Ticket cards and checkout submit handlers will expose clear connection points for Lovable Cloud persistence, M-Pesa Daraja server functions, authenticated admin access, backend-issued tickets, and QR validation without implementing those systems now.
