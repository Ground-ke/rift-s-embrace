import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ticket._code-Cr_hSG0Z.js
var $$splitComponentImporter = () => import("./ticket._code-CypfvD65.mjs");
var Route = createFileRoute("/ticket/$code")({
	head: ({ params }) => ({ meta: [
		{ title: `Digital Ticket ${params?.code || ""} — Hauntings of the Rift | Verve & Co.` },
		{
			name: "description",
			content: "Official cryptographic admission ticket and QR pass for Hauntings of the Rift in Nakuru."
		},
		{
			property: "og:title",
			content: `Event Pass ${params?.code || ""} — Verve & Co.`
		},
		{
			property: "og:description",
			content: "Present this digital pass for entry at the event."
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
