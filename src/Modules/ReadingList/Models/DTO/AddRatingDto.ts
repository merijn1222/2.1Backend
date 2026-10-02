import { ApiProperty } from '@nestjs/swagger';

export class AddRatingDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'MongoDB ObjectId of a literature item in the reading list.',
    pattern: '^[0-9a-fA-F]{24}$',
    example: '66f2a8c7e4b91d3a12ab45cd',
  })
  literatureId!: string;

  @ApiProperty({
    type: Number,
    required: true,
    minimum: 1,
    maximum: 5,
    description: 'Integer rating from 1 to 5.',
    example: 4,
  })
  rating!: number;

  @ApiProperty({
    type: Boolean,
    required: true,
    description: 'Whether the student has read the literature item.',
    example: true,
  })
  read!: boolean;
}