import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guard';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { NotificationService } from './notification.service';
import { NotificationEntity } from './entity/notification.entity';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { ApiErrors, getApiErrorToOpenApiSchema } from 'src/errors/api-error';
import { TelegramLinkEntity } from './entity/telegram-link.entity';

@ApiTags('Notification')
@UseGuards(UserAuthGuard)
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.notification.notFound.userId),
  )
  @Patch('')
  async updateNotifications(
    @Body() dto: UpdateNotificationsDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new NotificationEntity(
      await this.notificationService.updateNotifications(
        BetterBigInt(user.id),
        dto,
      ),
    );
  }

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.notification.notFound.userId),
  )
  @Get('')
  async getNotifications(@JWTUser() user: ITokenUser) {
    return new NotificationEntity(
      await this.notificationService.getNotifications(BetterBigInt(user.id)),
    );
  }

  @Get('telegram-link')
  async getTelegramLink(@JWTUser() user: ITokenUser) {
    return new TelegramLinkEntity(
      await this.notificationService.getTelegramLink(BetterBigInt(user.id)),
    );
  }
}
