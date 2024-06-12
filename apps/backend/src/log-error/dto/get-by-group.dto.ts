import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { RequiredDateRangeDto } from '../../utils/dto/date-range.dto';

export class GetByGroupDto extends IntersectionType(
  PaginationDto,
  RequiredDateRangeDto,
) {}
