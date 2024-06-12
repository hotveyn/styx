import { Expose } from 'class-transformer';

export class ActivityEntity {
  @Expose() date: string;
  @Expose() errorCount: number;
  @Expose() infoCount: number;
  @Expose() failureCount: number;

  constructor(partial: Partial<ActivityEntity>) {
    Object.assign(this, partial);
  }
}

export class ActivityEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ActivityEntity[];

  constructor(
    partial: Partial<{ count: number | string; data: ActivityEntity[] }>,
  ) {
    Object.assign(this, partial);
    this.count = String(partial.count);
  }
}
