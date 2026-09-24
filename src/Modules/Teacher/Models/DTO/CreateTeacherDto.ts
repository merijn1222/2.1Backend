import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ example: 'teacher1' })
  username!: string;

  @ApiProperty({ example: 'temporary-password' })
  password!: string;

  @ApiProperty({ example: 'John Teacher' })
  name!: string;
}
