"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight, ArrowLeft, ChevronRight, Paintbrush, Armchair, CircleDot, Sparkles, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCar, accessories, type Car, type CarOption } from '@/data/cars';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const steps = [
    { id: 1, name: 'Exterior', icon: Paintbrush },
    { id: 2, name: 'Interior', icon: Armchair },
    { id: 3, name: 'Wheels', icon: CircleDot },
    { id: 4, name: 'Accessories', icon: Sparkles },
    { id: 5, name: 'Summary', icon: FileText },
];

interface ConfiguratorProps {
    carId: string;
}

const Configurator = ({ carId }: ConfiguratorProps) => {
    const selectedCar = getCar(carId);

    // Hook must be called unconditionally, but we can handle not found later
    const [currentStep, setCurrentStep] = useState(1);

    // Initialize state with first available options or defaults if car not found (to prevent crash)
    // We will handle "Car Not Found" content return after hooks
    const defaultExterior = selectedCar?.colors[0] || { id: 'default', name: 'Default', price: 0, hex: '#000' } as CarOption;
    const defaultInterior = selectedCar?.interiors[0] || { id: 'default', name: 'Default', price: 0, hex: '#000' } as CarOption;
    const defaultWheels = selectedCar?.rims[0] || { id: 'default', name: 'Default', price: 0, image: '' } as CarOption;

    const [selectedExterior, setSelectedExterior] = useState<CarOption>(defaultExterior);
    const [selectedInterior, setSelectedInterior] = useState<CarOption>(defaultInterior);
    const [selectedWheels, setSelectedWheels] = useState<CarOption>(defaultWheels);
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);

    if (!selectedCar) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
                    <Link href="/" className="text-primary hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    const toggleAccessory = (id: string) => {
        setSelectedAccessories((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
    };

    const selectedAccessoriesData = accessories.filter((a: any) => selectedAccessories.includes(a.id));

    const totalPrice = useMemo(() => {
        const accessoriesTotal = selectedAccessoriesData.reduce((sum: number, a: any) => sum + a.price, 0);
        return selectedCar.price + selectedExterior.price + selectedInterior.price + selectedWheels.price + accessoriesTotal;
    }, [selectedCar.price, selectedExterior.price, selectedInterior.price, selectedWheels.price, selectedAccessoriesData]);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-24 pb-8 px-6">
                <div className="container mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <Link href="/models" className="hover:text-primary transition-colors">Models</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-foreground">{selectedCar.name} Configuration</span>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 overflow-x-auto pb-2">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.id} className="flex items-center">
                                    <button
                                        onClick={() => setCurrentStep(step.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-3 md:px-4 py-2 rounded transition-all",
                                            currentStep === step.id
                                                ? "bg-primary text-primary-foreground"
                                                : currentStep > step.id
                                                    ? "bg-primary/20 text-primary"
                                                    : "bg-secondary text-muted-foreground"
                                        )}
                                    >
                                        <Icon className="h-4 w-4" />
                                        <span className="hidden md:inline text-sm uppercase tracking-wider">{step.name}</span>
                                    </button>
                                    {index < steps.length - 1 && (
                                        <div className={cn("w-4 md:w-8 h-0.5 mx-1 md:mx-2", currentStep > step.id ? "bg-primary" : "bg-border")} />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Car Preview - Enhanced */}
                        <div className="relative order-2 lg:order-1">
                            <div className="sticky top-32 space-y-6">
                                {/* Main Car Image with Color Overlay */}
                                <div
                                    className="aspect-square rounded-lg overflow-hidden border border-border relative bg-secondary"
                                    style={{ backgroundColor: selectedExterior.hex }}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={selectedCar.image}
                                            alt={selectedCar.name}
                                            fill
                                            className="object-cover mix-blend-luminosity opacity-80"
                                            priority
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                                    {/* Selected Color Badge */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                                        <div
                                            className="w-4 h-4 rounded-full border border-white/20"
                                            style={{ backgroundColor: selectedExterior.hex }}
                                        />
                                        <span className="text-xs uppercase tracking-wider">{selectedExterior.name}</span>
                                    </div>
                                </div>

                                {/* Configuration Summary Panel */}
                                <div className="bg-card rounded-lg border border-border overflow-hidden">
                                    <div className="p-4 border-b border-border bg-secondary/30">
                                        <h3 className="font-display text-lg font-bold">Your Configuration</h3>
                                    </div>

                                    <div className="p-4 space-y-4">
                                        {/* Exterior Selection */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                                    <Paintbrush className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Exterior</p>
                                                    <p className="font-medium">{selectedExterior.name}</p>
                                                </div>
                                            </div>
                                            <div
                                                className="w-8 h-8 rounded-full border-2 border-border"
                                                style={{ backgroundColor: selectedExterior.hex }}
                                            />
                                        </div>

                                        {/* Interior Selection */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                                    <Armchair className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Interior</p>
                                                    <p className="font-medium">{selectedInterior.name}</p>
                                                </div>
                                            </div>
                                            <div
                                                className="w-8 h-8 rounded-full border-2 border-border"
                                                style={{ backgroundColor: selectedInterior.hex }}
                                            />
                                        </div>

                                        {/* Wheels Selection */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                                    <CircleDot className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Wheels</p>
                                                    <p className="font-medium text-sm">{selectedWheels.name}</p>
                                                </div>
                                            </div>
                                            <span className="text-sm text-primary font-medium">
                                                {selectedWheels.price === 0 ? 'Included' : `+${formatPrice(selectedWheels.price)}`}
                                            </span>
                                        </div>

                                        {/* Accessories Selection */}
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                                                    <Sparkles className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Accessories</p>
                                                    {selectedAccessoriesData.length === 0 ? (
                                                        <p className="font-medium text-muted-foreground">None selected</p>
                                                    ) : (
                                                        <p className="font-medium">{selectedAccessoriesData.length} selected</p>
                                                    )}
                                                </div>
                                            </div>
                                            {selectedAccessoriesData.length > 0 && (
                                                <span className="text-sm text-primary font-medium">
                                                    +{formatPrice(selectedAccessoriesData.reduce((sum: number, a: any) => sum + a.price, 0))}
                                                </span>
                                            )}
                                        </div>

                                        {/* Accessories List */}
                                        {selectedAccessoriesData.length > 0 && (
                                            <div className="pl-13 space-y-1 pt-2 border-t border-border mt-2">
                                                {selectedAccessoriesData.map((acc: any) => (
                                                    <div key={acc.id} className="flex items-center justify-between text-sm py-1">
                                                        <span className="text-muted-foreground flex items-center gap-2">
                                                            <Check className="h-3 w-3 text-primary" />
                                                            {acc.name}
                                                        </span>
                                                        <span className="text-muted-foreground">+{formatPrice(acc.price)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Price Footer */}
                                    <div className="p-4 border-t border-border bg-primary/5">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Total Price</p>
                                                <p className="text-2xl font-display font-bold text-primary">{formatPrice(totalPrice)}</p>
                                            </div>
                                            <Button variant="hero" size="sm" asChild>
                                                <Link href="/test-drive">Test Drive</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Configuration Panel */}
                        <div className="space-y-8 order-1 lg:order-2">
                            {/* Step 1: Exterior */}
                            {currentStep === 1 && (
                                <div className="animate-fade-up">
                                    <h2 className="font-display text-3xl font-bold mb-2">Exterior Color</h2>
                                    <p className="text-muted-foreground mb-8">Select your perfect exterior finish</p>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {selectedCar.colors.map((color) => (
                                            <button
                                                key={color.id}
                                                onClick={() => setSelectedExterior(color)}
                                                className={cn(
                                                    "p-4 rounded-lg border-2 transition-all",
                                                    selectedExterior.id === color.id
                                                        ? "border-primary ring-2 ring-primary/20"
                                                        : "border-border hover:border-muted-foreground"
                                                )}
                                            >
                                                <div
                                                    className="w-full aspect-square rounded-lg mb-3 relative overflow-hidden"
                                                    style={{ backgroundColor: color.hex }}
                                                >
                                                    {selectedExterior.id === color.id && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                            <Check className="h-8 w-8 text-white drop-shadow-lg" />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-sm font-medium text-center">{color.name}</p>
                                                <p className="text-xs text-muted-foreground text-center mt-1">
                                                    {color.price === 0 ? 'Included' : `+${formatPrice(color.price)}`}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Interior */}
                            {currentStep === 2 && (
                                <div className="animate-fade-up">
                                    <h2 className="font-display text-3xl font-bold mb-2">Interior</h2>
                                    <p className="text-muted-foreground mb-8">Choose your cabin atmosphere</p>

                                    <div className="grid grid-cols-2 gap-4">
                                        {selectedCar.interiors.map((color) => (
                                            <button
                                                key={color.id}
                                                onClick={() => setSelectedInterior(color)}
                                                className={cn(
                                                    "p-6 rounded-lg border-2 transition-all",
                                                    selectedInterior.id === color.id
                                                        ? "border-primary ring-2 ring-primary/20"
                                                        : "border-border hover:border-muted-foreground"
                                                )}
                                            >
                                                <div
                                                    className="w-full h-24 rounded-lg mb-4 relative overflow-hidden"
                                                    style={{ backgroundColor: color.hex }}
                                                >
                                                    {selectedInterior.id === color.id && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                            <Check className="h-8 w-8 text-white drop-shadow-lg" />
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="font-medium">{color.name}</p>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {color.price === 0 ? 'Included' : `+${formatPrice(color.price)}`}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Wheels */}
                            {currentStep === 3 && (
                                <div className="animate-fade-up">
                                    <h2 className="font-display text-3xl font-bold mb-2">Wheels</h2>
                                    <p className="text-muted-foreground mb-8">Select your performance wheels</p>

                                    <div className="space-y-4">
                                        {selectedCar.rims.map((wheel) => (
                                            <button
                                                key={wheel.id}
                                                onClick={() => setSelectedWheels(wheel)}
                                                className={cn(
                                                    "w-full p-6 rounded-lg border-2 transition-all text-left flex justify-between items-center",
                                                    selectedWheels.id === wheel.id
                                                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                                        : "border-border hover:border-muted-foreground"
                                                )}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center border-4 border-zinc-700">
                                                        <div className="w-6 h-6 rounded-full bg-zinc-900" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-lg">{wheel.name}</p>
                                                        <p className="text-muted-foreground text-sm">
                                                            {wheel.price === 0 ? 'Included' : `+${formatPrice(wheel.price)}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedWheels.id === wheel.id && (
                                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                                        <Check className="h-5 w-5 text-primary-foreground" />
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Accessories */}
                            {currentStep === 4 && (
                                <div className="animate-fade-up">
                                    <h2 className="font-display text-3xl font-bold mb-2">Accessories</h2>
                                    <p className="text-muted-foreground mb-8">Enhance your driving experience</p>

                                    <div className="space-y-4">
                                        {accessories.map((accessory: any) => (
                                            <button
                                                key={accessory.id}
                                                onClick={() => toggleAccessory(accessory.id)}
                                                className={cn(
                                                    "w-full p-6 rounded-lg border-2 transition-all text-left flex justify-between items-center",
                                                    selectedAccessories.includes(accessory.id)
                                                        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                                                        : "border-border hover:border-muted-foreground"
                                                )}
                                            >
                                                <div>
                                                    <p className="font-medium text-lg">{accessory.name}</p>
                                                    <p className="text-muted-foreground text-sm">+{formatPrice(accessory.price)}</p>
                                                </div>
                                                <div
                                                    className={cn(
                                                        "w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all",
                                                        selectedAccessories.includes(accessory.id)
                                                            ? "bg-primary border-primary"
                                                            : "border-muted-foreground"
                                                    )}
                                                >
                                                    {selectedAccessories.includes(accessory.id) && (
                                                        <Check className="h-5 w-5 text-primary-foreground" />
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Summary */}
                            {currentStep === 5 && (
                                <div className="animate-fade-up">
                                    <h2 className="font-display text-3xl font-bold mb-2">Configuration Summary</h2>
                                    <p className="text-muted-foreground mb-8">Review your {selectedCar.name}</p>

                                    <div className="space-y-6">
                                        <div className="p-6 bg-card rounded-lg border border-border">
                                            <h3 className="font-display text-xl font-bold mb-6">Price Breakdown</h3>

                                            <div className="space-y-4">
                                                <div className="flex justify-between py-3 border-b border-border">
                                                    <span className="text-muted-foreground">{selectedCar.name} Base Price</span>
                                                    <span className="font-medium">{formatPrice(selectedCar.price)}</span>
                                                </div>
                                                <div className="flex justify-between py-3 border-b border-border items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-4 h-4 rounded-full border border-border"
                                                            style={{ backgroundColor: selectedExterior.hex }}
                                                        />
                                                        <span className="text-muted-foreground">{selectedExterior.name}</span>
                                                    </div>
                                                    <span className="font-medium">{selectedExterior.price === 0 ? 'Included' : `+${formatPrice(selectedExterior.price)}`}</span>
                                                </div>
                                                <div className="flex justify-between py-3 border-b border-border items-center">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="w-4 h-4 rounded-full border border-border"
                                                            style={{ backgroundColor: selectedInterior.hex }}
                                                        />
                                                        <span className="text-muted-foreground">{selectedInterior.name}</span>
                                                    </div>
                                                    <span className="font-medium">{selectedInterior.price === 0 ? 'Included' : `+${formatPrice(selectedInterior.price)}`}</span>
                                                </div>
                                                <div className="flex justify-between py-3 border-b border-border">
                                                    <span className="text-muted-foreground">{selectedWheels.name}</span>
                                                    <span className="font-medium">
                                                        {selectedWheels.price === 0 ? 'Included' : `+${formatPrice(selectedWheels.price)}`}
                                                    </span>
                                                </div>
                                                {selectedAccessoriesData.map((acc: any) => (
                                                    <div key={acc.id} className="flex justify-between py-3 border-b border-border">
                                                        <span className="text-muted-foreground">{acc.name}</span>
                                                        <span className="font-medium">+{formatPrice(acc.price)}</span>
                                                    </div>
                                                ))}
                                                <div className="flex justify-between py-3 pt-6">
                                                    <span className="font-display text-xl font-bold">Total</span>
                                                    <span className="font-display text-2xl font-bold text-primary">
                                                        {formatPrice(totalPrice)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <Button variant="hero" size="lg" className="flex-1" asChild>
                                                <Link href="/test-drive">Book Test Drive</Link>
                                            </Button>
                                            <Button variant="heroOutline" size="lg" className="flex-1">
                                                Reserve Now
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between pt-8 border-t border-border">
                                <Button
                                    variant="ghost"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" /> Previous
                                </Button>
                                {currentStep < 5 && (
                                    <Button variant="hero" onClick={nextStep} className="gap-2">
                                        Next <ArrowRight className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Configurator;
