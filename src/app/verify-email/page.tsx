import VerifyEmailClient from './VerifyEmailClient';

export default async function VerifyEmail({ searchParams }: { searchParams?: Promise<{ token?: string } | undefined> }) {
  const raw = await searchParams;
  const token = raw?.token ?? null;
  return <VerifyEmailClient token={token} />;
}
