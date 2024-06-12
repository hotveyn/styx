import { IsBoolean, IsString, MaxLength } from 'class-validator';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { getOrderDto } from '../../utils/dto/order.dto';
import { Transform } from 'class-transformer';
import { DateRangeDto } from '../../utils/dto/date-range.dto';

export class QuerySearchOrganizationDto extends IntersectionType(
  PaginationDto,
  getOrderDto(
    PrismaService.getArrayScalarType(Prisma.OrganizationScalarFieldEnum),
  ),
  DateRangeDto,
) {
  @IsString()
  @MaxLength(18)
  id?: string;

  @IsString()
  @MaxLength(256)
  name?: string;

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
    };
  }
}
