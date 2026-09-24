import { Injectable } from '@nestjs/common';
import type { ITeacherRepository } from './ITeacher.repository.js';
import { PrismaService } from '../../../Database/Prisma/prisma.service.js';
import type { Teacher } from '../Models/Teacher.js';
import type { CreateTeacherDto } from '../Models/DTO/CreateTeacherDto.js';

@Injectable()
export class PostTeacherRepository implements ITeacherRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getTeachers(): Promise<Teacher[]> {
    return await this.prisma.teacher.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getTeacherForStudent(studentId: string): Promise<Teacher | null> {
    const teacher = await this.prisma.student.findUniqueOrThrow({
      where: {
        id: studentId,
      },
      select: {
        teacher: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    return teacher.teacher;
  }

  async createTeacher(dto: CreateTeacherDto): Promise<Teacher> {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username: dto.username.toLowerCase(),
          passwordHash: dto.password,
          role: 'TEACHER',
        },
        select: { id: true },
      });

      return await tx.teacher.create({
        data: {
          name: dto.name,
          userId: user.id,
        },
        select: {
          id: true,
          name: true,
        },
      });
    });
  }
}
