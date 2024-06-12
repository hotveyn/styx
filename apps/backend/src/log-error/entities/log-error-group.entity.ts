import { Expose } from 'class-transformer';

export class LogErrorGroupEntity {
  @Expose() _count: {
    _all: number;
  };
  @Expose() deviceCode: string;

  constructor(partial: Partial<LogErrorGroupEntity>) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): LogErrorGroupEntity[] {
    return classes.map((user) => new LogErrorGroupEntity(user));
  }
}

export class LogErrorGroupEntityWithPagination {
  @Expose() count: string;
  @Expose() data: LogErrorGroupEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = LogErrorGroupEntity.array(partial.data);
  }
}
