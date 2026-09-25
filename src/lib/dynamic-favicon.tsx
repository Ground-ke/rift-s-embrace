import { useEffect, useRef, useCallback } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

// Global custom loading listeners for forms and imperative actions
type FaviconStateListener = (isLoading: boolean) => void;
const listeners = new Set<FaviconStateListener>();
let globalCustomLoadingCount = 0;

export const faviconController = {
  startLoading: () => {
    globalCustomLoadingCount++;
    notify();
  },
  stopLoading: () => {
    globalCustomLoadingCount = Math.max(0, globalCustomLoadingCount - 1);
    notify();
  },
  setLoading: (loading: boolean) => {
    if (loading) {
      faviconController.startLoading();
    } else {
      faviconController.stopLoading();
    }
  },
};

function notify() {
  const isLoading = globalCustomLoadingCount > 0;
  listeners.forEach((listener) => listener(isLoading));
}

/**
 * Hook for any form, modal, or action to declare active loading on the favicon
 */
export function useFaviconLoading(isLoading: boolean) {
  useEffect(() => {
    if (isLoading) {
      faviconController.startLoading();
      return () => {
        faviconController.stopLoading();
      };
    }
  }, [isLoading]);
}

/**
 * Ensures standard favicon link elements exist in document.head
 */
function getFaviconLinks() {
  if (typeof document === "undefined") return { svgLink: null, pngLink: null, icoLink: null };

  let svgLink = document.querySelector<HTMLLinkElement>("link[rel='icon'][type='image/svg+xml']");
  if (!svgLink) {
    svgLink = document.createElement("link");
    svgLink.rel = "icon";
    svgLink.type = "image/svg+xml";
    svgLink.href = "/favicon.svg";
    document.head.appendChild(svgLink);
  }

  let pngLink = document.querySelector<HTMLLinkElement>("link[rel='icon'][type='image/png']");
  if (!pngLink) {
    pngLink = document.createElement("link");
    pngLink.rel = "icon";
    pngLink.type = "image/png";
    pngLink.href = "/favicon-32x32.png";
    document.head.appendChild(pngLink);
  }

  return { svgLink, pngLink };
}

/**
 * Dynamic Favicon Manager Component
 * Observes router navigation, queries, mutations, and form submission states.
 * Swaps to the dynamic glowing/spinning favicon during loading and cleanly resets to the transparent icon when idle.
 */
export function DynamicFaviconHandler() {
  const isNavigating = useRouterState({ select: (s) => s.isLoading });
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const activeFrameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const isSystemLoading = isNavigating || isFetching > 0 || isMutating > 0;

  const stopCanvasAnimation = useCallback(() => {
    if (activeFrameRef.current !== null) {
      cancelAnimationFrame(activeFrameRef.current);
      activeFrameRef.current = null;
    }
  }, []);

  const startCanvasAnimation = useCallback((targetLink: HTMLLinkElement) => {
    if (activeFrameRef.current !== null) return;

    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
      canvasRef.current.width = 32;
      canvasRef.current.height = 32;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = "/favicon-32x32.png";

    let angle = 0;
    let lastTime = 0;

    const render = (time: number) => {
      if (time - lastTime > 60) {
        // ~16 FPS tab update avoids unnecessary battery / CPU usage
        lastTime = time;
        angle = (angle + 24) % 360;

        ctx.clearRect(0, 0, 32, 32);
        ctx.save();
        ctx.translate(16, 16);
        ctx.rotate((angle * Math.PI) / 180);

        // Draw radiant amber halo behind rotating mark
        ctx.beginPath();
        ctx.arc(0, 0, 13, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 166, 61, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.drawImage(img, -14, -14, 28, 28);
        ctx.restore();

        try {
          targetLink.href = canvas.toDataURL("image/png");
        } catch {
          // Ignore security or frame update errors
        }
      }
      activeFrameRef.current = requestAnimationFrame(render);
    };

    img.onload = () => {
      activeFrameRef.current = requestAnimationFrame(render);
    };
  }, []);

  const updateFavicon = useCallback(
    (loading: boolean) => {
      if (typeof window === "undefined" || typeof document === "undefined") return;

      const { svgLink, pngLink } = getFaviconLinks();
      if (!svgLink) return;

      if (loading) {
        // 1. Direct animated SVG for SVG-supporting browsers (Chrome, Firefox, Edge)
        const animatedHref = `/favicon-loading.svg?t=${Date.now()}`;
        svgLink.href = animatedHref;
        if (pngLink) {
          pngLink.href = animatedHref;
        }

        // 2. High-performance canvas rotational animation fallback for Safari and strict ICO/PNG tabbars
        startCanvasAnimation(pngLink || svgLink);
      } else {
        stopCanvasAnimation();
        svgLink.href = "/favicon.svg";
        if (pngLink) {
          pngLink.href = "/favicon-32x32.png";
        }
      }
    },
    [startCanvasAnimation, stopCanvasAnimation],
  );

  useEffect(() => {
    let customLoading = globalCustomLoadingCount > 0;

    const handleCustomChange = (loading: boolean) => {
      customLoading = loading;
      updateFavicon(isSystemLoading || customLoading);
    };

    listeners.add(handleCustomChange);
    updateFavicon(isSystemLoading || customLoading);

    return () => {
      listeners.delete(handleCustomChange);
    };
  }, [isSystemLoading, updateFavicon]);

  useEffect(() => {
    return () => {
      stopCanvasAnimation();
    };
  }, [stopCanvasAnimation]);

  return null;
}
