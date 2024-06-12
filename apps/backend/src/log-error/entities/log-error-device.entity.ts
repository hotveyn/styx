import { Expose } from 'class-transformer';
import { LogErrorEntity } from './log-error.entity';

export class LogErrorDeviceEntity {
  @Expose() count: string;
  @Expose() data: LogErrorEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = LogErrorEntity.array(partial.data);
  }
}
