require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.deleteMany({ where: { email: 'admin@resnetwork.kz' } })
  .then((res) => console.log('Deleted:', res))
  .catch((e) => console.error('Failed:', e))
  .finally(() => prisma.$disconnect());
