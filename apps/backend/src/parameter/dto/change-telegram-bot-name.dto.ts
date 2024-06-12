import { IsDefined, IsString, Length } from 'class-validator';

export class ChangeTelegramBotNameDto {
  @IsString()
  @Length(0, 200)
  @IsDefined()
  value: string;
}
