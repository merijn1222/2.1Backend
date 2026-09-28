import { ApiProperty } from '@nestjs/swagger';

export class ChangeLiteratureDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'MongoDB ObjectId of the literature item.',
    pattern: '^[0-9a-fA-F]{24}$',
    example: '66f2a8c7e4b91d3a12ab45cd',
  })
  literatureId!: string;
}
