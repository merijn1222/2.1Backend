import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './Auth.service.js';
import { UserDto } from './Models/DTO/UserDto.js';
import { AuthResponse } from './Models/Response/AuthResponse.js';
import { Public } from './Guards/Decorators/Public.Decorator.js';
import { LoginDto } from './Models/DTO/LoginDto.js';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("/register")
  CreateUser(@Body() dto: UserDto): Promise<AuthResponse> {
    return this.authService.createUser(dto);
  }

  @Public()
  @Post("/login")
  Login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(dto)
  }
}
