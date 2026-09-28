import { Controller, Post, Req, ParseUUIDPipe, UseGuards, Get, Param, } from '@nestjs/common';
import { StudentService } from './Student.service.js';
import type { SetTeacherDto } from './Model/DTO/SetTeacherDto.js';
import type { AuthenticatedRequest } from '../Auth/Guards/AuthenticatedRequest.js';
import { Roles } from '../Auth/Guards/Decorators/Roles.Decorator.js';
import { RolesGuard } from '../Auth/Guards/Roles.Guard.js';
import { Student } from './Model/Student.js';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('/my-students')
  @Roles('TEACHER')
  @UseGuards(RolesGuard)
  getMyStudents(@Req() request: AuthenticatedRequest): Promise<Student[]> {
    return this.studentService.getMyStudents(request.user.teacherId!)
  }

  @Get('/all')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  getAllStudents(): Promise<Student[]> {
    return this.studentService.getAllStudents();
  }

  @Post('/setteacher/:teacherid')
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
