import { Injectable } from "@nestjs/common";
import type { IStudentRepository } from "./IStudent.repository.js";
import { PrismaService } from "../../../Database/Prisma/prisma.service.js";
import type { SetTeacherDto } from "../Model/DTO/SetTeacherDto.js";
import { Student } from "../Model/Student.js";

@Injectable()
export class PostStudentRepository implements IStudentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async setTeacher(dto: SetTeacherDto): Promise<string> {
        const student = await this.prisma.student.update({
            where: { userId: dto.userId },
            data: { teacherId: dto.teacherId },
        });

        return student.id;
    }

    async getMyStudents(teacherId: string): Promise<Student[]> {
        return await this.prisma.student.findMany({
            select: { id: true, name: true },
            where: { teacherId: teacherId }
        })
    }
}