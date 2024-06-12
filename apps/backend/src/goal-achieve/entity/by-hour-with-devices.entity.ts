import { Expose } from 'class-transformer';

export class ByHourWithDevicesEntity {
  @Expose() goalId: string;
  @Expose() count: string;
  @Expose() goalName: string;
  @Expose() deviceName: string;
  @Expose() deviceId: string;
  @Expose() hour: number;

  constructor(
    partial: Partial<
      Omit<ByHourWithDevicesEntity, 'goalId' | 'deviceId'> & {
        goalId: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): ByHourWithDevicesEntity[] {
    return classes.map((user) => new ByHourWithDevicesEntity(user));
  }
}

export class ByHourWithDevicesEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ByHourWithDevicesEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ByHourWithDevicesEntity.array(partial.data);
  }
}
