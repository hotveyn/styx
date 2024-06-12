import { IntersectionType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumberString, Length } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateRangeDto } from 'src/utils/dto/date-range.dto';
import { getOrderDto } from 'src/utils/dto/order.dto';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class QuerySearchLogInfoDto extends IntersectionType(
  PaginationDto,
  DateRangeDto,
  getOrderDto(PrismaService.getArrayScalarType(Prisma.LogInfoScalarFieldEnum)),
) {
  @IsNumberString()
  @Length(1, 18)
  organizationId?: string;
}
