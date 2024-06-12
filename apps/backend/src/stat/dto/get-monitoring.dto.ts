import { IsNumberString, Length } from 'class-validator';

export class GetMonitoringDto {
  @IsNumberString()
  @Length(1, 18)
  organizationId?: string;
}
