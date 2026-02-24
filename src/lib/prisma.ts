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
globalForPrisma.prisma = prisma; // vercel은 서버리스 환경이라 인스턴스가 자주 죽어서 메모리 누수 신경쓸 필요 x, 캐싱해서 속도나 올림
