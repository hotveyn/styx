import { Expose } from 'class-transformer';

export class ByDayEntity {
  @Expose() goalId: string;
  @Expose() count: string;
  @Expose() goalName: string;
  @Expose() day: number;

  constructor(
    partial: Partial<
      Omit<ByDayEntity, 'goalId'> & {
        goalId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): ByDayEntity[] {
    return classes.map((user) => new ByDayEntity(user));
  }
}

export class ByDayEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ByDayEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ByDayEntity.array(partial.data);
  }
}
