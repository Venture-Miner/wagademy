import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { AccountTypeEnum, CreateUser } from '@wagademy/types';

export class CreateUserDto implements Omit<CreateUser, 'email' | 'idRefAuth'> {
  @ApiProperty({
    example: faker.internet.userName(),
    description: 'the name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: AccountTypeEnum.COMPANY,
    description: 'the account type',
    enum: AccountTypeEnum,
  })
  @IsEnum(AccountTypeEnum)
  accountType: AccountTypeEnum;
}
