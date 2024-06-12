import { Expose } from 'class-transformer';

export class GoalAchieveGroupEntity {
  @Expose() goalId: string;
  @Expose() deviceId: string;
  @Expose() count: string;
  @Expose() deviceName: string;
  @Expose() deviceCode: string;
  @Expose() goalName: string;
  @Expose() goalCode: string;

  constructor(
    partial: Partial<
      Omit<GoalAchieveGroupEntity, 'goalId' | 'deviceId'> & {
        goalId: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): GoalAchieveGroupEntity[] {
    return classes.map((user) => new GoalAchieveGroupEntity(user));
  }
}

export class GoalAchieveGroupEntityWithPagination {
  @Expose() count: string;
  @Expose() data: GoalAchieveGroupEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = GoalAchieveGroupEntity.array(partial.data);
  }
}
