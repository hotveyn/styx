import { IsDefined, IsIn } from 'class-validator';

export class ChangeFailureDetectTypeDto {
  @IsIn(['socket', 'ping'])
  @IsDefined()
  value: 'socket' | 'ping';
}
