'use client';
import { useState } from 'react';
import { addToCart } from '@/lib/cart';

export function AddToCart({ slug, name, price }: { slug:string; name:string; price:number }) {
  const [quantity,setQuantity]=useState(1); const [added,setAdded]=useState(false);
  return <div className="mt-7 rounded-xl border bg-slate-50 p-5"><label className="text-xs font-black uppercase tracking-wider">Quantity</label><div className="mt-2 flex gap-3"><input value={quantity} onChange={e=>setQuantity(Math.max(1,Number(e.target.value)||1))} type="number" min="1" className="w-24 rounded-lg border bg-white px-4 py-3"/><button onClick={()=>{addToCart({slug,name,price,quantity});setAdded(true)}} className="flex-1 rounded-lg bg-orange px-5 py-3 font-black text-white">{added?'Added — View Cart':'Add to Cart'}</button></div><a href="/quote" className="mt-3 block w-full rounded-lg border-2 border-navy px-5 py-3 text-center font-black text-navy">Request Bulk / Freight Quote</a>{added&&<a href="/cart" className="mt-3 block text-center text-sm font-bold text-navy underline">Go to cart →</a>}</div>
}
