import { Module } from '@nestjs/common';
import { StudentController } from './Student.controller.js';
import { StudentService } from './Student.service.js';

@Module({
  imports: [],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
