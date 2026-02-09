import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.order.deleteMany();
  await prisma.customization.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.configurationOption.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@velocity.com',
      password: 'hashed_password_placeholder', // Should be hashed in real app
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'user@velocity.com',
      password: 'hashed_password_placeholder',
      name: 'Test Customer',
      role: 'CUSTOMER',
    },
  });

  // Create Vehicles
  const modelX = await prisma.vehicle.create({
    data: {
      make: 'Velocity',
      model: 'Model X',
      slug: 'model-x',
      basePrice: 45000,
      description: 'The ultimate electric sedan.',
      assets: JSON.stringify({
        thumbnail: '/assets/vehicles/model-x/thumb.png',
        modelUrl: '/assets/vehicles/model-x/scene.glb',
      }),
    },
  });

  const modelY = await prisma.vehicle.create({
    data: {
      make: 'Velocity',
      model: 'Model Y',
      slug: 'model-y',
      basePrice: 55000,
      description: 'Performance SUV for the modern family.',
      assets: JSON.stringify({
        thumbnail: '/assets/vehicles/model-y/thumb.png',
        modelUrl: '/assets/vehicles/model-y/scene.glb',
      }),
    },
  });

  // Create Options for Model X
  // Colors
  await prisma.configurationOption.create({
    data: {
      name: 'Midnight Black',
      type: 'COLOR',
      price: 0,
      vehicleId: modelX.id,
      assets: JSON.stringify({ hex: '#050505' }),
    },
  });

  await prisma.configurationOption.create({
    data: {
      name: 'Neon Blue',
      type: 'COLOR',
      price: 1500,
      vehicleId: modelX.id,
      assets: JSON.stringify({ hex: '#00f3ff' }),
    },
  });

  // Wheels
  await prisma.configurationOption.create({
    data: {
      name: '19" Aero',
      type: 'WHEELS',
      price: 0,
      vehicleId: modelX.id,
      assets: JSON.stringify({ texture: 'wheel_aero.png' }),
    },
  });

  await prisma.configurationOption.create({
    data: {
      name: '20" Turbine',
      type: 'WHEELS',
      price: 2000,
      vehicleId: modelX.id,
      assets: JSON.stringify({ texture: 'wheel_turbine.png' }),
    },
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
