import { ApiProperty } from '@nestjs/swagger';

export class Teacher {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}
