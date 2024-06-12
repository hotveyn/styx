import { Expose } from 'class-transformer';

export class GoalEntity {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() description: string;
  @Expose() code: string;
  @Expose() organizationId: string;
  @Expose() isDeleted: Date | null;
  @Expose() organization: {
    name: string;
  };
  @Expose() createdAt: Date | null;

  constructor(
    partial: Partial<
      Omit<GoalEntity, 'id' | 'organizationId'> & {
        id: number | bigint;
        organizationId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): GoalEntity[] {
    return classes.map((user) => new GoalEntity(user));
  }
}

export class GoalEntityWithPagination {
  @Expose() count: string;
  @Expose() data: GoalEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = GoalEntity.array(partial.data);
  }
}
