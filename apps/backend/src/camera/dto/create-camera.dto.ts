import {
  IsDefined,
  IsNumberString,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateCameraDto {
  @IsDefined()
  @IsString()
  @MaxLength(256)
  name: string;

  @IsDefined()
  @IsUrl()
  @MaxLength(256)
  link: string;

  @IsNumberString()
  @MaxLength(256)
  organizationId?: string;
}
