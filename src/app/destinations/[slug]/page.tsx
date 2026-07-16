import { notFound } from 'next/navigation';
import { getDestination, getAllDestinations } from '@/lib/tina';
import DestinationPageClient from './DestinationPageClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;

  const [destination, allDestinations] = await Promise.all([
    getDestination(slug),
    getAllDestinations(),
  ]);

  if (!destination) {
    notFound();
  }

  return (
    <DestinationPageClient
      destination={destination}
      allDestinations={allDestinations}
    />
  );
}
