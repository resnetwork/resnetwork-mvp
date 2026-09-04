import { prisma } from './app/lib/prisma';
async function main() {
  const companies = await prisma.company.findMany();
  console.log(companies[0]);
}
main();
