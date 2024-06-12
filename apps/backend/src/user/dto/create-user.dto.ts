import {
  IsDefined,
  IsEmail,
  IsJSON,
  IsNumberString,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(256)
  @IsDefined()
  name: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  login: string;

  @IsString()
  @MaxLength(256)
  @IsDefined()
  password: string;

  @IsNumberString()
  organizationId?: string;

  @MaxLength(256)
  @IsEmail()
  email: string;

  @MaxLength(3000)
  @IsJSON()
  additionalData?: string;
}
