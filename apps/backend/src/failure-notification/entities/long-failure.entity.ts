import { Expose } from 'class-transformer';

export class LongFailureEntity {
  @Expose() id: string;
  @Expose() deviceId: string;
  @Expose() startDate: Date;
  @Expose() endDate: Date;
  @Expose() comment: string;
  @Expose() checked: boolean;
  @Expose() device: {
    name: string;
    code: string;
  };
  @Expose() createdAt: Date | null;

  constructor(
    partial: Partial<
      Omit<LongFailureEntity, 'id' | 'deviceId'> & {
        id: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): LongFailureEntity[] {
    return classes.map((user) => new LongFailureEntity(user));
  }
}

export class LongFailureEntityWithPagination {
  @Expose() count: string;
  @Expose() data: LongFailureEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    Object.assign(this, partial);
  }
}
