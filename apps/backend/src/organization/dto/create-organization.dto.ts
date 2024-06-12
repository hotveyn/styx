import { IsDefined, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @MaxLength(256)
  @IsDefined()
  name: string;
}
