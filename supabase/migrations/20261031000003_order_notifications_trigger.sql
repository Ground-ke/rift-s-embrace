-- ==============================================================================
-- DATABASE WEBHOOK TRIGGER INTEGRATION: ORDER NOTIFICATIONS
-- ==============================================================================
-- Triggers public.on_order_paid_send_notification() when an order status
-- transitions to 'completed' / paid, invoking the send-notifications Edge Function.

-- Ensure pg_net extension is available for webhook dispatch
create extension if not exists pg_net with schema extensions;

-- Trigger function to invoke Edge Function on order completion
create or replace function public.on_order_paid_send_notification()
returns trigger
language plpgsql
security definer
as $$
declare
  user_email text;
  user_phone text;
  user_name text;
begin
  if new.status = 'completed' and (old.status is null or old.status != 'completed') then
    
    -- Fetch customer info
    select email, phone_number, raw_user_meta_data->>'full_name' 
    into user_email, user_phone, user_name
    from auth.users where id = new.user_id;

    -- Call Edge Function via pg_net extension
    perform net.http_post(
      url := 'https://<your-project-ref>.supabase.co/functions/v1/send-notifications',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('request.jwt.claim.sub', true)
      ),
      body := jsonb_build_object(
        'type', 'BOOKING_CONFIRMATION',
        'recipient', jsonb_build_object(
          'email', coalesce(user_email, new.buyer_email),
          'phone', coalesce(user_phone, new.buyer_phone),
          'name', coalesce(user_name, new.buyer_name, 'Valued Guest')
        ),
        'data', jsonb_build_object(
          'ticketTier', coalesce(new.ticket_tier, 'General Admission Pass'),
          'quantity', coalesce(new.quantity, 1),
          'totalAmount', new.amount::text,
          'orderId', new.id::text,
          'eventDate', 'Oct 31, 2026',
          'ticketUrl', 'https://hauntings.verve.co.ke/tickets/' || new.id
        )
      )
    );
  end if;
  return new;
end;
$$;

-- Drop trigger if it exists and recreate
drop trigger if exists tr_order_paid_notification on public.orders;

create trigger tr_order_paid_notification
  after insert or update on public.orders
  for each row execute function public.on_order_paid_send_notification();
