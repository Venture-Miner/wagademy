import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { AccountTypeEnum } from '@wagademy/types';

export class CreateUserDto {
  @ApiProperty({
    example: faker.internet.userName(),
    description: 'The name of the user.',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: AccountTypeEnum.COMPANY,
    description: 'The account type.',
    enum: AccountTypeEnum,
  })
  @IsEnum(AccountTypeEnum)
  accountType: AccountTypeEnum;
}
