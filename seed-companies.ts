import 'dotenv/config';
import { prisma } from './app/lib/prisma';

const companyNames = [
  "IGTIC",
  "Zhasyl damu",
  "AFD",
  "LI Auto",
  "GNI",
  "CAIER",
  "Kas GBC",
  "GPI Group",
  "Petrocouncil.kz",
  "BRETTC",
  "Kazhydromet",
  "BRRI",
  "AREK",
  "Ассоциация китайских предпринимателей",
  "Longi"
];

async function main() {
  for (let i = 0; i < companyNames.length; i++) {
    const name = companyNames[i];
    // Генерируем фейковый БИН, так как он уникальный в схеме Prisma
    const fakeBin = `MOCK-${100000000000 + i}`;
    
    // Проверяем, существует ли уже компания с таким именем
    const existing = await prisma.company.findFirst({ where: { name } });
    if (!existing) {
      await prisma.company.create({
        data: {
          name,
          bin: fakeBin,
          status: 'APPROVED',
          description: "Информация ожидается..."
        }
      });
      console.log(`Создана компания: ${name}`);
    } else {
      console.log(`Компания ${name} уже существует`);
    }
  }
  console.log("Готово!");
}

main().catch(console.error).finally(() => process.exit(0));
