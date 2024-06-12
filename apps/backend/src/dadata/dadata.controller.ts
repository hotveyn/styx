import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { DadataService } from './dadata.service';
import { AddressSuggestDto } from './dto/address-suggest.dto';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guard';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors, getApiErrorToOpenApiSchema } from 'src/errors/api-error';
import { SuggestionEntity } from './entity/suggestion.entity';

@ApiTags('Dadata')
@UseGuards(UserAuthGuard)
@Controller('dadata')
export class DadataController {
  constructor(private readonly dadataService: DadataService) {}

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.dadata.notFound.suggestion),
  )
  @Get('')
  async addressSuggest(@Query() { query }: AddressSuggestDto) {
    return SuggestionEntity.array(
      await this.dadataService.addressSuggest(query),
    );
  }
}
