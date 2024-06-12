import {
  Controller,
  Post,
  Req,
  UnsupportedMediaTypeException,
  UseGuards,
  Headers,
  UnprocessableEntityException,
  Get,
  Query,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { SpeechService } from './speech.service';
import {
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guard';
import { UserIsAdminGuard } from 'src/auth/guards/user-is-admin.guard';
import {
  SpeechEntity,
  SpeechEntityWithPagniation,
} from './entities/speech.entity';
import { QuerySearchSpeechDto } from './dto/query-search-speech.dto';
import { ParseBigIntPipe } from 'src/pipes/parse-big-int.pipe';
import { ApiErrors, getApiErrorToOpenApiSchema } from 'src/errors/api-error';
import { UpdateSpeechDto } from './dto/update-speech.dto';

@ApiTags('Speech')
@UseGuards(UserAuthGuard, UserIsAdminGuard)
@Controller('speech')
export class SpeechController {
  constructor(private readonly speechService: SpeechService) {}

  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  async recognize(
    @Req() request: FastifyRequest,
    @Headers('X-Wav-Type') xWavType: 'pcma' | 'pcmu',
    @Headers('X-Wav-Rate') xWavRate: string,
  ) {
    if (!(8000 <= +xWavRate && +xWavRate <= 70000))
      throw new UnprocessableEntityException(
        'Sampling rate(X-Wav-Rate) value expected between 8000Hz and 70000Hz ',
      );

    if (!['pcma', 'pcmu'].includes(xWavType))
      throw new UnsupportedMediaTypeException(
        'File type is different than expected. Expected: pcmu, pcma',
      );

    return new SpeechEntity(
      await this.speechService.recognize(await request.file(), {
        compressionType: xWavType,
        rate: +xWavRate,
      }),
    );
  }

  @Get('query')
  async querySearch(@Query() queries: QuerySearchSpeechDto) {
    return new SpeechEntityWithPagniation(
      await this.speechService.querySearch(queries),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.speech.notFound.id))
  @Delete(':id')
  async delete(@Param('id', ParseBigIntPipe) id: bigint) {
    return new SpeechEntity(await this.speechService.delete(id));
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.speech.notFound.id))
  @Patch(':id')
  async update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() dto: UpdateSpeechDto,
  ) {
    return new SpeechEntity(await this.speechService.update(id, dto));
  }
}
