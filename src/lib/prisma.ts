import 'server-only';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL is not set');

  return new PrismaClient({
    adapter: new PrismaPg({ connectionString, max: 1 }),
  });
}

export const prisma = globalForPrisma.prisma ?? makePrismaClient();

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
globalForPrisma.prisma = prisma; // vercel에 배포하면 속도가 느린게 위 코드에서 캐시 초기화해서 그렇다는데 테스트 해볼 필요있음
