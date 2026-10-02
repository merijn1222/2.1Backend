import { Controller, Get } from '@nestjs/common';
import { LiteratureService } from './Literature.service.js';
import { Literature, LiteratureDocument } from './Models/Literature.schema.js';
import { ApiErrorResponseDto } from '../ApiErrorResponseDto.js';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('/boek')
export class LiteratureController {
  constructor(private readonly literatureService: LiteratureService) {}

  @ApiOperation({ operationId: 'getLiterature' })
  @ApiOkResponse({ description: 'Literature retrieved', type: Literature, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
  @Get()
  async getLiterature(): Promise<LiteratureDocument[]> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return this.literatureService.getLiterature();
  }
}
