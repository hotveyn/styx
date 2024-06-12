import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class ChangeAccessTokenLifeTimeDto {
  @IsNumber()
  @IsPositive()
  @IsDefined()
  value: number;
}
