'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createTodo(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim();
  if (!title) return;

  await prisma.todo.create({ data: { title } });

  // 목록 페이지 갱신
  revalidatePath('/todos');
}
