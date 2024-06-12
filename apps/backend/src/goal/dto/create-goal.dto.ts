import {
  IsDefined,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @MaxLength(256)
  @IsDefined()
  name: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  description: string;

  @IsNumberString()
  @IsDefined()
  organizationId: string;

  @IsString()
  @MaxLength(256)
  code?: string;
}
