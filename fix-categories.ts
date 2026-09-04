import { prisma } from './app/lib/prisma';

async function main() {
  const companies = await prisma.company.findMany();
  console.log(`Found ${companies.length} companies.`);
  
  let count = 0;
  for (const company of companies) {
    if (!company.category) {
      await prisma.company.update({
        where: { id: company.id },
        data: { category: "COMPANY" }
      });
      count++;
    }
  }
  
  console.log(`Updated ${count} companies to have category="COMPANY".`);
}

main().catch(console.error).finally(() => process.exit(0));
