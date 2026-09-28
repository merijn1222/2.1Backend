import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Username for the teacher account.',
    example: 'teacher1',
  })
  username!: string;

  @ApiProperty({
    type: String,
    required: true,
    format: 'password',
    writeOnly: true,
    description: 'Initial password for the teacher account.',
    example: 'example-password',
  })
  password!: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Display name for the teacher.',
    example: 'John Teacher',
  })
  name!: string;
}
