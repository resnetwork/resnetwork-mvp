import { prisma } from './app/lib/prisma';

async function main() {
  const comps = await prisma.company.findMany();
  
  const bf = comps.find(c => c.name.toLowerCase() === 'bf');
  if (bf) {
    console.log('Found BF!');
  } else {
    console.log('No BF found. Here are companies:');
    comps.forEach(c => console.log(c.name));
  }

  const kaz = comps.find(c => c.name === 'Kaz GBC');
  if (kaz) {
    await prisma.company.update({where:{id:kaz.id}, data:{logoUrl:'/logos/community/kazgbc.png'}});
    console.log('Done kazgbc');
  }
}

main().catch(console.error).finally(()=>prisma.$disconnect());
