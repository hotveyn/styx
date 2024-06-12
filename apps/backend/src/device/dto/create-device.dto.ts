import {
  IsDefined,
  IsEnum,
  IsIP,
  IsJSON,
  IsNumberString,
  IsPort,
  IsString,
  MaxLength,
} from 'class-validator';
import { $Enums } from '@prisma/client';

export class CreateDeviceDto {
  @IsIP(4)
  @IsDefined()
  ip: string;

  @IsPort()
  @IsDefined()
  port: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  name: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  deviceType: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  address: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  geo: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  softwareType: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  softwareVersion: string;

  @IsEnum($Enums.DeviceStatus)
  @IsDefined()
  status: $Enums.DeviceStatus;

  @IsNumberString()
  organizationId?: string;

  @IsString()
  @MaxLength(2000)
  sshParameters?: string;

  @IsString()
  @MaxLength(256)
  code?: string;

  @IsJSON()
  @MaxLength(3000)
  additionalData?: string;
}
