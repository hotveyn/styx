import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class GetNotificationsDto extends IntersectionType(
  // DateRangeDto,
  PaginationDto,
) {
  // @IsNumberString()
  // deviceId?: string;
}
