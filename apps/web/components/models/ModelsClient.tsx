'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CarCard from '@/components/home/CarCard';
import { Button } from '@/components/ui/button';

interface Vehicle {
  id: string;
  model: string;
  basePrice: number;
  description?: string;
  assets?: string;
}

const categories = [
  { id: 'all', label: 'All Models' },
  { id: 'coupe', label: 'Coupe' },
  { id: 'gt', label: 'Grand Tourer' },
  { id: 'roadster', label: 'Roadster' },
];

const priceRanges = [
  { id: 'all', label: 'Any Price' },
  { id: 'under300', label: 'Under $300K' },
  { id: '300to400', label: '$300K - $400K' },
  { id: 'over400', label: '$400K+' },
];

export default function ModelsClient({ vehicles }: { vehicles: Vehicle[] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const getVehicleImage = (v: Vehicle) => {
    try {
      const assets = JSON.parse(v.assets || '{}');
      return assets.thumbnail || '/placeholder.png';
    } catch {
      return '/placeholder.png';
    }
  };

  // Enhance vehicles with mock specs/category if missing for UI demo
  const enhancedVehicles = vehicles.map(v => ({
    ...v,
    category: v.model.includes('Spyder') ? 'roadster' : v.model.includes('GT') ? 'gt' : 'coupe',
    tagline: v.description || 'Precision Engineering',
    specs: {
      topSpeed: '200+ mph',
      acceleration: '2.9s',
      power: '700+ hp'
    }
  }));

  const filteredCars = enhancedVehicles.filter((car) => {
    const categoryMatch = selectedCategory === 'all' || car.category === selectedCategory;
    const price = Number(car.basePrice);
    const priceMatch =
      selectedPrice === 'all' ||
      (selectedPrice === 'under300' && price < 300000) ||
      (selectedPrice === '300to400' && price >= 300000 && price < 400000) ||
      (selectedPrice === 'over400' && price >= 400000);
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <p className="text-primary uppercase tracking-[0.3em] text-sm font-medium mb-4">
            The Collection
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">
            Our Models
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl">
            Discover our range of {vehicles.length} handcrafted sports cars. Each one a masterpiece of
            engineering, designed for those who demand the extraordinary.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-border">
            <span className="text-muted-foreground text-sm uppercase tracking-wider">Filter:</span>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-sm uppercase tracking-wider rounded transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-border hidden md:block" />

            {/* Price Filter */}
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setSelectedPrice(range.id)}
                  className={`px-4 py-2 text-sm uppercase tracking-wider rounded transition-all ${
                    selectedPrice === range.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-muted-foreground text-sm">
            Showing {filteredCars.length} of {vehicles.length} models
          </div>
        </div>
      </section>

      {/* Car Grid */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car, index) => (
              <div
                key={car.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CarCard 
                  id={car.id}
                  name={car.model}
                  tagline={car.tagline}
                  price={Number(car.basePrice)}
                  image={getVehicleImage(car)}
                  specs={car.specs}
                />
              </div>
            ))}
          </div>

          {filteredCars.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No models match your current filters.
              </p>
              <Button
                variant="heroOutline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedPrice('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
