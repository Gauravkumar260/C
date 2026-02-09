'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft, Gauge, Zap, Timer, Cog } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface Vehicle {
  id: string;
  model: string;
  basePrice: number;
  description?: string;
  assets?: string;
}

export default function ModelDetailClient({ vehicle }: { vehicle: Vehicle }) {
  const getAsset = (key: string) => {
    try {
      const assets = JSON.parse(vehicle.assets || '{}');
      return assets[key];
    } catch {
      return null;
    }
  };

  const image = getAsset('thumbnail') || '/placeholder.png';
  const tagline = vehicle.description ? vehicle.description.split('.')[0] : 'Precision Engineering';
  const description = vehicle.description || 'Experience the pinnacle of automotive engineering.';

  // Mock specs for UI demo
  const specs = {
    topSpeed: '200+ mph',
    acceleration: '2.9s',
    power: '700+ hp',
    engine: 'V8 Twin-Turbo',
    torque: '600 lb-ft',
    weight: '3,500 lbs'
  };

  const features = ['Active Aerodynamics', 'Carbon Ceramic Brakes', 'Adaptive Suspension', 'Launch Control', '10-speed DCT', 'Premium Audio System'];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24">
        <div className="container mx-auto px-6">
          <Link
            href="/models"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Models
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden border border-border">
                <img
                  src={image}
                  alt={vehicle.model}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">
                {tagline}
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                {vehicle.model}
              </h1>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {description}
              </p>

              <div className="text-3xl font-display font-bold mb-8">
                Starting at {formatPrice(Number(vehicle.basePrice))}
              </div>

              <div className="flex gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link href={`/customize/${vehicle.id}`} className="group">
                    Configure Yours
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <Link href="/test-drive">Test Drive</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">Performance</p>
            <h2 className="font-display text-4xl font-bold">Technical Specifications</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="p-6 bg-card rounded-lg border border-border text-center">
              <Timer className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="stat-value text-3xl">{specs.acceleration}</div>
              <div className="stat-label mt-2">0-60 mph</div>
            </div>
            <div className="p-6 bg-card rounded-lg border border-border text-center">
              <Gauge className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="stat-value text-3xl">{specs.topSpeed}</div>
              <div className="stat-label mt-2">Top Speed</div>
            </div>
            <div className="p-6 bg-card rounded-lg border border-border text-center">
              <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="stat-value text-3xl">{specs.power}</div>
              <div className="stat-label mt-2">Power</div>
            </div>
            <div className="p-6 bg-card rounded-lg border border-border text-center">
              <Cog className="h-8 w-8 text-primary mx-auto mb-4" />
              <div className="stat-value text-2xl">{specs.torque}</div>
              <div className="stat-label mt-2">Torque</div>
            </div>
            <div className="p-6 bg-card rounded-lg border border-border text-center col-span-2">
              <div className="stat-value text-xl">{specs.engine}</div>
              <div className="stat-label mt-2">Engine</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-carbon">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">Standard Equipment</p>
            <h2 className="font-display text-4xl font-bold">Key Features</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-4 bg-background/50 rounded-lg border border-border"
              >
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Ready to Experience the {vehicle.model}?
          </h2>
          <p className="text-muted-foreground text-xl mb-8 max-w-2xl mx-auto">
            Configure your perfect specification or schedule a test drive at your nearest dealership.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link href={`/customize/${vehicle.id}`}>Start Configuration</Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link href="/test-drive">Book Test Drive</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
