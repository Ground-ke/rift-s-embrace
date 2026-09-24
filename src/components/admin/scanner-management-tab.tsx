import { useState, useEffect } from "react";
import {
  QrCode,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Scan,
  Radio,
  Plus,
  Trash2,
  Camera,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { useAdminAuth } from "../../lib/auth/admin-auth-context";

interface ScannerDevice {
  id: string;
  name: string;
  operatorName: string;
  gateLocation: string;
  status: "active" | "standby" | "offline";
  scansCount: number;
  lastScanAt: string | null;
}

export function ScannerManagementTab() {
  const { user } = useAdminAuth();
  const [scanners, setScanners] = useState<ScannerDevice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Terminal Modal State
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newGateLocation, setNewGateLocation] = useState("Main Entrance");
  const [newOperator, setNewOperator] = useState(user?.name || "Gate Staff");
  const [isRegistering, setIsRegistering] = useState(false);

  // Scanner Simulator State
  const [scanCode, setScanCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    status: string;
    message: string;
    ticket?: {
      ticketNumber: string;
      attendeeName: string;
      tierName: string;
      admitsCount: number;
      usedAt?: string;
    };
  } | null>(null);

  const fetchScanners = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/scanners");
      const data = await res.json();
      if (data.success && Array.isArray(data.scanners)) {
        setScanners(data.scanners);
      }
    } catch (err) {
      console.warn("Failed to load scanner fleet:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScanners();
  }, []);

  const handleRegisterScanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setIsRegistering(true);
    try {
      const res = await fetch("/api/admin/scanners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          gateLocation: newGateLocation.trim(),
          operatorName: newOperator.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Gate Checkpoint Registered", {
          description: data.scanner.name,
        });
        setIsRegisterOpen(false);
        setNewName("");
        fetchScanners();
      } else {
        toast.error(data.message || "Failed to register checkpoint.");
      }
    } catch {
      toast.error("Network error while registering scanner.");
    } finally {
      setIsRegistering(false);
    }
  };

  const handleDeleteScanner = async (id: string, name: string) => {
    try {
      const res = await fetch("/api/admin/scanners/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Removed checkpoint: ${name}`);
        setScanners((prev) => prev.filter((s) => s.id !== id));
      } else {
        toast.error("Failed to remove checkpoint.");
      }
    } catch {
      toast.error("Network error removing scanner.");
    }
  };

  const handleSimulateScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanCode.trim()) return;

    setIsScanning(true);
    setScanResult(null);

    try {
      const res = await fetch("/api/tickets/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: scanCode.trim().toUpperCase(),
          staff_name: user?.name || "Gate Security Staff",
        }),
      });

      const data = await res.json();
      setScanResult(data);

      if (data.success) {
        toast.success("Gate Check-in Approved", {
          description: `${data.ticket.attendeeName} (${data.ticket.tierName})`,
        });
        fetchScanners();
      } else if (data.status === "already_used") {
        toast.warning("Duplicate Entry Denied", {
          description: data.message,
        });
      } else {
        toast.error("Invalid Admission Pass", {
          description: data.message,
        });
      }
    } catch {
      toast.error("Scanner communication timeout.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="border border-border bg-card/70 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-xl text-bone tracking-wide">
              Gate Scanners &amp; Admission Checkpoints
            </h2>
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Real-time optical scanners and admission stations deployed across venue perimeters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRegisterOpen(true)}
            className="border-amber-500/50 bg-amber-950/20 text-amber-300 hover:bg-amber-950/40 text-xs h-9"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Register Checkpoint
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchScanners}
            disabled={isLoading}
            className="border-border text-lavender hover:text-bone text-xs h-9"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Simulator Terminal & Fleet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gate Scanner Simulator */}
        <div className="lg:col-span-1 border border-amber-500/40 bg-card/90 p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Scan className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-lg text-bone">Live Gate Scanner Terminal</h3>
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            Scan attendee passes, verify ticket authenticity, and prevent duplicate check-ins at the
            gate.
          </p>

          <form onSubmit={handleSimulateScan} className="space-y-3">
            <div>
              <label className="text-[10px] text-lavender uppercase font-mono tracking-wider block mb-1">
                Enter Ticket Code (or Paste QR String)
              </label>
              <Input
                value={scanCode}
                onChange={(e) => setScanCode(e.target.value.toUpperCase())}
                placeholder="e.g. HR-7892-4910"
                className="font-mono text-sm uppercase bg-background border-border text-amber-400 font-bold"
              />
            </div>

            <Button
              type="submit"
              disabled={isScanning || !scanCode.trim()}
              className="w-full bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs font-sans"
            >
              {isScanning ? (
                "Verifying Cryptographic Signature..."
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Simulate Gate Scan
                </>
              )}
            </Button>
          </form>

          <div className="pt-3 border-t border-border/80 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Pass Verification Active
            </span>
            <a
              href="/admin/scan"
              className="text-amber-400 hover:text-amber-300 underline flex items-center gap-1 font-medium"
            >
              <Camera className="w-3.5 h-3.5 mr-0.5" />
              Open Camera Scanner &rarr;
            </a>
          </div>

          {/* Scan Result Feedback Box */}
          {scanResult && (
            <div
              className={`p-4 border text-xs font-mono space-y-2 mt-4 ${
                scanResult.success
                  ? "bg-green-950/40 border-green-500/50 text-green-200"
                  : scanResult.status === "already_used"
                    ? "bg-amber-950/40 border-amber-500/50 text-amber-200"
                    : "bg-red-950/40 border-red-500/50 text-red-200"
              }`}
            >
              <div className="flex items-center gap-2 font-bold uppercase text-sm">
                {scanResult.success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ADMISSION GRANTED
                  </>
                ) : scanResult.status === "already_used" ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    TICKET ALREADY USED
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    ACCESS REJECTED
                  </>
                )}
              </div>
              <p className="text-[11px]">{scanResult.message}</p>
              {scanResult.ticket && (
                <div className="pt-2 border-t border-border/50 text-[11px] space-y-0.5 text-bone">
                  <div>Attendee: {scanResult.ticket.attendeeName}</div>
                  <div>Tier: {scanResult.ticket.tierName}</div>
                  <div>Admits: {scanResult.ticket.admitsCount} Person(s)</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scanner Device Fleet */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg text-bone flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-amber-400" />
              Registered Checkpoints ({scanners.length})
            </h3>
            <a
              href="/admin/scan"
              className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1"
            >
              <Camera className="w-3 h-3" />
              Direct Camera Scanner Portal
            </a>
          </div>

          {scanners.length === 0 ? (
            <div className="border border-border/80 bg-card p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6" />
              </div>
              <h4 className="font-display text-base text-bone">
                No External Scanner Devices Registered
              </h4>
              <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto">
                Staff can use the optical camera scanner directly on any mobile browser, or register
                dedicated checkpoint terminals for multi-gate tracking.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <Button
                  size="sm"
                  onClick={() => setIsRegisterOpen(true)}
                  className="bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs font-mono"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Register First Gate Checkpoint
                </Button>
                <a href="/admin/scan">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border text-lavender hover:text-bone text-xs font-mono"
                  >
                    <Camera className="w-3.5 h-3.5 mr-1.5" />
                    Open Mobile Camera Scanner
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scanners.map((dev) => (
                <div
                  key={dev.id}
                  className="border border-border bg-card p-4 space-y-3 relative overflow-hidden group"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display text-base text-bone font-medium">{dev.name}</h4>
                      <span className="text-[11px] text-muted-foreground font-mono block">
                        Operator: {dev.operatorName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant="outline"
                        className={`font-mono text-[10px] uppercase tracking-wider ${
                          dev.status === "active"
                            ? "border-green-500/60 bg-green-950/40 text-green-300"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        <Radio
                          className={`w-2.5 h-2.5 mr-1 ${dev.status === "active" ? "text-green-400 animate-pulse" : ""}`}
                        />
                        {dev.status}
                      </Badge>
                      <button
                        onClick={() => handleDeleteScanner(dev.id, dev.name)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-400 p-1"
                        title="Remove Checkpoint"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-lavender font-mono bg-background/60 p-2.5 border border-border/60">
                    <div className="text-muted-foreground text-[10px] uppercase">Location:</div>
                    <div className="text-bone">{dev.gateLocation}</div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-border/60">
                    <span className="text-muted-foreground">Scans Processed:</span>
                    <span className="text-amber-400 font-bold text-sm">
                      {dev.scansCount} Passes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* REGISTER CHECKPOINT DIALOG */}
      <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
        <DialogContent className="bg-card border-lavender/30 text-bone max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-bone flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-400" />
              Register Gate Checkpoint
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add an admission terminal station or gate entrance to monitor ingress statistics.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegisterScanner} className="space-y-4 my-2">
            <div className="space-y-1">
              <Label className="text-xs font-mono text-lavender uppercase">Checkpoint Name *</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Main Entrance Terminal 1"
                required
                className="bg-background border-border text-bone text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-mono text-lavender uppercase">Gate Location</Label>
              <Input
                value={newGateLocation}
                onChange={(e) => setNewGateLocation(e.target.value)}
                placeholder="e.g. Highway Entrance, VIP Lounge Chute"
                className="bg-background border-border text-bone text-sm"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-mono text-lavender uppercase">
                Assigned Staff / Operator
              </Label>
              <Input
                value={newOperator}
                onChange={(e) => setNewOperator(e.target.value)}
                placeholder="e.g. Lead Gate Officer"
                className="bg-background border-border text-bone text-sm"
              />
            </div>

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsRegisterOpen(false)}
                className="text-xs text-muted-foreground hover:text-bone"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isRegistering || !newName.trim()}
                className="bg-oxblood text-bone hover:bg-oxblood/90 border border-amber-500/30 text-xs font-mono"
              >
                {isRegistering ? "Registering..." : "Add Checkpoint"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
