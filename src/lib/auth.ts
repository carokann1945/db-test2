import 'server-only';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function getUserOrRedirect(nextPath: string = '/todos') {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  const claims = data?.claims;

  const userId = claims?.sub; // ✅ Supabase JWT의 user id
  if (error || !userId) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return { userId, claims };
}

// 로그인 안해도 null 반환, 리다이렉트 없음
export async function getUserId() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims?.sub ?? null;
}
