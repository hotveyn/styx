import { Expose } from 'class-transformer';

export class ByDayWithDeviceEntity {
  @Expose() goalId: string;
  @Expose() count: string;
  @Expose() goalName: string;
  @Expose() day: number;

  constructor(
    partial: Partial<
      Omit<ByDayWithDeviceEntity, 'goalId' | 'deviceId'> & {
        goalId: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): ByDayWithDeviceEntity[] {
    return classes.map((user) => new ByDayWithDeviceEntity(user));
  }
}

export class ByDayWithDeviceEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ByDayWithDeviceEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ByDayWithDeviceEntity.array(partial.data);
  }
}
