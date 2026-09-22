import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DmmZQFCU.js
var $$splitComponentImporter = () => import("./checkout-DArB9BjC.mjs");
var searchSchema = objectType({
	ticket: stringType().optional().catch(void 0),
	orderId: stringType().optional().catch(void 0),
	token: stringType().optional().catch(void 0)
});
var Route = createFileRoute("/checkout")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "Ticket Checkout — Hauntings of the Rift" },
		{
			name: "description",
			content: "Reserve your ticket for Hauntings of the Rift on 31 October in Nakuru."
		},
		{
			property: "og:title",
			content: "Hauntings of the Rift Ticket Checkout"
		},
		{
			property: "og:description",
			content: "Reserve your ticket for 31 October in Nakuru."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
