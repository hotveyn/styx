import { IsDefined, IsNumber, IsPositive } from 'class-validator';

export class ChangeRefreshTokenLifeTimeDto {
  @IsNumber()
  @IsPositive()
  @IsDefined()
  value: number;
}
