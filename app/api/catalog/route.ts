import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        category: true,
        images: { orderBy: { sort: 'asc' } },
        specifications: true,
        variants: { include: { supplierListings: { where: { active: true } } } },
        verification: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ ok: true, products });
  } catch (error) {
    console.error('Catalog API failure', error);
    return NextResponse.json({ ok: false, error: 'Unable to load catalog' }, { status: 500 });
  }
}
