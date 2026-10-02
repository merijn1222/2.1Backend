import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TeacherService } from './Teacher.service.js';
import { Teacher } from './Models/Teacher.js';
import { Roles } from '../Auth/Guards/Decorators/Roles.Decorator.js';
import { RolesGuard } from '../Auth/Guards/Roles.Guard.js';
import { CreateTeacherDto } from './Models/DTO/CreateTeacherDto.js';
import type { AuthenticatedRequest } from '../Auth/Guards/AuthenticatedRequest.js';
import { ApiErrorResponseDto } from '../ApiErrorResponseDto.js';
import {
	ApiBearerAuth,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('/teacher')
export class TeacherController {
	constructor(private readonly teacherService: TeacherService) {}

	@ApiOperation({ operationId: 'getAllTeachers' })
	@ApiOkResponse({ description: 'Teachers retrieved', type: Teacher, isArray: true })
	@ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
	@ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
	@Get('/all')
	getTeachers(): Promise<Teacher[]> {
		return this.teacherService.getTeachers();
	}

	@ApiOperation({ operationId: 'createTeacher' })
	@ApiCreatedResponse({ description: 'Teacher account created', type: Teacher })
	@ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
	@ApiForbiddenResponse({ description: 'Admin role required', type: ApiErrorResponseDto })
	@ApiConflictResponse({ description: 'Username is already in use', type: ApiErrorResponseDto })
	@ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
	@Post()
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	createTeacher(@Body() dto: CreateTeacherDto): Promise<Teacher> {
		return this.teacherService.createTeacher(dto);
	}

	@ApiOperation({ operationId: 'getMyTeacher' })
	@ApiOkResponse({ description: 'Teacher retrieved', type: Teacher })
	@ApiUnauthorizedResponse({ description: 'Missing or invalid access token', type: ApiErrorResponseDto })
	@ApiForbiddenResponse({ description: 'Student role required', type: ApiErrorResponseDto })
	@ApiNotFoundResponse({ description: 'Student has no teacher assigned', type: ApiErrorResponseDto })
	@ApiInternalServerErrorResponse({ description: 'Unexpected server error', type: ApiErrorResponseDto })
	@Get('/my-teacher')
	@Roles('STUDENT')
	@UseGuards(RolesGuard)
	getTeacherForStudent(@Req() request: AuthenticatedRequest): Promise<Teacher> {
		return this.teacherService.getTeacherForStudent(request.user.studentId!);
	}
}
