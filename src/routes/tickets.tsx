import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/tickets")({
  beforeLoad: () => {
    throw redirect({ to: "/recover" });
  },
  component: () => null,
});
