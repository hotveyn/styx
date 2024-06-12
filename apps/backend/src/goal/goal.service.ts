import { HttpException, Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuerySearchGoalDto } from './dto/query-search-goal.dto';
import { Prisma } from '@prisma/client';
import { ApiErrors } from '../errors/api-error';
import { BetterBigInt } from '../utils/big-int-or-undefined';

@Injectable()
export class GoalService {
  constructor(private readonly prisma: PrismaService) {}

  async querySearch(
    queries: QuerySearchGoalDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const findManyOptions: Prisma.GoalFindManyArgs = {
      where: {
        organizationId:
          BetterBigInt(userOrganizationId) ||
          BetterBigInt(queries.organizationId),
        createdAt: {
          gte: queries.startDate ? new Date(queries.startDate) : undefined,
          lte: queries.endDate ? new Date(queries.endDate) : undefined,
        },
      },
      skip: queries.offset,
      take: queries.limit,
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
        {
          code: queries.code,
        },
      ];

    if (queries.orderBy && queries.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[queries.orderBy, queries.orderDirection]]),
      ];
    }

    const [news, count] = await this.prisma.$transaction([
      this.prisma.goal.findMany({
        ...findManyOptions,
        include: {
          organization: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.goal.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data: news,
    };
  }

  async create(
    createGoalDto: CreateGoalDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    if (
      userOrganizationId &&
      BetterBigInt(userOrganizationId) !==
        BetterBigInt(createGoalDto.organizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    if (
      createGoalDto.code != undefined &&
      (await this.prisma.goal.findUnique({
        where: {
          code: createGoalDto.code,
        },
      }))
    )
      throw new HttpException(ApiErrors.goal.unique.code, 400);

    if (
      !(await this.prisma.organization.findUnique({
        where: {
          id: BigInt(createGoalDto.organizationId),
        },
      }))
    )
      throw new HttpException(ApiErrors.organization.notFound.id, 404);

    return this.prisma.goal.create({
      data: {
        name: createGoalDto.name,
        description: createGoalDto.description,
        code: createGoalDto.code,
        organization: { connect: { id: BigInt(createGoalDto.organizationId) } },
      },
    });
  }
  findOne(id: bigint) {
    return this.prisma.goal.findFirst({
      where: {
        id: BigInt(id),
      },
    });
  }

  async update(
    id: bigint,
    updateGoalDto: UpdateGoalDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const goal = await this.prisma.goal.findUnique({
      where: {
        id: id,
      },
    });

    if (!goal) throw new HttpException(ApiErrors.goal.notFound.id, 404);

    if (
      updateGoalDto.code &&
      (await this.prisma.goal.findUnique({
        where: {
          code: updateGoalDto.code,
          NOT: {
            id,
          },
        },
      }))
    )
      throw new HttpException(ApiErrors.goal.unique.code, 400);

    if (
      userOrganizationId &&
      goal.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    return this.prisma.goal.update({
      where: {
        id: goal.id,
      },
      data: {
        name: updateGoalDto.name,
        description: updateGoalDto.description,
        code: updateGoalDto.code,
      },
    });
  }

  findAll() {
    return this.prisma.goal.findMany();
  }

  async remove(
    id: bigint,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const goal = await this.prisma.goal.findUnique({
      where: {
        id: id,
      },
    });

    if (!goal) throw new HttpException(ApiErrors.goal.notFound.id, 404);
    if (
      userOrganizationId &&
      BetterBigInt(userOrganizationId) !== goal.organizationId
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    return this.prisma.goal.softDelete({
      id: id,
    });
  }
}
