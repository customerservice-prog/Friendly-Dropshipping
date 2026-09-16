import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const quoteSchema = z.object({
  email: z.string().trim().email().max(254),
  firstName: z.string().trim().min(1).max(80).optional(),
  lastName: z.string().trim().max(80).optional(),
  company: z.string().trim().max(120).optional(),
  phone: z.string().trim().max(40).optional(),
  notes: z.string().trim().min(3).max(5000),
});

function quoteNumber(){return `Q-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0,8).toUpperCase()}`;}
function json(body:unknown,status:number){return NextResponse.json(body,{status,headers:{'Cache-Control':'no-store'}});}

export async function POST(request:Request){
  try{
    const type=request.headers.get('content-type')||'';
    if(!type.toLowerCase().includes('application/json'))return json({ok:false,error:'Content-Type must be application/json'},415);
    const length=Number(request.headers.get('content-length')||0);
    if(length>12000)return json({ok:false,error:'Request too large'},413);
    const raw=await request.text();
    if(raw.length>12000)return json({ok:false,error:'Request too large'},413);
    let parsed:unknown;try{parsed=JSON.parse(raw)}catch{return json({ok:false,error:'Invalid JSON'},400)}
    const result=quoteSchema.safeParse(parsed);
    if(!result.success)return json({ok:false,error:'Invalid quote request'},400);
    const input=result.data;const email=input.email.toLowerCase();
    const customer=await prisma.customer.upsert({where:{email},update:{firstName:input.firstName,lastName:input.lastName,company:input.company,phone:input.phone},create:{email,firstName:input.firstName,lastName:input.lastName,company:input.company,phone:input.phone}});
    const quote=await prisma.quote.create({data:{number:quoteNumber(),customerId:customer.id,notes:input.notes,status:'NEW'},select:{id:true,number:true,status:true,createdAt:true}});
    return json({ok:true,quote},201);
  }catch(error){console.error('Quote API failure',error);return json({ok:false,error:'Unable to create quote'},500);}
}
