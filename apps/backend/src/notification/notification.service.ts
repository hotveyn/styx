import { HttpException, Injectable } from '@nestjs/common';
import { UpdateNotificationsDto } from './dto/update-notifications.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiErrors } from 'src/errors/api-error';
import { ParameterCenter } from 'src/parameter/parameter.center';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parameterCenter: ParameterCenter,
  ) {}

  async updateNotifications(userId: bigint, dto: UpdateNotificationsDto) {
    const sub = await this.prisma.notification.findUnique({
      where: {
        userId,
      },
    });

    if (!sub)
      throw new HttpException(ApiErrors.notification.notFound.userId, 404);

    return await this.prisma.notification.update({
      where: {
        userId,
      },
      data: dto,
    });
  }

  async getNotifications(userId: bigint) {
    const sub = await this.prisma.notification.findUnique({
      where: {
        userId,
      },
    });

    if (!sub)
      throw new HttpException(ApiErrors.notification.notFound.userId, 404);

    return sub;
  }

  async getTelegramLink(userId: bigint) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        code: true,
      },
    });

    return {
      link: `https://t.me/${this.parameterCenter.getTelegramBotName()}?start=${user.code}`,
    };
  }
}
