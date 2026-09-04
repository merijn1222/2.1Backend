import { Controller, Get } from '@nestjs/common';
import { BoekService } from './Boek.service.js';

@Controller('/boek')
export class BoekController {
  constructor(private readonly boekService: BoekService) {}

  @Get()
  getHello(): string {
    return this.boekService.getBoeken();
  }
}
