import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JWTService } from './jwt.service';
import { UserAuthGuard } from './guards/user-auth.guard';
import { UserIsAdminGuard } from './guards/user-is-admin.guard';

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JWTService,
    UserAuthGuard,
    UserIsAdminGuard,
  ],
  exports: [UserAuthGuard, JWTService, UserIsAdminGuard],
})
export class AuthModule {}
