import { Injectable } from '@nestjs/common';
import { Expose, Type } from 'class-transformer';
import { ParameterChangeEntity } from '../../parameter/entity/parameter-change.entity';

@Injectable()
export class ParameterEntity {
  @Expose() name: string;
  @Expose() code: string;
  @Expose() description: string;
  @Expose() value: string;
  @Type(() => ParameterChangeEntity)
  @Expose()
  parameterChanges: ParameterChangeEntity[];

  constructor(partial: Partial<ParameterEntity>) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): ParameterEntity[] {
    return classes.map((user) => new ParameterEntity(user));
  }
}

@Injectable()
export class ParameterEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ParameterEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ParameterEntity.array(partial.data);
  }
}
