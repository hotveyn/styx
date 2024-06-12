import { $Enums, Prisma } from '@prisma/client';
import { Expose } from 'class-transformer';

export class SpeechEntity {
  @Expose() id: string;
  @Expose() fileName: string;
  @Expose() recognizedText: string;
  @Expose() apiResult: string;
  @Expose() createdAt: Date;
  @Expose() sampleRate: number;
  @Expose() recognizedDate: Date;
  @Expose() comment: string;
  @Expose() name: string;
  @Expose() status: $Enums.SpeechStatus;
  @Expose() compression: $Enums.SpeechCompression;

  constructor(
    params: Partial<
      Omit<SpeechEntity, 'id' | 'apiResult'> & {
        id: number | bigint | string;
        apiResult: Prisma.JsonValue;
      }
    >,
  ) {
    Object.assign(this, params);
  }

  static array(classes: any[]): SpeechEntity[] {
    return classes.map((user) => new SpeechEntity(user));
  }
}

export class SpeechEntityWithPagniation {
  @Expose() count: string;
  @Expose() data: SpeechEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = SpeechEntity.array(partial.data);
  }
}
