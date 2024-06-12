import { Injectable } from '@nestjs/common';
import * as jose from 'jose';
import { ParameterCenter } from 'src/parameter/parameter.center';

@Injectable()
export class JWTService {
  secret: Uint8Array = new TextEncoder().encode(process.env.AUTH_SECRET);

  constructor(private readonly parameterCenter: ParameterCenter) {}

  async userAccessTokenSign(payload: {
    id: number | bigint;
    organizationId: number | undefined | bigint;
    name: string;
    refreshTokenId: number | bigint;
  }) {
    return await new jose.SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setIssuer('styx')
      .setAudience('user-access')
      .setExpirationTime(`${this.parameterCenter.getAccessTokenLifeTime()}min`)
      .sign(this.secret);
  }

  async userAccessTokenVerify(jwt) {
    const { payload } = await jose.jwtVerify<{
      id: number | bigint;
      organizationId: number | undefined | bigint;
      name: string;
      refreshTokenId: number | bigint;
    }>(jwt, this.secret, {
      issuer: 'styx',
      audience: 'user-access',
    });

    return payload;
  }

  async userRefreshTokenSign(payload: {
    id: number | bigint;
    organizationId: number | undefined | bigint;
    name: string;
    refreshTokenId: number | bigint;
  }) {
    return await new jose.SignJWT({ ...payload, type: 'refresh' })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setIssuer('styx')
      .setAudience('user-refresh')
      .setExpirationTime(
        `${this.parameterCenter.getRefreshTokenLifeTime()}days`,
      )
      .sign(this.secret);
  }

  async userRefreshTokenVerify(jwt) {
    const { payload } = await jose.jwtVerify<{
      id: number | string;
      organizationId: number | undefined | string;
      name: string;
      refreshTokenId: number | string;
    }>(jwt, this.secret, {
      issuer: 'styx',
      audience: 'user-refresh',
    });

    return payload;
  }
}
