import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ExtendedPrismaClient } from './prisma-extendet.client';

@Injectable()
export class PrismaService
  extends ExtendedPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  static getArrayScalarType(scalarType: Record<string, string>): Array<string> {
    return Object.entries(scalarType).map(([key]) => key);
  }

  static getPrismaSearchingProperties(
    rawSearchingProperties: Record<string, unknown>,
  ): Array<Record<string, { contains: unknown; mode: 'insensitive' }>> {
    const entries = Object.entries(rawSearchingProperties);
    const result = [];
    for (let i = 0; i < entries.length; i++) {
      if (entries[i][1]) {
        result.push(
          Object.fromEntries([
            [
              entries[i][0],
              {
                contains: entries[i][1],
                mode: 'insensitive',
              },
            ],
          ]),
        );
      }
    }
    return result;
  }

  static getPrismaFilterProperties(rawFilterProperties: string[]) {
    const entries = [];
    for (let i = 0; i < rawFilterProperties.length; i++) {
      if (rawFilterProperties[i]) {
        entries.push(
          Object.entries([rawFilterProperties[0], rawFilterProperties[0]]),
        );
      }
    }
    return entries;
  }
}
