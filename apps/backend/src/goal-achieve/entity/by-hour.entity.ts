import { Expose } from 'class-transformer';

export class ByHourEntity {
  @Expose() goalId: string;
  @Expose() count: string;
  @Expose() goalName: string;
  @Expose() hour: number;

  constructor(
    partial: Partial<
      Omit<ByHourEntity, 'goalId'> & {
        goalId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): ByHourEntity[] {
    return classes.map((user) => new ByHourEntity(user));
  }
}

export class ByHourEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ByHourEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ByHourEntity.array(partial.data);
  }
}
