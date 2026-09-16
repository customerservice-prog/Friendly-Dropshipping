import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Product, money } from "@/lib/catalog";

export function ProductCard({product}:{product:Product}){return <article className="group overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-soft">
  <Link href={`/product/${product.slug}`}><div className="relative aspect-[4/3] overflow-hidden bg-slate-100"><img src={product.image} alt={product.imageAlt} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"/>{product.badge&&<span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{product.badge}</span>}</div></Link>
  <div className="p-5"><div className="mb-2 flex items-center gap-1 text-xs font-semibold text-emerald-700"><CheckCircle2 className="h-4 w-4"/>{product.availability}</div><Link href={`/product/${product.slug}`} className="text-lg font-bold leading-snug group-hover:text-orange">{product.name}</Link><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{product.summary}</p><div className="mt-5 flex items-end justify-between"><div><div className="text-xs text-slate-500">From</div><div className="text-xl font-black">{money(product.price)}</div></div><ArrowRight className="h-5 w-5 transition group-hover:translate-x-1"/></div></div>
</article>}
