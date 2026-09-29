import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  const gpiEvents = await prisma.event.findMany({
    where: { title: { contains: 'Smart Water Zone' } }
  });
  
  if (gpiEvents.length > 0) {
    const keepId = gpiEvents[0].id;
    const result = await prisma.event.deleteMany({
      where: {
        title: { contains: 'Smart Water Zone' },
        id: { not: keepId }
      }
    });
    
    await prisma.event.update({
      where: { id: keepId },
      data: { endDate: new Date('2027-09-29T00:00:00.000Z') }
    });
    
    return NextResponse.json({ success: true, kept: keepId, deleted: result.count });
  }
  return NextResponse.json({ success: false, message: 'Not found' });
}
