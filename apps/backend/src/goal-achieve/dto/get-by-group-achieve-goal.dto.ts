import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { getOrderDto } from '../../utils/dto/order.dto';
import { RequiredDateRangeDto } from 'src/utils/dto/date-range.dto';

export class GetByGroupAchieveGoalDto extends IntersectionType(
  RequiredDateRangeDto,
  PaginationDto,
  getOrderDto(['goalId', 'deviceId', 'count', 'deviceName', 'goalName']),
) {}
