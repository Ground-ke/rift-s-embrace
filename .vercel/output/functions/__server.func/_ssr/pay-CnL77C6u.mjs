import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pay-CnL77C6u.js
var $$splitComponentImporter = () => import("./pay-SfySE5SK.mjs");
var paySearchSchema = objectType({
	orderId: stringType().optional(),
	token: stringType().optional(),
	idempotencyKey: stringType().optional()
});
var Route = createFileRoute("/pay")({
	validateSearch: (search) => paySearchSchema.parse(search),
	head: () => ({ meta: [
		{ title: "Complete Payment — Hauntings of the Rift | Verve & Co." },
		{
			name: "description",
			content: "Authoritative M-Pesa checkout and instant cryptographic ticket issuance for Hauntings of the Rift."
		},
		{
			property: "og:title",
			content: "Payment & Confirmation — Hauntings of the Rift"
		},
		{
			property: "og:description",
			content: "Complete your admission payment securely."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
