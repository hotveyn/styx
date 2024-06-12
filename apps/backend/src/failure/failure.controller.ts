import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FailureService } from './failure.service';
import {
  FailureEntity,
  FailureEntityWithPagination,
} from './entity/failure.entity';
import { QuerySearchFailureDto } from './dto/query-search-failure.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserAuthGuard } from '../auth/guards/user-auth.guard';
import { ParseBigIntPipe } from '../pipes/parse-big-int.pipe';
import { CommentFailureDto } from './dto/comment-failure.dto';
import { ITokenUser, JWTUser } from 'src/auth/decorators/jwt-user.decorator';

@ApiTags('Failure')
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@Controller('failure')
export class FailureController {
  constructor(private readonly failureService: FailureService) {}

  @Get('query')
  async querySearch(
    @Query() queries: QuerySearchFailureDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new FailureEntityWithPagination(
      await this.failureService.querySearch(queries, user.organizationId),
    );
  }

  @Patch('comment/:id')
  async commentDeviceFailure(
    @Param('id', ParseBigIntPipe) id: bigint,
    @Body() dto: CommentFailureDto,
    @JWTUser() user: ITokenUser,
  ) {
    return new FailureEntity(
      await this.failureService.commentDeviceFailure(
        id,
        dto,
        user.organizationId,
      ),
    );
  }
}
