import { HttpException, Injectable } from '@nestjs/common';
import { DadataClient } from './dadata.client';
import { ApiErrors } from 'src/errors/api-error';

@Injectable()
export class DadataService {
  constructor(private readonly dadataClient: DadataClient) {}
  async addressSuggest(query: string) {
    const { suggestions } = await this.dadataClient.suggest(query);
    if (Array.isArray(suggestions) && suggestions.length) {
      if (suggestions.length > 5) suggestions.length = 5;

      return suggestions.map((suggestion) => {
        return {
          value: suggestion.value,
          geo_lat: suggestion.data.geo_lat,
          geo_lon: suggestion.data.geo_lon,
        };
      });
    }

    throw new HttpException(ApiErrors.dadata.notFound.suggestion, 404);
  }
}
