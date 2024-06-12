import { Expose } from 'class-transformer';

export class CameraEntity {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() link: string;
  @Expose() createdAt: Date;
  @Expose() organizationId: string;
  @Expose() organization: {
    name: string;
  };

  constructor(
    params: Partial<
      Omit<CameraEntity, 'id' | 'organizationId'> & {
        id: number | bigint | string;
        organizationId: number | bigint | string;
      }
    >,
  ) {
    Object.assign(this, params);
  }

  static array(classes: any[]): CameraEntity[] {
    return classes.map((user) => new CameraEntity(user));
  }
}

export class CameraEntityWithPagination {
  @Expose() count: string;
  @Expose() data: CameraEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = CameraEntity.array(partial.data);
  }
}
