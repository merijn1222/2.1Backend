import { Controller, Get } from '@nestjs/common';
import { ProfielService } from './Profiel.service.js';

@Controller('/profiel')
export class ProfielController {
  constructor(private readonly appService: ProfielService) {}

  @Get()
  getProfiel(): string {
    return this.appService.getProfielen();
  }
}
