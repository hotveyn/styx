import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiErrors, getApiErrorToOpenApiSchema } from '../errors/api-error';
import { UpdateApplicationDto } from './dto/update-application.dto';
import {
  ApplicationEntity,
  ApplicationEntityWithPagination,
} from './entity/application.entity';
import { QuerySearchApplicationDto } from './dto/query-search-application.dto';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { UserIsAdminGuard } from 'src/auth/guards/user-is-admin.guard';

@ApiBearerAuth()
@UseGuards(UserAuthGuard, UserIsAdminGuard)
@ApiTags('Applications')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get('query')
  async querySearch(@Query() queries: QuerySearchApplicationDto) {
    return new ApplicationEntityWithPagination(
      await this.applicationService.querySearch(queries),
    );
  }

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.application.notFound.name),
  )
  @ApiBody({
    schema: {
      type: 'object',
      required: ['app'],
      properties: {
        app: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post('/:name/upload')
  async upload(@Param('name') name: string, @Req() request: FastifyRequest) {
    const data = await request.file();

    return this.applicationService.upload(name, data);
  }

  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.application.unique.name),
  )
  @Post('')
  async create(@Body() dto: CreateApplicationDto) {
    return new ApplicationEntity(await this.applicationService.create(dto));
  }

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.application.notFound.name),
  )
  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.application.unique.name),
  )
  @Patch('/:name')
  async update(@Param('name') name: string, @Body() dto: UpdateApplicationDto) {
    return new ApplicationEntity(
      await this.applicationService.update(name, dto),
    );
  }

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.application.notFound.name),
  )
  @Delete('/:name')
  async delete(@Param('name') name: string) {
    return new ApplicationEntity(await this.applicationService.delete(name));
  }
}
