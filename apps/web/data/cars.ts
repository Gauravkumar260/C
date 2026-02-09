import carsData from './cars.json';

export interface Dealership {
  id: string;
  name: string;
  address: string;
  phone: string;
  coordinates: { lat: number; lng: number };
}

export const dealerships: Dealership[] = [
  {
    id: 'd1',
    name: 'APEX Beverly Hills',
    address: '9000 Wilshire Blvd, Beverly Hills, CA 90211',
    phone: '(310) 555-0123',
    coordinates: { lat: 34.0671, lng: -118.3977 },
  },
  {
    id: 'd2',
    name: 'APEX Manhattan',
    address: '40 10th Ave, New York, NY 10014',
    phone: '(212) 555-0199',
    coordinates: { lat: 40.7420, lng: -74.0048 },
  },
  {
    id: 'd3',
    name: 'APEX Miami',
    address: '1100 Biscayne Blvd, Miami, FL 33132',
    phone: '(305) 555-0155',
    coordinates: { lat: 25.7860, lng: -80.1900 },
  },
];


export interface CarOption {
  id: string;
  name: string;
  price: number;
  hex?: string;
  material?: string;
  image?: string;
}

export interface Car {
  id: string;
  name: string;
  price: number;
  description: string;
  speed: string;
  topSpeed: string;
  power: string;
  image: string; // Added image property
  colors: CarOption[];
  rims: CarOption[];
  interiors: CarOption[];
}

// Helper to map IDs to images (since JSON didn't have them)
const carImages: Record<string, string> = {
  'spectre-gt': '/cars/spectre.jpg', // spectre-gt -> spectre.jpg
  'phantom-x': '/cars/phantom.jpg', // phantom-x -> phantom.jpg
  'vanguard-s': '/cars/inferno.jpg', // Fallback for vanguard-s as it wasn't in prototype list but inferno matches style
};

type RawCar = Omit<Car, 'image'>;

export const cars: Car[] = (carsData as unknown as RawCar[]).map(car => ({
  ...car,
  image: carImages[car.id] || '/hero-car.jpg'
}));

// Helper to get a car by ID
export const getCar = (id: string) => cars.find((car) => car.id === id);

// Flattened options for aggregation if needed (legacy support or filtering)
export const allExteriorColors = Array.from(new Set(cars.flatMap(c => c.colors.map(o => JSON.stringify(o))))).map(s => JSON.parse(s));
export const allInteriors = Array.from(new Set(cars.flatMap(c => c.interiors.map(o => JSON.stringify(o))))).map(s => JSON.parse(s));
export const allRims = Array.from(new Set(cars.flatMap(c => c.rims.map(o => JSON.stringify(o))))).map(s => JSON.parse(s));

// Accessories were not in cars.json, defining standard ones
export const accessories = [
  { id: 'perf-exhaust', name: 'Performance Exhaust', price: 2500 },
  { id: 'carbon-trim', name: 'Carbon Fiber Trim', price: 1800 },
  { id: 'ceramic-brakes', name: 'Ceramic Brakes', price: 8000 },
  { id: 'track-pack', name: 'Track Package', price: 12000 },
];
