import { create } from 'zustand';
import { Car, CarColor, CarRim, CarInterior, ConfigState } from '../types';
import cars from '../data/cars.json';

interface ConfiguratorStore extends ConfigState {
    // Actions
    selectCar: (carId: string) => void;
    setExteriorColor: (color: CarColor) => void;
    setRims: (rims: CarRim) => void;
    setInterior: (interior: CarInterior) => void;
}

export const useConfiguratorStore = create<ConfiguratorStore>((set, get) => ({
    currentCarId: null,
    exteriorColor: null,
    rims: null,
    interior: null,
    totalPrice: 0,

    selectCar: (carId: string) => {
        const car = cars.find((c) => c.id === carId);
        if (!car) return;

        set({
            currentCarId: car.id,
            exteriorColor: car.colors[0], // Default to first option
            rims: car.rims[0],
            interior: car.interiors[0],
            totalPrice: car.price,
        });
    },

    setExteriorColor: (color: CarColor) => {
        set((state) => {
            const car = cars.find((c) => c.id === state.currentCarId);
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
            const car = cars.find((c) => c.id === state.currentCarId);
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
            const car = cars.find((c) => c.id === state.currentCarId);
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
