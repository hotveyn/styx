import { IsDefined, IsNumber, IsPositive, Max } from 'class-validator';

export class ChangeDeviceDetectIntervalDto {
  @IsNumber()
  @IsPositive()
  @Max(2147483646)
  @IsDefined()
  value: number;
}
