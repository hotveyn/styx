import { IsDefined, IsString, Length } from 'class-validator';

export class AchieveGoalDto {
  @IsString()
  @Length(1, 200)
  @IsDefined()
  goalCode: string;

  @IsString()
  @Length(1, 200)
  @IsDefined()
  deviceCode: string;
}
