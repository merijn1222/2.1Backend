import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReadingListService } from './ReadingList.service.js';
import { ReadingList, type ReadingListDocument } from './Models/ReadingList.schema.js';
import { StudentAccessGuard } from '../Auth/Guards/StudentAccess.Guard.js';
import { ChangeLiteratureDto } from './Models/DTO/ChangeLiteratureDto.js';
import { ApiErrorResponseDto } from '../ApiErrorResponseDto.js';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../Auth/Guards/Roles.Guard.js';
import { Roles } from '../Auth/Guards/Decorators/Roles.Decorator.js';
import type { AuthenticatedRequest } from '../Auth/Guards/AuthenticatedRequest.js';
import { AddRatingDto } from './Models/DTO/AddRatingDto.js';

@ApiBearerAuth('access-token')
@Controller('/readinglist')
export class ReadingListController {
  constructor(private readonly readingListService: ReadingListService) {}

  @ApiOperation({ operationId: 'getReadingList' })
  @ApiOkResponse({ description: 'Reading list retrieved', type: ReadingList })
  @ApiBadRequestResponse({ description: 'Student ID must be a UUID', type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'No access to this student reading list', type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ description: 'Reading list not found', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
  @Get(':studentId')
  @UseGuards(StudentAccessGuard)
  getReadingList(
    @Param('studentId', new ParseUUIDPipe({ version: '4' })) 
    studentId: string,
  ): Promise<ReadingListDocument> {
    return this.readingListService.getReadingList(studentId);
  }

  @ApiOperation({ operationId: 'addLiteratureToReadingList' })
  @ApiCreatedResponse({ description: 'Literature added to reading list', type: ReadingList })
  @ApiBadRequestResponse({ description: 'Invalid student ID or literature ID', type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'No access to this student reading list', type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ description: 'Reading list or literature not found', type: ApiErrorResponseDto })
  @ApiConflictResponse({ description: 'Literature is already in the reading list', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
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

  @ApiOperation({ operationId: 'addRatingToLiterature' })
  @ApiCreatedResponse({ description: 'Rating added to literature', type: ReadingList })
  @ApiBadRequestResponse({ description: 'Invalid literature ID, rating, or read value', type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'Student ID missing from access token', type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ description: 'Reading list or literature item not found', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
  @Post()
  @UseGuards(RolesGuard)
  @Roles('STUDENT')
  addRatingToLiterature(
    @Req() request: AuthenticatedRequest,
    @Body() dto: AddRatingDto,
  ): Promise<ReadingListDocument> {
    return this.readingListService.addRating(request.user.studentId, dto);
  }

  @ApiOperation({ operationId: 'removeLiteratureFromReadingList' })
  @ApiOkResponse({ description: 'Literature removed from reading list', type: ReadingList })
  @ApiBadRequestResponse({ description: 'Invalid student ID or literature ID', type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'No access to this student reading list', type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ description: 'Reading list or literature not found', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
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
