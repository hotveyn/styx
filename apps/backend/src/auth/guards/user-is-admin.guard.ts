import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class UserIsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();

    return Boolean(req['user'] && !req['user'].organizationId);
  }
}
