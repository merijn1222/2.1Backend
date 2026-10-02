import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorResponseDto {
  @ApiProperty({ description: 'HTTP status code' })
  statusCode!: number;

  @ApiProperty({ description: 'Human-readable error message' })
  message!: string;

  @ApiProperty({ description: 'HTTP error name' })
  error!: string;
}