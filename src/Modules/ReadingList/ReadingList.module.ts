import { Module } from '@nestjs/common';
import { ReadingListController } from './ReadingList.controller.js';
import { ReadingListService } from './ReadingList.service.js';

@Module({
  imports: [],
  controllers: [ReadingListController],
  providers: [ReadingListService],
})
export class ReadingListModule {}
