import { IsDefined, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(0, 200)
  @IsDefined()
  credential: string;

  @IsString()
  @Length(0, 200)
  @IsDefined()
  password: string;
}
