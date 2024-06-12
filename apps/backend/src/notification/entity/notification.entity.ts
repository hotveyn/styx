import { Expose } from 'class-transformer';

export class NotificationEntity {
  @Expose() userId: string;
  @Expose() failure: boolean;
  @Expose() errorLog: boolean;

  constructor(
    partial: Partial<
      Omit<NotificationEntity, 'userId'> & {
        userId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): NotificationEntity[] {
    return classes.map((notification) => new NotificationEntity(notification));
  }
}

export class NotificationEntityWithPagination {
  @Expose() count: string;
  @Expose() data: NotificationEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = NotificationEntity.array(partial.data);
  }
}
