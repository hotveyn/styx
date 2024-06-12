import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JWTService } from '../jwt.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JWTPayload } from 'jose';
import { PrismaService } from '../../prisma/prisma.service';
import { BetterBigInt } from '../../utils/big-int-or-undefined';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JWTService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const rep = context.switchToHttp().getResponse<FastifyReply>();

    const checkResult =
      (await this.checkAccessToken(req)) ||
      (await this.checkRefreshToken(req, rep));

    if (!checkResult) {
      throw new UnauthorizedException();
    }

    return checkResult;
  }

  async checkAccessToken(req: FastifyRequest): Promise<boolean> {
    if (!req.headers.authorization) return false;

    const token = req.headers.authorization.split(' ')[1];

    if (!token) return false;
    let payload: JWTPayload;
    try {
      payload = await this.jwtService.userAccessTokenVerify(token);
    } catch (e) {
      return false;
    }

    req['user'] = {
      organizationId:
        payload.organizationId === null ? undefined : payload.organizationId,
      id: payload.id,
      name: payload.name,
    };
    req['refreshTokenId'] = payload.refreshTokenId;

    return true;
  }

  async checkRefreshToken(
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<boolean> {
    const token = req.session.get('refresh-token');

    if (!token) return false;

    let payload: {
      id: string | number;
      organizationId: string | number;
      name: string;
      refreshTokenId: string | number;
    } & JWTPayload;

    try {
      payload = await this.jwtService.userRefreshTokenVerify(token);
    } catch (e) {
      return false;
    }

    const refreshToken = await this.prisma.refreshToken.findFirst({
      where: {
        id: BetterBigInt(payload.refreshTokenId),
      },
    });

    if (!refreshToken) return false;

    rep.header(
      'x-new-access-token',
      await this.jwtService.userAccessTokenSign({
        id: payload.id as number,
        organizationId: payload.organizationId as number,
        name: payload.name as string,
        refreshTokenId: BetterBigInt(payload.refreshTokenId),
      }),
    );

    req['user'] = {
      organizationId:
        payload.organizationId === null ? undefined : payload.organizationId,
      id: payload.id,
      name: payload.name,
    };
    req['refreshTokenId'] = payload.refreshTokenId;

    return true;
  }
}
