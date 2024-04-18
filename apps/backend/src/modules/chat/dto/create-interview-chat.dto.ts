import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CreateInterviewChat } from '@wagademy/types';
import { IsMongoId } from 'class-validator';

export class CreateInterviewChatDto implements CreateInterviewChat {
  @ApiProperty({
    example: faker.database.mongodbObjectId(),
    description:
      'the ID of the job application which the user is going to start the interview',
  })
  @IsMongoId()
  jobApplicationId: string;
}
