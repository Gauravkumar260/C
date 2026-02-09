import { create } from 'zustand';

export interface Option {
  id: string;
  name: string;
  type: string;
  price: number;
  assets: string; // JSON string
}

export interface Vehicle {
  id: string;
  model: string;
  basePrice: number;
  options: Option[];
}

interface ConfigState {
  vehicle: Vehicle | null;
  selectedOptions: Record<string, string>; // OptionType -> OptionID
  setVehicle: (vehicle: Vehicle) => void;
  setOption: (type: string, optionId: string) => void;
  reset: () => void;
  getTotalPrice: () => number;
  getSelectedOption: (type: string) => Option | undefined;
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  vehicle: null,
  selectedOptions: {},
  setVehicle: (vehicle) => {
    // Set default options (first of each type)
    const defaults: Record<string, string> = {};
    const types = new Set(vehicle.options.map(o => o.type));
    types.forEach(type => {
      const first = vehicle.options.find(o => o.type === type);
      if (first) defaults[type] = first.id;
    });
    set({ vehicle, selectedOptions: defaults });
  },
  setOption: (type, optionId) => set((state) => ({
    selectedOptions: { ...state.selectedOptions, [type]: optionId }
  })),
  reset: () => set({ vehicle: null, selectedOptions: {} }),
  getTotalPrice: () => {
    const { vehicle, selectedOptions } = get();
    if (!vehicle) return 0;
    let total = Number(vehicle.basePrice);
    Object.values(selectedOptions).forEach(optId => {
      const opt = vehicle.options.find(o => o.id === optId);
      if (opt) total += Number(opt.price);
    });
    return total;
  },
  getSelectedOption: (type) => {
    const { vehicle, selectedOptions } = get();
    if (!vehicle) return undefined;
    const optId = selectedOptions[type];
    return vehicle.options.find(o => o.id === optId);
  }
}));