import { HttpException, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { QuerySearchDeviceDto } from './dto/query-search-device.dto';
import { ApiErrors } from '../errors/api-error';
import { BetterBigInt } from '../utils/big-int-or-undefined';
import { DateTime } from 'luxon';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDeviceDto: CreateDeviceDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    if (
      userOrganizationId &&
      BetterBigInt(userOrganizationId) !==
        BetterBigInt(createDeviceDto.organizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    if (
      createDeviceDto.code &&
      (await this.prisma.device.findUnique({
        where: {
          code: createDeviceDto.code,
        },
      }))
    )
      throw new HttpException(ApiErrors.device.unique.code, 400);

    const createDeviceInput: Prisma.DeviceCreateInput = {
      port: createDeviceDto.port,
      name: createDeviceDto.name,
      code: createDeviceDto.code,
      ip: createDeviceDto.ip,
      address: createDeviceDto.address,
      additionalData: createDeviceDto.additionalData,
      deviceType: createDeviceDto.deviceType,
      geo: createDeviceDto.geo,
      sshParameters: createDeviceDto.sshParameters,
      softwareType: createDeviceDto.softwareType,
      softwareVersion: createDeviceDto.softwareVersion,
      status: createDeviceDto.status,
    };

    if (createDeviceDto.organizationId) {
      const organization = await this.prisma.organization.findUnique({
        where: {
          id: BetterBigInt(createDeviceDto.organizationId),
        },
      });

      if (!organization)
        throw new HttpException(ApiErrors.organization.notFound.id, 404);

      createDeviceInput.organization = {
        connect: { id: organization.id },
      };
    }

    return this.prisma.device.create({
      data: createDeviceInput,
      include: {
        organization: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.device.findMany();
  }

  async querySearch(
    queries: QuerySearchDeviceDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const findManyOptions: Prisma.DeviceFindManyArgs = {
      where: {
        organizationId:
          BetterBigInt(userOrganizationId) ||
          BetterBigInt(queries.organizationId),
        isAlive: queries.isAlive,
        status: queries.status,
        createdAt: {
          gte: queries.startDate ? new Date(queries.startDate) : undefined,
          lte: queries.endDate ? new Date(queries.endDate) : undefined,
        },
      },
      skip: queries.offset,
      take: queries.limit,
      include: {
        organization: {
          select: {
            name: true,
          },
        },
      },
    };

    if (queries.isDeleted != undefined)
      findManyOptions.where.isDeleted = {
        [queries.isDeleted ? 'not' : 'equals']: null,
      };

    const searchParams = PrismaService.getPrismaSearchingProperties(
      queries.getSearchingProperties(),
    );

    if (searchParams.length || queries.id)
      findManyOptions.where.OR = [
        ...searchParams,
        {
          id: BetterBigInt(queries.id),
        },
      ];

    if (queries.orderBy && queries.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[queries.orderBy, queries.orderDirection]]),
      ];
    }

    const [news, count] = await this.prisma.$transaction([
      this.prisma.device.findMany(findManyOptions),
      this.prisma.device.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data: news,
    };
  }

  findOne(id: number) {
    return this.prisma.device.findUnique({
      where: {
        id: id,
      },
      include: {
        organization: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async update(
    id: bigint,
    updateDeviceDto: UpdateDeviceDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    if (
      updateDeviceDto.code != undefined &&
      (await this.prisma.device.findUnique({
        where: {
          code: updateDeviceDto.code,
          NOT: {
            id,
          },
        },
      }))
    )
      throw new HttpException(ApiErrors.device.unique.code, 400);

    const device = await this.prisma.device.findUnique({
      where: {
        id,
      },
    });
    if (!device) throw new HttpException(ApiErrors.device.notFound.id, 404);

    if (
      userOrganizationId &&
      device.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    return this.prisma.device.update({
      where: { id: id },
      data: {
        ...updateDeviceDto,
        organizationId: BetterBigInt(updateDeviceDto.organizationId),
      },
      include: {
        organization: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async remove(
    id: bigint,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const device = await this.prisma.device.findUnique({
      where: {
        id,
      },
    });
    if (!device) throw new HttpException(ApiErrors.device.notFound.id, 404);

    if (
      userOrganizationId &&
      device.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    return this.prisma.device.softDelete({
      id,
    });
  }

  async ping(code: string) {
    const device = await this.prisma.device.findUnique({
      where: {
        code,
      },
    });

    if (!device) throw new HttpException(ApiErrors.device.notFound.code, 404);

    await this.prisma.device.update({
      where: {
        code,
      },
      data: {
        lastActionDate: DateTime.now().toISO(),
        isAlive: true,
      },
    });

    // !== false because "isAlive" is nullable
    if (device.isAlive !== false) {
      return;
    }

    const failure = await this.prisma.failure.findFirst({
      where: {
        deviceId: device.id,
        reparedDate: null,
      },
    });

    if (!failure) return;

    await this.prisma.failure.update({
      where: {
        id: failure.id,
      },
      data: {
        reparedDate: DateTime.now().toISO(),
      },
    });
  }

  async getByCode(
    code: string,
    userOrganizationId: bigint | number | string | undefined,
  ) {
    const device = await this.prisma.device.findUnique({
      where: {
        code,
      },
      include: {
        organization: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!device) throw new HttpException(ApiErrors.device.notFound.code, 404);

    if (
      userOrganizationId &&
      device.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    return device;
  }
}
