import LogoutClient from './LogoutClient';

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function LogoutPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams | undefined>;
}) {
  const rawSearchParams = await searchParams;

  const reason = Array.isArray(rawSearchParams?.reason)
    ? String(rawSearchParams.reason[0])
    : (rawSearchParams?.reason as string | undefined);

  const isExpired = reason === 'expired';

  return <LogoutClient isExpired={isExpired} />;
}
