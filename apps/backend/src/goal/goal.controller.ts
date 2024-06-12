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
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuerySearchGoalDto } from './dto/query-search-goal.dto';
import { GoalEntity, GoalEntityWithPagination } from './entity/goal.entity';
import { ParseBigIntPipe } from '../pipes/parse-big-int.pipe';
import { ApiErrors, getApiErrorToOpenApiSchema } from '../errors/api-error';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';

@ApiTags('Goal')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @ApiBadRequestResponse(getApiErrorToOpenApiSchema(ApiErrors.goal.unique.code))
  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.notFound.id),
  )
  @Post()
  async create(
    @Body() createGoalDto: CreateGoalDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new GoalEntity(
      await this.goalService.create(createGoalDto, user.organizationId),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.goal.notFound.id))
  @ApiBadRequestResponse(getApiErrorToOpenApiSchema(ApiErrors.goal.unique.code))
  @Patch(':id')
  async update(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() updateGoalDto: UpdateGoalDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new GoalEntity(
      await this.goalService.update(id, updateGoalDto, user.organizationId),
    );
  }

  @ApiNotFoundResponse(getApiErrorToOpenApiSchema(ApiErrors.goal.notFound.id))
  @Delete(':id')
  async remove(
    @Param('id', ParseBigIntPipe) id: bigint,
    @JWTUser() user: ITokenUser,
  ) {
    return new GoalEntity(
      await this.goalService.remove(id, user.organizationId),
    );
  }

  @Get('query')
  async querySearch(
    @Query() queries: QuerySearchGoalDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new GoalEntityWithPagination(
      await this.goalService.querySearch(queries, user.organizationId),
    );
  }
}
