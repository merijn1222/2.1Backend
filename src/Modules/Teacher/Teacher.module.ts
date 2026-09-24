import { Module } from '@nestjs/common';
import { TeacherController } from './Teacher.controller.js';
import { TeacherService } from './Teacher.service.js';

@Module({
  imports: [],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
