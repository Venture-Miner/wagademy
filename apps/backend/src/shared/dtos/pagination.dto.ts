import { faker } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

const MAX_TAKE_LIMIT = 50;

export class PaginationDto {
  @ApiProperty({
    example: faker.number.int(),
    description: 'Number of documents to skip. Use this for pagination.',
    required: false,
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @IsOptional()
  skip?: number;

  @ApiProperty({
    example: faker.number.int(),
    description: `Maximum number of documents to take. Limited to ${MAX_TAKE_LIMIT}.`,
    required: false,
  })
  @Transform(({ value }) => {
    if (value > MAX_TAKE_LIMIT) value = MAX_TAKE_LIMIT;
    return value;
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  @IsOptional()
  take?: number = MAX_TAKE_LIMIT;
}
