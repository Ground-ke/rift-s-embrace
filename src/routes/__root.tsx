import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { VerveErrorState } from "../components/brand/verve-logo";

function NotFoundComponent() {
  return (
    <VerveErrorState
      code="404"
      title="Page Not Found"
      description="The page you're looking for doesn't exist or has moved from the Rift."
      actionLabel="Return to Event"
      actionTo="/"
    />
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <VerveErrorState
      code="500"
      title="This Page Didn't Load"
      description="Something went wrong on our end. You can try refreshing or head back to the main event."
      actionLabel="Return to Event"
      actionTo="/"
      onRetry={() => {
        router.invalidate();
        reset();
      }}
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hauntings of the Rift — Verve & Co." },
      {
        name: "description",
        content: "A premium Halloween nightlife experience in Nakuru presented by Verve & Co.",
      },
      { name: "author", content: "Verve & Co." },
      { property: "og:title", content: "Hauntings of the Rift — Verve & Co." },
      {
        property: "og:description",
        content: "Something is stirring beneath Nakuru. Presented by Verve & Co.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@VerveAndCo" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/favicon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
    </QueryClientProvider>
  );
}
