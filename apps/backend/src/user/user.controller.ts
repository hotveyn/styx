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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuerySearchUserDto } from './dto/query-search-user.dto';
import { ParseBigIntPipe } from '../pipes/parse-big-int.pipe';
import { ApiErrors, getApiErrorToOpenApiSchema } from '../errors/api-error';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';
import { UserEntity, UserEntityWithPagination } from './entity/user.entity';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(
      ApiErrors.user.unique.login,
      ApiErrors.user.unique.email,
    ),
  )
  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.notFound.id),
  )
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new UserEntity(
      await this.userService.create(createUserDto, user.organizationId),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.user.notFound.id))
  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(
      ApiErrors.user.unique.login,
      ApiErrors.user.unique.email,
    ),
  )
  @Patch(':id')
  async update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateUserDto: UpdateUserDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new UserEntity(
      await this.userService.update(id, updateUserDto, user.organizationId),
    );
  }

  @ApiBadRequestResponse(getApiErrorToOpenApiSchema(ApiErrors.user.selfDelete))
  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.user.notFound.id))
  @Delete(':id')
  async remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @JWTUser() user: ITokenUser,
  ) {
    return new UserEntity(
      await this.userService.remove(id, user.id, user.organizationId),
    );
  }

  @Get('query')
  async querySearch(
    @Query() queries: QuerySearchUserDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new UserEntityWithPagination(
      await this.userService.querySearch(queries, user.organizationId),
    );
  }

  @Get('profile')
  async getProfile(@JWTUser() user: ITokenUser) {
    return new UserEntity(await this.userService.getProfile(user.id));
  }
}
