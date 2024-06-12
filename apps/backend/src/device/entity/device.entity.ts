import { Prisma } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

class OrganizationName {
  @Expose() name: string;
}

export class DeviceEntity {
  @Expose() id: string;
  @Expose() code: string;
  @Expose() ip: string;
  @Expose() port: string;
  @Expose() name: string;
  @Expose() deviceType: string;
  @Expose() address: string;
  @Expose() geo: string;
  @Expose() softwareType: string;
  @Expose() softwareVersion: string;
  @Type(() => OrganizationName)
  @Expose()
  organization: OrganizationName;
  @Expose() status: string;
  @Expose() sshParameters: string;
  @Expose() isAlive: boolean;
  @Expose() lastPingDate: Date | null;
  @Expose() additionalData: string | null;
  @Expose() isDeleted: Date | null;
  @Expose() createdAt: Date | null;

  constructor(
    partial: Partial<
      Omit<DeviceEntity, 'id' | 'additionalData'> & {
        id: number | bigint;
        additionalData: Prisma.JsonValue | string | null;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): DeviceEntity[] {
    return classes.map((user) => new DeviceEntity(user));
  }
}

export class DeviceEntityWithPagination {
  @Expose() count: string;
  @Expose() data: DeviceEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    Object.assign(this, partial);
  }
}
