import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';
import { FailureNotificationService } from './failure-notification.service';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guard';
import { GetNotificationsDto } from './dto/get-notifications.dto';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { ApiErrors, getApiErrorToOpenApiSchema } from 'src/errors/api-error';
import { FailureNotificationEntity } from './entities/failure-notification.entity';
import { LongFailureEntityWithPagination } from './entities/long-failure.entity';
import { ParseBigIntPipe } from 'src/pipes/parse-big-int.pipe';

@ApiTags('Failure Notification')
@UseGuards(UserAuthGuard)
@Controller('failure-notification')
export class FailureNotificationController {
  constructor(
    private readonly failureNotificationService: FailureNotificationService,
  ) {}

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.failure.notFound.id),
  )
  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.failureNotification.unique.id),
  )
  @Post('/:failureId')
  async check(
    @Param('failureId', ParseBigIntPipe) failureId: bigint,
    @JWTUser() user: ITokenUser,
  ) {
    return new FailureNotificationEntity(
      await this.failureNotificationService.checkNotification(
        failureId,
        BetterBigInt(user.id),
        BetterBigInt(user.organizationId),
      ),
    );
  }

  @Post('/')
  @HttpCode(204)
  async checkAllNotifications(@JWTUser() user: ITokenUser) {
    await this.failureNotificationService.checkAllNotifications(
      BetterBigInt(user.id),
      BetterBigInt(user.organizationId),
    );
  }

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.failure.notFound.id),
  )
  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.failureNotification.unique.id),
  )
  @Get('/')
  async getNotifications(
    @Query() dto: GetNotificationsDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new LongFailureEntityWithPagination(
      await this.failureNotificationService.getNotifications(
        dto,
        BetterBigInt(user.id),
        BetterBigInt(user.organizationId),
      ),
    );
  }
}
