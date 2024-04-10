import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { GetChatHistory } from '@wagademy/types';
import { IsMongoId } from 'class-validator';

export class GetChatHistoryDto implements GetChatHistory {
  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description:
      'the ID of the job application which the user is retrieving chat history',
  })
  @IsMongoId()
  jobApplicationId: string;
}
