import { Expose } from 'class-transformer';

class OrganizationChildCounter {
  goals: number;
  users: number;
  devices: number;
}

export class OrganizationEntity {
  @Expose() id: string;
  @Expose() name: string;
  @Expose() _count: OrganizationChildCounter | undefined;
  @Expose() isDeleted: Date | null;
  @Expose() createdAt: Date | null;

  constructor(
    partial: Partial<Omit<OrganizationEntity, 'id'> & { id: number | bigint }>,
  ) {
    Object.assign(this, partial);
  }

  static array(classes: any[]): OrganizationEntity[] {
    return classes.map((user) => new OrganizationEntity(user));
  }
}

export class OrganizationEntityWithPagination {
  @Expose() count: string;
  @Expose() data: OrganizationEntity[];

  constructor(
    partial: Partial<{
      count: string | number;
      data: any;
    }>,
  ) {
    Object.assign(this, partial);
  }
}
