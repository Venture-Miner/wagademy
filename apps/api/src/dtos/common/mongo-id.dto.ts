import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class MongoIdDto {
  @ApiProperty({
    example: '63360929b8ffe78317399ec7',
    description: 'hexadecimal mongo identifier',
  })
  @IsMongoId()
  id: string;
}
