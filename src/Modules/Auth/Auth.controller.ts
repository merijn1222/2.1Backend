import { Controller, Get } from '@nestjs/common';
import { AuthService } from './Auth.service.js';

@Controller('/auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getUsers();
  }
}
