import { Expose } from 'class-transformer';
import { LogInfoEntity } from './log-info.entity';

export class LogInfoDeviceEntity {
  @Expose() count: string;
  @Expose() data: LogInfoEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = LogInfoEntity.array(partial.data);
  }
}
