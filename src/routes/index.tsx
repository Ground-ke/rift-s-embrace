import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Clock3, MapPin, Menu, Moon, Share2, Shirt, Sparkles, Users, Volume2, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/rift-night.jpg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Countdown } from "@/components/event/countdown";
import { ShareActions } from "@/components/event/share-actions";
import { TicketCard, type Ticket } from "@/components/event/ticket-card";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Hauntings of the Rift — Halloween in Nakuru" },
    { name: "description", content: "Hauntings of the Rift at The Lawns, Nakuru. 31 October 2026 from 4 PM. Tickets from KES 1,000." },
    { property: "og:title", content: "Hauntings of the Rift — 31 October 2026" },
    { property: "og:description", content: "Something is stirring beneath Nakuru. Tickets from KES 1,000." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const tickets: Ticket[] = [
  { name: "Early Bird", price: 1000, people: "Single entry", note: "Limited release pricing" },
  { name: "Couple", price: 1800, people: "Entry for two", note: "Arrive together" },
  { name: "Group of Four", price: 3600, people: "Entry for four", note: "Bring the whole crew" },
];

const nav = [["Experience", "#experience"], ["Tickets", "#tickets"], ["Venue", "#venue"], ["FAQ", "#faq"]];
const heroFacts: Array<[string, LucideIcon]> = [["31 October 2026", Clock3], ["The Lawns · Nakuru", MapPin], ["4 PM — late", Moon]];
const experiences: Array<[string, string, string, LucideIcon]> = [
  ["01", "Atmosphere", "A dark, cinematic setting inspired by the Rift after hours.", Sparkles],
  ["02", "Music", "A nightlife soundtrack. Line-up details will be announced by the organizers.", Volume2],
  ["03", "Costumes", "The brief is simple: arrive wickedly fabulous.", Shirt],
  ["04", "Social energy", "Come as a couple or gather a crew of four.", Users],
];
const faqs: Array<[string, string]> = [
  ["Who can attend?", "This is an 18+ event."], ["What is the dress code?", "Wickedly Fabulous."], ["Where is the event?", "The Lawns Restaurant, Oyster-Shell Rd, opposite Sarova Woodlands, Nakuru."], ["What time does it start?", "Doors open at 4 PM and the event continues till late."], ["How much are tickets?", "Early Bird is KES 1,000, Couple is KES 1,800, and Group of Four is KES 3,600."], ["How do I buy a ticket?", "Online purchase will be connected when the M-Pesa ticketing backend is ready."], ["What happens after payment?", "This information will be updated by the organizers."], ["Can I get a refund?", "This information will be updated by the organizers."],
];

function Header() {
  return <header className="absolute inset-x-0 top-0 z-30 border-b border-bone/10 bg-background/35 backdrop-blur-md">
    <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:px-6 lg:px-8">
      <a href="#home" className="min-w-0 font-display text-xl font-bold text-bone sm:text-2xl">H/R <span className="ml-2 font-sans text-[10px] uppercase tracking-[.25em] text-muted-foreground">Serve & Co. presents</span></a>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">{nav.map(([label, href]) => <a className="text-sm font-semibold uppercase tracking-widest text-bone-muted hover:text-bone" href={href} key={href}>{label}</a>)}<Button asChild variant="event"><Link to="/checkout">Buy tickets</Link></Button></nav>
      <Sheet><SheetTrigger asChild><Button className="min-h-11 min-w-11 lg:hidden" variant="spectral" size="icon" aria-label="Open menu"><Menu /></Button></SheetTrigger><SheetContent className="border-oxblood bg-background"><SheetTitle className="font-display text-3xl text-bone">Hauntings of the Rift</SheetTitle><nav className="mt-10 grid gap-2">{nav.map(([label, href]) => <SheetClose asChild key={href}><a className="border-b border-border py-4 text-xl uppercase text-bone" href={href}>{label}</a></SheetClose>)}<Button asChild variant="event" size="xl" className="mt-4"><Link to="/checkout">Buy tickets</Link></Button></nav></SheetContent></Sheet>
    </div>
  </header>;
}

function MobileTicketBar({ visible }: { visible: boolean }) {
  return <div className={`fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] transition-transform lg:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}><Button asChild variant="event" size="xl" className="w-full shadow-2xl"><Link to="/checkout">Buy tickets — from KES 1,000 <ArrowRight /></Link></Button></div>;
}

function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => setPastHero(!entry?.isIntersecting), { threshold: .12 }); if (heroRef.current) observer.observe(heroRef.current); return () => observer.disconnect(); }, []);
  return <div className="bg-background pb-20 text-foreground lg:pb-0">
    <Header />
    <section ref={heroRef} id="home" className="poster-grain relative flex min-h-[92svh] items-end overflow-hidden border-b border-oxblood">
      <img src={heroImage} alt="A moonlit garden venue beneath a crimson Rift Valley sky" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 size-full object-cover object-[62%_center] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,color-mix(in_oklab,var(--background)_78%,transparent)_44%,color-mix(in_oklab,var(--oxblood)_35%,transparent)_100%)]" />
      <div className="fog-drift absolute -left-1/4 top-1/3 h-40 w-2/3 rounded-full bg-bone/10 blur-3xl" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-9 pt-28 sm:px-6 sm:pb-14 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.35em] text-lavender">The most spooktacular Halloween themed event</p>
          <h1 className="max-w-3xl text-6xl font-semibold leading-[.78] text-bone sm:text-8xl lg:text-[8.2rem]">Hauntings <span className="block text-bone-muted">of the Rift</span></h1>
          <p className="mt-5 font-display text-xl italic text-bone sm:text-3xl">Something is stirring beneath Nakuru.</p>
          <div className="mt-6 grid max-w-3xl gap-px bg-bone/20 sm:grid-cols-3">
            {heroFacts.map(([text, Icon]) => <div key={text} className="flex min-h-12 items-center gap-3 bg-background/80 px-4 py-3 text-sm font-bold uppercase tracking-widest text-bone"><Icon className="size-4 text-lavender" />{text}</div>)}
          </div>
          <div className="mt-5 max-w-xl"><Countdown /></div>
          <div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="event" size="xl"><Link to="/checkout">Buy tickets <ArrowRight /></Link></Button><Button variant="spectral" size="xl" onClick={() => document.querySelector("#share")?.scrollIntoView({ behavior: "smooth" })}><Share2 /> Share event</Button></div>
        </div>
        <a href="#experience" aria-label="Scroll to event experience" className="absolute bottom-8 right-8 hidden size-12 place-items-center border border-bone/30 text-bone lg:grid"><ArrowDown /></a>
      </div>
    </section>

    <section className="border-b border-border bg-oxblood"><div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-bone/15 sm:grid-cols-4 sm:divide-y-0">{[["18+", "Admission"], ["Wickedly Fabulous", "Dress code"], ["KES 1,000", "Tickets from"], ["31 Oct", "Saturday"]].map(([big, small]) => <div className="px-4 py-6 text-center" key={small}><div className="font-display text-2xl text-bone">{big}</div><div className="mt-1 text-xs uppercase tracking-widest text-bone-muted">{small}</div></div>)}</div></section>

    <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.8fr_1.4fr]"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-lavender">What awaits</p><h2 className="mt-3 text-5xl text-bone sm:text-6xl">One night.<br/>A different Nakuru.</h2><p className="mt-5 max-w-md text-lg text-muted-foreground">A sophisticated Halloween gathering shaped by atmosphere, style, sound and the people you bring with you.</p></div><div className="grid gap-px bg-border sm:grid-cols-2">
    {experiences.map(([n,title,copy,Icon]) => <article className="min-h-64 bg-card p-6 sm:p-8" key={title}><div className="flex items-start justify-between"><span className="text-xs text-lavender">{n}</span><Icon className="size-5 text-bone-muted" /></div><h3 className="mt-16 text-3xl text-bone">{title}</h3><p className="mt-3 text-muted-foreground">{copy}</p></article>)}</div></div></section>

    <section id="tickets" className="border-y border-border bg-card/45 px-4 py-20 sm:px-6 lg:py-28"><div className="mx-auto max-w-7xl"><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-lavender">Secure your place</p><h2 className="mt-2 text-5xl text-bone sm:text-6xl">Choose your ticket</h2></div><p className="max-w-sm text-muted-foreground">Select a ticket to continue to the frontend checkout preview. Payments are not connected yet.</p></div><div className="grid gap-4 lg:grid-cols-3">{tickets.map((ticket, i) => <TicketCard key={ticket.name} ticket={ticket} featured={i === 2} />)}</div>
      <div className="mt-8 border border-dashed border-lavender/40 bg-lavender/5 p-5"><div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="flex items-center gap-2"><span className="border border-lavender px-2 py-1 text-xs font-bold uppercase text-lavender">Promotion system preview</span></div><h3 className="mt-3 text-2xl text-bone">Flash-sale module ready for real inventory data</h3><p className="mt-1 text-muted-foreground">Sale price, availability, countdown and remaining-ticket progress stay hidden until organizers publish verified promotion data.</p></div><Button variant="spectral" size="xl" disabled>Inactive</Button></div></div>
    </div></section>

    <section id="share" className="poster-grain relative overflow-hidden bg-oxblood px-4 py-20 sm:px-6 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-lavender">Who are you going with?</p><h2 className="mt-3 max-w-3xl text-6xl leading-[.85] text-bone sm:text-8xl">Bring your crew.</h2><p className="mt-5 max-w-xl text-lg text-bone-muted">Plans are better when the group chat is involved. Send the date. Pick your looks. Meet beneath the Rift.</p></div><div><p className="mb-4 text-sm uppercase tracking-widest text-bone-muted">Share this event</p><ShareActions /></div></div></section>

    <section id="venue" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="gothic-frame grid overflow-hidden lg:grid-cols-[.9fr_1.1fr]"><div className="p-7 sm:p-12"><MapPin className="size-7 text-lavender"/><p className="mt-12 text-xs font-bold uppercase tracking-[.3em] text-lavender">The gathering place</p><h2 className="mt-3 text-5xl text-bone">The Lawns Restaurant</h2><p className="mt-4 max-w-md text-lg text-muted-foreground">Oyster-Shell Rd, opposite Sarova Woodlands, Nakuru</p><Button asChild variant="event" size="xl" className="mt-8"><a href="https://www.google.com/maps/search/?api=1&query=The+Lawns+Restaurant+Nakuru" target="_blank" rel="noreferrer">Get directions <ArrowRight /></a></Button></div><div className="relative min-h-72 overflow-hidden border-t border-border lg:border-l lg:border-t-0"><img src={heroImage} alt="Night view evoking The Lawns event setting" loading="lazy" width={1536} height={1024} className="absolute inset-0 size-full object-cover opacity-65 grayscale"/><div className="absolute inset-0 bg-oxblood/30"/><div className="absolute bottom-6 left-6 border-l-2 border-lavender pl-4 text-sm uppercase tracking-widest text-bone">Nakuru, Kenya<br/><span className="text-muted-foreground">0.3031° S · 36.0800° E</span></div></div></div></section>

    <section id="faq" className="border-y border-border bg-card/45 px-4 py-20 sm:px-6 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-lavender">Know before you go</p><h2 className="mt-3 text-5xl text-bone">Questions from the crypt.</h2></div><Accordion type="single" collapsible>
    {faqs.map(([q,a]) => <AccordionItem value={q} key={q}><AccordionTrigger className="py-6 text-left text-lg text-bone hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 text-base text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section className="poster-grain px-4 py-24 text-center sm:px-6 lg:py-36"><p className="text-xs font-bold uppercase tracking-[.35em] text-lavender">31 October 2026 · The Lawns</p><h2 className="mx-auto mt-4 max-w-5xl text-6xl leading-[.85] text-bone sm:text-8xl">Nakuru. Are you ready?</h2><p className="mt-5 font-display text-2xl italic text-bone-muted">Something is stirring beneath the Rift.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild variant="event" size="xl"><Link to="/checkout">Buy tickets <ArrowRight /></Link></Button><Button variant="spectral" size="xl" onClick={() => document.querySelector("#share")?.scrollIntoView({ behavior: "smooth" })}>Share with friends</Button></div></section>
    <footer className="border-t border-border px-4 py-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground sm:flex-row"><span>Serve & Co. presents Hauntings of the Rift.</span><span>31 October 2026 · Nakuru · 18+</span></div></footer>
    <MobileTicketBar visible={pastHero} />
  </div>;
}