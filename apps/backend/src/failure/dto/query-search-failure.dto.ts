import { IntersectionType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumberString, IsString, MaxLength } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { getOrderDto } from '../../utils/dto/order.dto';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { RequiredDateRangeDto } from 'src/utils/dto/date-range.dto';

export class QuerySearchFailureDto extends IntersectionType(
  getOrderDto(PrismaService.getArrayScalarType(Prisma.FailureScalarFieldEnum)),
  PaginationDto,
  RequiredDateRangeDto,
) {
  @IsString()
  @MaxLength(18)
  id?: string;

  @IsNumberString()
  @MaxLength(18)
  deviceId?: string;

  @IsString()
  description?: string;

  getSearchingProperties(): Record<string, unknown> {
    return {
      description: this.description,
    };
  }
}
