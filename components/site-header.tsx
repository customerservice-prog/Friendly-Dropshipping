import Link from "next/link";
import { Menu, Search, ShoppingCart, Phone, ShieldCheck, Truck } from "lucide-react";
import { categories } from "@/lib/catalog";

export function SiteHeader(){return <>
  <div className="eedTopbar"><div className="container-shell"><span><Truck/> Commercial event equipment • Nationwide fulfillment</span><span className="eedTopTrust"><ShieldCheck/> Built for rental companies, venues & event professionals</span></div></div>
  <header className="eedHeader">
    <div className="container-shell eedHeaderMain">
      <Link href="#store-navigation" className="eedMenu lg:hidden" aria-label="Jump to store menu"><Menu/></Link>
      <Link href="/" className="eedBrand" aria-label="Event Equipment Direct home"><div><strong>EVENT EQUIPMENT</strong><b>DIRECT</b></div><small>COMMERCIAL EVENT SUPPLY</small></Link>
      <form action="/search" className="eedSearch"><Search/><input name="q" aria-label="Search products" placeholder="What equipment are you looking for?"/><button type="submit">SEARCH</button></form>
      <div className="eedHeaderActions"><div className="eedSales"><Phone/><span><small>NEED HELP WITH AN ORDER?</small><Link href="/quote">Talk to commercial sales</Link></span></div><Link href="/quote" className="eedQuote">GET A QUOTE</Link><Link href="/cart" aria-label="Shopping cart" className="eedCart"><ShoppingCart/><span>Cart</span></Link></div>
    </div>
    <form action="/search" className="container-shell eedMobileSearch"><Search/><input name="q" aria-label="Search equipment" placeholder="Search tents, chairs, tables, parts..."/></form>
    <nav id="store-navigation" className="eedNav" aria-label="Store departments"><div className="container-shell"><Link href="/category/tents" className="eedNavFeatured">TENTS</Link>{categories.filter(c=>c.slug!=="tents").map(c=><Link key={c.slug} href={`/category/${c.slug}`}>{c.name.toUpperCase()}</Link>)}<Link href="/starter-packages">START A RENTAL BUSINESS</Link><Link href="/buying-guides">BUYING GUIDES</Link><Link href="/quote" className="eedNavQuote">BULK & FREIGHT QUOTE</Link></div></nav>
  </header>
</>}
