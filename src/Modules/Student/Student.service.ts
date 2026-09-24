import { Injectable, Inject, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STUDENT_REPO } from './Repo/IStudent.repository.js';
import type { IStudentRepository } from './Repo/IStudent.repository.js';
import { SetTeacherDto } from './Model/DTO/SetTeacherDto.js';
import { Prisma } from '../../Database/Prisma/Generated/client.js';
import { Student } from './Model/Student.js';

@Injectable()
export class StudentService {
  constructor (
    @Inject(STUDENT_REPO)
    private readonly repo: IStudentRepository,
  ){}

  async setTeacher(dto: SetTeacherDto): Promise<string> {
    try {
      return await this.repo.setTeacher(dto);
    } catch (error: unknown) {
      // Is denk ik niet mogelijk om Token te hebben en geen student object in db te hebben
      // Student rol wordt automatisch gegeven bij het aanmaken van account
      // if (
      //   error instanceof Prisma.PrismaClientKnownRequestError &&
      //   error.code === 'P2025'
      // ) {
      //   throw new NotFoundException('Student niet gevonden');
      // }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new NotFoundException('Leraar niet gevonden');
      }

      throw new InternalServerErrorException(
        'Er is een onverwachte fout opgetreden',
      );
    }
  }

  async getMyStudents(teacherId: string): Promise<Student[]> {
    return this.repo.getMyStudents(teacherId);
  }
}
