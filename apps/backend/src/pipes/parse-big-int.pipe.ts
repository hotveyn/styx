import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseBigIntPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException(
        'Validation failed, value must be possible to convert to BigInt',
      );
    }
    try {
      const tValue = BigInt(value);
      if (tValue) return tValue;
    } catch (e) {
      throw new BadRequestException(
        'Validation failed, value must be possible to convert to BigInt',
      );
    }
  }
}
