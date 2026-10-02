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
import { ReadingProfile, type ReadingProfileDocument } from './Models/ReadingProfile.schema.js';
import { UpsertReadingProfileDto } from './Models/DTO/UpsertReadingProfileDto.js';
import { StudentAccessGuard } from '../Auth/Guards/StudentAccess.Guard.js';
import { ApiErrorResponseDto } from '../ApiErrorResponseDto.js';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('/profiel')
export class ReadingProfileController {
  constructor(private readonly readingService: ReadingProfileService) {}

  @ApiOperation({ operationId: 'getReadingProfile' })
  @ApiOkResponse({ description: 'Reading profile retrieved', type: ReadingProfile })
  @ApiBadRequestResponse({ description: 'Student ID must be a UUID', type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'No access to this student profile', type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ description: 'Reading profile not found', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
  @Get(':studentId')
  @UseGuards(StudentAccessGuard)
  getProfile(
    @Param('studentId', new ParseUUIDPipe({ version: '4' })) studentId: string,
  ): Promise<ReadingProfileDocument> {
    return this.readingService.getProfile(studentId);
  }

  @ApiOperation({ operationId: 'upsertReadingProfile' })
  @ApiCreatedResponse({ description: 'Reading profile created or updated', type: ReadingProfile })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'Student role required', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
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
