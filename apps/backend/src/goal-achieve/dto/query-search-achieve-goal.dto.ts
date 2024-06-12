import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { IsBoolean, IsNumberString, MaxLength } from 'class-validator';
import { getOrderDto } from '../../utils/dto/order.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Transform } from 'class-transformer';
import { DateRangeDto } from 'src/utils/dto/date-range.dto';

export class QuerySearchAchieveGoalDto extends IntersectionType(
  PaginationDto,
  DateRangeDto,
  getOrderDto(
    PrismaService.getArrayScalarType(Prisma.GoalAchievScalarFieldEnum),
  ),
) {
  @IsNumberString()
  @MaxLength(18)
  goalId: string;

  @IsNumberString()
  @MaxLength(18)
  deviceId?: string;

  @Transform(({ value }) => {
    switch (value) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return value;
    }
  })
  @IsBoolean()
  isDeleted?: boolean;
}
