import { IsDefined, IsISO8601 } from 'class-validator';

export class DateRangeDto {
  @IsISO8601()
  startDate?: string;

  @IsISO8601()
  endDate?: string;
}

export class RequiredDateRangeDto {
  @IsISO8601()
  @IsDefined()
  startDate: string;

  @IsISO8601()
  @IsDefined()
  endDate: string;
}
