import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'src/utils/dto/pagination.dto';

export class GetAllParametersDto extends IntersectionType(PaginationDto) {}
