import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LogInfoService } from './log-info.service';
import { GetByGroupDto } from './dto/get-by-group.dto';
import { SendLogDto } from '../log-error/dto/send-log.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteDto } from './dto/delete.dto';
import {
  LogInfoEntity,
  LogInfoEntityWithPagination,
} from './entities/log-info.entity';
import { LogInfoDeviceEntity } from './entities/log-info-device.entity';
import { LogInfoGroupEntityWithPagination } from './entities/log-info-group.entity';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';
import { QuerySearchLogInfoDto } from './dto/query-search-log-info.dto';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';

@ApiTags('Log Info')
@Controller('log-info')
export class LogInfoController {
  constructor(private readonly logInfoService: LogInfoService) {}

  @UseGuards(UserAuthGuard)
  @Get('query')
  async querySearch(
    @Query() queries: QuerySearchLogInfoDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new LogInfoEntityWithPagination(
      await this.logInfoService.querySearch(
        queries,
        BetterBigInt(user.organizationId),
      ),
    );
  }

  @Post('send-log')
  async sendLog(@Body() sendLogDto: SendLogDto) {
    return new LogInfoEntity(await this.logInfoService.sendLog(sendLogDto));
  }

  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @Get('group')
  async getByGroup(
    @Query() queries: GetByGroupDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new LogInfoGroupEntityWithPagination(
      await this.logInfoService.getByGroup(queries, user.organizationId),
    );
  }

  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @Get(':deviceCode')
  async getOne(
    @Param('deviceCode') deviceCode: string,
    @Query() queries: GetByGroupDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new LogInfoDeviceEntity(
      await this.logInfoService.getOne(
        deviceCode,
        queries,
        user.organizationId,
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @Delete('')
  delete(@Query() queries: DeleteDto, @JWTUser() user: ITokenUser) {
    return this.logInfoService.delete(queries, user.organizationId);
  }
}
