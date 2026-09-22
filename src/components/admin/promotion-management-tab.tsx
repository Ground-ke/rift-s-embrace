import { useState, useEffect, useMemo } from "react";
import {
  Tag,
  Plus,
  Percent,
  CircleDollarSign,
  Calendar,
  Layers,
  Copy,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  RefreshCw,
  Zap,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Progress } from "../ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";
import { useAdminAuth } from "../../lib/auth/admin-auth-context";

export interface PromoCodeItem {
  id: string;
  code: string;
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  maxUses: number;
  currentUses: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export function PromotionManagementTab() {
  const { user } = useAdminAuth();
  const [promotions, setPromotions] = useState<PromoCodeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [discountValue, setDiscountValue] = useState<string>("20");
  const [maxUses, setMaxUses] = useState<string>("100");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(true);

  // Load promotions
  const fetchPromotions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/promotions");
      const data = await res.json();
      if (data.success && Array.isArray(data.promotions)) {
        setPromotions(data.promotions);
      }
    } catch (err) {
      console.error("Failed to load promotions:", err);
      toast.error("Could not fetch promotion codes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  // Quick Toggle Active Switch
  const handleToggleActive = async (promo: PromoCodeItem, nextChecked: boolean) => {
    // Optimistic UI update
    setPromotions((prev) =>
      prev.map((p) => (p.id === promo.id ? { ...p, isActive: nextChecked } : p)),
    );

    try {
      const res = await fetch("/api/admin/promotions/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: promo.code,
          is_active: nextChecked,
          actor_email: user?.email || "admin@verve.co.ke",
          actor_id: user?.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(
          nextChecked
            ? `Promo code ${promo.code} activated`
            : `Promo code ${promo.code} deactivated`,
          {
            description: nextChecked
              ? "Customers can now apply this discount at checkout."
              : "Checkout will now reject this promotional discount.",
          },
        );
      } else {
        // Rollback
        fetchPromotions();
        toast.error(data.message || "Failed to update status.");
      }
    } catch {
      fetchPromotions();
      toast.error("Network error toggling promo code status.");
    }
  };

  // Delete Promo Code
  const handleDelete = async (promo: PromoCodeItem) => {
    if (!confirm(`Are you sure you want to delete promo code ${promo.code}?`)) return;

    try {
      const res = await fetch("/api/admin/promotions/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promo.code }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Promo code ${promo.code} deleted`);
        fetchPromotions();
      } else {
        toast.error(data.message || "Could not delete promo code.");
      }
    } catch {
      toast.error("Network error deleting promo code.");
    }
  };

  // Create Promo Code
  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      toast.error("Promo code string is required.");
      return;
    }

    const numValue = parseFloat(discountValue);
    if (isNaN(numValue) || numValue <= 0) {
      toast.error("Discount value must be greater than zero.");
      return;
    }

    if (discountType === "percentage" && numValue > 100) {
      toast.error("Percentage discount cannot exceed 100%.");
      return;
    }

    const numMax = parseInt(maxUses, 10);
    if (isNaN(numMax) || numMax <= 0) {
      toast.error("Max usage cap must be a positive integer.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: cleanCode,
          name: name.trim() || `${cleanCode} Special Campaign`,
          discount_type: discountType,
          discount_value: numValue,
          max_uses: numMax,
          expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
          is_active: isActive,
          actor_email: user?.email || "admin@verve.co.ke",
          actor_id: user?.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Promo code ${cleanCode} created successfully!`, {
          description:
            discountType === "percentage"
              ? `${numValue}% discount capped at ${numMax} redemptions.`
              : `KES ${numValue.toLocaleString()} fixed discount capped at ${numMax} redemptions.`,
        });
        setIsCreateModalOpen(false);
        // Reset form
        setCode("");
        setName("");
        setDiscountValue("20");
        setMaxUses("100");
        setExpiresAt("");
        setIsActive(true);
        fetchPromotions();
      } else {
        toast.error(data.message || "Failed to create promo code.");
      }
    } catch {
      toast.error("Network error creating promo code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Promo code copied to clipboard", { description: text });
  };

  // Metrics overview
  const stats = useMemo(() => {
    const total = promotions.length;
    const active = promotions.filter((p) => p.isActive).length;
    const totalRedeemed = promotions.reduce((sum, p) => sum + p.currentUses, 0);
    return { total, active, totalRedeemed };
  }, [promotions]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-border bg-card/70 p-5">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-xl text-bone tracking-wide">
              Promotional Discount Codes
            </h2>
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Manage flash sales, affiliate discount tokens, and VIP passes for Hauntings of the Rift.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPromotions}
            disabled={isLoading}
            className="border-border text-lavender hover:text-bone text-xs h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs h-9 font-sans"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create New Promo Code
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="border border-border bg-card/60 p-4">
          <span className="text-xs text-muted-foreground uppercase font-mono tracking-wider">
            Total Codes
          </span>
          <p className="text-2xl font-display text-bone mt-1">{stats.total}</p>
        </div>
        <div className="border border-green-500/30 bg-green-950/20 p-4">
          <span className="text-xs text-green-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Active Campaigns
          </span>
          <p className="text-2xl font-display text-green-300 mt-1">{stats.active}</p>
        </div>
        <div className="border border-amber-500/30 bg-amber-950/20 p-4">
          <span className="text-xs text-amber-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Total Redemptions
          </span>
          <p className="text-2xl font-display text-amber-300 mt-1">{stats.totalRedeemed} Uses</p>
        </div>
      </div>

      {/* Promotions Table */}
      <div className="border border-border bg-card overflow-x-auto">
        <Table>
          <TableHeader className="bg-background/80">
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground py-3">
                Promo Code &amp; Campaign
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Discount Benefit
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground w-60">
                Usage Capacity
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Expiration
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Status Toggle
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground text-xs font-mono"
                >
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" />
                  Loading promotion ledger...
                </TableCell>
              </TableRow>
            ) : promotions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-muted-foreground text-xs font-mono"
                >
                  No promotional codes configured. Click &quot;Create New Promo Code&quot; to launch
                  a discount.
                </TableCell>
              </TableRow>
            ) : (
              promotions.map((promo) => {
                const percentUsed = Math.min(
                  100,
                  Math.round((promo.currentUses / Math.max(1, promo.maxUses)) * 100),
                );
                const isCapped = promo.currentUses >= promo.maxUses;
                const isExpired =
                  promo.expiresAt && new Date(promo.expiresAt).getTime() < Date.now();

                return (
                  <TableRow
                    key={promo.id}
                    className="border-b border-border/60 hover:bg-background/50 transition-colors"
                  >
                    {/* Code & Name */}
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-amber-400 bg-background/80 px-2 py-0.5 border border-amber-500/30">
                          {promo.code}
                        </span>
                        <button
                          onClick={() => handleCopy(promo.code)}
                          className="text-muted-foreground hover:text-bone p-1"
                          title="Copy promo code"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs text-bone mt-1 font-medium">{promo.name}</div>
                    </TableCell>

                    {/* Discount Value */}
                    <TableCell>
                      {promo.discountType === "percentage" ? (
                        <Badge
                          variant="outline"
                          className="border-amber-500/50 bg-amber-950/30 text-amber-300 font-mono text-xs font-bold px-2.5 py-1"
                        >
                          <Percent className="w-3 h-3 mr-1" />
                          {promo.discountValue}% OFF
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-green-500/50 bg-green-950/30 text-green-300 font-mono text-xs font-bold px-2.5 py-1"
                        >
                          <CircleDollarSign className="w-3 h-3 mr-1" />
                          KES {promo.discountValue.toLocaleString()} OFF
                        </Badge>
                      )}
                    </TableCell>

                    {/* Usage Progress Bar */}
                    <TableCell>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-bone font-medium">
                            {promo.currentUses} / {promo.maxUses} uses
                          </span>
                          <span
                            className={`text-[11px] ${
                              isCapped
                                ? "text-red-400 font-bold"
                                : percentUsed > 75
                                  ? "text-amber-400 font-bold"
                                  : "text-muted-foreground"
                            }`}
                          >
                            {percentUsed}%
                          </span>
                        </div>
                        <Progress
                          value={percentUsed}
                          className={`h-2 bg-background border border-border/80 ${
                            isCapped
                              ? "[&>div]:bg-red-500"
                              : percentUsed > 75
                                ? "[&>div]:bg-amber-500"
                                : "[&>div]:bg-green-500"
                          }`}
                        />
                        {isCapped && (
                          <span className="text-[10px] text-red-400 font-mono block">
                            Capacity Reached (Limit Capped)
                          </span>
                        )}
                      </div>
                    </TableCell>

                    {/* Expiration */}
                    <TableCell className="text-xs font-mono">
                      {promo.expiresAt ? (
                        <div>
                          <div className={isExpired ? "text-red-400 font-bold" : "text-bone"}>
                            {new Date(promo.expiresAt).toLocaleDateString()}
                          </div>
                          <span className="text-[10px] text-muted-foreground">
                            {isExpired
                              ? "Expired"
                              : `${Math.ceil((new Date(promo.expiresAt).getTime() - Date.now()) / 86400000)} days left`}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">No Expiry (Open)</span>
                      )}
                    </TableCell>

                    {/* Quick-toggle Switch */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={promo.isActive}
                          onCheckedChange={(checked) => handleToggleActive(promo, checked)}
                          aria-label={`Toggle active state for ${promo.code}`}
                        />
                        <span
                          className={`text-xs font-mono font-medium ${
                            promo.isActive ? "text-green-400" : "text-muted-foreground"
                          }`}
                        >
                          {promo.isActive ? "ACTIVE" : "PAUSED"}
                        </span>
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(promo)}
                        className="size-8 text-muted-foreground hover:text-red-400 hover:bg-red-950/40"
                        title="Delete promo code"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* CREATE NEW PROMO CODE MODAL */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="bg-card border-lavender/30 text-bone max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-bone flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              Create New Promo Code
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Define a new promotional discount campaign for Hauntings of the Rift checkout.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePromo} className="space-y-4 my-2">
            {/* Promo Code String */}
            <div className="space-y-1">
              <Label
                htmlFor="promo-code"
                className="text-xs text-lavender font-mono uppercase tracking-wider"
              >
                Promo Code (Auto-Uppercase) *
              </Label>
              <Input
                id="promo-code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. RIFT20, EARLYGHOST, COVEN50"
                required
                className="bg-background border-border font-mono text-sm uppercase tracking-wider text-amber-400 font-bold"
              />
            </div>

            {/* Campaign Name */}
            <div className="space-y-1">
              <Label
                htmlFor="promo-name"
                className="text-xs text-lavender font-mono uppercase tracking-wider"
              >
                Campaign Name / Description
              </Label>
              <Input
                id="promo-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. VIP Halloween Flash Sale"
                className="bg-background border-border text-xs"
              />
            </div>

            {/* Discount Type & Value */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-lavender font-mono uppercase tracking-wider">
                  Discount Type
                </Label>
                <Select
                  value={discountType}
                  onValueChange={(val: "percentage" | "fixed") => setDiscountType(val)}
                >
                  <SelectTrigger className="bg-background border-border text-xs text-bone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-xs">
                    <SelectItem value="percentage">Percentage (% Off)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (KES Off)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="promo-value"
                  className="text-xs text-lavender font-mono uppercase tracking-wider"
                >
                  {discountType === "percentage" ? "Percentage (% 1-100)" : "Amount (KES)"} *
                </Label>
                <Input
                  id="promo-value"
                  type="number"
                  min="1"
                  max={discountType === "percentage" ? "100" : "100000"}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  required
                  className="bg-background border-border font-mono text-xs text-bone"
                />
              </div>
            </div>

            {/* Max Usage Cap */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label
                  htmlFor="promo-cap"
                  className="text-xs text-lavender font-mono uppercase tracking-wider"
                >
                  Max Usage Cap *
                </Label>
                <Input
                  id="promo-cap"
                  type="number"
                  min="1"
                  value={maxUses}
                  onChange={(e) => setMaxUses(e.target.value)}
                  placeholder="100"
                  required
                  className="bg-background border-border font-mono text-xs text-bone"
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="promo-expiry"
                  className="text-xs text-lavender font-mono uppercase tracking-wider"
                >
                  Expiration Date (Optional)
                </Label>
                <Input
                  id="promo-expiry"
                  type="date"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="bg-background border-border font-mono text-xs text-bone"
                />
              </div>
            </div>

            {/* Is Active Toggle */}
            <div className="flex items-center justify-between p-3 border border-border bg-background/60">
              <div>
                <span className="text-xs font-mono text-bone font-medium block">
                  Activate Immediately
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Available for customers at checkout upon creation
                </span>
              </div>
              <Switch checked={isActive} onCheckedChange={setIsActive} />
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-xs text-muted-foreground hover:text-bone"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs"
              >
                {isSubmitting ? "Creating Campaign..." : "Publish Promo Code"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
