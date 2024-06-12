import { IsString, MaxLength } from 'class-validator';

export class UpdateSpeechDto {
  @IsString()
  @MaxLength(256)
  comment?: string;

  @IsString()
  @MaxLength(256)
  name?: string;
}
