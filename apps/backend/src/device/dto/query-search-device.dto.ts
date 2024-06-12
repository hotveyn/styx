import {
  IsBoolean,
  IsEnum,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { $Enums, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../utils/dto/pagination.dto';
import { getOrderDto } from '../../utils/dto/order.dto';
import { DateRangeDto } from '../../utils/dto/date-range.dto';

export class QuerySearchDeviceDto extends IntersectionType(
  PaginationDto,
  getOrderDto(PrismaService.getArrayScalarType(Prisma.DeviceScalarFieldEnum)),
  DateRangeDto,
) {
  @IsString()
  @MaxLength(18)
  id?: string;

  @IsString()
  @MaxLength(256)
  ip?: string;

  @IsString()
  @MaxLength(256)
  port?: string;

  @IsString()
  @MaxLength(256)
  name?: string;

  @IsString()
  @MaxLength(256)
  deviceType?: string;

  @IsString()
  @MaxLength(256)
  address?: string;

  @IsString()
  @MaxLength(256)
  geo?: string;

  @IsString()
  @MaxLength(256)
  softwareType?: string;

  @IsString()
  @MaxLength(256)
  softwareVersion?: string;

  @IsString()
  @MaxLength(256)
  sshParameters?: string;

  @IsString()
  @MaxLength(256)
  code?: string;

  @IsNumberString()
  @MaxLength(18)
  organizationId?: string;

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
  isAlive?: boolean;

  @ApiProperty({ enum: $Enums.DeviceStatus })
  @IsEnum($Enums.DeviceStatus)
  status?: $Enums.DeviceStatus;

  getSearchingProperties(): Record<string, unknown> {
    return {
      ip: this.ip,
      port: this.port,
      name: this.name,
      deviceType: this.deviceType,
      address: this.address,
      geo: this.geo,
      softwareType: this.softwareType,
      softwareVersion: this.softwareVersion,
      sshParameters: this.sshParameters,
      code: this.code,
    };
  }
}
