import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuerySearchOrganizationDto } from './dto/query-search-organization.dto';
import { Prisma } from '@prisma/client';
import { ApiErrors } from '../errors/api-error';
import { BetterBigInt } from '../utils/big-int-or-undefined';

@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async querySearch(
    queries: QuerySearchOrganizationDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const findManyOptions: Prisma.OrganizationFindManyArgs = {
      where: {
        id: BetterBigInt(userOrganizationId),
        createdAt: {
          gte: queries.startDate ? new Date(queries.startDate) : undefined,
          lte: queries.endDate ? new Date(queries.endDate) : undefined,
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

    if (queries.isDeleted != undefined)
      findManyOptions.where.isDeleted = {
        [queries.isDeleted ? 'not' : 'equals']: null,
      };

    if (queries.orderBy && queries.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[queries.orderBy, queries.orderDirection]]),
      ];
    }

    const [news, count] = await this.prisma.$transaction([
      this.prisma.organization.findMany({
        ...findManyOptions,
        include: {
          _count: {
            select: {
              goals: {
                where: {
                  isDeleted: null,
                },
              },
              users: {
                where: {
                  isDeleted: null,
                },
              },
              devices: {
                where: {
                  isDeleted: null,
                },
              },
            },
          },
        },
      }),
      this.prisma.organization.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data: news,
    };
  }

  async create(createOrganizationDto: CreateOrganizationDto) {
    if (
      await this.prisma.organization.findUnique({
        where: {
          name: createOrganizationDto.name,
        },
      })
    )
      throw new HttpException(
        ApiErrors.organization.unique.name,
        HttpStatus.BAD_REQUEST,
      );

    return this.prisma.organization.create({ data: createOrganizationDto });
  }

  async update(
    id: bigint,
    updateOrganizationDto: UpdateOrganizationDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (!organization)
      throw new HttpException(
        ApiErrors.organization.notFound.id,
        HttpStatus.NOT_FOUND,
      );

    //Проверка принадлежит ли выполняющий реквест юзер к данной организации
    if (
      userOrganizationId != undefined &&
      organization.id !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    if (
      await this.prisma.organization.findUnique({
        where: {
          name: updateOrganizationDto.name,
        },
      })
    )
      throw new HttpException(
        ApiErrors.organization.unique.name,
        HttpStatus.BAD_REQUEST,
      );

    return this.prisma.organization.update({
      where: {
        id,
      },
      data: updateOrganizationDto,
    });
  }

  async remove(id: bigint) {
    const organization = await this.prisma.organization.findUnique({
      where: {
        id,
      },
      select: {
        users: {
          where: {
            isDeleted: null,
          },
          take: 1,
        },
        devices: {
          where: {
            isDeleted: null,
          },
          take: 1,
        },
        goals: {
          where: {
            isDeleted: null,
          },
          take: 1,
        },
      },
    });
    if (!organization)
      throw new HttpException(ApiErrors.organization.notFound.id, 404);

    if (organization.users.length)
      throw new HttpException(ApiErrors.organization.delete.users, 400);

    if (organization.devices.length)
      throw new HttpException(ApiErrors.organization.delete.devices, 400);

    if (organization.goals.length)
      throw new HttpException(ApiErrors.organization.delete.goals, 400);

    const softDeleteOrganizationResult =
      await this.prisma.organization.softDelete({
        id,
      });

    await this.prisma.camera.deleteMany({
      where: {
        organizationId: softDeleteOrganizationResult.id,
      },
    });

    return softDeleteOrganizationResult;
  }
}
