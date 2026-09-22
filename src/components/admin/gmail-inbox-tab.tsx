import { useState, useEffect } from "react";
import {
  Mail,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Inbox,
  Clock,
  User,
  ShieldCheck,
  Eye,
  LogOut,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { GoogleSignInButton } from "@/components/brand/google-sign-in-button";
import {
  signInWithGmail,
  disconnectGmail,
  fetchGmailProfile,
  listGmailMessages,
  sendGmailMessage,
  getCachedGmailToken,
  type GmailProfile,
  type GmailMessageSummary,
} from "@/lib/google/gmail-client";
import {
  generateBookingConfirmationEmailHtml,
  generateEventReminder24hEmailHtml,
  generateRefundNoticeEmailHtml,
} from "@/lib/email-templates";

type EmailTemplateType = "booking_confirmation" | "event_reminder_24h" | "refund_notice" | "custom";

export function GmailInboxTab() {
  const [token, setToken] = useState<string | null>(getCachedGmailToken());
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [profile, setProfile] = useState<GmailProfile | null>(null);
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Compose State
  const [templateType, setTemplateType] = useState<EmailTemplateType>("booking_confirmation");
  const [recipient, setRecipient] = useState("guest@verve.co.ke");
  const [subject, setSubject] = useState("Your Pass to Hauntings of the Rift — Official Admission");
  const [customerName, setCustomerName] = useState("Mwangi Karanja");
  const [ticketTier, setTicketTier] = useState("VIP Rift Access Pass");
  const [orderId, setOrderId] = useState("HR-2026-9042");
  const [totalKes, setTotalKes] = useState("7,000");
  const [customBody, setCustomBody] = useState(
    "Dear VIP Guest,\n\nWe look forward to welcoming you to Hauntings of the Rift. Your VIP host has reserved your table entry at Top Cliff Lounge.\n\nWarm regards,\nVerve & Co. Operations Team",
  );

  // Send & Confirmation Modal State (MANDATORY per Workspace Integration skill)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<GmailMessageSummary | null>(null);

  // Sync token on mount
  useEffect(() => {
    const currentToken = getCachedGmailToken();
    if (currentToken) {
      setToken(currentToken);
      loadGmailData(currentToken);
    }
  }, []);

  const loadGmailData = async (accessToken: string) => {
    try {
      const prof = await fetchGmailProfile(accessToken);
      setProfile(prof);
    } catch (err) {
      console.warn("Could not load Gmail profile:", err);
    }

    try {
      setIsLoadingMessages(true);
      const res = await listGmailMessages(accessToken, { maxResults: 10 });
      setMessages(res.messages);
    } catch (err) {
      console.warn("Could not list Gmail messages:", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleConnect = async () => {
    setIsAuthenticating(true);
    try {
      const result = await signInWithGmail();
      setToken(result.accessToken);
      toast.success(`Connected to Gmail as ${result.user.email || "Google User"}`);
      await loadGmailData(result.accessToken);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(`Google Sign-In failed: ${message}`);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectGmail();
    setToken(null);
    setProfile(null);
    setMessages([]);
    toast.info("Disconnected from Gmail");
  };

  // Generate current HTML preview based on selected template
  const getRenderedHtml = () => {
    if (templateType === "booking_confirmation") {
      return generateBookingConfirmationEmailHtml({
        customer_name: customerName,
        ticket_tier: ticketTier,
        quantity: 1,
        total_amount: totalKes,
        order_id: orderId,
        event_date: "Saturday, 31 October 2026",
        ticket_url: "https://hauntingsoftherift.co.ke/ticket/demo",
      });
    }
    if (templateType === "event_reminder_24h") {
      return generateEventReminder24hEmailHtml({
        customer_name: customerName,
        venue_name: "Top Cliff Lounge, Nakuru",
        gate_opening_time: "18:00 EAT",
        ticket_tier: ticketTier,
        ticket_url: "https://hauntingsoftherift.co.ke/ticket/demo",
      });
    }
    if (templateType === "refund_notice") {
      return generateRefundNoticeEmailHtml({
        customer_name: customerName,
        refund_amount: totalKes,
        payment_ref: "MPESA-RF-9042",
        refund_reason: "Customer cancellation request",
        order_id: orderId,
      });
    }
    return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:24px;background:#0d0d0d;font-family:sans-serif;color:#f3f4f6;">
  <div style="max-width:540px;margin:0 auto;background:#171717;border:1px solid #262626;border-radius:10px;padding:24px;">
    <h2 style="color:#f97316;margin:0 0 16px 0;text-transform:uppercase;font-size:18px;">Hauntings of the Rift</h2>
    <div style="font-size:14px;line-height:1.6;color:#d4d4d8;white-space:pre-wrap;">${customBody}</div>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #262626;font-size:11px;color:#71717a;">
      Verve & Co. Event Management • Top Cliff Lounge, Nakuru
    </div>
  </div>
</body>
</html>`;
  };

  const handleInitiateSend = () => {
    if (!token) {
      toast.error("Please sign in with your Google account first.");
      return;
    }
    if (!recipient.trim()) {
      toast.error("Please provide a recipient email address.");
      return;
    }
    // Open mandatory confirmation dialog
    setIsConfirmOpen(true);
  };

  const handleExecuteSend = async () => {
    if (!token) return;
    setIsSending(true);
    try {
      const html = getRenderedHtml();
      const sendResult = await sendGmailMessage(token, {
        to: recipient,
        subject,
        bodyHtml: html,
      });

      toast.success(`Email successfully sent via Gmail! (Message ID: ${sendResult.id})`);
      setIsConfirmOpen(false);
      // Refresh inbox/messages
      await loadGmailData(token);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(`Failed to send email via Gmail: ${message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & OAuth Connection Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-xl text-bone tracking-wide">
              Official Gmail Workspace Integration
            </h2>
            <Badge className="bg-amber-950/60 border border-amber-500/40 text-amber-300 text-[10px] font-mono">
              Google Workspace OAuth
            </Badge>
          </div>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Send authenticated event passes and review guest replies directly from your official
            Gmail account.
          </p>
        </div>

        <div>
          {!token ? (
            <GoogleSignInButton
              onClick={handleConnect}
              isLoading={isAuthenticating}
              label="Connect with Google Workspace"
            />
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile?.emailAddress || "Google Account Connected"}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="h-8 text-xs font-mono text-red-400 border-red-500/30 hover:bg-red-950/40 hover:text-red-300"
              >
                <LogOut className="w-3 h-3 mr-1" />
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </div>

      {!token ? (
        /* Sign-in Call to Action */
        <div className="border border-border/80 bg-card/60 p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-lg text-bone">Connect Your Google Account</h3>
            <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto mt-1 leading-relaxed">
              Authenticate with your Google Workspace account to send official ticket confirmations,
              broadcast 24-hour event reminders, and review attendee responses with verified sender
              headers.
            </p>
          </div>
          <div className="pt-2">
            <GoogleSignInButton
              onClick={handleConnect}
              isLoading={isAuthenticating}
              label="Sign in with Google"
            />
          </div>
          <p className="text-[11px] font-mono text-muted-foreground">
            Scopes requested: mail.google.com, gmail.send, gmail.readonly
          </p>
        </div>
      ) : (
        /* Authenticated Gmail Console */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN: Compose & Send Passes via Gmail (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-card/70 border border-border/80 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-semibold text-bone uppercase tracking-wider">
                    Dispatch Email via Gmail
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono text-lavender border-border"
                >
                  From: {profile?.emailAddress}
                </Badge>
              </div>

              {/* Template Picker */}
              <div>
                <label className="text-[11px] font-mono uppercase text-muted-foreground block mb-2">
                  Event Email Template
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "booking_confirmation", label: "Ticket Pass" },
                    { id: "event_reminder_24h", label: "24h Reminder" },
                    { id: "refund_notice", label: "Refund Notice" },
                    { id: "custom", label: "Custom Note" },
                  ].map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => {
                        setTemplateType(tmpl.id as EmailTemplateType);
                        if (tmpl.id === "booking_confirmation") {
                          setSubject("Your Pass to Hauntings of the Rift — Official Admission");
                        } else if (tmpl.id === "event_reminder_24h") {
                          setSubject(
                            "24 Hours Until Hauntings of the Rift — Gate & Arrival Instructions",
                          );
                        } else if (tmpl.id === "refund_notice") {
                          setSubject("Refund Confirmation — Hauntings of the Rift");
                        } else {
                          setSubject("Hauntings of the Rift — Guest Concierge Update");
                        }
                      }}
                      className={`py-2 px-2 text-center text-xs font-mono border transition-all ${
                        templateType === tmpl.id
                          ? "bg-oxblood/50 border-amber-500 text-amber-300 font-semibold"
                          : "border-border/60 text-muted-foreground hover:text-bone hover:border-border"
                      }`}
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient and Subject */}
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-muted-foreground font-mono block mb-1">
                    Recipient Email
                  </label>
                  <Input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="attendee@example.com"
                    className="bg-background/80 font-mono text-xs h-9"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-muted-foreground font-mono block mb-1">
                    Subject Line
                  </label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-background/80 font-mono text-xs h-9"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-muted-foreground font-mono block mb-1">
                      Guest Name
                    </label>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="bg-background/80 font-mono text-xs h-8"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground font-mono block mb-1">
                      Ticket Tier
                    </label>
                    <Input
                      value={ticketTier}
                      onChange={(e) => setTicketTier(e.target.value)}
                      className="bg-background/80 font-mono text-xs h-8"
                    />
                  </div>
                </div>

                {templateType === "custom" && (
                  <div>
                    <label className="text-[11px] text-muted-foreground font-mono block mb-1">
                      Message Content
                    </label>
                    <textarea
                      rows={5}
                      value={customBody}
                      onChange={(e) => setCustomBody(e.target.value)}
                      className="w-full bg-background/80 border border-input p-2.5 text-xs font-sans text-bone focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-none"
                    />
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  onClick={handleInitiateSend}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs h-10 tracking-wide"
                >
                  <Send className="w-3.5 h-3.5 mr-2" />
                  Review &amp; Send via Gmail
                </Button>
                <p className="text-[10px] text-muted-foreground font-mono text-center mt-2">
                  Requires explicit confirmation prior to delivery.
                </p>
              </div>
            </div>

            {/* Email Rendered Preview */}
            <div className="bg-card/70 border border-border/80 p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-lavender" />
                  <span className="text-xs font-mono font-semibold text-bone">
                    Live HTML Email Preview
                  </span>
                </div>
                <Badge variant="outline" className="text-[9px] font-mono">
                  {templateType}
                </Badge>
              </div>

              <div className="border border-border/70 bg-[#0d0d0d] p-3 rounded max-h-[360px] overflow-y-auto">
                <div
                  className="prose prose-invert max-w-none text-xs"
                  dangerouslySetInnerHTML={{ __html: getRenderedHtml() }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Recent Messages / Inquiries (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card/70 border border-border/80 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-semibold text-bone uppercase tracking-wider">
                    Recent Gmail Messages
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => token && loadGmailData(token)}
                  disabled={isLoadingMessages}
                  className="h-7 px-2 text-xs font-mono text-muted-foreground hover:text-bone"
                  title="Refresh Inbox"
                >
                  <RefreshCw className={`w-3 h-3 ${isLoadingMessages ? "animate-spin" : ""}`} />
                </Button>
              </div>

              {isLoadingMessages ? (
                <div className="py-12 text-center text-xs font-mono text-muted-foreground">
                  <RefreshCw className="w-5 h-5 mx-auto mb-2 animate-spin text-amber-400" />
                  Fetching messages from Gmail...
                </div>
              ) : messages.length === 0 ? (
                <div className="py-10 text-center text-xs font-mono text-muted-foreground space-y-2">
                  <Inbox className="w-8 h-8 mx-auto text-muted-foreground/50" />
                  <p>No recent messages found in inbox.</p>
                </div>
              ) : (
                <div className="space-y-2 divide-y divide-border/40">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        if (msg.from) {
                          // Extract email from "Name <email@...>"
                          const match = msg.from.match(/<([^>]+)>/);
                          if (match && match[1]) {
                            setRecipient(match[1]);
                          } else if (msg.from.includes("@")) {
                            setRecipient(msg.from.trim());
                          }
                          setSubject(`Re: ${msg.subject || "Hauntings of the Rift inquiry"}`);
                          toast.info(`Replying to ${msg.from}`);
                        }
                      }}
                      className="pt-2.5 first:pt-0 cursor-pointer group hover:bg-background/40 p-2 transition-colors rounded-none"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-amber-400 font-medium truncate max-w-[160px]">
                          {msg.from || "Unknown Sender"}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {msg.date ? new Date(msg.date).toLocaleDateString() : ""}
                        </span>
                      </div>
                      <div className="text-xs text-bone font-medium mt-0.5 truncate group-hover:text-amber-300">
                        {msg.subject || "(No Subject)"}
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1">
                        {msg.snippet || "No preview snippet available."}
                      </p>
                      <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-lavender/70">
                        <span>Click to reply</span>
                        {msg.unread && (
                          <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[9px]">
                            UNREAD
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Profile & Account Statistics */}
            {profile && (
              <div className="bg-card/70 border border-border/80 p-5 space-y-3">
                <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-semibold text-bone">
                    Google Workspace Account Status
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-background/60 p-2.5 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block">
                      Verified Address
                    </span>
                    <span className="text-bone font-semibold truncate block mt-0.5">
                      {profile.emailAddress}
                    </span>
                  </div>
                  <div className="bg-background/60 p-2.5 border border-border/40">
                    <span className="text-[10px] text-muted-foreground block">Total Messages</span>
                    <span className="text-amber-400 font-semibold block mt-0.5">
                      {profile.messagesTotal?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION DIALOG (Workspace Integration Skill Requirement) */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="bg-card border border-border text-bone max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-lg text-bone flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-400" />
              Confirm Email Dispatch
            </DialogTitle>
            <DialogDescription className="text-xs font-sans text-muted-foreground">
              Please review the outgoing email details before authorizing transmission.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2 text-xs font-mono">
            <div className="p-3 bg-background border border-border space-y-1.5">
              <div>
                <span className="text-muted-foreground text-[10px] uppercase">
                  From (Authenticated):
                </span>
                <p className="text-amber-400 font-semibold">
                  {profile?.emailAddress || "Google Workspace"}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px] uppercase">To:</span>
                <p className="text-bone font-semibold">{recipient}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px] uppercase">Subject:</span>
                <p className="text-bone">{subject}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-[10px] uppercase">Template:</span>
                <p className="text-lavender uppercase">{templateType}</p>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground font-sans">
              This message will be sent on your behalf using the Gmail API. This action cannot be
              undone once dispatched.
            </p>
          </div>

          <DialogFooter className="flex sm:justify-between gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsConfirmOpen(false)}
              disabled={isSending}
              className="border-border text-muted-foreground hover:text-bone text-xs font-mono"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleExecuteSend}
              disabled={isSending}
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs font-mono"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 mr-2" />
                  Confirm &amp; Send Email
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
