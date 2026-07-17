import { notFound } from 'next/navigation';
import { getDestination, getAllDestinations } from '@/lib/tina';
import DestinationModalClient from './DestinationModalClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const destinations = await getAllDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function InterceptedDestinationModal({ params }: PageProps) {
  const { slug } = await params;
  const destination = await getDestination(slug);

  if (!destination) {
    notFound();
  }

  return <DestinationModalClient destination={destination} />;
}
