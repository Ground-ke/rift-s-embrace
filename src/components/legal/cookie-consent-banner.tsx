import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_STORAGE_KEY = "rift_data_cookie_consent_v1";

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!stored) {
        // Small delay so it smoothly appears after initial page load
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage access blocked or restricted
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ choice: "all", timestamp: new Date().toISOString() }),
      );
    } catch {
      // Ignored
    }
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ choice: "essential", timestamp: new Date().toISOString() }),
      );
    } catch {
      // Ignored
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie and data privacy notice"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 bg-oxblood-darker/95 border-t border-amber-500/30 backdrop-blur-md shadow-2xl animate-in slide-in-from-bottom duration-300"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-3xl">
          <div className="grid size-9 place-items-center bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
            <Cookie className="size-4" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm sm:text-base text-bone font-medium">
                Privacy &amp; Data Consent Notice
              </span>
              <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                KDPA 2019 Compliant
              </span>
            </div>
            <p className="text-xs text-bone-muted leading-relaxed">
              Verve &amp; Co. uses essential local storage and session cookies to securely process
              ticket orders, safeguard M-Pesa checkouts, and generate verified gate admission QR
              codes. Under the Kenya Data Protection Act (KDPA 2019), your personal details are
              processed strictly for event delivery and never sold. Review our{" "}
              <Link
                to="/privacy"
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                to="/terms"
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2"
              >
                Event Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEssentialOnly}
            className="flex-1 sm:flex-initial text-xs font-mono border-border text-lavender hover:text-bone h-8"
          >
            Essential Only
          </Button>
          <Button
            variant="event"
            size="sm"
            onClick={handleAcceptAll}
            className="flex-1 sm:flex-initial text-xs font-mono h-8 shadow-sm"
          >
            <ShieldCheck className="size-3.5 mr-1" />
            Accept &amp; Continue
          </Button>
          <button
            onClick={handleEssentialOnly}
            className="text-muted-foreground hover:text-bone p-1 hidden sm:block"
            aria-label="Dismiss cookie notice"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
