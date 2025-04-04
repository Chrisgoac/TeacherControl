import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();

  const student = await prisma.student.create({
    data,
  });

  return NextResponse.json(student);
}
