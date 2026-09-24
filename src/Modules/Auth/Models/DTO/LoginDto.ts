import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({ example: "alice2252" })
  username!: string;

  @ApiProperty({ example: "secret-password" })
  password!: string;
}