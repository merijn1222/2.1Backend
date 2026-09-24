import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({ example: "alice2252" })
  username!: string;

  @ApiProperty({ example: "secret-password" })
  password!: string;

  @ApiProperty({ example: "John de Mol"})
  name!: string;
}