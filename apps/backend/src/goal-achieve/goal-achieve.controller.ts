import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GoalAchieveService } from './goal-achieve.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AchieveGoalDto } from './dto/achieve-goal.dto';
import { QuerySearchAchieveGoalDto } from './dto/query-search-achieve-goal.dto';
import { GetByGroupAchieveGoalDto } from './dto/get-by-group-achieve-goal.dto';
import { GoalAchieveEntity } from './entity/goal-achieve.entity';
import { GoalAchieveGroupEntityWithPagination } from './entity/goal-achieve-group.entity';
import { GoalAchieveQueryEntityWithPagination } from './entity/goal-achieve-query.entity';
import { ApiErrors, getApiErrorToOpenApiSchema } from '../errors/api-error';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { ByDayEntityWithPagination } from './entity/by-day.entity';
import { ByHourWithDevicesEntityWithPagination } from './entity/by-hour-with-devices.entity';
import { ByHourEntityWithPagination } from './entity/by-hour.entity';
import { ByDayWithDevicesEntityWithPagination } from './entity/by-day-with-devices.entity';
import { GetByDayDto } from './dto/get-by-day.dto';
import { GetByDayWithDevicesDto } from './dto/get-by-day-with-devices.dto';
import { GetByHourDto } from './dto/get-by-hour.dto';
import { GetByHourWithDevicesDto } from './dto/get-by-hour-with-devices.dto';
import { ByHourWithDeviceEntityWithPagination } from './entity/by-hour-with-device.entity';
import { ByDayWithDeviceEntityWithPagination } from './entity/by-day-with-device.entity';
import { GetByHourWithDeviceDto } from './dto/get-by-hour-with-device.dto';
import { GetByDayWithDeviceDto } from './dto/get-by-day-with-device.dto';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';

@ApiTags('Goal Achieve')
@ApiBearerAuth()
@Controller('goal-achieve')
export class GoalAchieveController {
  constructor(private readonly goalAchieveService: GoalAchieveService) {}

  @ApiNotFoundResponse(
    getApiErrorToOpenApiSchema(
      ApiErrors.goal.notFound.code,
      ApiErrors.device.notFound.code,
    ),
  )
  @ApiBadRequestResponse(
    getApiErrorToOpenApiSchema(ApiErrors.organization.forbidden),
  )
  @Post('')
  async achieveGoal(@Body() achieveGoalDto: AchieveGoalDto) {
    return new GoalAchieveEntity(
      await this.goalAchieveService.achieveGoal(achieveGoalDto),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('query')
  async querySearch(
    @Query() queries: QuerySearchAchieveGoalDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new GoalAchieveQueryEntityWithPagination(
      await this.goalAchieveService.querySearch(queries, user.organizationId),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('group')
  async getByGroupWithDevices(
    @Query() getByGroupAchieveGoalDto: GetByGroupAchieveGoalDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new GoalAchieveGroupEntityWithPagination(
      await this.goalAchieveService.getByGroup(
        getByGroupAchieveGoalDto,
        user.organizationId,
      ),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('group/day')
  async getByDay(
    @Query() getByDayDto: GetByDayDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new ByDayEntityWithPagination(
      await this.goalAchieveService.getByDay(getByDayDto, user.organizationId),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('group/day-with-devices')
  async getByDayWithDevices(
    @Query() getByDayWithDevicesDto: GetByDayWithDevicesDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new ByDayWithDevicesEntityWithPagination(
      await this.goalAchieveService.getByDayWithDevices(
        getByDayWithDevicesDto,
        user.organizationId,
      ),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('group/day-with-device')
  async getByDayWithDevice(
    @Query() getByDayWithDeviceDto: GetByDayWithDeviceDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new ByDayWithDeviceEntityWithPagination(
      await this.goalAchieveService.getByDayWithDevice(
        getByDayWithDeviceDto,
        user.organizationId,
      ),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('group/hour')
  async getByHour(
    @Query() getByHourDto: GetByHourDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new ByHourEntityWithPagination(
      await this.goalAchieveService.getByHour(
        getByHourDto,
        user.organizationId,
      ),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('group/hour-with-devices')
  async getByHourWithDevices(
    @Query() getByHourWithDevicesDto: GetByHourWithDevicesDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new ByHourWithDevicesEntityWithPagination(
      await this.goalAchieveService.getByHourWithDevices(
        getByHourWithDevicesDto,
        user.organizationId,
      ),
    );
  }

  @UseGuards(UserAuthGuard)
  @Get('group/hour-with-device')
  async getByHourWithDevice(
    @Query() getByHourWithDeviceDto: GetByHourWithDeviceDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new ByHourWithDeviceEntityWithPagination(
      await this.goalAchieveService.getByHourWithDevice(
        getByHourWithDeviceDto,
        user.organizationId,
      ),
    );
  }
}
