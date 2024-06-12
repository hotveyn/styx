import { IntersectionType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';

export class UpdateApplicationDto extends IntersectionType(
  CreateApplicationDto,
) {}
