import { HttpException, Injectable } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { ApiErrors } from 'src/errors/api-error';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuerySearchCameraDto } from './dto/query-search-camera.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CameraService {
  constructor(private readonly prisma: PrismaService) {}

  async query(
    queries: QuerySearchCameraDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const findManyOptions: Prisma.CameraFindManyArgs = {
      where: {
        organizationId:
          BetterBigInt(userOrganizationId) ||
          BetterBigInt(queries.organizationId),
        createdAt: {
          gte: queries.startDate ? new Date(queries.startDate) : undefined,
          lte: queries.endDate ? new Date(queries.endDate) : undefined,
        },
      },
      include: {
        organization: {
          select: {
            name: true,
          },
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

    if (queries.orderBy && queries.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[queries.orderBy, queries.orderDirection]]),
      ];
    }

    const [news, count] = await this.prisma.$transaction([
      this.prisma.camera.findMany({
        ...findManyOptions,
        include: {
          organization: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.camera.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data: news,
    };
  }

  async create(
    createCameraDto: CreateCameraDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    if (
      userOrganizationId &&
      BetterBigInt(userOrganizationId) !==
        BetterBigInt(createCameraDto.organizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    if (
      createCameraDto.organizationId &&
      !(await this.prisma.organization.findUnique({
        where: {
          id: BetterBigInt(createCameraDto.organizationId),
        },
      }))
    )
      throw new HttpException(ApiErrors.organization.notFound.id, 404);

    return await this.prisma.camera.create({
      data: {
        ...createCameraDto,
        organizationId: BetterBigInt(createCameraDto.organizationId),
      },
    });
  }

  async update(
    id: bigint,
    updateCameraDto: UpdateCameraDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const camera = await this.prisma.camera.findUnique({
      where: {
        id,
      },
    });

    if (!camera) throw new HttpException(ApiErrors.camera.notFound.id, 404);

    if (
      userOrganizationId &&
      camera.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    return await this.prisma.camera.update({
      where: {
        id,
      },
      data: updateCameraDto,
    });
  }

  async remove(
    id: bigint,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const camera = await this.prisma.camera.findUnique({
      where: {
        id,
      },
    });

    if (!camera) throw new HttpException(ApiErrors.camera.notFound.id, 404);

    if (
      userOrganizationId &&
      camera.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    return await this.prisma.camera.delete({
      where: {
        id,
      },
    });
  }
}
