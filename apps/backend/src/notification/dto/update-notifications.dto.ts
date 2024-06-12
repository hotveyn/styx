import { IsBoolean } from 'class-validator';

export class UpdateNotificationsDto {
  @IsBoolean()
  failure: boolean;

  @IsBoolean()
  errorLog: boolean;
}
