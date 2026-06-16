import { NextResponse } from 'next/server';
import { getCases } from '@/lib/cases';

export function GET() {
  return NextResponse.json({ cases: getCases() });
}
