import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Step 1: Create Cameras
  const camera1 = await prisma.camera.create({
    data: { name: 'Shop Floor A', location: 'Shop Floor' },
  });
  const camera2 = await prisma.camera.create({
    data: { name: 'Vault', location: 'Vault Area' },
  });
  const camera3 = await prisma.camera.create({
    data: { name: 'Entrance', location: 'Main Gate' },
  });

  // Step 2: Create Incidents using those camera IDs
  await prisma.incident.createMany({
    data: [
      {
        cameraId: camera1.id,
        type: 'Unauthorised Access',
        tsStart: new Date('2025-07-07T14:00:00Z'),
        tsEnd: new Date('2025-07-07T14:05:00Z'),
        thumbnailUrl: '/incident1.jpg',
        resolved: false,
      },
      {
        cameraId: camera2.id,
        type: 'Gun Threat',
        tsStart: new Date('2025-07-07T15:10:00Z'),
        tsEnd: new Date('2025-07-07T15:15:00Z'),
        thumbnailUrl: '/incident2.jpg',
        resolved: false,
      },
      {
        cameraId: camera3.id,
        type: 'Face Recognised',
        tsStart: new Date('2025-07-07T16:00:00Z'),
        tsEnd: new Date('2025-07-07T16:05:00Z'),
        thumbnailUrl: '/incident3.jpg',
        resolved: false,
      },
    ],
  });

  console.log('✅ Cameras and incidents seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
