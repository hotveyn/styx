import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class ChangeDeviceDecayTimeDto {
  @IsNumber()
  @IsPositive()
  @IsDefined()
  value: number;
}
