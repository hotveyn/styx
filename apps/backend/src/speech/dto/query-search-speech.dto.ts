import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { $Enums, Prisma } from '@prisma/client';
import { IsEnum, IsString, MaxLength } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';
import { DateRangeDto } from 'src/utils/dto/date-range.dto';
import { getOrderDto } from 'src/utils/dto/order.dto';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class QuerySearchSpeechDto extends IntersectionType(
  PaginationDto,
  getOrderDto(PrismaService.getArrayScalarType(Prisma.SpeechScalarFieldEnum)),
  DateRangeDto,
) {
  @IsString()
  @MaxLength(256)
  id?: string;

  @IsString()
  @MaxLength(256)
  fileName?: string;

  @IsString()
  @MaxLength(256)
  comment?: string;

  @IsString()
  @MaxLength(256)
  name?: string;

  @IsString()
  @MaxLength(256)
  text?: string;

  @ApiProperty({ enum: $Enums.SpeechStatus })
  @IsEnum($Enums.SpeechStatus)
  status?: $Enums.SpeechStatus;

  @ApiProperty({ enum: $Enums.SpeechCompression })
  @IsEnum($Enums.SpeechCompression)
  compression?: $Enums.SpeechCompression;

  getSearchingProperties(): Record<string, unknown> {
    return {
      fileName: this.fileName,
      text: this.text,
      comment: this.comment,
      name: this.name,
    };
  }
}
