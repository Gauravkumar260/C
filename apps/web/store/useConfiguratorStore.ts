import { create } from 'zustand';
import { Car, CarColor, CarRim, CarInterior, ConfigState } from '../types';
import { fetchAPI } from '../lib/api';

interface ConfiguratorStore extends ConfigState {
    cars: Car[];
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchCars: () => Promise<void>;
    selectCar: (carId: string) => void;
    setExteriorColor: (color: CarColor) => void;
    setRims: (rims: CarRim) => void;
    setInterior: (interior: CarInterior) => void;
}

export const useConfiguratorStore = create<ConfiguratorStore>((set, get) => ({
    cars: [],
    isLoading: false,
    error: null,
    currentCarId: null,
    exteriorColor: null,
    rims: null,
    interior: null,
    totalPrice: 0,

    fetchCars: async () => {
        set({ isLoading: true, error: null });
        try {
            const vehicles = await fetchAPI('/vehicles');

            // Transform API data to Frontend Car interface
            const cars: Car[] = vehicles.map((v: any) => {
                const colors = v.options.filter((o: any) => o.type === 'COLOR').map((o: any) => ({
                    id: o.id,
                    name: o.name,
                    hex: o.assets?.hex || '#000000',
                    price: o.price
                }));

                const rims = v.options.filter((o: any) => o.type === 'WHEELS').map((o: any) => ({
                    id: o.id,
                    name: o.name,
                    image: o.assets?.texture || '',
                    price: o.price
                }));

                const interiors = v.options.filter((o: any) => o.type === 'INTERIOR').map((o: any) => ({
                    id: o.id,
                    name: o.name,
                    material: o.assets?.texture || 'Leather',
                    hex: '#000000', // Default
                    price: o.price
                }));

                return {
                    id: v.id,
                    name: `${v.make} ${v.model}`,
                    price: v.basePrice,
                    description: v.description,
                    speed: "3.2s", // Placeholder as these fields are missing in DB
                    topSpeed: "200mph",
                    power: "650hp",
                    colors,
                    rims,
                    interiors
                };
            });

            set({ cars, isLoading: false });
        } catch (err: any) {
            set({ error: err.message, isLoading: false });
        }
    },

    selectCar: (carId: string) => {
        const { cars } = get();
        const car = cars.find((c) => c.id === carId);
        if (!car) return;

        set({
            currentCarId: car.id,
            exteriorColor: car.colors[0] || null,
            rims: car.rims[0] || null,
            interior: car.interiors[0] || null,
            totalPrice: car.price,
        });
    },

    setExteriorColor: (color: CarColor) => {
        set((state) => {
            const car = state.cars.find((c) => c.id === state.currentCarId);
            const basePrice = car ? car.price : 0;
            const rimsPrice = state.rims ? state.rims.price : 0;
            const interiorPrice = state.interior ? state.interior.price : 0;

            return {
                exteriorColor: color,
                totalPrice: basePrice + color.price + rimsPrice + interiorPrice,
            };
        });
    },

    setRims: (rims: CarRim) => {
        set((state) => {
            const car = state.cars.find((c) => c.id === state.currentCarId);
            const basePrice = car ? car.price : 0;
            const colorPrice = state.exteriorColor ? state.exteriorColor.price : 0;
            const interiorPrice = state.interior ? state.interior.price : 0;

            return {
                rims: rims,
                totalPrice: basePrice + colorPrice + rims.price + interiorPrice,
            };
        });
    },

    setInterior: (interior: CarInterior) => {
        set((state) => {
            const car = state.cars.find((c) => c.id === state.currentCarId);
            const basePrice = car ? car.price : 0;
            const colorPrice = state.exteriorColor ? state.exteriorColor.price : 0;
            const rimsPrice = state.rims ? state.rims.price : 0;

            return {
                interior: interior,
                totalPrice: basePrice + colorPrice + rimsPrice + interior.price,
            };
        });
    },
}));
