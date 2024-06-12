import { Prisma, PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const userPassword = await bcrypt.hash('password', 10);

  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: { ...createRandomUserData(), password: userPassword },
    });

    const organization = await prisma.organization.create({
      data: createRandomOrganizationData(),
    });

    const device = await prisma.device.create({
      data: createRandomDeviceData(),
    });

    const deviceWithOrganization = await prisma.device.create({
      data: createRandomDeviceWithOrganizationData(organization.id),
    });

    await prisma.user.create({
      data: {
        ...createRandomUserWithOrganizationData(organization.id),
        password: userPassword,
      },
    });

    for (let j = 0; j < 100; j++) {
      await prisma.logInfo.create({
        data: createRandomInfoLogData(device.code),
      });
      await prisma.logError.create({
        data: createRandomErrorLogData(device.code),
      });

      await prisma.logInfo.create({
        data: createRandomInfoLogData(deviceWithOrganization.code),
      });
      await prisma.logError.create({
        data: createRandomErrorLogData(deviceWithOrganization.code),
      });
    }

    const goal = await prisma.goal.create({
      data: createRandomGoalData(organization.id),
    });

    for (let i = 0; i < 15; i++) {
      await prisma.goalAchiev.create({
        data: createRandomAchieveGoalData(device.id, goal.id),
      });
      await prisma.goalAchiev.create({
        data: createRandomAchieveGoalData(deviceWithOrganization.id, goal.id),
      });
    }

    for (let i = 0; i < 5; i++) {
      await prisma.failure.create({
        data: createRandomFailureData(device.id),
      });
      await prisma.failure.create({
        data: createRandomFailureData(deviceWithOrganization.id),
      });
    }

    faker.seed(Date.now() ^ (Math.random() * 0x100000000));
  }
}

function createRandomUserData(): Prisma.UserCreateInput {
  return {
    name: faker.person.fullName(),
    login: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    additionalData: faker.datatype.json(),
  };
}

function createRandomUserWithOrganizationData(
  organizationId: bigint,
): Prisma.UserCreateInput {
  return {
    name: faker.person.fullName(),
    login: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    additionalData: faker.datatype.json(),
    organization: {
      connect: {
        id: organizationId,
      },
    },
  };
}

function createRandomDeviceData(): Prisma.DeviceCreateInput {
  return {
    code: faker.string.alphanumeric(20) + '',
    geo: faker.location.nearbyGPSCoordinate().join(' '),
    softwareType: '',
    softwareVersion: '',
    sshParameters: '',
    ip: faker.internet.ipv4(),
    port: faker.number.int({ min: 1024, max: 65535 }) + '',
    name: faker.commerce.productName(),
    deviceType: faker.helpers.arrayElement(['Desktop', 'Laptop', 'Tablet']),
    address: faker.location.streetAddress(),
  };
}

function createRandomDeviceWithOrganizationData(
  organizationId: bigint,
): Prisma.DeviceCreateInput {
  return {
    code: faker.string.alphanumeric(20) + '',
    geo: faker.location.nearbyGPSCoordinate().join(' '),
    softwareType: '',
    softwareVersion: '',
    sshParameters: '',
    ip: faker.internet.ipv4(),
    port: faker.number.int({ min: 1024, max: 65535 }) + '',
    name: faker.commerce.productName(),
    deviceType: faker.helpers.arrayElement(['Desktop', 'Laptop', 'Tablet']),
    address: faker.location.streetAddress(),
    organization: {
      connect: {
        id: organizationId,
      },
    },
  };
}

function createRandomOrganizationData(): Prisma.OrganizationCreateInput {
  return {
    name: faker.company.name() + faker.string.alphanumeric(5),
  };
}

function createRandomInfoLogData(
  deviceCode: string,
): Prisma.LogInfoCreateInput {
  return {
    device: {
      connect: {
        code: deviceCode,
      },
    },
    requestTime: faker.date.past(),
    body: faker.lorem.paragraph(),
  };
}

function createRandomErrorLogData(
  deviceCode: string,
): Prisma.LogErrorCreateInput {
  return {
    device: {
      connect: {
        code: deviceCode,
      },
    },
    requestTime: faker.date.past(),
    body: faker.lorem.paragraph(),
  };
}

function createRandomGoalData(organizationId: bigint): Prisma.GoalCreateInput {
  return {
    description: faker.lorem.paragraph(),
    code: faker.string.uuid(),
    name: faker.animal.fish(),
    organization: {
      connect: {
        id: organizationId,
      },
    },
  };
}

function createRandomAchieveGoalData(
  deviceId: bigint,
  goalId: bigint,
): Prisma.GoalAchievCreateInput {
  return {
    device: {
      connect: {
        id: deviceId,
      },
    },
    goal: {
      connect: {
        id: goalId,
      },
    },
    createdAt: faker.date.between(getRandomDate()),
  };
}

function createRandomFailureData(deviceId: bigint): Prisma.FailureCreateInput {
  return {
    device: {
      connect: {
        id: deviceId,
      },
    },
    createdAt: faker.date.between(getRandomDate()),
    comment: faker.lorem.text(),
    reparedDate: faker.date.between(getRandomDate()),
  };
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

function getRandomDate() {
  const f = new Date();
  f.setMonth(f.getMonth() - 2);
  const t = new Date();

  return {
    from: f.toISOString(),
    to: t.toISOString(),
  };
}
