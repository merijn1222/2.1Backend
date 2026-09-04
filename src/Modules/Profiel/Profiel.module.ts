import { Module } from '@nestjs/common';
import { ProfielController } from './Profiel.controller.js';
import { ProfielService } from './Profiel.service.js';

@Module({
  imports: [],
  controllers: [ProfielController],
  providers: [ProfielService],
})
export class ProfielModule {}
