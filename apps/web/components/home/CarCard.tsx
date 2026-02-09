import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarCardProps {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  specs: {
    topSpeed: string;
    acceleration: string;
    power: string;
  };
}

const CarCard = ({ id, name, tagline, price, image, specs }: CarCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative card-gradient rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-500">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-80" />

        {/* Quick Specs Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-background/80 px-2 py-1 rounded">{specs.topSpeed}</span>
          <span className="bg-background/80 px-2 py-1 rounded">{specs.acceleration}</span>
          <span className="bg-background/80 px-2 py-1 rounded">{specs.power}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-primary text-xs uppercase tracking-widest mb-2">{tagline}</p>
        <h3 className="font-display text-2xl font-bold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4">Starting at {formatPrice(price)}</p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="ghost" size="sm" className="flex-1" asChild>
            <Link href={`/models/${id}`}>
              Details
            </Link>
          </Button>
          <Button variant="hero" size="sm" className="flex-1 group/btn" asChild>
            <Link href={`/customize/${id}`}>
              Configure
              <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
