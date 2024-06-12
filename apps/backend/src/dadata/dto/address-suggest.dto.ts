import { IsDefined, IsString, Length } from 'class-validator';

export class AddressSuggestDto {
  @IsString()
  @Length(1, 100)
  @IsDefined()
  query: string;
}
