import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const quoteSchema = z.object({
  email: z.string().email(),
  firstName: z.string().trim().min(1).max(80).optional(),
  lastName: z.string().trim().max(80).optional(),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  notes: z.string().trim().min(3).max(5000),
});

function quoteNumber() {
  return `Q-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

export async function POST(request: Request) {
  try {
    const input = quoteSchema.parse(await request.json());
    const customer = await prisma.customer.upsert({
      where: { email: input.email.toLowerCase() },
      update: { firstName: input.firstName, lastName: input.lastName, company: input.company, phone: input.phone },
      create: { email: input.email.toLowerCase(), firstName: input.firstName, lastName: input.lastName, company: input.company, phone: input.phone },
    });
    const quote = await prisma.quote.create({
      data: { number: quoteNumber(), customerId: customer.id, notes: input.notes, status: 'NEW' },
      select: { id: true, number: true, status: true, createdAt: true },
    });
    return NextResponse.json({ ok: true, quote }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ ok: false, error: 'Invalid quote request', details: error.flatten() }, { status: 400 });
    console.error('Quote API failure', error);
    return NextResponse.json({ ok: false, error: 'Unable to create quote' }, { status: 500 });
  }
}
