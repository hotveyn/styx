import { Expose } from 'class-transformer';

export class SuggestionEntity {
  @Expose() value: string;
  @Expose() geo_lat: string;
  @Expose() geo_lon: string;

  constructor(partial: Partial<SuggestionEntity>) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): SuggestionEntity[] {
    return classes.map((user) => new SuggestionEntity(user));
  }
}
