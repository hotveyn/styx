import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'src/utils/dto/pagination.dto';
import { RequiredDateRangeDto } from 'src/utils/dto/date-range.dto';

export class GetByGroupDto extends IntersectionType(
  PaginationDto,
  RequiredDateRangeDto,
) {}
