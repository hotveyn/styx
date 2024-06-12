import { Expose } from 'class-transformer';

export class GoalAchieveEntity {
  @Expose() id: string;
  @Expose() goalId: string;
  @Expose() deviceId: string;
  @Expose() isDeleted: Date | null;
  @Expose() createdAt: Date | null;

  constructor(
    partial: Partial<
      Omit<GoalAchieveEntity, 'id' | 'goalId' | 'deviceId'> & {
        id: number | bigint;
        goalId: number | bigint;
        deviceId: number | bigint;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): GoalAchieveEntity[] {
    return classes.map((user) => new GoalAchieveEntity(user));
  }
}
