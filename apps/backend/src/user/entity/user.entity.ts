import { Expose } from 'class-transformer';
import { Prisma } from '@prisma/client';

export class UserEntity {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() login: string;
  @Expose() code: string;
  @Expose() organizationId: string | null;
  @Expose() email: string | null;
  @Expose() additionalData: string | null;
  @Expose() isDeleted: Date | null;
  @Expose() organization: { name: string } | null;
  @Expose() createdAt: Date | null;

  constructor(
    partial: Partial<
      Omit<UserEntity, 'id' | 'organizationId' | 'additionalData'> & {
        id: number | bigint;
        organizationId: number | bigint | null | undefined;
        additionalData: Prisma.JsonValue | string | null;
      }
    >,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): UserEntity[] {
    return classes.map((user) => new UserEntity(user));
  }
}

export class UserEntityWithPagination {
  @Expose() count: string;
  @Expose() data: UserEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    this.count = String(partial.count);
    this.data = UserEntity.array(partial.data);
  }
}
