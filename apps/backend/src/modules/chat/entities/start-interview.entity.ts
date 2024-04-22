import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreateInterviewChatResponse,
  JobApplicationStatusEnum,
} from '@wagademy/types';

export class StartJobInterviewEntity implements CreateInterviewChatResponse {
  @ApiProperty({ example: faker.database.mongodbObjectId() })
  id: string;

  @ApiProperty({
    example: [{ role: 'assistant', content: faker.lorem.paragraphs(5) }],
  })
  history: any;

  @ApiProperty({ example: faker.database.mongodbObjectId() })
  jobApplicationId: string;

  @ApiProperty({ example: faker.number.int() })
  maxPrompts: number;

  @ApiProperty({
    example: { applicationStatus: JobApplicationStatusEnum.INVITED },
  })
  jobApplication: { applicationStatus: JobApplicationStatusEnum };
}
