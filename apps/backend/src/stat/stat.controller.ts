import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatService } from './stat.service';
import { ApiTags } from '@nestjs/swagger';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';
import { BetterBigInt } from 'src/utils/big-int-or-undefined';
import { UserAuthGuard } from 'src/auth/guards/user-auth.guard';
import { MonitoringEntity } from './entities/monitoring.entity';
import { GetMonitoringDto } from './dto/get-monitoring.dto';
import { ActivityEntityWithPagination } from './entities/activity.entity';
import { GetActivityDto } from './dto/get-activity.dto';

@ApiTags('Stat')
@UseGuards(UserAuthGuard)
@Controller('stat')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @Get('monitoring')
  async getMonitoring(
    @JWTUser() user: ITokenUser,
    @Query() queries: GetMonitoringDto,
  ) {
    return new MonitoringEntity(
      await this.statService.getMonitoring(
        BetterBigInt(user.organizationId),
        queries,
      ),
    );
  }

  @Get('activity')
  async getActivity(
    @JWTUser() user: ITokenUser,
    @Query() queries: GetActivityDto,
  ) {
    return new ActivityEntityWithPagination(
      await this.statService.getActivity(
        queries,
        BetterBigInt(user.organizationId),
      ),
    );
  }
}
