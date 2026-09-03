import 'dotenv/config';
import { prisma } from './app/lib/prisma';

async function main() {
  // 1. Жасыл даму
  await prisma.company.updateMany({
    where: { name: 'Жасыл даму' },
    data: {
      country: 'Казахстан',
      address: 'г. Астана, район Нұра, проспект Кабанбай Батыр, 11/5, 8',
      phone: '+7 700 730 08 55',
      email: 'kense@recycle.kz',
      website: 'https://recycle.kz/ru'
    }
  });
  console.log('Contacts updated: Жасыл даму');

  // 2. Global Nature Initiatives
  await prisma.company.updateMany({
    where: { name: 'Global Nature Initiatives' },
    data: {
      country: 'Казахстан',
      address: 'Астана',
      phone: '+77017986535',
      email: 'new_documents@mail.ru',
      website: ''
    }
  });
  console.log('Contacts updated: Global Nature Initiatives');

  // 3. AFD
  await prisma.company.updateMany({
    where: { name: 'AFD' },
    data: {
      country: 'Франция',
      address: 'улица Ролана Барта, 5, 75 598 Париж Седекс 12',
      phone: '+33 (0)1 53 44 31 31',
      email: '',
      website: 'https://www.afd.fr/en'
    }
  });
  console.log('Contacts updated: AFD');

  // 4. Li Auto
  await prisma.company.updateMany({
    where: { name: 'Li Auto' },
    data: {
      country: 'КНР (Китай)',
      address: 'г. Алматы, ул. Аль Фараби, 19',
      phone: '8 775 373 97 74',
      email: 'pub_kzmkt@lixiang.com',
      website: 'https://www.liauto.com/ru_kz'
    }
  });
  console.log('Contacts updated: Li Auto');
}

main().catch(console.error).finally(() => process.exit(0));
