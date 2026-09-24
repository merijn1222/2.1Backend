import 'dotenv/config';
import bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/Database/Prisma/Generated/client.js';

const adapter = new PrismaPg({
  connectionString: process.env.POST_DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error('ADMIN_USERNAME and ADMIN_PASSWORD are required');
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { username },
    update: {
      role: 'ADMIN',
      passwordHash,
    },
    create: {
      username,
      passwordHash,
      role: 'ADMIN',
    },
  });
}

try {
  await main();
} finally {
  await prisma.$disconnect();
}