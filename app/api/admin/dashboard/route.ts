import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [
      orders,
      openQuotes,
      supplierConflicts,
      freightQuotesRequired,
      unacknowledgedPOs,
      priceChanges,
    ] = await Promise.all([
      prisma.order.findMany({
        select: {
          status: true,
          total: true,
          items: { select: { quantity: true, supplierCostSnapshot: true } },
        },
      }),
      prisma.quote.count({ where: { status: { notIn: ['ACCEPTED', 'DECLINED', 'EXPIRED'] } } }),
      prisma.productVerification.count({
        where: {
          OR: [
            { supplierSku: 'CONFLICT' },
            { dealerCost: 'CONFLICT' },
            { inventory: 'CONFLICT' },
            { shipping: 'CONFLICT' },
          ],
        },
      }),
      prisma.supplierListing.count({ where: { active: true, shippingMode: null } }),
      prisma.purchaseOrder.count({ where: { status: 'SENT' } }),
      prisma.productVerification.count({ where: { dealerCost: { in: ['STALE', 'CONFLICT'] } } }),
    ]);

    const activeOrders = orders.filter((order) => order.status !== 'CANCELLED' && order.status !== 'REFUNDED');
    const revenue = activeOrders.reduce((sum, order) => sum + Number(order.total), 0);
    const estimatedCost = activeOrders.reduce(
      (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + Number(item.supplierCostSnapshot ?? 0) * item.quantity, 0),
      0,
    );
    const waitingApproval = orders.filter((order) => order.status === 'PENDING' || order.status === 'REVIEW').length;

    return NextResponse.json({
      ok: true,
      stats: {
        orders: orders.length,
        revenue,
        grossProfit: revenue - estimatedCost,
        openQuotes,
      },
      attention: {
        waitingApproval,
        supplierConflicts,
        freightQuotesRequired,
        unacknowledgedPOs,
        priceChanges,
      },
    });
  } catch (error) {
    console.error('Admin dashboard API failure', error);
    return NextResponse.json({ ok: false, error: 'Unable to load dashboard' }, { status: 500 });
  }
}
