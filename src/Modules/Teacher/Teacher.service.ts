import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { Prisma } from '../../Database/Prisma/Generated/client.js';
import { TEACHER_REPO } from './Repo/ITeacher.repository.js';
import type { ITeacherRepository } from './Repo/ITeacher.repository.js';
import type { Teacher } from './Models/Teacher.js';
import type { CreateTeacherDto } from './Models/DTO/CreateTeacherDto.js';

@Injectable()
export class TeacherService {
  constructor(
    @Inject(TEACHER_REPO)
    private readonly repo: ITeacherRepository,
  ) {}

  async getTeachers(): Promise<Teacher[]> {
    return await this.repo.getTeachers();
  }

  async getTeacherForStudent(studentId: string): Promise<Teacher> {
    let teacher: Teacher | null;

    try {
      teacher = await this.repo.getTeacherForStudent(studentId)
    } catch {
      throw new InternalServerErrorException('Er is een onverwachte fout opgetreden');
    }
    if (!teacher) {
      throw new NotFoundException('Student heeft nog geen leraar gekoppeld');
    }
    return teacher;
  }

  async createTeacher(dto: CreateTeacherDto): Promise<Teacher> {
    dto.password = await bcrypt.hash(dto.password, 12);

    try {
      return await this.repo.createTeacher(dto);
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username is al in gebruik');
      }

      throw new InternalServerErrorException('Er is een onverwachte fout opgetreden');
    }
  }
}
