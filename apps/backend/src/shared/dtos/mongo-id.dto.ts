import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class MongoIdDto {
  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description: 'Hexadecimal MongoDB identifier.',
  })
  @IsMongoId()
  id: string;
}
