import {
  Body,
  Controller,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiErrors, getApiErrorToOpenApiSchema } from '../errors/api-error';
import * as secureSession from '@fastify/secure-session';
import { UserAuthGuard } from './guards/user-auth.guard';
import { JWTRefreshId } from './decorators/jwt-refresh-id.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiUnauthorizedResponse(getApiErrorToOpenApiSchema(ApiErrors.user.auth))
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Session() session: secureSession.Session,
  ) {
    const result = await this.authService.login(loginDto);

    session.set('refresh-token' as unknown as never, result.refreshToken as unknown as never);
    return { accessToken: result.accessToken };
  }

  @UseGuards(UserAuthGuard)
  @HttpCode(204)
  @Post('logout')
  async logout(
    @Session() session: secureSession.Session,
    @JWTRefreshId() refreshTokenId: bigint,
  ) {
    await this.authService.logout(refreshTokenId);
    session.delete();
  }
}
