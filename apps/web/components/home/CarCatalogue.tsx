"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CarCard from '@/components/home/CarCard';
import { cars } from '@/data/cars';

const categories = [
    { id: 'all', label: 'All Models' },
    { id: 'coupe', label: 'Coupe' },
    { id: 'gt', label: 'Grand Tourer' },
    { id: 'roadster', label: 'Roadster' },
];

const CarCatalogue = () => {
    // We can use a simplified version for the home page or the full filterable version
    // Implementing the Featured/Catalogue section for Home page

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
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
                </div>

                {/* Car Grid - showing top 4 or all? Showing all 3 from cars.json for now */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {cars.map((car, index) => (
                        <div
                            key={car.id}
                            className="animate-fade-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Adapting car data to match CarCard props if needed, but cars.ts should match */}
                            <CarCard
                                id={car.id}
                                name={car.name}
                                tagline={car.description} // Using description as tagline or similar
                                price={car.price}
                                image={car.colors[0]?.image || '/hero-car.jpg'} // Fallback or first color image
                                specs={{
                                    topSpeed: car.topSpeed,
                                    acceleration: car.speed,
                                    power: car.power
                                }}
                            />
                        </div>
                    ))}
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

export default CarCatalogue;
