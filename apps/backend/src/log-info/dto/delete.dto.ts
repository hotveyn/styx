import { IntersectionType } from '@nestjs/swagger';
import { RequiredDateRangeDto } from '../../utils/dto/date-range.dto';

export class DeleteDto extends IntersectionType(RequiredDateRangeDto) {}
