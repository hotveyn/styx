import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { getOrderDto } from '../../utils/dto/order.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { DateRangeDto } from '../../utils/dto/date-range.dto';

export class QuerySearchGoalDto extends IntersectionType(
  PaginationDto,
  getOrderDto(PrismaService.getArrayScalarType(Prisma.GoalScalarFieldEnum)),
  DateRangeDto,
) {
  @IsString()
  @MaxLength(256)
  name?: string;

  @IsString()
  @MaxLength(256)
  code?: string;

  @IsString()
  @MaxLength(18)
  id?: string;

  @IsNumberString()
  @MaxLength(18)
  organizationId?: string;

  @IsString()
  @MaxLength(256)
  description?: string;

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

  getSearchingProperties(): Record<string, unknown> {
    return {
      name: this.name,
      description: this.description,
    };
  }
}
