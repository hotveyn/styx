import { IntersectionType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsString, MaxLength } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { DateRangeDto } from '../../utils/dto/date-range.dto';
import { getOrderDto } from '../../utils/dto/order.dto';
import { PaginationDto } from '../../utils/dto/pagination.dto';

export class QuerySearchApplicationDto extends IntersectionType(
  PaginationDto,
  getOrderDto(
    PrismaService.getArrayScalarType(Prisma.ApplicationScalarFieldEnum),
  ),
  DateRangeDto,
) {
  @IsString()
  @MaxLength(80)
  name?: string;

  getSearchingProperties(): Record<string, unknown> {
    return {
      name: this.name,
    };
  }
}
