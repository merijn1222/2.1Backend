import { Controller, Post, Req, ParseUUIDPipe, UseGuards, Get, Param, } from '@nestjs/common';
import { StudentService } from './Student.service.js';
import type { SetTeacherDto } from './Model/DTO/SetTeacherDto.js';
import type { AuthenticatedRequest } from '../Auth/Guards/AuthenticatedRequest.js';
import { Roles } from '../Auth/Guards/Decorators/Roles.Decorator.js';
import { RolesGuard } from '../Auth/Guards/Roles.Guard.js';
import { Student } from './Model/Student.js';
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
@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ operationId: 'getMyStudents' })
  @ApiOkResponse({ description: 'Students retrieved', type: Student, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'Teacher role required', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
  @Get('/my-students')
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  getMyStudents(@Req() request: AuthenticatedRequest): Promise<Student[]> {
    return this.studentService.getMyStudents(request.user.teacherId!)
  }

  @ApiOperation({ operationId: 'getAllStudents' })
  @ApiOkResponse({ description: 'Students retrieved', type: Student, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'Admin role required', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
  @Get('/all')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @ApiOperation({ operationId: 'assignTeacherToStudent' })
  @ApiCreatedResponse({ description: 'Teacher assigned to student', type: String })
  @ApiBadRequestResponse({ description: 'Teacher ID must be a UUID', type: ApiErrorResponseDto })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
  @ApiForbiddenResponse({ description: 'Student role required', type: ApiErrorResponseDto })
  @ApiNotFoundResponse({ description: 'Teacher not found', type: ApiErrorResponseDto })
  @ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
  @Post('/setteacher/:teacherId')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  setTeacher(
    @Req() request: AuthenticatedRequest,
    @Param('teacherId', new ParseUUIDPipe({ version: '4' })) 
    teacherId: string,
  ): Promise<string> {
    const dto: SetTeacherDto = {
      userId: request.user.sub,
      teacherId,
    };

    return this.studentService.setTeacher(dto);
  }
}
