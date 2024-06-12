import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import {
  CameraEntity,
  CameraEntityWithPagination,
} from './entities/camera.entity';
import { ParseBigIntPipe } from 'src/pipes/parse-big-int.pipe';
import { QuerySearchCameraDto } from './dto/query-search-camera.dto';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrors, getApiErrorToOpenApiSchema } from 'src/errors/api-error';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guard';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';

@ApiTags('Camera')
@UseGuards(UserAuthGuard)
@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Get('query')
  async query(
    @Query() queries: QuerySearchCameraDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new CameraEntityWithPagination(
      await this.cameraService.query(queries, user.organizationId),
    );
  }

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.notFound.id),
  )
  @Post()
  async create(
    @Body() createCameraDto: CreateCameraDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new CameraEntity(
      await this.cameraService.create(createCameraDto, user.organizationId),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.camera.notFound.id))
  @Patch(':id')
  async update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateCameraDto: UpdateCameraDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new CameraEntity(
      await this.cameraService.update(id, updateCameraDto, user.organizationId),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.camera.notFound.id))
  @Delete(':id')
  async remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @JWTUser() user: ITokenUser,
  ) {
    return new CameraEntity(
      await this.cameraService.remove(id, user.organizationId),
    );
  }
}
