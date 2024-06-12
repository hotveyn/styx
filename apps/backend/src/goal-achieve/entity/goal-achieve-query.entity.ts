import { Expose } from 'class-transformer';

export class GoalAchieveQueryEntity {
  @Expose() id: string;
  @Expose() goalId: string;
  @Expose() deviceId: string;
  @Expose() goal: { name: string; code: string };
  @Expose() device: { name: string; code: string };
  @Expose() createdAt: Date | null;

  constructor(
    partial: Partial<
      Omit<GoalAchieveQueryEntity, 'id' | 'goalId' | 'deviceId'> & {
        id: number | bigint;
        goalId: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): GoalAchieveQueryEntity[] {
    return classes.map((user) => new GoalAchieveQueryEntity(user));
  }
}

export class GoalAchieveQueryEntityWithPagination {
  @Expose() count: string;
  @Expose() data: GoalAchieveQueryEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = GoalAchieveQueryEntity.array(partial.data);
  }
}
