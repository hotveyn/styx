import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetByGroupDto } from '../log-error/dto/get-by-group.dto';
import { Prisma } from '@prisma/client';
import { SendLogDto } from './dto/send-log.dto';
import { ApiErrors } from '../errors/api-error';
import { BetterBigInt } from '../utils/big-int-or-undefined';
import { DateTime } from 'luxon';
import { QuerySearchLogInfoDto } from './dto/query-search-log-info.dto';

@Injectable()
export class LogInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async querySearch(
    queries: QuerySearchLogInfoDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const findManyOptions: Prisma.LogInfoFindManyArgs = {
      where: {
        device: {
          organizationId:
            BetterBigInt(userOrganizationId) == undefined
              ? BetterBigInt(queries.organizationId)
              : BetterBigInt(userOrganizationId),
        },
        createdAt: {
          gte: queries.startDate ? new Date(queries.startDate) : undefined,
          lte: queries.endDate ? new Date(queries.endDate) : undefined,
        },
      },
      skip: queries.offset,
      take: queries.limit,
    };

    if (queries.orderBy && queries.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[queries.orderBy, queries.orderDirection]]),
      ];
    }

    const [data, count] = await this.prisma.$transaction([
      this.prisma.logInfo.findMany({
        ...findManyOptions,
        include: {
          device: {
            select: {
              name: true,
              code: true,
            },
          },
        },
      }),
      this.prisma.logInfo.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data,
    };
  }

  async sendLog(sendLogDto: SendLogDto) {
    const device = await this.prisma.device.findFirst({
      where: { code: sendLogDto.deviceCode },
    });

    if (!device) {
      throw new HttpException(ApiErrors.device.notFound.id, 404);
    }

    const [logErrorCreateResult] = await this.prisma.$transaction([
      this.prisma.logInfo.create({
        data: sendLogDto,
      }),
      this.prisma.device.update({
        data: {
          lastActionDate: DateTime.now().toISO(),
        },
        where: {
          id: device.id,
        },
      }),
    ]);

    return logErrorCreateResult;
  }

  async getByGroup(
    queries: GetByGroupDto,
    organizationId?: number | bigint | string,
  ) {
    const [data, count] = await Promise.all([
      this.prisma.logInfo.groupBy({
        by: Prisma.LogErrorScalarFieldEnum.deviceCode,
        _count: { _all: true },
        where: {
          requestTime: {
            gte: new Date(queries.startDate),
            lte: new Date(queries.endDate),
          },
          device: {
            organizationId:
              typeof organizationId === 'string'
                ? BetterBigInt(organizationId)
                : organizationId,
          },
        },
        skip: queries.offset,
        take: queries.limit,
        orderBy: {
          deviceCode: 'asc',
        },
      }),
      this.prisma.logInfo.count({
        where: {
          requestTime: {
            gte: new Date(queries.startDate),
            lte: new Date(queries.endDate),
          },
          device: {
            organizationId:
              typeof organizationId === 'string'
                ? BetterBigInt(organizationId)
                : organizationId,
          },
        },
      }),
    ]);

    return {
      count,
      data,
    };
  }

  async getOne(
    deviceCode: string,
    queries: GetByGroupDto,
    organizationId?: number | bigint | string,
  ) {
    const [data, count] = await Promise.all([
      this.prisma.logInfo.findMany({
        where: {
          deviceCode: deviceCode,
          requestTime: {
            gte: new Date(queries.startDate),
            lte: new Date(queries.endDate),
          },
          device: {
            organizationId:
              typeof organizationId === 'string'
                ? BetterBigInt(organizationId)
                : organizationId,
          },
        },
        skip: queries.offset,
        take: queries.limit,
      }),
      this.prisma.logInfo.count({
        where: {
          deviceCode: deviceCode,
          requestTime: {
            gte: new Date(queries.startDate),
            lte: new Date(queries.endDate),
          },
          device: {
            organizationId:
              typeof organizationId === 'string'
                ? BetterBigInt(organizationId)
                : organizationId,
          },
        },
      }),
    ]);

    return {
      count,
      data,
    };
  }

  async delete(
    queries: GetByGroupDto,
    organizationId?: number | bigint | string,
  ) {
    return this.prisma.logInfo.deleteMany({
      where: {
        requestTime: {
          gte: new Date(queries.startDate),
          lte: new Date(queries.endDate),
        },
        device: {
          organizationId:
            typeof organizationId === 'string'
              ? BetterBigInt(organizationId)
              : organizationId,
        },
      },
    });
  }
}
