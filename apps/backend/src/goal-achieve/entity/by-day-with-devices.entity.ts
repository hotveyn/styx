import { Expose } from 'class-transformer';

export class ByDayWithDevicesEntity {
  @Expose() goalId: string;
  @Expose() count: string;
  @Expose() goalName: string;
  @Expose() deviceName: string;
  @Expose() deviceId: string;
  @Expose() day: number;

  constructor(
    partial: Partial<
      Omit<ByDayWithDevicesEntity, 'goalId' | 'deviceId'> & {
        goalId: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): ByDayWithDevicesEntity[] {
    return classes.map((user) => new ByDayWithDevicesEntity(user));
  }
}

export class ByDayWithDevicesEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ByDayWithDevicesEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ByDayWithDevicesEntity.array(partial.data);
  }
}
