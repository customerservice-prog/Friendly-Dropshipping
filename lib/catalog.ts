export type Category = { name: string; slug: string; kicker: string; icon: string };
export type Product = { id: string; name: string; slug: string; category: string; price: number; compareAt?: number; badge?: string; summary: string; availability: "In stock" | "Low stock" | "Confirm availability"; specs: Record<string,string>; included: string[]; imageLabel: string };

export const categories: Category[] = [
  { name: "Tents", slug: "tents", kicker: "Pole, frame & high peak", icon: "⛺" },
  { name: "Chairs", slug: "chairs", kicker: "Folding, resin & event", icon: "▥" },
  { name: "Tables", slug: "tables", kicker: "Banquet, round & cocktail", icon: "▰" },
  { name: "Inflatables", slug: "inflatables", kicker: "Bounce, slides & obstacles", icon: "◒" },
  { name: "Tent Parts", slug: "tent-parts", kicker: "Poles, stakes & replacements", icon: "⌁" },
  { name: "Accessories", slug: "accessories", kicker: "Lighting, tools & storage", icon: "✦" },
];

export const products: Product[] = [
  { id:"p1", name:"20' × 40' Commercial Pole Tent System", slug:"20x40-commercial-pole-tent", category:"tents", price:2499, badge:"Rental Business Favorite", summary:"A complete commercial event tent configuration designed for repeated professional use.", availability:"Confirm availability", imageLabel:"20 × 40 POLE TENT", specs:{"Tent style":"Pole tent","Footprint":"20 × 40 ft","Area":"800 sq ft","Use":"Commercial event rental","Shipping":"Freight"}, included:["Tent top","Pole set","Stake set","Tension hardware","Storage components"], },
  { id:"p2", name:"White Resin Folding Chair — 50 Pack", slug:"white-resin-chair-50-pack", category:"chairs", price:2199, badge:"Bulk Pack", summary:"Professional event seating sold in a business-ready bulk quantity.", availability:"Confirm availability", imageLabel:"50 CHAIR PACK", specs:{"Style":"Folding","Color":"White","Pack":"50 chairs","Use":"Commercial event rental","Shipping":"Freight"}, included:["50 folding chairs"], },
  { id:"p3", name:"6' Commercial Banquet Table — 10 Pack", slug:"6ft-banquet-table-10-pack", category:"tables", price:1299, summary:"Durable folding banquet tables for rental inventories, venues and caterers.", availability:"Confirm availability", imageLabel:"10 TABLE PACK", specs:{"Length":"6 ft","Style":"Folding banquet","Pack":"10 tables","Use":"Commercial","Shipping":"Freight"}, included:["10 banquet tables"], },
  { id:"p4", name:"Commercial 18' Dual-Lane Water Slide", slug:"18ft-dual-lane-water-slide", category:"inflatables", price:3899, badge:"Commercial", summary:"High-throughput inflatable concept for professional rental operators.", availability:"Confirm availability", imageLabel:"18' WATER SLIDE", specs:{"Type":"Water slide","Height":"18 ft class","Use":"Commercial rental","Blower":"Verify by supplier","Shipping":"Freight"}, included:["Inflatable unit"], },
];

export const money = (value:number) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD", maximumFractionDigits:0 }).format(value);
