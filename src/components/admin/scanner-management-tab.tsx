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
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
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
              Gate Scanners &amp; Admission Checkpoint Fleet
            </h2>
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Real-time optical scanners deployed across Top Cliff Lounge venue ingress perimeters.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchScanners}
          disabled={isLoading}
          className="border-border text-lavender hover:text-bone text-xs h-9"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Fleet
        </Button>
      </div>

      {/* Simulator Terminal & Fleet Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gate Scanner Simulator */}
        <div className="lg:col-span-1 border border-amber-500/40 bg-card/90 p-5 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-border">
            <Scan className="w-4 h-4 text-amber-400" />
            <h3 className="font-display text-lg text-bone">Live Gate Scanner Simulator</h3>
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            Test ticket validation, HMAC signature inspection, and duplicate check-in detection.
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
                "Verifying Cryptographic HMAC..."
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Simulate Gate Scan
                </>
              )}
            </Button>
          </form>

          {/* Preset Quick Scan Buttons */}
          <div className="pt-3 border-t border-border/80 space-y-1.5">
            <span className="text-[10px] text-muted-foreground uppercase font-mono block">
              Quick Test Pass Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] font-mono h-7 px-2 border-border bg-background hover:bg-card"
                onClick={() => setScanCode("HR-7892-4910")}
              >
                HR-7892-4910 (Valid)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] font-mono h-7 px-2 border-border bg-background hover:bg-card"
                onClick={() => setScanCode("HR-3184-9022")}
              >
                HR-3184-9022 (Used)
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-[11px] font-mono h-7 px-2 border-border bg-background hover:bg-card"
                onClick={() => setScanCode("HR-9999-FAKE")}
              >
                HR-9999-FAKE (Invalid)
              </Button>
            </div>
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
          <h3 className="font-display text-lg text-bone flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            Active Handheld Terminals ({scanners.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scanners.map((dev) => (
              <div
                key={dev.id}
                className="border border-border bg-card p-4 space-y-3 relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-display text-base text-bone font-medium">{dev.name}</h4>
                    <span className="text-[11px] text-muted-foreground font-mono block">
                      Operator: {dev.operatorName}
                    </span>
                  </div>

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
                </div>

                <div className="text-xs text-lavender font-mono bg-background/60 p-2.5 border border-border/60">
                  <div className="text-muted-foreground text-[10px] uppercase">Location:</div>
                  <div className="text-bone">{dev.gateLocation}</div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-border/60">
                  <span className="text-muted-foreground">Scans Processed:</span>
                  <span className="text-amber-400 font-bold text-sm">{dev.scansCount} Passes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
