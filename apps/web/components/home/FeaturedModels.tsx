import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarCard from './CarCard';

interface Vehicle {
  id: string;
  model: string;
  description?: string;
  basePrice: number;
  assets?: string;
}

interface FeaturedModelsProps {
  vehicles?: Vehicle[];
}

const FeaturedModels = ({ vehicles = [] }: FeaturedModelsProps) => {
  const getVehicleImage = (v: Vehicle) => {
    try {
      const assets = JSON.parse(v.assets || '{}');
      return assets.thumbnail || '/placeholder.png';
    } catch {
      return '/placeholder.png';
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">
            The Collection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Choose Your Weapon
          </h2>
          <div className="section-divider" />
        </div>

        {/* Car Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {vehicles.map((car, index) => (
            <div
              key={car.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CarCard
                id={car.id}
                name={car.model}
                tagline={car.description || 'Precision Engineering'}
                price={Number(car.basePrice)}
                image={getVehicleImage(car)}
                specs={{
                  topSpeed: '200+ mph', // Placeholder from DB
                  acceleration: '3.0s',
                  power: '700+ hp',
                }}
              />
            </div>
          ))}
          {vehicles.length === 0 && (
             <div className="col-span-full text-center text-muted-foreground">
               No models available at the moment.
             </div>
          )}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Button variant="heroOutline" size="lg" asChild>
            <Link href="/models" className="group">
              View All Models
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModels;
