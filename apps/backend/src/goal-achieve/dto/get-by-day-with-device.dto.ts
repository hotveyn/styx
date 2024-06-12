import { IntersectionType } from '@nestjs/swagger';
import { RequiredDateRangeDto } from '../../utils/dto/date-range.dto';
import { getOrderDto } from '../../utils/dto/order.dto';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { IsArray, IsDefined, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetByDayWithDeviceDto extends IntersectionType(
  RequiredDateRangeDto,
  PaginationDto,
  getOrderDto(['goalId', 'count', 'goalName', 'day']),
) {
  @IsNumberString()
  @IsDefined()
  deviceId: string;

  @Transform(({ value }) => {
    if (value && !Array.isArray(value)) return [value];
    return value;
  })
  @IsArray()
  goalId: string[];
}
