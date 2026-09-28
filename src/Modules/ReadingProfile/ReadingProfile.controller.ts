import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReadingProfileService } from './ReadingProfile.service.js';
import { RolesGuard } from '../Auth/Guards/Roles.Guard.js';
import { Roles } from '../Auth/Guards/Decorators/Roles.Decorator.js';
import type { AuthenticatedRequest } from '../Auth/Guards/AuthenticatedRequest.js';
import type { ReadingProfileDocument } from './Models/ReadingProfile.schema.js';
import { UpsertReadingProfileDto } from './Models/DTO/UpsertReadingProfileDto.js';
import { StudentAccessGuard } from '../Auth/Guards/StudentAccess.Guard.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('/profiel')
export class ReadingProfileController {
  constructor(private readonly readingService: ReadingProfileService) {}

  @Get(':studentId')
  @UseGuards(StudentAccessGuard)
  getProfile(
    @Param('studentId', new ParseUUIDPipe({ version: '4' })) studentId: string,
  ): Promise<ReadingProfileDocument> {
    return this.readingService.getProfile(studentId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('STUDENT')
  upsertReadingProfile(
    @Req() request: AuthenticatedRequest,
    @Body() profile: UpsertReadingProfileDto,
  ): Promise<ReadingProfileDocument> {
    return this.readingService.upsertReadingProfile(
      request.user.studentId!,
      profile,
    );
  }
}
