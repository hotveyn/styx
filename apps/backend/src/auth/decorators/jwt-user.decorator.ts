import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface ITokenUser {
  id: number | string;
  organizationId: number | string;
  name: string;
  refreshTokenId: number | string;
}

export const JWTUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): ITokenUser => {
    const request = ctx.switchToHttp().getRequest();
    const user: ITokenUser = request.user;

    return user;
  },
);
