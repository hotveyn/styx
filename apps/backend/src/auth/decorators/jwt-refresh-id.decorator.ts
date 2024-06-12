import {
  ExecutionContext,
  HttpException,
  createParamDecorator,
} from '@nestjs/common';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';

export const JWTRefreshId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): bigint | undefined | null => {
    const request = ctx.switchToHttp().getRequest();
    const response = ctx.switchToHttp().getResponse();
    const refreshTokenId = BetterBigInt(request['refreshTokenId']);

    if (refreshTokenId == undefined) {
      response.session.delete();
      throw new HttpException("Refresh token id doesn't exist", 403);
    }
    return refreshTokenId;
  },
);
