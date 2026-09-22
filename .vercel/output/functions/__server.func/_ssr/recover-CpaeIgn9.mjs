import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recover-CpaeIgn9.js
var $$splitComponentImporter = () => import("./recover-D7P4Z88o.mjs");
var recoverSearchSchema = objectType({ token: stringType().optional() });
var Route = createFileRoute("/recover")({
	validateSearch: (search) => recoverSearchSchema.parse(search),
	head: () => ({ meta: [
		{ title: "Recover Tickets — Hauntings of the Rift | Verve & Co." },
		{
			name: "description",
			content: "Look up and access your digital event passes for Hauntings of the Rift."
		},
		{
			property: "og:title",
			content: "Ticket Recovery — Hauntings of the Rift"
		},
		{
			property: "og:description",
			content: "Locate and access your digital admission tickets."
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
