import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReadingListService } from './ReadingList.service.js';
import type { ReadingListDocument } from './Models/ReadingList.schema.js';
import { StudentAccessGuard } from '../Auth/Guards/StudentAccess.Guard.js';
import { ChangeLiteratureDto } from './Models/DTO/ChangeLiteratureDto.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('/readinglist')
export class ReadingListController {
  constructor(private readonly readingListService: ReadingListService) {}

  @Get(':studentId')
  @UseGuards(StudentAccessGuard)
  getReadingList(
    @Param('studentId', new ParseUUIDPipe({ version: '4' })) 
    studentId: string,
  ): Promise<ReadingListDocument> {
    return this.readingListService.getReadingList(studentId);
  }

  @Post(':studentId/items')
  @UseGuards(StudentAccessGuard)
  addLiterature(
    @Param('studentId', new ParseUUIDPipe({ version: '4' }))
    studentId: string,
    @Body() dto: ChangeLiteratureDto,
  ): Promise<ReadingListDocument> {
    return this.readingListService.addLiterature(
      studentId,
      dto.literatureId,
    );
  }

  @Delete(':studentId/items')
  @UseGuards(StudentAccessGuard)
  removeLiterature(
    @Param('studentId', new ParseUUIDPipe({ version: '4' }))
    studentId: string,
    @Body() dto: ChangeLiteratureDto,
  ): Promise<ReadingListDocument> {
    return this.readingListService.removeLiterature(
      studentId,
      dto.literatureId
    )
  }
}
