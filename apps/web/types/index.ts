export interface Car {
    id: string;
    name: string;
    price: number; // Base price
    description: string;
    speed: string; // e.g., "0-60 in 2.9s"
    topSpeed: string; // e.g., "210 mph"
    power: string; // e.g., "750 hp"
    colors: CarColor[];
    rims: CarRim[];
    interiors: CarInterior[];
}

export interface CarColor {
    id: string;
    name: string;
    hex: string;
    price: number;
}

export interface CarRim {
    id: string;
    name: string;
    image: string; // Path to image asset or R3F model ref
    price: number;
}

export interface CarInterior {
    id: string;
    name: string;
    material: string;
    hex: string;
    price: number;
}

export interface ConfigState {
    currentCarId: string | null;
    exteriorColor: CarColor | null;
    rims: CarRim | null;
    interior: CarInterior | null;
    totalPrice: number;
}
