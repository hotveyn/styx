import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @MaxLength(80)
  @IsDefined()
  name: string;
}
