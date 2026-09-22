-- ==============================================================================
-- HAUNTINGS OF THE RIFT 2026 — SECURITY HARDENING & ROW LEVEL SECURITY (RLS) AUDIT
-- Authoritative schema definitions, security definer role functions, and defensive policies.
-- ==============================================================================

-- 1. Create User Roles Table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'scanner', 'customer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- 2. Create Refunds Table
CREATE TABLE IF NOT EXISTS public.refunds (
  id VARCHAR(100) PRIMARY KEY,
  transaction_id VARCHAR(100) NOT NULL,
  order_id VARCHAR(100) NOT NULL,
  ticket_number VARCHAR(100),
  amount NUMERIC(12, 2) NOT NULL CHECK (amount > 0),
  reason TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'processed' CHECK (status IN ('pending', 'processed', 'failed')),
  refund_type VARCHAR(20) NOT NULL DEFAULT 'full' CHECK (refund_type IN ('full', 'partial')),
  processed_by VARCHAR(150) NOT NULL,
  refund_ref VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Create Check-in Logs Table
CREATE TABLE IF NOT EXISTS public.check_in_logs (
  id VARCHAR(100) PRIMARY KEY,
  ticket_number VARCHAR(100) NOT NULL,
  order_number VARCHAR(100),
  attendee_name VARCHAR(150),
  tier_name VARCHAR(100),
  admits_count INT NOT NULL DEFAULT 1,
  status VARCHAR(30) NOT NULL CHECK (status IN ('valid', 'duplicate', 'invalid')),
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  scanned_by VARCHAR(150) NOT NULL,
  gate_location VARCHAR(150) NOT NULL,
  ip_address VARCHAR(50)
);

-- 4. Create Audit Logs Table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id VARCHAR(100) PRIMARY KEY,
  actor_id VARCHAR(100) NOT NULL,
  actor_email VARCHAR(150),
  actor_role VARCHAR(30) NOT NULL DEFAULT 'admin',
  action VARCHAR(100) NOT NULL,
  target_table VARCHAR(100) NOT NULL,
  target_id VARCHAR(100) NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  ip_address VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Helper Role Checking Functions (Security Definer to bypass recursive RLS)
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  IF p_user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_scanner(p_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
  IF p_user_id IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = p_user_id AND role IN ('admin', 'scanner')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Enable Row Level Security (RLS) on ALL tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_in_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- If application tables exist, enable RLS
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'orders') THEN
    EXECUTE 'ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tickets') THEN
    EXECUTE 'ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'promotions') THEN
    EXECUTE 'ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;';
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'transactions') THEN
    EXECUTE 'ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;';
  END IF;
END $$;

-- 7. Define Strict RLS Policies

-- User Roles Policies:
DROP POLICY IF EXISTS "Admins can view and manage all user roles" ON public.user_roles;
CREATE POLICY "Admins can view and manage all user roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Users can read own roles" ON public.user_roles;
CREATE POLICY "Users can read own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Refunds Policies:
DROP POLICY IF EXISTS "Admins have full access to refunds" ON public.refunds;
CREATE POLICY "Admins have full access to refunds"
  ON public.refunds
  FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- Check-in Logs Policies:
DROP POLICY IF EXISTS "Scanners and Admins can insert check-in logs" ON public.check_in_logs;
CREATE POLICY "Scanners and Admins can insert check-in logs"
  ON public.check_in_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_scanner(auth.uid()));

DROP POLICY IF EXISTS "Admins can view check-in logs" ON public.check_in_logs;
CREATE POLICY "Admins can view check-in logs"
  ON public.check_in_logs
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()) OR public.is_scanner(auth.uid()));

-- Audit Logs Policies:
DROP POLICY IF EXISTS "Only Admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Only Admins can view audit logs"
  ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "System can insert audit logs"
  ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 8. Defensive Indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_role ON public.user_roles(user_id, role);
CREATE INDEX IF NOT EXISTS idx_refunds_order_id ON public.refunds(order_id);
CREATE INDEX IF NOT EXISTS idx_refunds_ticket_number ON public.refunds(ticket_number);
CREATE INDEX IF NOT EXISTS idx_check_in_logs_ticket ON public.check_in_logs(ticket_number);
CREATE INDEX IF NOT EXISTS idx_check_in_logs_scanned_at ON public.check_in_logs(scanned_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON public.audit_logs(target_table, target_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
