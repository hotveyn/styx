import { Injectable } from '@nestjs/common';
import { Expose } from 'class-transformer';

@Injectable()
export class ParameterChangeEntity {
  @Expose() id: string;
  @Expose() userId: string;
  @Expose() parameterId: string;
  @Expose() was: string;
  @Expose() became: string;
  @Expose() user: {
    name: string;
  };

  constructor(
    partial: Partial<
      Omit<ParameterChangeEntity, 'id' | 'userId' | 'parameterId'> & {
        id: number | bigint;
        userId: number | bigint;
        parameterId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): ParameterChangeEntity[] {
    return classes.map((user) => new ParameterChangeEntity(user));
  }
}

@Injectable()
export class ParameterChangeEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ParameterChangeEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ParameterChangeEntity.array(partial.data);
  }
}
