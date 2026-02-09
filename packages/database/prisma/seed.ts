import { PrismaClient, OptionType, Role, KycStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean up existing data
  await prisma.order.deleteMany();
  await prisma.customization.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.configurationOption.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // 1. Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@velocity.com',
      password: '$2b$10$EpOd/6vD.e2sKjE4.W0.4.R5h3.w.e.r.t.y', // Placeholder hash
      name: 'Admin User',
      role: Role.ADMIN,
      kycStatus: KycStatus.VERIFIED,
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'user@velocity.com',
      password: '$2b$10$EpOd/6vD.e2sKjE4.W0.4.R5h3.w.e.r.t.y', // Placeholder hash
      name: 'Test Customer',
      role: Role.CUSTOMER,
      kycStatus: KycStatus.PENDING,
    },
  });

  // 2. Create Vehicles
  // A. Spectre GT
  const spectre = await prisma.vehicle.create({
    data: {
      make: 'Velocity',
      model: 'Spectre GT',
      slug: 'spectre-gt',
      basePrice: 125000,
      description: 'The pinnacle of electric grand touring.',
      assets: {
        thumbnail: '/assets/vehicles/spectre-gt/thumb.png',
        modelUrl: '/assets/vehicles/spectre-gt/scene.glb',
      },
    },
  });

  // B. Phantom X
  const phantom = await prisma.vehicle.create({
    data: {
      make: 'Velocity',
      model: 'Phantom X',
      slug: 'phantom-x',
      basePrice: 180000,
      description: 'A ghost in the machine. Pure stealth performance.',
      assets: {
        thumbnail: '/assets/vehicles/phantom-x/thumb.png',
        modelUrl: '/assets/vehicles/phantom-x/scene.glb',
      },
    },
  });

  // C. Vanguard S
  const vanguard = await prisma.vehicle.create({
    data: {
      make: 'Velocity',
      model: 'Vanguard S',
      slug: 'vanguard-s',
      basePrice: 95000,
      description: 'Rugged luxury for the urban explorer.',
      assets: {
        thumbnail: '/assets/vehicles/vanguard-s/thumb.png',
        modelUrl: '/assets/vehicles/vanguard-s/scene.glb',
      },
    },
  });

  // 3. Create Configuration Options

  // --- Spectre GT Options ---
  // Colors
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: spectre.id,
        name: 'Void Black',
        type: OptionType.COLOR,
        price: 0,
        assets: { hex: '#000000' },
      },
      {
        vehicleId: spectre.id,
        name: 'Neon Red',
        type: OptionType.COLOR,
        price: 5000,
        assets: { hex: '#ff0033' },
      },
      {
        vehicleId: spectre.id,
        name: 'Cyber Silver',
        type: OptionType.COLOR,
        price: 2500,
        assets: { hex: '#c0c0c0' },
      },
    ],
  });

  // Rims
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: spectre.id,
        name: 'Turbine 20"',
        type: OptionType.WHEELS,
        price: 0,
        assets: { texture: 'turbine-20' },
      },
      {
        vehicleId: spectre.id,
        name: 'Carbon 21"',
        type: OptionType.WHEELS,
        price: 4000,
        assets: { texture: 'carbon-21' },
      },
    ],
  });

  // Interiors
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: spectre.id,
        name: 'Midnight Leather',
        type: OptionType.INTERIOR,
        price: 0,
        assets: { texture: 'midnight-leather' },
      },
      {
        vehicleId: spectre.id,
        name: 'Storm Alcantara',
        type: OptionType.INTERIOR,
        price: 3000,
        assets: { texture: 'storm-alcantara' },
      },
    ],
  });

  // --- Phantom X Options ---
  // Colors
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: phantom.id,
        name: 'Ghost White',
        type: OptionType.COLOR,
        price: 0,
        assets: { hex: '#ffffff' },
      },
      {
        vehicleId: phantom.id,
        name: 'Matte Black',
        type: OptionType.COLOR,
        price: 6000,
        assets: { hex: '#1a1a1a' },
      },
      {
        vehicleId: phantom.id,
        name: 'Neon Blue',
        type: OptionType.COLOR,
        price: 5000,
        assets: { hex: '#00f3ff' },
      },
    ],
  });

  // Rims
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: phantom.id,
        name: 'Aero 21"',
        type: OptionType.WHEELS,
        price: 0,
        assets: { texture: 'aero-21' },
      },
      {
        vehicleId: phantom.id,
        name: 'Stealth 22"',
        type: OptionType.WHEELS,
        price: 5000,
        assets: { texture: 'stealth-22' },
      },
    ],
  });

  // Interiors
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: phantom.id,
        name: 'Cloud Fabric',
        type: OptionType.INTERIOR,
        price: 0,
        assets: { texture: 'cloud-fabric' },
      },
      {
        vehicleId: phantom.id,
        name: 'Carbon Weave',
        type: OptionType.INTERIOR,
        price: 4500,
        assets: { texture: 'carbon-weave' },
      },
    ],
  });

  // --- Vanguard S Options ---
  // Colors
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: vanguard.id,
        name: 'Tactical Green',
        type: OptionType.COLOR,
        price: 0,
        assets: { hex: '#4b5320' },
      },
      {
        vehicleId: vanguard.id,
        name: 'Desert Sand',
        type: OptionType.COLOR,
        price: 1500,
        assets: { hex: '#edc9af' },
      },
      {
        vehicleId: vanguard.id,
        name: 'Steel Grey',
        type: OptionType.COLOR,
        price: 0,
        assets: { hex: '#71797e' },
      },
    ],
  });

  // Rims
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: vanguard.id,
        name: 'Offroad 19"',
        type: OptionType.WHEELS,
        price: 0,
        assets: { texture: 'offroad-19' },
      },
      {
        vehicleId: vanguard.id,
        name: 'Beadlock 20"',
        type: OptionType.WHEELS,
        price: 2500,
        assets: { texture: 'beadlock-20' },
      },
    ],
  });

  // Interiors
  await prisma.configurationOption.createMany({
    data: [
      {
        vehicleId: vanguard.id,
        name: 'Urban Camo',
        type: OptionType.INTERIOR,
        price: 0,
        assets: { texture: 'urban-camo' },
      },
      {
        vehicleId: vanguard.id,
        name: 'Saddle Leather',
        type: OptionType.INTERIOR,
        price: 2000,
        assets: { texture: 'saddle-leather' },
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });