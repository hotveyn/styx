import { Expose } from 'class-transformer';

export class LogInfoGroupEntity {
  @Expose() _count: {
    _all: number;
  };
  @Expose() deviceCode: string;

  constructor(partial: Partial<LogInfoGroupEntity>) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): LogInfoGroupEntity[] {
    return classes.map((user) => new LogInfoGroupEntity(user));
  }
}

export class LogInfoGroupEntityWithPagination {
  @Expose() count: string;
  @Expose() data: LogInfoGroupEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = LogInfoGroupEntity.array(partial.data);
  }
}
