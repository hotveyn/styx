import { Expose } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class LogErrorEntity {
  @Expose() id: string;
  @Expose() deviceCode: string;
  @Expose() body: string | Prisma.JsonValue;
  @Expose() requestTime: Date;
  @Expose() device: {
    name: string;
    code: string;
  };

  constructor(
    partial: Partial<
      Omit<LogErrorEntity, 'id'> & {
        id: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): LogErrorEntity[] {
    return classes.map((log) => new LogErrorEntity(log));
  }
}

export class LogErrorEntityWithPagination {
  @Expose() count: string;
  @Expose() data: LogErrorEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = LogErrorEntity.array(partial.data);
  }
}
