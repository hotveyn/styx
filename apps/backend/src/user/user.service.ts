import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuerySearchUserDto } from './dto/query-search-user.dto';
import { Prisma } from '@prisma/client';
import { ApiErrors } from '../errors/api-error';
import { BetterBigInt } from '../utils/big-int-or-undefined';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async querySearch(
    queries: QuerySearchUserDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const findManyOptions: Prisma.UserFindManyArgs = {
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

    if (queries.orderBy && queries.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[queries.orderBy, queries.orderDirection]]),
      ];
    }

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
      this.prisma.user.findMany({
        ...findManyOptions,
        include: {
          organization: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data,
    };
  }

  async create(
    createUserDto: CreateUserDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    if (
      userOrganizationId &&
      BetterBigInt(userOrganizationId) !==
        BetterBigInt(createUserDto.organizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    if (
      createUserDto.organizationId != undefined &&
      !(await this.prisma.organization.findUnique({
        where: {
          id: BigInt(createUserDto.organizationId),
        },
      }))
    )
      throw new HttpException(ApiErrors.organization.notFound.id, 404);

    if (
      await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      })
    )
      throw new HttpException(
        ApiErrors.user.unique.email,
        HttpStatus.BAD_REQUEST,
      );

    if (createUserDto.password)
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const userWithSameLogin = await this.prisma.user.findUnique({
      where: {
        login: createUserDto.login,
      },
    });

    if (userWithSameLogin && !userWithSameLogin.isDeleted)
      throw new HttpException(ApiErrors.user.unique.login, 400);

    if (userWithSameLogin && userWithSameLogin.isDeleted) {
      return this.prisma.user.update({
        where: {
          login: createUserDto.login,
        },
        data: {
          ...createUserDto,
          organizationId: BetterBigInt(createUserDto.organizationId),
          login: undefined,
        },
      });
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        organizationId: BetterBigInt(createUserDto.organizationId),
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }

  async update(
    id: bigint,
    updateUserDto: UpdateUserDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new HttpException(ApiErrors.user.notFound.id, 404);

    if (
      userOrganizationId &&
      user.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    if (
      updateUserDto.login != undefined &&
      (await this.prisma.user.findUnique({
        where: {
          login: updateUserDto.login,
          NOT: {
            id,
          },
        },
      }))
    )
      throw new HttpException(
        ApiErrors.user.unique.login,
        HttpStatus.BAD_REQUEST,
      );

    if (
      updateUserDto.email != undefined &&
      (await this.prisma.user.findUnique({
        where: {
          email: updateUserDto.email,
          NOT: {
            id,
          },
        },
      }))
    )
      throw new HttpException(
        ApiErrors.user.unique.email,
        HttpStatus.BAD_REQUEST,
      );

    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        organizationId: BetterBigInt(updateUserDto.organizationId),
      },
    });
  }

  async remove(
    id: bigint,
    userId: number | bigint | string,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (
      userOrganizationId &&
      user.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    if (!user) throw new HttpException(ApiErrors.user.notFound.id, 404);

    if (id === BetterBigInt(userId))
      throw new HttpException(ApiErrors.user.selfDelete, 400);

    await this.prisma.refreshToken.deleteMany({
      where: {
        userId: id,
      },
    });

    return this.prisma.user.softDelete({
      id,
    });
  }

  async getProfile(userId: number | bigint | string) {
    return await this.prisma.user.findUnique({
      where: {
        id: BetterBigInt(userId),
      },
      select: {
        additionalData: true,
        email: true,
        login: true,
        organizationId: true,
        name: true,
        id: true,
        code: true,
        organization: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
