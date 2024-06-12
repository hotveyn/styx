import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateGoalDto } from './create-goal.dto';

export class UpdateGoalDto extends PartialType(
  OmitType(CreateGoalDto, ['organizationId'] as const),
) {}
