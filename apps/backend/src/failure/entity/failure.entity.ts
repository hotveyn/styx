import { Expose } from 'class-transformer';

export class FailureEntity {
  @Expose() id: string;
  @Expose() deviceId: string;
  @Expose() reparedDate: Date;
  @Expose() comment: string;
  @Expose() createdAt: Date | null;

  constructor(
    partial: Partial<
      Omit<FailureEntity, 'id' | 'deviceId'> & {
        id: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): FailureEntity[] {
    return classes.map((user) => new FailureEntity(user));
  }
}

export class FailureEntityWithPagination {
  @Expose() count: string;
  @Expose() data: FailureEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = FailureEntity.array(partial.data);
  }
}
