import { Controller, Get } from '@nestjs/common';
import { LiteratureService } from './Literature.service.js';
import { LiteratureDocument } from './Models/Literature.schema.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('/boek')
export class LiteratureController {
  constructor(private readonly literatureService: LiteratureService) {}

  @Get()
  getLiterature(): Promise<LiteratureDocument[]> {
    return this.literatureService.getLiterature();
  }
}
