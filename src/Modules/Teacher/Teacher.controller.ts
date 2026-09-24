import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TeacherService } from './Teacher.service.js';
import type { Teacher } from './Models/Teacher.js';
import { Roles } from '../Auth/Guards/Decorators/Roles.Decorator.js';
import { RolesGuard } from '../Auth/Guards/Roles.Guard.js';
import { CreateTeacherDto } from './Models/DTO/CreateTeacherDto.js';
import type { AuthenticatedRequest } from '../Auth/Guards/AuthenticatedRequest.js';

@Controller('/teacher')
export class TeacherController {
	constructor(private readonly teacherService: TeacherService) {}

	@Get('/all')
	getTeachers(): Promise<Teacher[]> {
		return this.teacherService.getTeachers();
	}

	@Post()
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	createTeacher(@Body() dto: CreateTeacherDto): Promise<Teacher> {
		return this.teacherService.createTeacher(dto);
	}

	@Get('/my-teacher')
	@Roles('STUDENT')
	@UseGuards(RolesGuard)
	getTeacherForStudent(@Req() request: AuthenticatedRequest): Promise<Teacher> {
		return this.teacherService.getTeacherForStudent(request.user.studentId!);
	}
}
