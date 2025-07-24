// app/api/incidents/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const resolved = searchParams.get('resolved');

  const where = resolved === 'false'
    ? { resolved: false }
    : resolved === 'true'
    ? { resolved: true }
    : {};

  const incidents = await prisma.incident.findMany({
    where,
    orderBy: { tsStart: 'desc' },
    include: { camera: true },
  });

  return NextResponse.json(incidents);
}
