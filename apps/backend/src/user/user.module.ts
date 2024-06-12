import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity, UserEntityWithPagination } from './entity/user.entity';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    { provide: UserEntity, useFactory: () => UserEntity },
    {
      provide: UserEntityWithPagination,
      useFactory: () => UserEntityWithPagination,
    },
  ],
})
export class UserModule {}
