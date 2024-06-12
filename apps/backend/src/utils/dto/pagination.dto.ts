import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  limit?: number = 100;
}
