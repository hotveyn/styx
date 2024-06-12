import { IntersectionType } from '@nestjs/swagger';
import { RequiredDateRangeDto } from 'src/utils/dto/date-range.dto';
import { getOrderDto } from 'src/utils/dto/order.dto';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class GetActivityDto extends IntersectionType(
  RequiredDateRangeDto,
  PaginationDto,
  getOrderDto(['errorCount', 'infoCount', 'failureCount', 'date']),
) {}
