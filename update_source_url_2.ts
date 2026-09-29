import { prisma } from './app/lib/prisma';

async function main() {
  const event = await prisma.event.findFirst({
    where: { title: { contains: 'Smart Water Zone' } }
  });
  
  if (event) {
    await prisma.event.update({
      where: { id: event.id },
      data: { sourceUrl: 'https://compass.gpi.kz/diagnostika/smart-water-zone/' }
    });
    console.log('Updated Smart Water Zone sourceUrl to new URL');
  } else {
    console.log('Smart Water Zone not found');
  }
}

main().catch(console.error);
