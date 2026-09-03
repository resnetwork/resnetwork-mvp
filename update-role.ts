import 'dotenv/config';
import { prisma } from './app/lib/prisma';

async function main() {
  const result = await prisma.user.update({
    where: { email: 'admin@resnetwork.org' },
    data: { role: 'SYSTEM_ADMIN' }
  });
  console.log('Updated user role:', result.role);
}

main().catch(console.error).finally(() => process.exit(0));
