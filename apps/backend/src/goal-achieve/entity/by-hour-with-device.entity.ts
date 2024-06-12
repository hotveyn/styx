import { Expose } from 'class-transformer';

export class ByHourWithDeviceEntity {
  @Expose() goalId: string;
  @Expose() count: string;
  @Expose() goalName: string;
  @Expose() hour: number;

  constructor(
    partial: Partial<
      Omit<ByHourWithDeviceEntity, 'goalId' | 'deviceId'> & {
        goalId: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): ByHourWithDeviceEntity[] {
    return classes.map((user) => new ByHourWithDeviceEntity(user));
  }
}

export class ByHourWithDeviceEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ByHourWithDeviceEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ByHourWithDeviceEntity.array(partial.data);
  }
}
