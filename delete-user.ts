import 'dotenv/config';
import { prisma } from './app/lib/prisma';

async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'admin@resnetwork.kz' } });
  if (user) {
    await prisma.ticket.deleteMany({ where: { userId: user.id } });
    const result = await prisma.user.deleteMany({ where: { email: 'admin@resnetwork.kz' } });
    console.log('Deleted:', result);
  }
}

main().catch(console.error).finally(() => process.exit(0));
