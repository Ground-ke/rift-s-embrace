-- ==============================================================================
-- HAUNTINGS OF THE RIFT — PRODUCTION DATABASE SCHEMA (GATE 2)
-- ==============================================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ------------------------------------------------------------------------------
-- 1. EVENTS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  venue_name TEXT NOT NULL,
  venue_address TEXT NOT NULL,
  venue_directions TEXT,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  age_requirement TEXT DEFAULT '18+',
  dress_code TEXT DEFAULT 'Wickedly Fabulous',
  capacity INTEGER, -- Explicitly nullable: not invented until organizer sets it
  sales_status TEXT NOT NULL DEFAULT 'scheduled' CHECK (sales_status IN ('scheduled', 'active', 'paused', 'ended', 'sold_out')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. TICKET TYPES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.ticket_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  admits_count INTEGER NOT NULL DEFAULT 1 CHECK (admits_count > 0),
  price_kes INTEGER NOT NULL CHECK (price_kes >= 0),
  total_inventory INTEGER, -- Nullable: "NOT YET CONFIGURED" by default
  reserved_count INTEGER NOT NULL DEFAULT 0 CHECK (reserved_count >= 0),
  sold_count INTEGER NOT NULL DEFAULT 0 CHECK (sold_count >= 0),
  purchase_limit INTEGER NOT NULL DEFAULT 10 CHECK (purchase_limit > 0),
  sales_start TIMESTAMPTZ,
  sales_end TIMESTAMPTZ,
  is_configured BOOLEAN NOT NULL DEFAULT false, -- Set to true only when inventory/sales window configured
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_event_ticket_slug UNIQUE (event_id, slug),
  CONSTRAINT valid_inventory_counts CHECK (
    total_inventory IS NULL OR (sold_count + reserved_count <= total_inventory)
  )
);

-- ------------------------------------------------------------------------------
-- 3. PROMOTIONS & FLASH SALES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  ticket_type_id UUID NOT NULL REFERENCES public.ticket_types(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  promotional_price_kes INTEGER NOT NULL CHECK (promotional_price_kes >= 0),
  quantity_limit INTEGER, -- Nullable until configured
  quantity_sold INTEGER NOT NULL DEFAULT 0 CHECK (quantity_sold >= 0),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_promo_window CHECK (ends_at > starts_at)
);

-- ------------------------------------------------------------------------------
-- 4. ORDERS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
  order_number TEXT UNIQUE NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  subtotal_kes INTEGER NOT NULL CHECK (subtotal_kes >= 0),
  discount_kes INTEGER NOT NULL DEFAULT 0 CHECK (discount_kes >= 0),
  total_kes INTEGER NOT NULL CHECK (total_kes >= 0),
  currency TEXT NOT NULL DEFAULT 'KES',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'cancelled', 'refunded')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. ORDER ITEMS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  ticket_type_id UUID NOT NULL REFERENCES public.ticket_types(id) ON DELETE RESTRICT,
  promotion_id UUID REFERENCES public.promotions(id) ON DELETE SET NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price_kes INTEGER NOT NULL CHECK (unit_price_kes >= 0),
  discount_kes INTEGER NOT NULL DEFAULT 0 CHECK (discount_kes >= 0),
  subtotal_kes INTEGER NOT NULL CHECK (subtotal_kes >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. INVENTORY RESERVATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inventory_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_type_id UUID NOT NULL REFERENCES public.ticket_types(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  expires_at TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'expired', 'released')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. PAYMENTS (Daraja & Transactions)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE RESTRICT,
  provider TEXT NOT NULL DEFAULT 'mpesa',
  merchant_request_id TEXT,
  checkout_request_id TEXT UNIQUE,
  mpesa_receipt_number TEXT UNIQUE,
  phone_number TEXT NOT NULL,
  amount_kes INTEGER NOT NULL CHECK (amount_kes >= 0),
  status TEXT NOT NULL DEFAULT 'initiated' CHECK (status IN ('initiated', 'success', 'failed', 'timed_out')),
  result_code INTEGER,
  result_description TEXT,
  raw_callback_payload JSONB,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. TICKETS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE RESTRICT,
  order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE RESTRICT,
  ticket_type_id UUID NOT NULL REFERENCES public.ticket_types(id) ON DELETE RESTRICT,
  ticket_number TEXT UNIQUE NOT NULL,
  secure_token TEXT UNIQUE NOT NULL,
  attendee_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'used', 'cancelled', 'refunded')),
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. CHECK-INS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.checkins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  scanned_by TEXT, -- Admin / staff user identifier
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  device_metadata JSONB,
  result TEXT NOT NULL CHECK (result IN ('success', 'already_used', 'invalid', 'cancelled'))
);

-- ------------------------------------------------------------------------------
-- 10. AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id TEXT,
  action TEXT NOT NULL,
  target_table TEXT NOT NULL,
  target_id UUID,
  metadata JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE & INTEGRITY
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_events_slug ON public.events(slug);
CREATE INDEX IF NOT EXISTS idx_ticket_types_event ON public.ticket_types(event_id);
CREATE INDEX IF NOT EXISTS idx_reservations_ticket_status ON public.inventory_reservations(ticket_type_id, status, expires_at);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON public.orders(buyer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_payments_checkout_req ON public.payments(checkout_request_id);
CREATE INDEX IF NOT EXISTS idx_payments_receipt ON public.payments(mpesa_receipt_number);
CREATE INDEX IF NOT EXISTS idx_tickets_secure_token ON public.tickets(secure_token);
CREATE INDEX IF NOT EXISTS idx_tickets_number ON public.tickets(ticket_number);
CREATE INDEX IF NOT EXISTS idx_checkins_ticket ON public.checkins(ticket_id);

-- ==============================================================================
-- ATOMIC INVENTORY RESERVATION FUNCTION (POSTGRESQL RPC)
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.reserve_ticket_inventory(
  p_ticket_type_id UUID,
  p_quantity INTEGER,
  p_ttl_minutes INTEGER DEFAULT 15
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_ticket RECORD;
  v_available INTEGER;
  v_reservation_id UUID;
  v_expires_at TIMESTAMPTZ;
BEGIN
  -- 1. Lock the ticket_type row for atomic inspection
  SELECT * INTO v_ticket
  FROM public.ticket_types
  WHERE id = p_ticket_type_id AND active = true
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'TICKET_TYPE_NOT_FOUND');
  END IF;

  -- 2. Verify sales configuration
  IF NOT v_ticket.is_configured THEN
    RETURN jsonb_build_object('success', false, 'error', 'TICKET_SALES_NOT_CONFIGURED');
  END IF;

  -- 3. Calculate current available inventory (if total_inventory is capped)
  IF v_ticket.total_inventory IS NOT NULL THEN
    -- First, release expired reservations atomically
    UPDATE public.inventory_reservations
    SET status = 'expired', updated_at = NOW()
    WHERE ticket_type_id = p_ticket_type_id
      AND status = 'active'
      AND expires_at < NOW();

    -- Calculate active reservations
    SELECT COALESCE(SUM(quantity), 0) INTO v_available
    FROM public.inventory_reservations
    WHERE ticket_type_id = p_ticket_type_id AND status = 'active';

    v_available := v_ticket.total_inventory - v_ticket.sold_count - v_available;

    IF v_available < p_quantity THEN
      RETURN jsonb_build_object(
        'success', false,
        'error', 'INSUFFICIENT_INVENTORY',
        'available', GREATEST(0, v_available)
      );
    END IF;
  END IF;

  -- 4. Create the reservation
  v_expires_at := NOW() + (p_ttl_minutes || ' minutes')::INTERVAL;

  INSERT INTO public.inventory_reservations (
    ticket_type_id,
    quantity,
    expires_at,
    status
  ) VALUES (
    p_ticket_type_id,
    p_quantity,
    v_expires_at,
    'active'
  ) RETURNING id INTO v_reservation_id;

  -- Update reserved_count metric on ticket_types
  UPDATE public.ticket_types
  SET reserved_count = reserved_count + p_quantity,
      updated_at = NOW()
  WHERE id = p_ticket_type_id;

  RETURN jsonb_build_object(
    'success', true,
    'reservation_id', v_reservation_id,
    'expires_at', v_expires_at,
    'unit_price_kes', v_ticket.price_kes,
    'total_price_kes', (v_ticket.price_kes * p_quantity)
  );
END;
$$;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Public Read: Events & Ticket Types (Active only)
CREATE POLICY "Public can view active events"
  ON public.events FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view active ticket types"
  ON public.ticket_types FOR SELECT
  USING (active = true);

CREATE POLICY "Public can view active promotions"
  ON public.promotions FOR SELECT
  USING (active = true AND NOW() BETWEEN starts_at AND ends_at);

-- 2. Transactional tables: Client cannot directly insert, update or delete.
-- All order creations, reservations, payments, and tickets MUST go through secure server endpoints or RPC.
-- (Service role key bypasses RLS on backend)
