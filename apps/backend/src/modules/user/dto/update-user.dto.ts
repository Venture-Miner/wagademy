import { UpdateUser } from '@wagademy/types';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto implements UpdateUser {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Matches(/^0x[0-9a-f]+$/i)
  walletAddress?: string;
}
