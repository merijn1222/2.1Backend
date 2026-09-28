import { Module } from '@nestjs/common';
import { ReadingProfileController } from './ReadingProfile.controller.js';
import { ReadingProfileService } from './ReadingProfile.service.js';

@Module({
  imports: [],
  controllers: [ReadingProfileController],
  providers: [ReadingProfileService],
})
export class ReadingProfileModule {}
