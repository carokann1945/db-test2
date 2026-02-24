import { signOut } from '@/actions/auth.actions';

export default function Home() {
  return (
    <div>
      <h1>carokann template</h1>
      <form action={signOut}>
        <button type="submit">로그아웃</button>
      </form>
    </div>
  );
}
