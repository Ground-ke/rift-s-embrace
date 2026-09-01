CREATE TABLE public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  idempotency_key text NOT NULL UNIQUE,
  user_id uuid,
  amount numeric(12,2) NOT NULL CHECK (amount >= 0),
  currency text NOT NULL DEFAULT 'KES',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','completed','failed')),
  payment_provider_ref text,
  failure_reason text,
  buyer_name text,
  buyer_email text,
  buyer_phone text,
  tier text,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.transactions TO authenticated;
GRANT ALL ON public.transactions TO service_role;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own transactions" ON public.transactions FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.transactions(id) ON DELETE CASCADE,
  user_id uuid,
  event_id uuid,
  event_name text NOT NULL DEFAULT 'Hauntings of the Rift',
  event_date timestamptz,
  venue text,
  tier text NOT NULL DEFAULT 'General',
  holder_name text NOT NULL DEFAULT 'Guest',
  holder_email text,
  holder_phone text,
  ticket_code text NOT NULL UNIQUE,
  qr_hash text NOT NULL,
  is_used boolean NOT NULL DEFAULT false,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.tickets TO authenticated;
GRANT ALL ON public.tickets TO service_role;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own tickets" ON public.tickets FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE INDEX tickets_order_id_idx ON public.tickets (order_id);
CREATE INDEX tickets_holder_email_idx ON public.tickets (lower(holder_email));

CREATE TABLE public.recovery_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier text NOT NULL,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.recovery_requests TO service_role;
ALTER TABLE public.recovery_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX recovery_requests_recent_idx ON public.recovery_requests (created_at DESC);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER transactions_set_updated_at BEFORE UPDATE ON public.transactions
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();