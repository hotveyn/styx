import { IsString, MaxLength } from 'class-validator';

export class CommentFailureDto {
  @IsString()
  @MaxLength(256)
  commment: string;
}
