import { IntersectionType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { getOrderDto } from '../../utils/dto/order.dto';
import { PaginationDto } from '../../utils/dto/pagination.dto';

export class GetParameterChangesDto extends IntersectionType(
  PaginationDto,
  getOrderDto(
    PrismaService.getArrayScalarType(Prisma.ParameterChangeScalarFieldEnum),
  ),
) {}
