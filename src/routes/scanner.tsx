import { createFileRoute } from "@tanstack/react-router";
import { AdminScannerPage } from "./admin.scan";

export const Route = createFileRoute("/scanner")({
  component: AdminScannerPage,
});
