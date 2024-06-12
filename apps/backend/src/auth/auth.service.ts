import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ApiErrors } from '../errors/api-error';
import { JWTService } from './jwt.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JWTService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login: loginDto.credential,
          },
          {
            email: loginDto.credential,
          },
        ],
        isDeleted: null,
      },
    });

    if (!user) throw new HttpException(ApiErrors.user.auth, 401);

    const compareResult = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!compareResult) throw new HttpException(ApiErrors.user.auth, 401);

    const refreshTokenInDB = await this.prisma.refreshToken.create({
      data: {
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.userAccessTokenSign({
        id: user.id,
        organizationId: user.organizationId,
        name: user.name,
        refreshTokenId: refreshTokenInDB.id,
      }),
      this.jwtService.userRefreshTokenSign({
        id: user.id,
        organizationId: user.organizationId,
        name: user.name,
        refreshTokenId: refreshTokenInDB.id,
      }),
    ]);

    await this.prisma.refreshToken.update({
      where: {
        id: refreshTokenInDB.id,
      },
      data: {
        token: refreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(refreshTokenId: bigint) {
    if (
      !(await this.prisma.refreshToken.findUnique({
        where: {
          id: refreshTokenId,
        },
      }))
    )
      throw new HttpException("Refresh token doesn't exist in db", 409);

    return await this.prisma.refreshToken.delete({
      where: {
        id: refreshTokenId,
      },
    });
  }
}
