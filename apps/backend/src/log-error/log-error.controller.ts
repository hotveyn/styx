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
import { LogErrorService } from './log-error.service';
import { GetByGroupDto } from '../log-info/dto/get-by-group.dto';
import { ApiBearerAuth, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { SendLogDto } from './dto/send-log.dto';
import { DeleteDto } from '../log-info/dto/delete.dto';
import { ApiErrors, getApiErrorToOpenApiSchema } from '../errors/api-error';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';
import {
  LogErrorEntity,
  LogErrorEntityWithPagination,
} from './entities/log-error.entity';
import { LogErrorGroupEntityWithPagination } from './entities/log-error-group.entity';
import { LogErrorDeviceEntity } from './entities/log-error-device.entity';
import { QuerySearchLogErrorDto } from './dto/query-search-log-error.dto';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';

@ApiTags('Log Error')
@Controller('log-error')
export class LogErrorController {
  constructor(private readonly logErrorService: LogErrorService) {}

  @UseGuards(UserAuthGuard)
  @Get('query')
  async querySearch(
    @Query() queries: QuerySearchLogErrorDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new LogErrorEntityWithPagination(
      await this.logErrorService.querySearch(
        queries,
        BetterBigInt(user.organizationId),
      ),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.device.notFound.id))
  @Post('send-log')
  async sendLog(@Body() sendLogDto: SendLogDto) {
    return new LogErrorEntity(await this.logErrorService.sendLog(sendLogDto));
  }

  @ApiBearerAuth()
  @UseGuards(UserAuthGuard)
  @Get('by-group')
  async getByGroup(
    @Query() queries: GetByGroupDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new LogErrorGroupEntityWithPagination(
      await this.logErrorService.getByGroup(queries, user.organizationId),
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
    return new LogErrorDeviceEntity(
      await this.logErrorService.getOne(
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
    return this.logErrorService.delete(queries, user.organizationId);
  }
}
