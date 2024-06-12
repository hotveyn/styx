import { IntersectionType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumberString, IsString, MaxLength } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateRangeDto } from 'src/utils/dto/date-range.dto';
import { getOrderDto } from 'src/utils/dto/order.dto';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class QuerySearchCameraDto extends IntersectionType(
  DateRangeDto,
  PaginationDto,
  getOrderDto(PrismaService.getArrayScalarType(Prisma.CameraScalarFieldEnum)),
) {
  @IsString()
  @MaxLength(18)
  id?: string;

  @IsNumberString()
  @MaxLength(18)
  organizationId?: string;

  @IsString()
  @MaxLength(256)
  name?: string;

  @IsString()
  @MaxLength(256)
  link?: string;

  getSearchingProperties(): Record<string, unknown> {
    return {
      name: this.name,
      link: this.link,
    };
  }
}
