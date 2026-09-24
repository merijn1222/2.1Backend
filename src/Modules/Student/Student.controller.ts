import { Body, Controller, Post, Req, ParseUUIDPipe, UseGuards, Get, } from '@nestjs/common';
import { StudentService } from './Student.service.js';
import type { SetTeacherDto } from './Model/DTO/SetTeacherDto.js';
import type { AuthenticatedRequest } from '../Auth/Guards/AuthenticatedRequest.js';
import { Roles } from '../Auth/Guards/Decorators/Roles.Decorator.js';
import { RolesGuard } from '../Auth/Guards/Roles.Guard.js';
import { Student } from './Model/Student.js';

@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/my-students')
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  getMyStudents(@Req() request: AuthenticatedRequest): Promise<Student[]> {
    return this.studentService.getMyStudents(request.user.teacherId!)
  }

  @Post('/setteacher')
  @Roles('STUDENT')
  @UseGuards(RolesGuard)
  setTeacher(
    @Req() request: AuthenticatedRequest,
    @Body('teacherId', new ParseUUIDPipe({ version: '4'})) teacherId: string,
  ): Promise<string> {
    const dto: SetTeacherDto = {
      userId: request.user.sub,
      teacherId,
    };

    return this.studentService.setTeacher(dto);
  }
}
