import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSquadDto {
  @ApiProperty({
    example: 'name example',
    description: 'name of the squad',
  })
  @IsString()
  name: string;
}
