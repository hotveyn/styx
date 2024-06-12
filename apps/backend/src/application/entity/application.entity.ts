import { Expose } from 'class-transformer';

export class ApplicationEntity {
  @Expose() name: string;
  @Expose() createdAt: Date;
  @Expose() unpacked: boolean;
  @Expose() size: number | null;

  constructor(params: Partial<ApplicationEntity>) {
    Object.assign(this, params);
  }

  static array(classes: any[]): ApplicationEntity[] {
    return classes.map((user) => new ApplicationEntity(user));
  }
}

export class ApplicationEntityWithPagination {
  @Expose() count: string;
  @Expose() data: ApplicationEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = ApplicationEntity.array(partial.data);
  }
}
