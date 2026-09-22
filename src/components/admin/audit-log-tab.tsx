import { useState, useEffect } from "react";
import { FileText, RefreshCw, Search, Shield, Clock, User, Activity, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { toast } from "sonner";

interface AuditLog {
  id: string;
  actorId: string;
  actorEmail: string;
  actorRole: string;
  action: string;
  targetTable: string;
  targetId: string;
  metadata: Record<string, unknown>;
  ipAddress: string;
  createdAt: string;
}

export function AuditLogTab() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/audit-logs");
      const data = await res.json();
      if (data.success && Array.isArray(data.logs)) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.warn("Failed to load audit logs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase().trim();
    return (
      log.action.toLowerCase().includes(q) ||
      log.actorEmail.toLowerCase().includes(q) ||
      log.targetId.toLowerCase().includes(q) ||
      log.targetTable.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="border border-border bg-card/70 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-xl text-bone tracking-wide">
              Immutable System Audit Log
            </h2>
          </div>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            Real-time chronological record of administrative revocations, promo campaigns, and gate
            check-ins.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchLogs}
          disabled={isLoading}
          className="border-border text-lavender hover:text-bone text-xs h-9"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Log Trail
        </Button>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter audit events by Action, Actor Email, Target ID..."
          className="pl-9 bg-card border-border font-mono text-xs text-bone h-10"
        />
      </div>

      {/* Log Table */}
      <div className="border border-border bg-card overflow-x-auto">
        <Table>
          <TableHeader className="bg-background/80">
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground py-3">
                Timestamp
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Action Event
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Authorized Actor
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Target Entity
              </TableHead>
              <TableHead className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Payload Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground text-xs font-mono"
                >
                  <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-amber-400" />
                  Streaming audit ledger...
                </TableCell>
              </TableRow>
            ) : filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground text-xs font-mono"
                >
                  No matching audit records.
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => (
                <TableRow
                  key={log.id}
                  className="border-b border-border/60 hover:bg-background/50 font-mono text-xs"
                >
                  <TableCell className="text-muted-foreground text-[11px] py-3">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="border-amber-500/40 bg-amber-950/30 text-amber-300 uppercase tracking-wider text-[10px]"
                    >
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-bone font-medium">{log.actorEmail}</div>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      {log.actorRole} · {log.ipAddress}
                    </span>
                  </TableCell>
                  <TableCell className="text-lavender">
                    <span className="text-muted-foreground text-[10px] uppercase block">
                      {log.targetTable}
                    </span>
                    {log.targetId}
                  </TableCell>
                  <TableCell>
                    {log.metadata && Object.keys(log.metadata).length > 0 ? (
                      <pre className="text-[10px] text-muted-foreground max-w-xs truncate">
                        {JSON.stringify(log.metadata)}
                      </pre>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
