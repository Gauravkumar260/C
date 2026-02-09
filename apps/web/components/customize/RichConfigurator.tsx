'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Check, ArrowRight, ArrowLeft, ChevronRight, Paintbrush, Armchair, CircleDot, Sparkles, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useConfigStore, Vehicle, Option } from '@/store/config';

interface RichConfiguratorProps {
  vehicle: Vehicle;
}

const steps = [
  { id: 1, name: 'Exterior', icon: Paintbrush },
  { id: 2, name: 'Interior', icon: Armchair },
  { id: 3, name: 'Wheels', icon: CircleDot },
  { id: 4, name: 'Accessories', icon: Sparkles },
  { id: 5, name: 'Summary', icon: FileText },
];

export default function RichConfigurator({ vehicle }: RichConfiguratorProps) {
  const { setVehicle, selectedOptions, setOption, getTotalPrice } = useConfigStore();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setVehicle(vehicle);
  }, [vehicle, setVehicle]);

  // Helper to parse assets
  const getAsset = (opt: Option, key: string) => {
    try {
      const assets = JSON.parse(opt.assets || '{}');
      return assets[key];
    } catch {
      return null;
    }
  };

  // Group options
  const exteriorColors = vehicle.options.filter(o => o.type === 'COLOR');
  const interiorColors = vehicle.options.filter(o => o.type === 'INTERIOR');
  const wheels = vehicle.options.filter(o => o.type === 'WHEELS');
  const accessories = vehicle.options.filter(o => o.type === 'ACCESSORY');

  // Derived state from store
  const selectedExteriorId = selectedOptions['COLOR'];
  const selectedInteriorId = selectedOptions['INTERIOR'];
  const selectedWheelsId = selectedOptions['WHEELS'];
  const selectedAccessoryIds = Object.entries(selectedOptions)
    .filter(([type]) => type === 'ACCESSORY') // In store, we might need a better way for multiple accessories if they are multiple types, but for now assuming one? 
    // Wait, the store maps Type -> ID. So only one accessory? 
    // The prototype allowed multiple. The store structure Record<string, string> supports one option per type.
    // We might need to adjust the store or OptionType enum to support multiple accessories (e.g. ACCESSORY_1, ACCESSORY_2) or change store to Record<string, string[]>.
    // For now, let's assume we fit into the store's constraint or just use local state for accessories if they are not mutually exclusive types in the DB.
    // Actually, looking at schema, OptionType is ENUM. If we want multiple accessories, we might need to change how we store them or just have one "Package".
    // Let's stick to the store for now. If the user selects an accessory, it sets 'ACCESSORY' type. This implies single choice. 
    // To allow multiple, we'd need to change the store. I'll stick to single choice for 'ACCESSORY' type for now to match backend, 
    // OR I can manage accessories locally if they aren't strictly validated yet.
    // Let's use local state for accessories to match the Prototype's multi-select feel, 
    // but we won't be able to persist them easily to the Order unless the backend supports it.
    // The Order model takes a `customizationId`. `Customization` model has `config` string.
    // I can store whatever JSON I want in `config`.
    // But `useConfigStore` assumes `Record<string, string>`.
    // I will modify `useConfigStore` locally in this file to handle array for accessories if needed, or just map them to custom types 'ACCESSORY_ID'
    .map(([, id]) => id);

  const selectedExterior = vehicle.options.find(o => o.id === selectedExteriorId) || exteriorColors[0];
  const selectedInterior = vehicle.options.find(o => o.id === selectedInteriorId) || interiorColors[0];
  const selectedWheels = vehicle.options.find(o => o.id === selectedWheelsId) || wheels[0];
  
  // Local state for multi-select accessories since store is 1:1 type
  const [localAccessories, setLocalAccessories] = useState<string[]>([]);

  const toggleAccessory = (id: string) => {
    setLocalAccessories(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedAccessoriesData = vehicle.options.filter(o => localAccessories.includes(o.id));

  // Overwrite getTotalPrice logic locally to include multi-accessories
  const totalPrice = Number(vehicle.basePrice) + 
    (selectedExterior ? Number(selectedExterior.price) : 0) +
    (selectedInterior ? Number(selectedInterior.price) : 0) +
    (selectedWheels ? Number(selectedWheels.price) : 0) +
    selectedAccessoriesData.reduce((sum, a) => sum + Number(a.price), 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Get assets
  const exteriorHex = selectedExterior ? getAsset(selectedExterior, 'hex') : '#000000';
  const interiorHex = selectedInterior ? getAsset(selectedInterior, 'hex') : '#000000';
  const carImage = getAsset(vehicle as unknown as Option, 'thumbnail') || '/placeholder.png'; // Assuming vehicle has assets json too

  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <div className="pt-8 pb-8 px-6">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Models</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{vehicle.model} Configuration</span>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-12 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded transition-all ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : currentStep > step.id
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline text-sm uppercase tracking-wider">{step.name}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <div className={`w-4 md:w-8 h-0.5 mx-1 md:mx-2 ${currentStep > step.id ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Car Preview */}
            <div className="relative order-2 lg:order-1">
              <div className="sticky top-32 space-y-6">
                <div
                  className="aspect-square rounded-lg overflow-hidden border border-border relative transition-colors duration-500"
                  style={{ backgroundColor: exteriorHex }}
                >
                  <img
                    src={carImage}
                    alt={vehicle.model}
                    className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <div
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: exteriorHex }}
                    />
                    <span className="text-xs uppercase tracking-wider">{selectedExterior?.name}</span>
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
                          <p className="font-medium">{selectedExterior?.name}</p>
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full border-2 border-border"
                        style={{ backgroundColor: exteriorHex }}
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
                          <p className="font-medium">{selectedInterior?.name}</p>
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full border-2 border-border"
                        style={{ backgroundColor: interiorHex }}
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
                          <p className="font-medium text-sm">{selectedWheels?.name}</p>
                        </div>
                      </div>
                      <span className="text-sm text-primary font-medium">
                        {Number(selectedWheels?.price) === 0 ? 'Included' : `+${formatPrice(Number(selectedWheels?.price))}`}
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
                          +{formatPrice(selectedAccessoriesData.reduce((sum, a) => sum + Number(a.price), 0))}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price Footer */}
                  <div className="p-4 border-t border-border bg-primary/5">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Price</p>
                        <p className="text-2xl font-display font-bold text-primary">{formatPrice(totalPrice)}</p>
                      </div>
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
                    {exteriorColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setOption('COLOR', color.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedExterior?.id === color.id
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div
                          className="w-full aspect-square rounded-lg mb-3 relative overflow-hidden"
                          style={{ backgroundColor: getAsset(color, 'hex') }}
                        >
                          {selectedExterior?.id === color.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Check className="h-8 w-8 text-white drop-shadow-lg" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-medium text-center">{color.name}</p>
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
                    {interiorColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setOption('INTERIOR', color.id)}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          selectedInterior?.id === color.id
                            ? 'border-primary ring-2 ring-primary/20'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div
                          className="w-full h-24 rounded-lg mb-4 relative overflow-hidden"
                          style={{ backgroundColor: getAsset(color, 'hex') }}
                        >
                          {selectedInterior?.id === color.id && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <Check className="h-8 w-8 text-white drop-shadow-lg" />
                            </div>
                          )}
                        </div>
                        <p className="font-medium">{color.name}</p>
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
                    {wheels.map((wheel) => (
                      <button
                        key={wheel.id}
                        onClick={() => setOption('WHEELS', wheel.id)}
                        className={`w-full p-6 rounded-lg border-2 transition-all text-left flex justify-between items-center ${
                          selectedWheels?.id === wheel.id
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800 flex items-center justify-center border-4 border-zinc-700">
                            <div className="w-6 h-6 rounded-full bg-zinc-900" />
                          </div>
                          <div>
                            <p className="font-medium text-lg">{wheel.name}</p>
                            <p className="text-muted-foreground text-sm">
                              {Number(wheel.price) === 0 ? 'Included' : `+${formatPrice(Number(wheel.price))}`}
                            </p>
                          </div>
                        </div>
                        {selectedWheels?.id === wheel.id && (
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
                    {accessories.map((accessory) => (
                      <button
                        key={accessory.id}
                        onClick={() => toggleAccessory(accessory.id)}
                        className={`w-full p-6 rounded-lg border-2 transition-all text-left flex justify-between items-center ${
                          localAccessories.includes(accessory.id)
                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                            : 'border-border hover:border-muted-foreground'
                        }`}
                      >
                        <div>
                          <p className="font-medium text-lg">{accessory.name}</p>
                          <p className="text-muted-foreground text-sm">+{formatPrice(Number(accessory.price))}</p>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                            localAccessories.includes(accessory.id)
                              ? 'bg-primary border-primary'
                              : 'border-muted-foreground'
                          }`}
                        >
                          {localAccessories.includes(accessory.id) && (
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
                  <p className="text-muted-foreground mb-8">Review your {vehicle.model}</p>

                  <div className="space-y-6">
                    <div className="p-6 bg-card rounded-lg border border-border">
                      <h3 className="font-display text-xl font-bold mb-6">Price Breakdown</h3>

                      <div className="space-y-4">
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted-foreground">{vehicle.model} Base Price</span>
                          <span className="font-medium">{formatPrice(Number(vehicle.basePrice))}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-border items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: exteriorHex }}
                            />
                            <span className="text-muted-foreground">{selectedExterior?.name}</span>
                          </div>
                          <span className="font-medium">Included</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-border items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: interiorHex }}
                            />
                            <span className="text-muted-foreground">{selectedInterior?.name}</span>
                          </div>
                          <span className="font-medium">Included</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted-foreground">{selectedWheels?.name}</span>
                          <span className="font-medium">
                            {Number(selectedWheels?.price) === 0 ? 'Included' : `+${formatPrice(Number(selectedWheels?.price))}`}
                          </span>
                        </div>
                        {selectedAccessoriesData.map((acc) => (
                          <div key={acc.id} className="flex justify-between py-3 border-b border-border">
                            <span className="text-muted-foreground">{acc.name}</span>
                            <span className="font-medium">+{formatPrice(Number(acc.price))}</span>
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
}
