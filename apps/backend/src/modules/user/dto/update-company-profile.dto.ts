import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCompanyProfileDto } from './create-company-profile.dto';
import { IsOptional } from 'class-validator';

export class UpdateCompanyProfileDto extends PartialType(
  CreateCompanyProfileDto
) {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'company background photo as FormData',
    required: false,
  })
  @IsOptional()
  backgroundPhoto?: Express.Multer.File[];
}
