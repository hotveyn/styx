import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { QuerySearchFailureDto } from './dto/query-search-failure.dto';
import { BetterBigInt } from '../utils/big-int-or-undefined';
import { ApiErrors } from '../errors/api-error';
import { CommentFailureDto } from './dto/comment-failure.dto';

@Injectable()
export class FailureService {
  constructor(private readonly prisma: PrismaService) {}

  async querySearch(
    queries: QuerySearchFailureDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const findManyOptions: Prisma.FailureFindManyArgs = {
      where: {
        deviceId: BetterBigInt(queries.deviceId),
        device: {
          organizationId: BetterBigInt(userOrganizationId),
        },
        createdAt: {
          gte: new Date(queries.startDate),
          lte: new Date(queries.endDate),
        },
      },
      skip: queries.offset,
      take: queries.limit,
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

    const [data, count] = await this.prisma.$transaction([
      this.prisma.failure.findMany({
        ...findManyOptions,
      }),
      this.prisma.failure.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data,
    };
  }

  async commentDeviceFailure(
    id: bigint,
    dto: CommentFailureDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const deviceFailure = await this.prisma.failure.findUnique({
      where: {
        id,
      },
      select: {
        device: true,
      },
    });
    if (!deviceFailure)
      throw new HttpException(ApiErrors.failure.notFound.id, 404);

    if (
      userOrganizationId &&
      deviceFailure.device.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    return await this.prisma.failure.update({
      where: {
        id,
      },
      data: {
        comment: dto.commment,
      },
    });
  }
}
