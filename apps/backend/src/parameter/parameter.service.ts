import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ChangeDeviceDecayTimeDto } from './dto/change-device-decay-time.dto';
import { GetParameterChangesDto } from './dto/get-parameter-changes.dto';
import { ChangeAccessTokenLifeTimeDto } from './dto/change-access-token-life-time.dto';
import { ChangeRefreshTokenLifeTimeDto } from './dto/change-refresh-token-life-time.dto';
import { ChangeSpeechCredentialsDto } from './dto/change-speech-credentials.dto';
import { ParameterCenter } from './parameter.center';
import { GetAllParametersDto } from './dto/get-all-parameters.dto';
import { ChangeDadataCredentialsDto } from './dto/change-dadata-credentials.dto';
import { ChangeTelegramBotTokenDto } from './dto/change-telegram-bot-token.dto';
import { ChangeTelegramBotNameDto } from './dto/change-telegram-bot-name.dto';
import { ChangeDeviceDetectIntervalDto } from './dto/change-device-detect-interval.dto';

@Injectable()
export class ParameterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly parameterCenter: ParameterCenter,
  ) {}

  async changeAccessTokenLifeTime(
    dto: ChangeAccessTokenLifeTimeDto,
    changerId: bigint,
  ) {
    return await this.parameterCenter.setAccessTokenLifeTime(
      dto.value,
      changerId,
    );
  }

  async changeRefreshTokenLifeTime(
    dto: ChangeRefreshTokenLifeTimeDto,
    changerId: bigint,
  ) {
    return await this.parameterCenter.setRefreshTokenLifeTime(
      dto.value,
      changerId,
    );
  }

  async changeSpeechCredentials(
    dto: ChangeSpeechCredentialsDto,
    changerId: bigint,
  ) {
    return await this.parameterCenter.setSpeechCredentials(
      dto.value,
      changerId,
    );
  }

  async changeDadataCredentials(
    dto: ChangeDadataCredentialsDto,
    changerId: bigint,
  ) {
    return await this.parameterCenter.setDadataCredentials(
      dto.value,
      changerId,
    );
  }

  async changeTelegramBotToken(
    dto: ChangeTelegramBotTokenDto,
    changerId: bigint,
  ) {
    return await this.parameterCenter.setTelegramBotToken(dto.value, changerId);
  }

  async changeTelegramBotName(
    dto: ChangeTelegramBotNameDto,
    changerId: bigint,
  ) {
    return await this.parameterCenter.setTelegramBotName(dto.value, changerId);
  }

  async changeDeviceDetectInterval(
    dto: ChangeDeviceDetectIntervalDto,
    changerId: bigint,
  ) {
    return await this.parameterCenter.setDeviceDetectInterval(
      dto.value,
      changerId,
    );
  }

  async getAll(dto: GetAllParametersDto) {
    const [parameters, count] = await this.prisma.$transaction([
      this.prisma.parameter.findMany({
        select: {
          name: true,
          code: true,
          description: true,
          value: true,
          parameterChanges: {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              was: true,
              became: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  login: true,
                },
              },
            },
          },
        },
        skip: dto.offset,
        take: dto.limit,
      }),
      this.prisma.parameter.count(),
    ]);

    return {
      count,
      data: parameters,
    };
  }

  async getParameterChanges(
    code: $Enums.ParameterCode,
    queries: GetParameterChangesDto,
  ) {
    const [data, count] = await this.prisma.$transaction([
      this.prisma.parameterChange.findMany({
        where: {
          parameter: {
            code,
          },
        },
        take: queries.limit,
        skip: queries.offset,
      }),
      this.prisma.parameterChange.count({
        where: {
          parameter: {
            code,
          },
        },
      }),
    ]);

    return {
      count,
      data,
    };
  }
}
