import ResetPasswordClient from './ResetPasswordClient';

export default async function ResetPassword({ searchParams }: { searchParams?: Promise<{ token?: string } | undefined> }) {
  const raw = await searchParams;
  const token = raw?.token ?? null;
  return <ResetPasswordClient token={token} />;
}
