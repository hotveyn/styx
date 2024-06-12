import { Expose } from 'class-transformer';

export class MonitoringEntity {
  @Expose() activeDevicesCount: number;
  @Expose() unactiveDevicesCount: number;
  @Expose() achievedGoalsCount: number;
  @Expose() failureCount: number;
  @Expose() activeFailureCount: number;
  @Expose() logErrorCount: number;
  @Expose() logInfoCount: number;

  constructor(partial: Partial<MonitoringEntity>) {
    Object.assign(this, partial);
  }
}
