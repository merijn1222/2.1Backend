import { Module } from '@nestjs/common';
import { BoekController } from './Boek.controller.js';
import { BoekService } from './Boek.service.js';

@Module({
  imports: [],
  controllers: [BoekController],
  providers: [BoekService],
})
export class BoekModule {}
