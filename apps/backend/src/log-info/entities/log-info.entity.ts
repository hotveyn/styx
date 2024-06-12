import { Expose } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class LogInfoEntity {
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
      Omit<LogInfoEntity, 'id'> & {
        id: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): LogInfoEntity[] {
    return classes.map((log) => new LogInfoEntity(log));
  }
}

export class LogInfoEntityWithPagination {
  @Expose() count: string;
  @Expose() data: LogInfoEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = LogInfoEntity.array(partial.data);
  }
}
