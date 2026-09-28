import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Username for the new account.',
    example: 'alice2252',
  })
  username!: string;

  @ApiProperty({
    type: String,
    required: true,
    format: 'password',
    writeOnly: true,
    description: 'Password for the new account.',
    example: 'example-password',
  })
  password!: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'Display name for the new account.',
    example: 'John de Mol',
  })
  name!: string;
}