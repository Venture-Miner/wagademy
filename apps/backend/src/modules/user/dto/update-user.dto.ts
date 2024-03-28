import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateUser } from '@wagademy/types';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateUserDto implements UpdateUser {
  @ApiProperty({
    example: faker.internet.userName(),
    description: 'the name of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: faker.finance.ethereumAddress(),
    description: 'the wallet of the user',
    required: false,
  })
  @IsOptional()
  @Matches(/^0x[0-9a-f]+$/i)
  walletAddress?: string;
}
