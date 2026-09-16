import Link from "next/link";
import { Menu, Search, ShoppingCart, UserRound, Phone } from "lucide-react";
import { categories } from "@/lib/catalog";

export function SiteHeader(){return <>
  <div className="bg-navy text-white text-xs"><div className="container-shell flex justify-between py-2"><span>Commercial event equipment • Nationwide fulfillment</span><span className="hidden sm:block">Built for rental companies & event professionals</span></div></div>
  <header className="border-b bg-white sticky top-0 z-40">
    <div className="container-shell flex h-20 items-center gap-6">
      <button className="lg:hidden" aria-label="Open menu"><Menu/></button>
      <Link href="/" className="min-w-fit"><div className="text-xl font-black tracking-tight text-navy">FRIENDLY <span className="text-orange">SUPPLY</span></div><div className="text-[10px] tracking-[.22em] text-slate-500">COMMERCIAL EVENT EQUIPMENT</div></Link>
      <div className="hidden md:flex flex-1 items-center rounded-lg border-2 border-slate-200 bg-slate-50 px-4 focus-within:border-orange"><Search className="mr-3 h-5 w-5 text-slate-400"/><input className="w-full bg-transparent py-3 outline-none" placeholder="Search tents, chairs, parts, inflatables..."/></div>
      <div className="ml-auto flex items-center gap-4"><div className="hidden xl:flex items-center gap-2 text-sm"><Phone className="h-5 w-5"/><span><b>Equipment help</b><br/><span className="text-slate-500">Talk to a specialist</span></span></div><UserRound/><ShoppingCart/></div>
    </div>
    <div className="container-shell pb-3 md:hidden"><div className="flex items-center rounded-lg border bg-slate-50 px-3"><Search className="h-4 w-4 text-slate-400"/><input className="w-full bg-transparent px-2 py-3 outline-none" placeholder="Search equipment..."/></div></div>
    <nav className="hidden border-t lg:block"><div className="container-shell flex h-12 items-center gap-7 text-sm font-bold">{categories.map(c=><Link key={c.slug} href={`/category/${c.slug}`} className="hover:text-orange">{c.name}</Link>)}<Link href="/starter-packages" className="text-orange">Starter Packages</Link><Link href="/learn">Learn</Link></div></nav>
  </header>
</>}
