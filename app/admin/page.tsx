'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, ArrowUpRight, Box, DollarSign, FileText, PackageCheck, ShoppingCart, Truck } from 'lucide-react';

type DashboardData = {
  stats: { orders: number; revenue: number; grossProfit: number; openQuotes: number };
  attention: { waitingApproval: number; supplierConflicts: number; freightQuotesRequired: number; unacknowledgedPOs: number; priceChanges: number };
};

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export default function Admin() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/admin/dashboard', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('Dashboard request failed');
        return response.json();
      })
      .then((result) => {
        if (!result.ok) throw new Error(result.error || 'Dashboard request failed');
        setData({ stats: result.stats, attention: result.attention });
      })
      .catch(() => setError(true));
  }, []);

  const stats = [
    [ShoppingCart, 'Orders', data ? String(data.stats.orders) : '—'],
    [DollarSign, 'Revenue', data ? money.format(data.stats.revenue) : '—'],
    [PackageCheck, 'Est. Gross Profit', data ? money.format(data.stats.grossProfit) : '—'],
    [FileText, 'Open Quotes', data ? String(data.stats.openQuotes) : '—'],
  ] as const;

  const attention = [
    ['Orders waiting for manual approval', data?.attention.waitingApproval],
    ['Supplier stock conflicts', data?.attention.supplierConflicts],
    ['Freight quotes required', data?.attention.freightQuotesRequired],
    ['Purchase orders not acknowledged', data?.attention.unacknowledgedPOs],
    ['Supplier price changes', data?.attention.priceChanges],
  ] as const;

  return <main className="min-h-screen bg-slate-100"><div className="border-b bg-navy text-white"><div className="container-shell flex h-16 items-center justify-between"><b>FRIENDLY SUPPLY / ADMIN</b><span className="text-xs text-slate-300">Commerce Operations</span></div></div><div className="container-shell py-10"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><div className="text-sm font-bold uppercase tracking-widest text-orange">Operations center</div><h1 className="mt-2 text-3xl font-black text-navy">Good morning</h1><p className="mt-2 text-slate-500">Live order, quote, supplier, and margin data from the commerce database.</p></div><button className="rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white">+ Add Product</button></div>{error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">Dashboard data could not be loaded. Check the database connection and deployment logs.</div>}<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(([Icon,label,value])=><div className="rounded-xl border bg-white p-5" key={label}><div className="flex items-center justify-between"><Icon className="h-5 w-5 text-orange"/><ArrowUpRight className="h-4 w-4 text-slate-300"/></div><div className="mt-5 text-2xl font-black">{value}</div><div className="text-sm text-slate-500">{label}</div></div>)}</div><div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]"><section className="rounded-xl border bg-white"><div className="flex items-center gap-2 border-b p-5"><AlertTriangle className="h-5 w-5 text-orange"/><h2 className="font-black">Needs Attention</h2></div>{attention.map(([label,value])=><div className="flex items-center justify-between border-b p-5 last:border-0" key={label}><span className="text-sm font-semibold">{label}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold">{value ?? '—'}</span></div>)}</section><section className="rounded-xl border bg-white p-5"><h2 className="font-black">Platform Foundation</h2><div className="mt-5 space-y-3">{[[Box,'Catalog + verification'],[Truck,'Suppliers + fulfillment'],[ShoppingCart,'Orders + PO routing'],[DollarSign,'Cost + margin snapshots']].map(([Icon,x]:any)=><div className="flex items-center gap-3 rounded-lg bg-slate-50 p-4 text-sm font-semibold" key={x}><Icon className="h-5 w-5 text-orange"/>{x}</div>)}</div></section></div></div></main>;
}
