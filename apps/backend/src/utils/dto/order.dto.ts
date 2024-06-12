import { IsIn } from 'class-validator';

export function getOrderDto(fields: string[]) {
  class OrderDto {
    @IsIn(fields)
    orderBy?: string;

    @IsIn(['asc', 'desc'])
    orderDirection?: string = 'asc';
  }

  return OrderDto;
}
