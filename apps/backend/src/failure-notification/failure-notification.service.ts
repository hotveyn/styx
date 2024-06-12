import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiErrors } from 'src/errors/api-error';
import { PrismaService } from 'src/prisma/prisma.service';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { GetNotificationsDto } from './dto/get-notifications.dto';

@Injectable()
export class FailureNotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async checkNotification(
    failureId: bigint,
    userId: bigint,
    userOrganizationId: bigint | null | undefined,
  ) {
    const failure = await this.prisma.failure.findUnique({
      where: {
        id: failureId,
      },
      select: {
        device: {
          select: {
            organizationId: true,
          },
        },
      },
    });

    if (!failure) throw new HttpException(ApiErrors.failure.notFound.id, 404);

    if (
      userOrganizationId &&
      failure.device.organizationId !== userOrganizationId
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    try {
      return await this.prisma.failureNotification.create({
        data: {
          failureId: failureId,
          userId,
        },
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new HttpException(ApiErrors.failureNotification.unique.id, 400);
        }
      }

      throw e;
    }
  }

  async checkAllNotifications(
    userId: bigint,
    userOrganizationId: bigint | null | undefined,
  ) {
    const failures = await this.prisma.failure.findMany({
      where: {
        notifications: {
          every: {
            userId: {
              not: userId,
            },
          },
        },
        device: {
          organizationId:
            userOrganizationId != undefined ? userOrganizationId : undefined,
        },
      },
    });

    return await this.prisma.failureNotification.createMany({
      data: failures.map((failure) => {
        return {
          failureId: failure.id,
          userId: BetterBigInt(userId),
        };
      }),
    });
  }

  async getNotifications(
    dto: GetNotificationsDto,
    userId: bigint,
    userOrganizationId: bigint | null | undefined,
  ) {
    const [unformatedUncheckedData, uncheckedCount] =
      await this.prisma.$transaction([
        this.prisma.failure.findMany({
          where: {
            notifications: {
              every: {
                userId: {
                  not: userId,
                },
              },
            },
            device: {
              organizationId:
                userOrganizationId != undefined
                  ? userOrganizationId
                  : undefined,
            },
          },
          include: {
            device: {
              select: {
                code: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: dto.limit,
          skip: dto.offset,
        }),
        this.prisma.failure.count({
          where: {
            notifications: {
              every: {
                userId: {
                  not: userId,
                },
              },
            },
            device: {
              organizationId:
                userOrganizationId != undefined
                  ? userOrganizationId
                  : undefined,
            },
          },
        }),
      ]);

    const uncheckedData = unformatedUncheckedData.map((unchecked) => {
      return {
        ...unchecked,
        checked: false,
      };
    });

    const [unformatedCheckedData, checkedCount] =
      await this.prisma.$transaction([
        this.prisma.failure.findMany({
          where: {
            notifications: {
              some: {
                userId: {
                  equals: userId,
                },
              },
            },
            device: {
              organizationId:
                userOrganizationId != undefined
                  ? userOrganizationId
                  : undefined,
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            device: {
              select: {
                code: true,
                name: true,
              },
            },
          },
          take:
            dto.limit - uncheckedData.length < 0 ||
            isNaN(dto.limit - uncheckedData.length)
              ? undefined
              : dto.limit - uncheckedData.length,
          skip:
            dto.offset - uncheckedCount < 0 ||
            isNaN(dto.offset - uncheckedCount)
              ? undefined
              : dto.offset - uncheckedCount,
        }),
        this.prisma.failure.count({
          where: {
            notifications: {
              some: {
                userId: {
                  equals: userId,
                },
              },
            },
            device: {
              organizationId:
                userOrganizationId != undefined
                  ? userOrganizationId
                  : undefined,
            },
          },
        }),
      ]);

    const checkedData = unformatedCheckedData.map((checked) => {
      return {
        ...checked,
        checked: true,
      };
    });

    return {
      count: uncheckedCount + checkedCount,
      data: [...uncheckedData, ...checkedData],
    };
  }
}
