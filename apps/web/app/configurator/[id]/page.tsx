import Configurator from '@/components/configurator/Configurator';

// This is correct for Next.js 15+ where params is a Promise
// However, assuming Next.js 14-ish structure or just simple server component for now
// Standard App Router page:
export default async function ConfiguratorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <Configurator carId={id} />;
}