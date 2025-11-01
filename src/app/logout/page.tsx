import LogoutClient from './LogoutClient';

export default function LogoutPage({ searchParams }: { searchParams: { reason?: string } }) {
  const { reason } = searchParams;
  const isExpired = reason === 'expired' || false;
  return <LogoutClient isExpired={isExpired} />;
}