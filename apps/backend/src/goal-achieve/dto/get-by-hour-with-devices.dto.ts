import { IntersectionType } from '@nestjs/swagger';
import { RequiredDateRangeDto } from '../../utils/dto/date-range.dto';
import { getOrderDto } from '../../utils/dto/order.dto';
import { PaginationDto } from '../../utils/dto/pagination.dto';

export class GetByHourWithDevicesDto extends IntersectionType(
  RequiredDateRangeDto,
  PaginationDto,
  getOrderDto([
    'goalId',
    'count',
    'goalName',
    'hour',
    'deviceId',
    'deviceName',
  ]),
) {}
