const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const companies = await prisma.company.findMany();
  
  const mapping = {
    'afd': 'afd.png',
    'b&r': 'brettc.png',
    'belt and road': 'brettc.png',
    'caier': 'caier.png',
    'global nature': 'global nature initiatives.png',
    'gpi': 'gpi.png',
    'igtic': 'igtic.png',
    'kazgbc': 'kazgbc.png',
    'li auto': 'liauto.png',
    'longi': 'longi.png',
    'petrocouncil': 'petrocouncil.png',
    'арэк': 'арэк.png',
    'ассоциация': 'генеральная ассоциация.png',
    'жасыл даму': 'жасыл даму.png',
    'казгидромет': 'казгидромет.png'
  };

  for (const company of companies) {
    let matchedLogo = null;
    for (const [key, filename] of Object.entries(mapping)) {
      if (company.name.toLowerCase().includes(key)) {
        matchedLogo = `/logos/community/${filename}`;
        break;
      }
    }
    
    if (matchedLogo) {
      await prisma.company.update({
        where: { id: company.id },
        data: { logoUrl: matchedLogo }
      });
      console.log(`Updated ${company.name} -> ${matchedLogo}`);
    } else {
      console.log(`No logo found for ${company.name}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
