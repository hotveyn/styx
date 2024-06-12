import { PrismaClient } from '@prisma/client';
import {
  type SoftDelete,
  useSoftDeleteExtension,
} from './extensions/soft-delete.extension';
import { DateTime } from 'luxon';

type ModelsWithExtensions = {
  [Model in keyof PrismaClient]: PrismaClient[Model] extends {
    findMany: (args) => Promise<any>;
  }
    ? {
        softDelete: SoftDelete<PrismaClient[Model]>;
      } & PrismaClient[Model]
    : PrismaClient[Model];
};

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return this.$extends(useSoftDeleteExtension()).$extends({
      name: 'local iso string',
      result: {
        $allModels: {
          createdAt: {
            // needs: { createdAt: never },
            compute(model) {
              if (
                !(model as unknown as { createdAt: Date | undefined }).createdAt
              )
                return undefined;

              const date = (
                model as unknown as { createdAt: Date | undefined }
              ).createdAt.toISOString();

              return DateTime.fromISO(date).toISO();
            },
          },
        },
      },
    }) as this;
  }
}

export const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0],
) => PrismaClient & ModelsWithExtensions;
