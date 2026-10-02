import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './Auth.service.js';
import { UserDto } from './Models/DTO/UserDto.js';
import { AuthResponse } from './Models/Response/AuthResponse.js';
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from './Guards/Decorators/Public.Decorator.js';
import { LoginDto } from './Models/DTO/LoginDto.js';
import { ApiErrorResponseDto } from '../ApiErrorResponseDto.js';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({ operationId: 'registerStudent' })
  @ApiCreatedResponse({ description: 'Student account created', type: AuthResponse })
  @ApiConflictResponse({ description: 'Username is already in use', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected registration error', type: ApiErrorResponseDto })
  @Post("/register")
  CreateUser(@Body() dto: UserDto): Promise<AuthResponse> {
    return this.authService.createUser(dto);
  }

  @Public()
  @ApiOperation({ operationId: 'loginUser' })
  @ApiOkResponse({ description: 'Login successful', type: AuthResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid username or password', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected login error', type: ApiErrorResponseDto })
  @HttpCode(HttpStatus.OK)
  @Post("/login")
  Login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(dto)
  }
}
