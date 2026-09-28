import { Module } from '@nestjs/common';
import { LiteratureController } from './Literature.controller.js';
import { LiteratureService } from './Literature.service.js';


@Module({
  imports: [],
  controllers: [LiteratureController],
  providers: [LiteratureService],
})
export class LiteratureModule {}
