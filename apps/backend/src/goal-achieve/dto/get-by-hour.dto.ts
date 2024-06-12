import { IntersectionType } from '@nestjs/swagger';
import { RequiredDateRangeDto } from '../../utils/dto/date-range.dto';
import { getOrderDto } from '../../utils/dto/order.dto';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { Transform } from 'class-transformer';
import { IsArray } from 'class-validator';

export class GetByHourDto extends IntersectionType(
  RequiredDateRangeDto,
  PaginationDto,
  getOrderDto(['goalId', 'count', 'goalName', 'hour']),
) {
  @Transform(({ value }) => {
    if (value && !Array.isArray(value)) return [value];
    return value;
  })
  @IsArray()
  goalId: string[];
}
