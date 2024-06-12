import { HttpException, Injectable } from '@nestjs/common';
import { AchieveGoalDto } from './dto/achieve-goal.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuerySearchAchieveGoalDto } from './dto/query-search-achieve-goal.dto';
import { Prisma } from '@prisma/client';
import { GetByGroupAchieveGoalDto } from './dto/get-by-group-achieve-goal.dto';
import { ApiErrors } from '../errors/api-error';
import { BetterBigInt } from '../utils/big-int-or-undefined';
import { GetByDayDto } from './dto/get-by-day.dto';
import { GetByDayWithDevicesDto } from './dto/get-by-day-with-devices.dto';
import { GetByHourDto } from './dto/get-by-hour.dto';
import { GetByHourWithDevicesDto } from './dto/get-by-hour-with-devices.dto';
import { GetByDayWithDeviceDto } from './dto/get-by-day-with-device.dto';
import { GetByHourWithDeviceDto } from './dto/get-by-hour-with-device.dto';

@Injectable()
export class GoalAchieveService {
  constructor(private readonly prisma: PrismaService) {}

  async achieveGoal(dto: AchieveGoalDto) {
    const goal = await this.prisma.goal.findUnique({
      where: {
        code: dto.goalCode,
      },
    });

    if (!goal) throw new HttpException(ApiErrors.goal.notFound.code, 404);

    const device = await this.prisma.device.findUnique({
      where: {
        code: dto.deviceCode,
      },
    });

    if (!device) throw new HttpException(ApiErrors.device.notFound.code, 404);

    if (device.organizationId && goal.organizationId !== device.organizationId)
      throw new HttpException(ApiErrors.organization.forbidden, 400);

    return this.prisma.goalAchiev.create({
      data: {
        goalId: goal.id,
        deviceId: device.id,
      },
    });
  }

  async querySearch(
    dto: QuerySearchAchieveGoalDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const findManyOptions: Prisma.GoalAchievFindManyArgs = {
      where: {
        goalId: BetterBigInt(dto.goalId),
        deviceId: BetterBigInt(dto.deviceId),
        createdAt: {
          gte: dto.startDate ? new Date(dto.startDate) : undefined,
          lte: dto.endDate ? new Date(dto.endDate) : undefined,
        },
        goal: {
          organizationId: BetterBigInt(userOrganizationId),
        },
        device: {
          organizationId: BetterBigInt(userOrganizationId),
        },
      },
      skip: dto.offset,
      take: dto.limit,
    };

    if (dto.isDeleted != undefined)
      findManyOptions.where.isDeleted = {
        [dto.isDeleted ? 'not' : 'equals']: null,
      };

    if (dto.orderBy && dto.orderDirection) {
      findManyOptions.orderBy = [
        Object.fromEntries([[dto.orderBy, dto.orderDirection]]),
      ];
    }

    const [data, count] = await this.prisma.$transaction([
      this.prisma.goalAchiev.findMany({
        ...findManyOptions,
        include: {
          goal: {
            select: {
              name: true,
              code: true,
            },
          },
          device: {
            select: {
              name: true,
              code: true,
            },
          },
        },
      }),
      this.prisma.goalAchiev.count({ where: findManyOptions.where }),
    ]);

    return {
      count,
      data,
    };
  }

  async getByGroup(
    dto: GetByGroupAchieveGoalDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    let dataSQLCode = `
    select goal_id as "goalId",
    device_id as "deviceId",
    count(*),
    (select name from devices as d where d.id = device_id) as "deviceName",
    (select name from goals as g where g.id = goal_id)     as "goalName",
    (select code from devices as d where d.id = device_id) as "deviceCode",
    (select code from goals as g where g.id = goal_id)     as "goalCode"
    from goal_achievs \n
    where created_at between '${dto.startDate}' and '${dto.endDate}' \n
    `;

    if (userOrganizationId)
      dataSQLCode += `and exists(select * from goals g where g.id = goal_id and g.organization_id = ${BetterBigInt(userOrganizationId)}) AND
    exists(select * from devices d where d.id = device_id and d.organization_id = ${BetterBigInt(userOrganizationId)})\n`;

    dataSQLCode += 'group by goal_id, device_id \n';

    if (dto.orderBy)
      dataSQLCode += `order by "${dto.orderBy}" ${dto.orderDirection}\n`;
    if (dto.offset) dataSQLCode += `offset ${dto.offset}\n`;
    if (dto.limit) dataSQLCode += `limit ${dto.limit}\n`;

    const [data, count] = await Promise.all([
      this.prisma.$queryRawUnsafe(dataSQLCode),
      this.prisma.$queryRawUnsafe(`
          select DISTINCT COUNT(*) OVER ()
          from goal_achievs
          where created_at between '${dto.startDate}' and '${dto.endDate}'
          ${
            userOrganizationId
              ? `and exists(select * from goals g where g.id = goal_id and g.organization_id = ${BetterBigInt(userOrganizationId)}) AND
          exists(select * from devices d where d.id = device_id and d.organization_id = ${BetterBigInt(userOrganizationId)})\n`
              : ''
          }
          group by goal_id, device_id
      `),
    ]);

    return {
      count: (count as [number]).length ? count[0].count : 0,
      data,
    };
  }

  async getByDay(
    dto: GetByDayDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const goals = await this.prisma.goal.findMany({
      where: {
        OR: dto.goalId.map((g) => {
          return {
            id: BetterBigInt(g),
            organizationId: BetterBigInt(userOrganizationId),
          };
        }),
      },
    });

    if (!goals.length)
      return {
        count: 0,
        data: [],
      };

    const goalIdFilterSql = `AND ( ${goals
      .map((g) => {
        return `goal_id = ${g.id}`;
      })
      .join(' OR ')} )\n`;

    let dataSQLCode = `
    select goal_id as "goalId",
    count(*),
    (select name from goals as g where g.id = goal_id)     as "goalName",
    date_part('isodow', created_at) as "day"
    from goal_achievs
    where created_at between '${dto.startDate}' and '${dto.endDate}' \n`;

    dataSQLCode += goalIdFilterSql;

    dataSQLCode += `group by goal_id, date_part('isodow', created_at)\n`;

    if (dto.orderBy)
      dataSQLCode += `order by "${dto.orderBy}" ${dto.orderDirection}\n`;
    if (dto.offset) dataSQLCode += `offset ${dto.offset}\n`;
    if (dto.limit) dataSQLCode += `limit ${dto.limit}\n`;

    const [data, count] = await Promise.all([
      this.prisma.$queryRawUnsafe(dataSQLCode),
      this.prisma.$queryRawUnsafe(`
          select DISTINCT COUNT(*) OVER ()
          from goal_achievs
          where created_at between '${dto.startDate}' and '${dto.endDate}'
          ${goalIdFilterSql}
          group by goal_id, date_part('isodow', created_at) 
      `),
    ]);

    return {
      count: (count as [number]).length ? count[0].count : 0,
      data,
    };
  }

  async getByDayWithDevices(
    dto: GetByDayWithDevicesDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    let dataSQLCode = `
    select goal_id as "goalId",
    device_id as "deviceId",
    count(*),
    (select name from devices as d where d.id = device_id) as "deviceName",
    (select name from goals as g where g.id = goal_id)     as "goalName",
    date_part('isodow', created_at) as "day"
    from goal_achievs
    where created_at between '${dto.startDate}' and '${dto.endDate}' \n`;

    if (userOrganizationId)
      dataSQLCode += `and exists(select * from goals g where g.id = goal_id and g.organization_id = ${BetterBigInt(userOrganizationId)}) AND
    exists(select * from devices d where d.id = device_id and d.organization_id = ${BetterBigInt(userOrganizationId)})\n`;

    dataSQLCode += `group by goal_id, device_id, date_part('isodow', created_at) \n`;

    if (dto.orderBy)
      dataSQLCode += `order by "${dto.orderBy}" ${dto.orderDirection}\n`;
    if (dto.offset) dataSQLCode += `offset ${dto.offset}\n`;
    if (dto.limit) dataSQLCode += `limit ${dto.limit}\n`;

    const [data, count] = await Promise.all([
      this.prisma.$queryRawUnsafe(dataSQLCode),
      this.prisma.$queryRawUnsafe(`
          select DISTINCT COUNT(*) OVER ()
          from goal_achievs
          where created_at between '${dto.startDate}' and '${dto.endDate}'
          ${
            userOrganizationId
              ? `and exists(select * from goals g where g.id = goal_id and g.organization_id = ${BetterBigInt(userOrganizationId)}) AND
          exists(select * from devices d where d.id = device_id and d.organization_id = ${BetterBigInt(userOrganizationId)})`
              : ''
          }
          group by goal_id, device_id, date_part('isodow', created_at) 
      `),
    ]);

    return {
      count: (count as [number]).length ? count[0].count : 0,
      data,
    };
  }

  async getByDayWithDevice(
    dto: GetByDayWithDeviceDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const device = await this.prisma.device.findUnique({
      where: {
        id: BetterBigInt(dto.deviceId),
      },
    });

    if (!device) throw new HttpException(ApiErrors.device.notFound.id, 404);

    if (
      userOrganizationId &&
      device.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    const goals = await this.prisma.goal.findMany({
      where: {
        OR: dto.goalId.map((g) => {
          return {
            id: BetterBigInt(g),
            organizationId: BetterBigInt(userOrganizationId),
          };
        }),
      },
    });

    if (!goals.length)
      return {
        count: 0,
        data: [],
      };

    const goalIdFilterSql = `AND ( ${goals
      .map((g) => {
        return `goal_id = ${g.id}`;
      })
      .join(' OR ')} )\n`;

    let dataSQLCode = `
    select goal_id as "goalId",
    (select name from goals as g where g.id = goal_id) as "goalName",
    count(*),
    date_part('isodow', created_at) as "day"
    from goal_achievs
    where device_id = ${dto.deviceId} and created_at between '${dto.startDate}' and '${dto.endDate}' \n`;

    dataSQLCode += goalIdFilterSql;

    dataSQLCode += `group by goal_id, device_id, date_part('isodow', created_at) \n`;

    if (dto.orderBy)
      dataSQLCode += `order by "${dto.orderBy}" ${dto.orderDirection}\n`;
    if (dto.offset) dataSQLCode += `offset ${dto.offset}\n`;
    if (dto.limit) dataSQLCode += `limit ${dto.limit}\n`;

    const [data, count] = await Promise.all([
      this.prisma.$queryRawUnsafe(dataSQLCode),
      this.prisma.$queryRawUnsafe(`
          select DISTINCT COUNT(*) OVER ()
          from goal_achievs
          where device_id = ${dto.deviceId} and created_at between '${dto.startDate}' and '${dto.endDate}' 
          ${goalIdFilterSql}
          group by goal_id, device_id, date_part('isodow', created_at) 
      `),
    ]);

    return {
      count: (count as [number]).length ? count[0].count : 0,
      data,
    };
  }

  async getByHour(
    dto: GetByHourDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const goals = await this.prisma.goal.findMany({
      where: {
        OR: dto.goalId.map((g) => {
          return {
            id: BetterBigInt(g),
            organizationId: BetterBigInt(userOrganizationId),
          };
        }),
      },
    });

    if (!goals.length)
      return {
        count: 0,
        data: [],
      };

    const goalIdFilterSql = `AND ( ${goals
      .map((g) => {
        return `goal_id = ${g.id}`;
      })
      .join(' OR ')} )\n`;

    let dataSQLCode = `
    select goal_id as "goalId",
    count(*),
    (select name from goals as g where g.id = goal_id)     as "goalName",
    date_part('hour', created_at) as "hour"
    from goal_achievs 
    where created_at between '${dto.startDate}' and '${dto.endDate}' \n`;

    dataSQLCode += goalIdFilterSql;

    dataSQLCode += `group by goal_id, date_part('hour', created_at) \n`;

    if (dto.orderBy)
      dataSQLCode += `order by "${dto.orderBy}" ${dto.orderDirection}\n`;
    if (dto.offset) dataSQLCode += `offset ${dto.offset}\n`;
    if (dto.limit) dataSQLCode += `limit ${dto.limit}\n`;

    const [data, count] = await Promise.all([
      this.prisma.$queryRawUnsafe(dataSQLCode),
      this.prisma.$queryRawUnsafe(`
          select DISTINCT COUNT(*) OVER ()
          from goal_achievs
          where created_at between '${dto.startDate}' and '${dto.endDate}' 
          ${goalIdFilterSql}
          group by goal_id, date_part('hour', created_at)
      `),
    ]);

    return {
      count: (count as [number]).length ? count[0].count : 0,
      data,
    };
  }

  async getByHourWithDevices(
    dto: GetByHourWithDevicesDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    let dataSQLCode = `
    select goal_id as "goalId",
    device_id as "deviceId",
    count(*),
    (select name from devices as d where d.id = device_id) as "deviceName",
    (select name from goals as g where g.id = goal_id)     as "goalName",
    date_part('hour', created_at) as "hour"
    from goal_achievs 
    where created_at between '${dto.startDate}' and '${dto.endDate}' \n`;

    if (userOrganizationId)
      dataSQLCode += `and exists(select * from goals g where g.id = goal_id and g.organization_id = ${BetterBigInt(userOrganizationId)}) AND
    exists(select * from devices d where d.id = device_id and d.organization_id = ${BetterBigInt(userOrganizationId)})\n`;

    dataSQLCode += `group by goal_id, device_id, date_part('hour', created_at) \n`;

    if (dto.orderBy)
      dataSQLCode += `order by "${dto.orderBy}" ${dto.orderDirection}\n`;
    if (dto.offset) dataSQLCode += `offset ${dto.offset}\n`;
    if (dto.limit) dataSQLCode += `limit ${dto.limit}\n`;

    const [data, count] = await Promise.all([
      this.prisma.$queryRawUnsafe(dataSQLCode),
      this.prisma.$queryRawUnsafe(`
          select DISTINCT COUNT(*) OVER ()
          from goal_achievs
          where created_at between '${dto.startDate}' and '${dto.endDate}'
          ${
            userOrganizationId
              ? `and exists(select * from goals g where g.id = goal_id and g.organization_id = ${BetterBigInt(userOrganizationId)}) AND
          exists(select * from devices d where d.id = device_id and d.organization_id = ${BetterBigInt(userOrganizationId)})`
              : ''
          }
          group by goal_id, device_id, date_part('hour', created_at)
      `),
    ]);

    return {
      count: (count as [number]).length ? count[0].count : 0,
      data,
    };
  }

  async getByHourWithDevice(
    dto: GetByHourWithDeviceDto,
    userOrganizationId: number | bigint | string | undefined,
  ) {
    const device = await this.prisma.device.findUnique({
      where: {
        id: BetterBigInt(dto.deviceId),
      },
    });

    if (!device) throw new HttpException(ApiErrors.device.notFound.id, 404);

    if (
      userOrganizationId &&
      device.organizationId !== BetterBigInt(userOrganizationId)
    )
      throw new HttpException(ApiErrors.organization.forbidden, 403);

    const goals = await this.prisma.goal.findMany({
      where: {
        OR: dto.goalId.map((g) => {
          return {
            id: BetterBigInt(g),
            organizationId: BetterBigInt(userOrganizationId),
          };
        }),
      },
    });

    if (!goals.length)
      return {
        count: 0,
        data: [],
      };

    const goalIdFilterSql = `AND ( ${goals
      .map((g) => {
        return `goal_id = ${g.id}`;
      })
      .join(' OR ')} )\n`;

    let dataSQLCode = `
    select goal_id as "goalId",
    count(*),
    (select name from goals as g where g.id = goal_id)     as "goalName",
    date_part('hour', created_at) as "hour"
    from goal_achievs
    where device_id = ${dto.deviceId} and created_at between '${dto.startDate}' and '${dto.endDate}' \n`;

    dataSQLCode += goalIdFilterSql;

    dataSQLCode += `group by goal_id, device_id, date_part('hour', created_at) \n`;

    if (dto.orderBy)
      dataSQLCode += `order by "${dto.orderBy}" ${dto.orderDirection}\n`;
    if (dto.offset) dataSQLCode += `offset ${dto.offset}\n`;
    if (dto.limit) dataSQLCode += `limit ${dto.limit}\n`;

    const [data, count] = await Promise.all([
      this.prisma.$queryRawUnsafe(dataSQLCode),
      this.prisma.$queryRawUnsafe(`
          select DISTINCT COUNT(*) OVER ()
          from goal_achievs
          where device_id = ${dto.deviceId} and created_at between '${dto.startDate}' and '${dto.endDate}' 
          ${goalIdFilterSql}
          group by goal_id, device_id, date_part('hour', created_at)
      `),
    ]);

    return {
      count: (count as [number]).length ? count[0].count : 0,
      data,
    };
  }
}
