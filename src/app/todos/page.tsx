import { prisma } from '@/lib/prisma';
import { createTodo } from '@/actions/todos.action';

export default async function TodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { id: 'desc' },
  });

  return (
    <main style={{ padding: 24, maxWidth: 560 }}>
      <h1>Todos</h1>

      <form action={createTodo} style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input name="title" placeholder="할 일 입력" required style={{ flex: 1, padding: 8 }} />
        <button type="submit">추가</button>
      </form>

      <ul style={{ marginTop: 24 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ padding: '6px 0', borderBottom: '1px solid #eee' }}>
            #{t.id} {t.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
