import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetMonitoringDto } from './dto/get-monitoring.dto';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { GetActivityDto } from './dto/get-activity.dto';
import { ActivityEntity } from './entities/activity.entity';

@Injectable()
export class StatService {
  constructor(private readonly prisma: PrismaService) {}

  async getActivity(
    dto: GetActivityDto,
    userOrganizationId: bigint | undefined,
  ) {
    const [data, count] = await this.prisma.$transaction([
      this.prisma.$queryRawUnsafe<ActivityEntity[]>(`
      SELECT
            gs.date AS date,
            COALESCE(le.error_count, 0) AS errorCount,
            COALESCE(li.info_count, 0) AS infoCount,
            COALESCE(f.failure_count, 0) AS failureCount
        FROM
          generate_series('${dto.startDate}'::date, '${dto.endDate}'::date, '1 day'::interval) gs
          LEFT JOIN (
          SELECT logs_error.created_at::date AS date, COUNT(*) AS error_count
          FROM logs_error
          ${
            userOrganizationId != undefined
              ? `
            LEFT JOIN devices d on logs_error.device_code = d.code
            WHERE d.organization_id = ${userOrganizationId}
            `
              : ''
          }
          GROUP BY logs_error.created_at::date
          ) le ON gs.date = le.date

          LEFT JOIN (
          SELECT logs_info.created_at::date AS date, COUNT(*) AS info_count
          FROM logs_info
          ${
            userOrganizationId != undefined
              ? `
              LEFT JOIN devices d on logs_info.device_code = d.code
          WHERE d.organization_id = ${userOrganizationId}
            `
              : ''
          }
          GROUP BY logs_info.created_at::date
          
          ) li ON gs.date = li.date

          LEFT JOIN (
          SELECT failures.created_at::date AS date, COUNT(*) AS failure_count
          FROM failures
          ${
            userOrganizationId != undefined
              ? `
              LEFT JOIN devices d on failures.id = d.id
              WHERE d.organization_id = ${userOrganizationId}
            `
              : ''
          }
          GROUP BY failures.created_at::date
          ) f ON gs.date = f.date
        ${dto.limit != undefined ? `LIMIT ${dto.limit}\n` : ''}
        ${dto.offset != undefined ? `OFFSET ${dto.offset}\n` : ''}
        ${dto.orderBy != undefined ? `ORDER BY ${dto.orderBy} ${dto.orderDirection}\n ` : ''};
    `),
      this.prisma.$queryRawUnsafe(`
      SELECT
            DISTINCT COUNT(*) OVER () AS count
        FROM
          generate_series('${dto.startDate}'::date, '${dto.endDate}'::date, '1 day'::interval) gs
          LEFT JOIN (
          SELECT logs_error.created_at::date AS date, COUNT(*) AS error_count
          FROM logs_error
          ${
            userOrganizationId != undefined
              ? `
            LEFT JOIN devices d on logs_error.device_code = d.code
            WHERE d.organization_id = ${userOrganizationId}
            `
              : ''
          }
          GROUP BY logs_error.created_at::date
          ) le ON gs.date = le.date

          LEFT JOIN (
          SELECT logs_info.created_at::date AS date, COUNT(*) AS info_count
          FROM logs_info
          ${
            userOrganizationId != undefined
              ? `
              LEFT JOIN devices d on logs_info.device_code = d.code
          WHERE d.organization_id = ${userOrganizationId}
            `
              : ''
          }
          GROUP BY logs_info.created_at::date
          ) li ON gs.date = li.date

          LEFT JOIN (
          SELECT failures.created_at::date AS date, COUNT(*) AS failure_count
          FROM failures
          ${
            userOrganizationId != undefined
              ? `
              LEFT JOIN devices d on failures.id = d.id
              WHERE d.organization_id = ${userOrganizationId}
            `
              : ''
          }
          GROUP BY failures.created_at::date
          ) f ON gs.date = f.date 
    `),
    ]);

    return { count: (count as [number]).length ? count[0].count : 0, data };
  }

  async getMonitoring(
    userOrganizationId: bigint | number | undefined,
    dto: GetMonitoringDto,
  ) {
    const { dayStart, dayEnd } = this.getTodayRangeDate();

    const [
      devicesActivityCount,
      achievedGoalsCount,
      failureCount,
      activeFailureCount,
      logsCount,
    ] = await Promise.allSettled([
      this.getDevicesActivityCount(
        userOrganizationId || BetterBigInt(dto.organizationId),
      ),
      this.getAchievedGoalsCount(
        userOrganizationId || BetterBigInt(dto.organizationId),
        dayStart,
        dayEnd,
      ),
      this.getFailureCount(
        userOrganizationId || BetterBigInt(dto.organizationId),
        dayStart,
        dayEnd,
      ),
      this.getActiveFailureCount(
        userOrganizationId || BetterBigInt(dto.organizationId),
      ),
      this.getLogsCount(
        userOrganizationId || BetterBigInt(dto.organizationId),
        dayStart,
        dayEnd,
      ),
    ]);

    return {
      activeDevicesCount:
        devicesActivityCount.status === 'fulfilled'
          ? devicesActivityCount.value.activeDevicesCount
          : undefined,
      unactiveDevicesCount:
        devicesActivityCount.status === 'fulfilled'
          ? devicesActivityCount.value.unactiveDevicesCount
          : undefined,
      achievedGoalsCount:
        achievedGoalsCount.status === 'fulfilled'
          ? achievedGoalsCount.value
          : undefined,
      failureCount:
        failureCount.status === 'fulfilled' ? failureCount.value : undefined,
      activeFailureCount:
        activeFailureCount.status === 'fulfilled'
          ? activeFailureCount.value
          : undefined,
      logErrorCount:
        logsCount.status === 'fulfilled'
          ? logsCount.value.logErrorCount
          : undefined,
      logInfoCount:
        logsCount.status === 'fulfilled'
          ? logsCount.value.logInfoCount
          : undefined,
    };
  }

  private async getLogsCount(
    organizationId: bigint | number | undefined,
    dayStart: string,
    dayEnd: string,
  ) {
    const [logInfoCount, logErrorCount] = await this.prisma.$transaction([
      this.prisma.logInfo.count({
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
          device: {
            organizationId,
          },
        },
      }),
      this.prisma.logError.count({
        where: {
          createdAt: {
            gte: dayStart,
            lte: dayEnd,
          },
          device: {
            organizationId,
          },
        },
      }),
    ]);

    return {
      logInfoCount,
      logErrorCount,
    };
  }

  private async getFailureCount(
    organizationId: bigint | number | undefined,
    dayStart: string,
    dayEnd: string,
  ) {
    return await this.prisma.failure.count({
      where: {
        reparedDate: {
          gte: dayStart,
          lte: dayEnd,
        },
        device: {
          organizationId,
        },
      },
    });
  }

  private async getActiveFailureCount(
    organizationId: bigint | number | undefined,
  ) {
    return await this.prisma.failure.count({
      where: {
        reparedDate: null,
        device: {
          organizationId,
        },
      },
    });
  }

  private async getAchievedGoalsCount(
    organizationId: bigint | number | undefined,
    dayStart: string,
    dayEnd: string,
  ) {
    return await this.prisma.goalAchiev.count({
      where: {
        createdAt: {
          gte: dayStart,
          lte: dayEnd,
        },
        device: {
          organizationId,
        },
      },
    });
  }

  private async getDevicesActivityCount(
    organizationId: bigint | number | undefined,
  ) {
    const [activeDevicesCount, unactiveDevicesCount] =
      await this.prisma.$transaction([
        this.prisma.device.count({
          where: {
            organizationId,
            isAlive: true,
            isDeleted: null,
          },
        }),
        this.prisma.device.count({
          where: {
            organizationId,
            isAlive: false,
            isDeleted: null,
          },
        }),
      ]);

    return {
      activeDevicesCount,
      unactiveDevicesCount,
    };
  }

  private getTodayRangeDate(): { dayStart: string; dayEnd: string } {
    const now = DateTime.now();
    const dayStart = now.set({ hour: 0, minute: 0, second: 0 });
    const dayEnd = now.set({
      hour: 23,
      minute: 59,
      second: 59,
    });

    return {
      dayStart: dayStart.toISO(),
      dayEnd: dayEnd.toISO(),
    };
  }
}
