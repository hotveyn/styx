import { IsDefined, IsJSON, IsRFC3339, IsString } from 'class-validator';

export class SendLogDto {
  @IsString()
  @IsDefined()
  deviceCode: string;

  @IsJSON()
  @IsDefined()
  body: string;

  @IsRFC3339()
  @IsDefined()
  requestTime: string;
}
