import Link from "next/link";
import { Menu, Search, ShoppingCart, Phone, ShieldCheck, Truck } from "lucide-react";
import { categories } from "@/lib/catalog";

export function SiteHeader(){return <>
  <div className="eedTopbar"><div className="container-shell"><span><Truck/> Commercial event equipment • Nationwide fulfillment</span><span className="eedTopTrust"><ShieldCheck/> Built for rental companies, venues & event professionals</span></div></div>
  <header className="eedHeader">
    <div className="container-shell eedHeaderMain">
      <button className="eedMenu lg:hidden" aria-label="Open menu"><Menu/></button>
      <Link href="/" className="eedBrand" aria-label="Event Equipment Direct home"><div><strong>EVENT EQUIPMENT</strong><b>DIRECT</b></div><small>COMMERCIAL EVENT SUPPLY</small></Link>
      <div className="eedSearch"><Search/><input aria-label="Search products" placeholder="What equipment are you looking for?"/><button>SEARCH</button></div>
      <div className="eedHeaderActions"><div className="eedSales"><Phone/><span><small>NEED HELP WITH AN ORDER?</small><Link href="/quote">Talk to commercial sales</Link></span></div><Link href="/quote" className="eedQuote">GET A QUOTE</Link><Link href="/cart" aria-label="Shopping cart" className="eedCart"><ShoppingCart/><span>Cart</span></Link></div>
    </div>
    <div className="container-shell eedMobileSearch"><Search/><input aria-label="Search equipment" placeholder="Search tents, chairs, tables, parts..."/></div>
    <nav className="eedNav"><div className="container-shell"><Link href="/category/tents" className="eedNavFeatured">TENTS</Link>{categories.filter(c=>c.slug!=="tents").map(c=><Link key={c.slug} href={`/category/${c.slug}`}>{c.name.toUpperCase()}</Link>)}<Link href="/starter-packages">START A RENTAL BUSINESS</Link><Link href="/quote" className="eedNavQuote">BULK & FREIGHT QUOTE</Link></div></nav>
  </header>
</>}
