import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuerySearchDeviceDto } from './dto/query-search-device.dto';
import {
  DeviceEntity,
  DeviceEntityWithPagination,
} from './entity/device.entity';
import { ParseBigIntPipe } from '../pipes/parse-big-int.pipe';
import { ApiErrors, getApiErrorToOpenApiSchema } from '../errors/api-error';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';

@ApiTags('Device')
@ApiBearerAuth()
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @HttpCode(201)
  @Patch('ping/:code')
  ping(@Param('code') code: string) {
    return this.deviceService.ping(code);
  }

  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.device.unique.code),
  )
  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.notFound.id),
  )
  @Post()
  @UseGuards(UserAuthGuard)
  async create(
    @Body() createDeviceDto: CreateDeviceDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new DeviceEntity(
      await this.deviceService.create(createDeviceDto, user.organizationId),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('query')
  async querySearch(
    @Query() queries: QuerySearchDeviceDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new DeviceEntityWithPagination(
      await this.deviceService.querySearch(queries, user.organizationId),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.device.notFound.id))
  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.device.unique.code),
  )
  @UseGuards(UserAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateDeviceDto: UpdateDeviceDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new DeviceEntity(
      await this.deviceService.update(id, updateDeviceDto, user.organizationId),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.device.notFound.id))
  @UseGuards(UserAuthGuard)
  @Get(':code')
  async getByCode(@Param('code') code: string, @JWTUser() user: ITokenUser) {
    return new DeviceEntity(
      await this.deviceService.getByCode(code, user.organizationId),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.device.notFound.id))
  @UseGuards(UserAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @JWTUser() user: ITokenUser,
  ) {
    return new DeviceEntity(
      await this.deviceService.remove(id, user.organizationId),
    );
  }
}
