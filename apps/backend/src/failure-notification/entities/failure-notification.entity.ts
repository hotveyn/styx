import { Expose } from 'class-transformer';

export class FailureNotificationEntity {
  @Expose() failureId: string;
  @Expose() userId: Date;
  @Expose() createdAt: Date | null;
  @Expose() updatedAt: Date | null;

  constructor(
    partial: Partial<
      Omit<FailureNotificationEntity, 'failureId' | 'userId'> & {
        failureId: number | bigint;
        userId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): FailureNotificationEntity[] {
    return classes.map((user) => new FailureNotificationEntity(user));
  }
}

export class FailureNotificationEntityWithPagination {
  @Expose() count: string;
  @Expose() data: FailureNotificationEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    Object.assign(this, partial);
  }
}
