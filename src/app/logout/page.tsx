import LogoutClient from './LogoutClient';

interface PageProps {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function LogoutPage({ searchParams }: PageProps) {
  const reason = searchParams.reason as string | undefined;
  const isExpired = reason === 'expired' || false;
  return <LogoutClient isExpired={isExpired} />;
}