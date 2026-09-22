-- ==============================================================================
-- HAUNTINGS OF THE RIFT — ROLES, ADMIN PERMISSIONS & PROMOTIONS MIGRATION
-- ==============================================================================

-- 1. USER ROLES ENUM AND TABLE
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE public.user_role AS ENUM ('admin', 'scanner', 'customer');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'scanner', 'customer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_user_role UNIQUE (user_id, role)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- ------------------------------------------------------------------------------
-- 2. IS_ADMIN() AND IS_SCANNER() POSTGRESQL FUNCTIONS
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_user_id IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN EXISTS (
    SELECT 1 
    FROM public.user_roles
    WHERE user_id = p_user_id AND role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_scanner(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_user_id IS NULL THEN
    RETURN false;
  END IF;
  
  RETURN EXISTS (
    SELECT 1 
    FROM public.user_roles
    WHERE user_id = p_user_id AND role IN ('admin', 'scanner')
  );
END;
$$;

-- ------------------------------------------------------------------------------
-- 3. PROMOTIONS & DISCOUNT CODES TABLE
-- ------------------------------------------------------------------------------
-- Ensure promotions table has all required fields:
-- id, code, discount_type ('percentage', 'fixed'), discount_value, max_uses, current_uses, expires_at, is_active
CREATE TABLE IF NOT EXISTS public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  ticket_type_id UUID REFERENCES public.ticket_types(id) ON DELETE SET NULL,
  code TEXT UNIQUE NOT NULL,
  name TEXT,
  discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC(10, 2) NOT NULL CHECK (discount_value > 0),
  max_uses INTEGER NOT NULL DEFAULT 100 CHECK (max_uses > 0),
  current_uses INTEGER NOT NULL DEFAULT 0 CHECK (current_uses >= 0),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- If promotions already existed from previous migration with different columns, add any missing ones:
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promotions' AND column_name = 'code') THEN
    ALTER TABLE public.promotions ADD COLUMN code TEXT UNIQUE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promotions' AND column_name = 'discount_type') THEN
    ALTER TABLE public.promotions ADD COLUMN discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promotions' AND column_name = 'discount_value') THEN
    ALTER TABLE public.promotions ADD COLUMN discount_value NUMERIC(10, 2) NOT NULL DEFAULT 10 CHECK (discount_value > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promotions' AND column_name = 'max_uses') THEN
    ALTER TABLE public.promotions ADD COLUMN max_uses INTEGER NOT NULL DEFAULT 100 CHECK (max_uses > 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promotions' AND column_name = 'current_uses') THEN
    ALTER TABLE public.promotions ADD COLUMN current_uses INTEGER NOT NULL DEFAULT 0 CHECK (current_uses >= 0);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promotions' AND column_name = 'expires_at') THEN
    ALTER TABLE public.promotions ADD COLUMN expires_at TIMESTAMPTZ;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'promotions' AND column_name = 'is_active') THEN
    ALTER TABLE public.promotions ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_promotions_code ON public.promotions(code);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON public.promotions(is_active);

-- ------------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

-- 4.1. USER_ROLES POLICIES
-- Users can view their own role
DROP POLICY IF EXISTS "Users can view own role" ON public.user_roles;
CREATE POLICY "Users can view own role"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid());

-- Admins can view and manage all user roles
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;
CREATE POLICY "Admins can manage all user roles"
  ON public.user_roles FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4.2. PROMOTIONS POLICIES
-- Public can check active, non-expired promotions
DROP POLICY IF EXISTS "Public can view active valid promotions" ON public.promotions;
CREATE POLICY "Public can view active valid promotions"
  ON public.promotions FOR SELECT
  USING (
    is_active = true 
    AND (expires_at IS NULL OR expires_at > NOW())
    AND current_uses < max_uses
  );

-- Admins can perform full CRUD on promotions
DROP POLICY IF EXISTS "Admins can manage promotions" ON public.promotions;
CREATE POLICY "Admins can manage promotions"
  ON public.promotions FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- 4.3. TICKETS ADMIN & SCANNER ACCESS
DROP POLICY IF EXISTS "Admins can manage all tickets" ON public.tickets;
CREATE POLICY "Admins can manage all tickets"
  ON public.tickets FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Scanners can read tickets for gate check-in" ON public.tickets;
CREATE POLICY "Scanners can read tickets for gate check-in"
  ON public.tickets FOR SELECT
  USING (public.is_scanner());

DROP POLICY IF EXISTS "Scanners can update ticket usage status" ON public.tickets;
CREATE POLICY "Scanners can update ticket usage status"
  ON public.tickets FOR UPDATE
  USING (public.is_scanner())
  WITH CHECK (public.is_scanner());

-- 4.4. AUDIT LOGS
DROP POLICY IF EXISTS "Admins can read audit logs" ON public.audit_logs;
CREATE POLICY "Admins can read audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.is_admin());

-- ------------------------------------------------------------------------------
-- 5. SEED INITIAL PROMO CODES & ADMIN ROLES (DEMO SEED)
-- ------------------------------------------------------------------------------
INSERT INTO public.promotions (
  code,
  name,
  discount_type,
  discount_value,
  max_uses,
  current_uses,
  expires_at,
  is_active
) VALUES 
  ('RIFTVIP20', 'VIP Halloween 20% Discount', 'percentage', 20.00, 100, 45, NOW() + INTERVAL '30 days', true),
  ('EARLYGHOST', 'Early Access Fixed KES 500 Off', 'fixed', 500.00, 50, 12, NOW() + INTERVAL '14 days', true),
  ('COVEN50', 'Rift Coven 50% Group Flash Sale', 'percentage', 50.00, 20, 19, NOW() + INTERVAL '7 days', true),
  ('SPOOKY10', 'Community 10% Off Pass', 'percentage', 10.00, 200, 88, NOW() + INTERVAL '45 days', true),
  ('EXPIRED2025', 'Past Campaign (Inactive)', 'percentage', 15.00, 50, 50, NOW() - INTERVAL '10 days', false)
ON CONFLICT (code) DO NOTHING;
