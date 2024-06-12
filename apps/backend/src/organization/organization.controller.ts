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
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuerySearchOrganizationDto } from './dto/query-search-organization.dto';
import {
  OrganizationEntity,
  OrganizationEntityWithPagination,
} from './enity/organization.entity';
import { ParseBigIntPipe } from '../pipes/parse-big-int.pipe';
import { ApiErrors, getApiErrorToOpenApiSchema } from '../errors/api-error';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { UserIsAdminGuard } from 'src/auth/guards/user-is-admin.guard';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';

@ApiTags('Organization')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.unique.name),
  )
  @UseGuards(UserIsAdminGuard)
  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return new OrganizationEntity(
      await this.organizationService.create(createOrganizationDto),
    );
  }

  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.unique.name),
  )
  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.notFound.id),
  )
  @Patch(':id')
  async update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new OrganizationEntity(
      await this.organizationService.update(
        id,
        updateOrganizationDto,
        user.organizationId,
      ),
    );
  }

  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(
      ApiErrors.organization.delete.users,
      ApiErrors.organization.delete.devices,
      ApiErrors.organization.delete.goals,
    ),
  )
  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.notFound.id),
  )
  @UseGuards(UserIsAdminGuard)
  @Delete(':id')
  async remove(@Param('id', ParseBigIntPipe) id: bigint) {
    return new OrganizationEntity(await this.organizationService.remove(id));
  }

  @Get('query')
  async querySearch(
    @Query() queries: QuerySearchOrganizationDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new OrganizationEntityWithPagination(
      await this.organizationService.querySearch(queries, user.organizationId),
    );
  }
}
