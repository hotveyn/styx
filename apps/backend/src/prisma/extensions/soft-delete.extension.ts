import { Prisma } from '@prisma/client';
import { DateTime } from 'luxon';

export function useSoftDeleteExtension<TModel = any>() {
  return {
    name: 'softDelete',
    model: {
      $allModels: {
        async softDelete(
          this: TModel,
          where: Prisma.Args<TModel, 'update'>['where'],
        ): Promise<
          Prisma.Result<TModel, Prisma.Args<TModel, 'update'>, 'update'>
        > {
          // Get the current model at runtime
          const context = Prisma.getExtensionContext(this);

          return await (context as any).update({
            where,
            data: {
              isDeleted: DateTime.now().setZone('Europe/Moscow').toISO(),
            },
          });
        },
      },
    },
  };
}

export type SoftDelete<TModel> = ReturnType<
  typeof useSoftDeleteExtension<TModel>
>['model']['$allModels']['softDelete'];
