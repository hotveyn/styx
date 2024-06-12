import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParameterService } from './parameter.service';
import { ChangeDeviceDecayTimeDto } from './dto/change-device-decay-time.dto';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ParameterEntity,
  ParameterEntityWithPagination,
} from './entity/parameter.entity';
import { GetParameterChangesDto } from './dto/get-parameter-changes.dto';
import { ParameterChangeEntityWithPagination } from './entity/parameter-change.entity';
import { UserIsAdminGuard } from 'src/auth/guards/user-is-admin.guard';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { ChangeAccessTokenLifeTimeDto } from './dto/change-access-token-life-time.dto';
import { ChangeRefreshTokenLifeTimeDto } from './dto/change-refresh-token-life-time.dto';
import { ChangeSpeechCredentialsDto } from './dto/change-speech-credentials.dto';
import { GetAllParametersDto } from './dto/get-all-parameters.dto';
import { $Enums } from '@prisma/client';
import { ChangeDadataCredentialsDto } from './dto/change-dadata-credentials.dto';
import { ChangeTelegramBotTokenDto } from './dto/change-telegram-bot-token.dto';
import { ChangeTelegramBotNameDto } from './dto/change-telegram-bot-name.dto';
import { ChangeFailureDetectTypeDto } from './dto/change-failure-detect-type.dto';
import { ChangeDeviceDetectIntervalDto } from './dto/change-device-detect-interval.dto';

@ApiTags('Parameter')
@ApiBearerAuth()
@UseGuards(UserAuthGuard, UserIsAdminGuard)
@Controller('parameter')
export class ParameterController {
  constructor(
    private readonly parameterService: ParameterService,
    @Inject(ParameterEntity)
    private readonly parameterEntity: typeof ParameterEntity,
    @Inject(ParameterChangeEntityWithPagination)
    private readonly parameterChangeEntityWithPagination: typeof ParameterChangeEntityWithPagination,
  ) {}

  @Patch('access-token-life')
  async changeAccessTokenLifeTime(
    @Body() dto: ChangeAccessTokenLifeTimeDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new this.parameterEntity(
      await this.parameterService.changeAccessTokenLifeTime(
        dto,
        BetterBigInt(user.id),
      ),
    );
  }

  @Patch('telegram-bot-token')
  async changeTelegramBotToken(
    @Body() dto: ChangeTelegramBotTokenDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new this.parameterEntity(
      await this.parameterService.changeTelegramBotToken(
        dto,
        BetterBigInt(user.id),
      ),
    );
  }

  @Patch('telegram-bot-name')
  async changeTelegramBotName(
    @Body() dto: ChangeTelegramBotNameDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new this.parameterEntity(
      await this.parameterService.changeTelegramBotName(
        dto,
        BetterBigInt(user.id),
      ),
    );
  }

  @Patch('device-detect-interval')
  async changeDeviceDetectInterval(
    @Body() dto: ChangeDeviceDetectIntervalDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new this.parameterEntity(
      await this.parameterService.changeDeviceDetectInterval(
        dto,
        BetterBigInt(user.id),
      ),
    );
  }

  @Patch('refresh-token-life')
  async changeRefreshTokenLifeTime(
    @Body() dto: ChangeRefreshTokenLifeTimeDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new this.parameterEntity(
      await this.parameterService.changeRefreshTokenLifeTime(
        dto,
        BetterBigInt(user.id),
      ),
    );
  }

  @Patch('speech-credentials')
  async changeSpeechCredentials(
    @Body() dto: ChangeSpeechCredentialsDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new this.parameterEntity(
      await this.parameterService.changeSpeechCredentials(
        dto,
        BetterBigInt(user.id),
      ),
    );
  }

  @Patch('dadata-credentials')
  async changeDadataCredentials(
    @Body() dto: ChangeDadataCredentialsDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new this.parameterEntity(
      await this.parameterService.changeDadataCredentials(
        dto,
        BetterBigInt(user.id),
      ),
    );
  }

  @Get('')
  async getAll(@Query() dto: GetAllParametersDto) {
    return new ParameterEntityWithPagination(
      await this.parameterService.getAll(dto),
    );
  }

  @Get('/:code/changes')
  async getParameterChanges(
    @Param('code') code: $Enums.ParameterCode,
    @Query() queries: GetParameterChangesDto,
  ) {
    if (!Object.keys($Enums.ParameterCode).includes(code))
      throw new HttpException(
        `Code must be one of this values: ${Object.keys($Enums.ParameterCode)}`,
        400,
      );

    return new this.parameterChangeEntityWithPagination(
      await this.parameterService.getParameterChanges(code, queries),
    );
  }
}
