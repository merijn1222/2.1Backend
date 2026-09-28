import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Username for the account.',
    example: 'alice2252',
  })
  username!: string;

  @ApiProperty({
    type: String,
    required: true,
    format: 'password',
    writeOnly: true,
    description: 'Password for the account.',
    example: 'example-password',
  })
  password!: string;
}