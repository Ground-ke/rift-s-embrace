import { useState } from "react";
import {
  MessageSquare,
  Mail,
  Send,
  Eye,
  CheckCircle2,
  Clock,
  RefreshCw,
  AlertTriangle,
  Radio,
  FileCode,
  ShieldCheck,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type NotificationChannel = "whatsapp" | "email";
type TemplateKey = "booking_confirmation" | "event_reminder_24h" | "refund_notice";

export function NotificationCenterTab() {
  const [activeChannel, setActiveChannel] = useState<NotificationChannel>("whatsapp");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>("booking_confirmation");

  // Test form state
  const [testPhone, setTestPhone] = useState("+254712345678");
  const [testEmail, setTestEmail] = useState("guest@verve.co.ke");
  const [customerName, setCustomerName] = useState("Mwangi Karanja");
  const [passTier, setPassTier] = useState("VIP Rift Access Pass");
  const [quantity, setQuantity] = useState("2");
  const [orderId, setOrderId] = useState("HR-2026-9042");
  const [totalKes, setTotalKes] = useState("7000");
  const [refundReason, setRefundReason] = useState(
    "Customer cancellation request prior to cut-off",
  );
  const [paymentRef, setPaymentRef] = useState("REV-MPESA-98842");

  const [isSending, setIsSending] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [dispatchLogs, setDispatchLogs] = useState<
    Array<{
      id: string;
      time: string;
      channel: string;
      template: string;
      recipient: string;
      status: "sent" | "simulated" | "failed";
      details: string;
    }>
  >([
    {
      id: "log-seed-1",
      time: new Date().toLocaleTimeString(),
      channel: "WhatsApp (Meta API)",
      template: "booking_confirmation",
      recipient: "+254712345678",
      status: "sent",
      details: "Meta parameters {{1..4}} successfully delivered",
    },
    {
      id: "log-seed-2",
      time: new Date(Date.now() - 120000).toLocaleTimeString(),
      channel: "Resend Email",
      template: "booking_confirmation",
      recipient: "mwangi@verve.co.ke",
      status: "sent",
      details: "HTML transactional email delivered",
    },
  ]);

  // Plaintext template previews matching exact specifications
  const getPlaintextPreview = (type: TemplateKey) => {
    switch (type) {
      case "booking_confirmation":
        return `🎃 *HAUNTINGS OF THE RIFT — TICKET CONFIRMED* 🎃\n\nHey ${customerName}! Your entry pass is secured. Get ready for an unforgettable night at the Rift.\n\n🎟️ *Pass Details:* ${passTier} (x${quantity})\n🧾 *Order ID:* ${orderId}\n\n👇 *Access Your Digital Pass & QR Code:*\nhttps://hauntingsoftherift.co.ke/ticket/HR-1049-9941\n\n⚠️ *Important Gate Rules:*\n• Bring a valid ID matching your registration details.\n• Keep your QR code saved offline or loaded before arrival at the gate.\n• Passes are single-entry only.\n\nNeed help? Reply directly to this message.`;
      case "event_reminder_24h":
        return `⏰ *TOMORROW AT THE RIFT* ⏰\n\nHey ${customerName}, the gates open in 24 hours for Hauntings of the Rift!\n\n📍 *Venue:* Top Cliff Lounge, Nakuru\n🚪 *Gate Opens:* 18:00 EAT\n\n👇 *Have your QR code ready at the gate:*\nhttps://hauntingsoftherift.co.ke/ticket/HR-1049-9941\n\nDress code: Halloween costumes encouraged. Strict 21+ verification at entry.`;
      case "refund_notice":
        return `🧾 *REFUND PROCESSED — HAUNTINGS OF THE RIFT* 🧾\n\nHi ${customerName},\n\nYour refund of *KES ${Number(totalKes).toLocaleString()}* has been successfully processed.\n\n*Reference:* ${paymentRef}\n*Details:* ${refundReason}\n\nNote: Associated passes for order ${orderId} are now invalidated. Reach out to support@verve.co.ke for assistance.`;
    }
  };

  // Meta API parameter mapping preview
  const getMetaParameters = (type: TemplateKey) => {
    switch (type) {
      case "booking_confirmation":
        return [
          { placeholder: "{{1}}", label: "Customer Name", value: customerName },
          { placeholder: "{{2}}", label: "Pass Tier & Qty", value: `${passTier} (x${quantity})` },
          { placeholder: "{{3}}", label: "Order ID", value: orderId },
          {
            placeholder: "{{4}}",
            label: "Ticket Access URL",
            value: `https://hauntingsoftherift.co.ke/ticket/HR-1049-9941`,
          },
        ];
      case "event_reminder_24h":
        return [
          { placeholder: "{{1}}", label: "Customer Name", value: customerName },
          {
            placeholder: "{{2}}",
            label: "Venue Location",
            value: "Top Cliff Lounge, Nakuru",
          },
          { placeholder: "{{3}}", label: "Gate Opening Time", value: "18:00 EAT" },
          {
            placeholder: "{{4}}",
            label: "Fast Pass Link",
            value: `https://hauntingsoftherift.co.ke/ticket/HR-1049-9941`,
          },
        ];
      case "refund_notice":
        return [
          { placeholder: "{{1}}", label: "Customer Name", value: customerName },
          {
            placeholder: "{{2}}",
            label: "Amount (KES)",
            value: `KES ${Number(totalKes).toLocaleString()}`,
          },
          { placeholder: "{{3}}", label: "Gateway Ref No", value: paymentRef },
          { placeholder: "{{4}}", label: "Reason/Details", value: refundReason },
        ];
    }
  };

  const handleSendTestNotification = async () => {
    setIsSending(true);
    try {
      if (activeChannel === "whatsapp") {
        const payload = {
          phone: testPhone,
          templateType: selectedTemplate,
          customerName,
          passTierAndQuantity: `${passTier} (x${quantity})`,
          orderId,
          ticketAccessUrl: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941",
          venueNameOrLocation: "Top Cliff Lounge, Nakuru",
          gateOpeningTime: "18:00 EAT",
          fastPassLink: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941",
          refundAmountKes: totalKes,
          paymentProviderRef: paymentRef,
          reasonOrDetails: refundReason,
        };

        const res = await fetch("/api/notifications/whatsapp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (data.success) {
          toast.success(`WhatsApp notification dispatched: ${data.message}`);
          setDispatchLogs((prev) => [
            {
              id: `log-${Date.now()}`,
              time: new Date().toLocaleTimeString(),
              channel: "WhatsApp (Meta API)",
              template: selectedTemplate,
              recipient: testPhone,
              status: data.simulated ? "simulated" : "sent",
              details: `Parameters {{1..4}} passed. Result ID: ${data.messageId || "simulated"}`,
            },
            ...prev,
          ]);
        } else {
          toast.error(data.message || "Failed to dispatch WhatsApp message");
        }
      } else {
        const payload = {
          to: testEmail,
          templateType: selectedTemplate,
          customer_name: customerName,
          ticket_tier: passTier,
          quantity: Number(quantity) || 1,
          total_amount: totalKes,
          order_id: orderId,
          event_date: "Saturday, 31 October 2026",
          ticket_url: "https://hauntingsoftherift.co.ke/ticket/HR-1049-9941",
          venue_name: "Top Cliff Lounge, Nakuru",
          gate_opening_time: "18:00 EAT",
          refund_amount: totalKes,
          payment_ref: paymentRef,
          refund_reason: refundReason,
        };

        const res = await fetch("/api/notifications/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (data.success) {
          toast.success("Transactional HTML email dispatched via Resend");
          setDispatchLogs((prev) => [
            {
              id: `log-${Date.now()}`,
              time: new Date().toLocaleTimeString(),
              channel: "Resend Email",
              template: selectedTemplate,
              recipient: testEmail,
              status: data.result?.simulated ? "simulated" : "sent",
              details: `Subject: ${selectedTemplate}. ID: ${data.result?.id || "simulated"}`,
            },
            ...prev,
          ]);
        } else {
          toast.error(data.message || "Failed to dispatch email");
        }
      }
    } catch (err) {
      toast.error("Failed to connect to notification gateway.");
    } finally {
      setIsSending(false);
    }
  };

  const handleBroadcast24hReminders = async () => {
    setIsBroadcasting(true);
    try {
      const res = await fetch("/api/notifications/reminder-24h", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setDispatchLogs((prev) => [
          {
            id: `log-broadcast-${Date.now()}`,
            time: new Date().toLocaleTimeString(),
            channel: "Batch Dual Broadcast",
            template: "event_reminder_24h",
            recipient: `${data.count} attendees`,
            status: "sent",
            details: "Omni-channel 24h countdown blast completed.",
          },
          ...prev,
        ]);
      } else {
        toast.error("Could not complete broadcast.");
      }
    } catch {
      toast.error("Network error during broadcast.");
    } finally {
      setIsBroadcasting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER & QUICK ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <h2 className="font-display text-xl text-bone tracking-wide">
            Notification Gateway &amp; Template Studio
          </h2>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Meta Cloud API WhatsApp Templates &bull; Resend HTML Transactional Email System
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBroadcast24hReminders}
            disabled={isBroadcasting}
            className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 font-mono text-xs"
          >
            <Radio
              className={`w-3.5 h-3.5 mr-2 ${isBroadcasting ? "animate-pulse text-red-500" : ""}`}
            />
            {isBroadcasting ? "Broadcasting..." : "Trigger 24h Reminder Broadcast"}
          </Button>
        </div>
      </div>

      {/* CHANNEL SELECTOR & TEMPLATE PICKER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Controls & Input Parameters */}
        <div className="space-y-6">
          {/* Channel Tabs */}
          <div className="bg-card/60 border border-border/70 p-4">
            <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-3">
              Delivery Channel
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveChannel("whatsapp")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium border transition-all ${
                  activeChannel === "whatsapp"
                    ? "bg-emerald-950/40 border-emerald-500 text-emerald-400 font-semibold"
                    : "border-border/60 text-muted-foreground hover:text-bone hover:border-border"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp (Meta)
              </button>
              <button
                onClick={() => setActiveChannel("email")}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-medium border transition-all ${
                  activeChannel === "email"
                    ? "bg-orange-950/40 border-orange-500 text-orange-400 font-semibold"
                    : "border-border/60 text-muted-foreground hover:text-bone hover:border-border"
                }`}
              >
                <Mail className="w-4 h-4" />
                HTML Email (Resend)
              </button>
            </div>
          </div>

          {/* Template Selector */}
          <div className="bg-card/60 border border-border/70 p-4">
            <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground block mb-3">
              Registered Templates
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "booking_confirmation",
                  label: "Booking Confirmation",
                  desc: "Ticket issuance & gate QR code",
                },
                {
                  id: "event_reminder_24h",
                  label: "24-Hour Event Reminder",
                  desc: "Venue logistics & gate opening times",
                },
                {
                  id: "refund_notice",
                  label: "Refund Notice",
                  desc: "Order reversal & pass invalidation",
                },
              ].map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id as TemplateKey)}
                  className={`w-full text-left p-3 border transition-all ${
                    selectedTemplate === tmpl.id
                      ? "bg-oxblood/40 border-amber-500/70 text-bone shadow-sm"
                      : "border-border/40 text-muted-foreground hover:bg-card/80 hover:text-bone"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-bone">{tmpl.label}</span>
                    <Badge variant="outline" className="text-[9px] font-mono">
                      {tmpl.id}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1">{tmpl.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dispatch Tester & Parameters */}
          <div className="bg-card/60 border border-border/70 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <label className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                Dispatch Test Runner
              </label>
              <Badge variant="outline" className="text-[10px] text-amber-400 border-amber-500/40">
                Live Test Mode
              </Badge>
            </div>

            {activeChannel === "whatsapp" ? (
              <div>
                <label className="text-[11px] text-muted-foreground block mb-1">
                  Recipient Phone
                </label>
                <Input
                  value={testPhone}
                  onChange={(e) => setTestPhone(e.target.value)}
                  placeholder="+254..."
                  className="bg-background/80 font-mono text-xs h-9"
                />
              </div>
            ) : (
              <div>
                <label className="text-[11px] text-muted-foreground block mb-1">
                  Recipient Email
                </label>
                <Input
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="bg-background/80 font-mono text-xs h-9"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-muted-foreground block mb-1">
                  Customer Name
                </label>
                <Input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-background/80 font-mono text-xs h-8"
                />
              </div>
              <div>
                <label className="text-[10px] text-muted-foreground block mb-1">Order Ref</label>
                <Input
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="bg-background/80 font-mono text-xs h-8"
                />
              </div>
            </div>

            {selectedTemplate === "refund_notice" && (
              <div className="space-y-3 pt-2 border-t border-border/40">
                <div>
                  <label className="text-[10px] text-muted-foreground block mb-1">Refund Ref</label>
                  <Input
                    value={paymentRef}
                    onChange={(e) => setPaymentRef(e.target.value)}
                    className="bg-background/80 font-mono text-xs h-8"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground block mb-1">
                    Reason / Note
                  </label>
                  <Input
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                    className="bg-background/80 font-mono text-xs h-8"
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleSendTestNotification}
              disabled={isSending}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs h-10 mt-2"
            >
              <Send className="w-3.5 h-3.5 mr-2" />
              {isSending
                ? "Dispatching..."
                : `Send Test ${activeChannel === "whatsapp" ? "WhatsApp" : "Email"}`}
            </Button>
          </div>
        </div>

        {/* MIDDLE & RIGHT COLUMNS: High-Fidelity Visual Preview */}
        <div className="lg:col-span-2 space-y-6">
          {/* Meta API Parameters Mapping Card */}
          <div className="bg-card/70 border border-border/80 p-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-semibold text-bone">
                  Meta Cloud API Structured Payload Mapping
                </span>
              </div>
              <Badge className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono">
                template: {selectedTemplate}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {getMetaParameters(selectedTemplate).map((param) => (
                <div
                  key={param.placeholder}
                  className="p-2.5 bg-background/90 border border-border/50 rounded-none flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-amber-400 font-bold">{param.placeholder}</span>
                    <span className="text-muted-foreground text-[10px]">{param.label}</span>
                  </div>
                  <div className="text-xs text-bone font-medium mt-1.5 truncate">{param.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Preview Container */}
          <div className="bg-card/70 border border-border/80 p-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-lavender" />
                <span className="text-xs font-mono font-semibold text-bone">
                  {activeChannel === "whatsapp"
                    ? "WhatsApp Screen Preview"
                    : "Responsive Email Render"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-[10px] font-mono text-muted-foreground hover:text-bone"
                onClick={() => {
                  navigator.clipboard.writeText(getPlaintextPreview(selectedTemplate));
                  toast.success("Plaintext copied to clipboard");
                }}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy Text
              </Button>
            </div>

            {activeChannel === "whatsapp" ? (
              /* WhatsApp Mobile Chat Mockup */
              <div className="max-w-md mx-auto bg-[#0b141a] border border-[#222d34] rounded-2xl p-4 shadow-2xl">
                {/* Chat Header */}
                <div className="flex items-center gap-3 border-b border-[#202c33] pb-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs">
                    HR
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#e9edef] flex items-center gap-1.5">
                      Hauntings of the Rift
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-[10px] text-[#8696a0] font-mono">
                      Official Verified Business
                    </div>
                  </div>
                </div>

                {/* Message Bubble */}
                <div className="bg-[#005c4b] text-[#e9edef] rounded-lg rounded-tl-none p-3.5 text-xs font-sans whitespace-pre-wrap leading-relaxed shadow-md">
                  {getPlaintextPreview(selectedTemplate)}
                  <div className="text-[9px] text-[#8696a0] text-right mt-2 font-mono">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ✓✓
                  </div>
                </div>
              </div>
            ) : (
              /* Transactional Email Live Frame */
              <div className="border border-border/80 bg-[#0d0d0d] p-4 max-h-[460px] overflow-y-auto rounded-lg">
                <div className="max-w-lg mx-auto bg-[#171717] border border-[#262626] rounded-xl p-6 text-gray-200">
                  <div className="text-center pb-4 border-b border-[#262626]">
                    <div className="text-amber-500 font-black text-lg tracking-wider uppercase">
                      Hauntings of the Rift
                    </div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-widest mt-0.5">
                      Verve &amp; Co. Official Communication
                    </div>
                  </div>

                  <div className="py-4 text-xs leading-relaxed text-gray-300">
                    <p className="mb-2">
                      Hi <strong>{customerName}</strong>,
                    </p>
                    {selectedTemplate === "booking_confirmation" && (
                      <p>
                        Your booking has been verified. Below is your official ticket summary.
                        Present your digital QR code at the gate check-in point for access.
                      </p>
                    )}
                    {selectedTemplate === "event_reminder_24h" && (
                      <p>
                        We are finalizing preparations for <strong>Hauntings of the Rift</strong>.
                        Here is everything you need to know for a seamless arrival tomorrow.
                      </p>
                    )}
                    {selectedTemplate === "refund_notice" && (
                      <p>
                        This email confirms that a refund has been issued for your booking with{" "}
                        <strong>Hauntings of the Rift</strong>.
                      </p>
                    )}
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#0d0d0d] border border-dashed border-amber-500/40 rounded-lg p-3 my-2 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <span className="text-[10px] text-gray-400 uppercase">Details</span>
                      <span className="font-semibold text-white">{passTier}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-gray-400 uppercase">Order Ref</span>
                      <span className="font-mono text-amber-400">{orderId}</span>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <div className="inline-block bg-amber-500 text-black font-bold text-[11px] px-6 py-2.5 rounded uppercase tracking-wider">
                      {selectedTemplate === "refund_notice"
                        ? "View Order Status"
                        : "Access Digital Pass & QR Code"}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#262626] text-[10px] text-gray-500 text-center">
                    &copy; 2026 Hauntings of the Rift. Managed by Verve &amp; Co.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DISPATCH AUDIT LOG TABLE */}
      <div className="bg-card/70 border border-border/80 p-5">
        <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-lavender" />
            <h3 className="text-xs font-mono font-semibold text-bone uppercase tracking-wider">
              Recent Automated Notification Logs
            </h3>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono">
            {dispatchLogs.length} Records
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground font-mono text-[10px] uppercase">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Channel</th>
                <th className="py-2.5 px-3">Template</th>
                <th className="py-2.5 px-3">Recipient</th>
                <th className="py-2.5 px-3">Delivery Status</th>
                <th className="py-2.5 px-3">Metadata</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {dispatchLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-background/40 transition-colors font-mono text-[11px]"
                >
                  <td className="py-2.5 px-3 text-muted-foreground">{log.time}</td>
                  <td className="py-2.5 px-3 font-semibold text-bone">{log.channel}</td>
                  <td className="py-2.5 px-3 text-amber-400">{log.template}</td>
                  <td className="py-2.5 px-3 text-lavender">{log.recipient}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] ${
                        log.status === "sent"
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/40"
                          : log.status === "simulated"
                            ? "bg-blue-950/60 text-blue-400 border border-blue-500/40"
                            : "bg-red-950/60 text-red-400 border border-red-500/40"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {log.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground text-[10px] truncate max-w-xs">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
