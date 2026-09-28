import { Injectable } from "@nestjs/common";
import type { IStudentRepository } from "./IStudent.repository.js";
import { PrismaService } from "../../../Database/Prisma/prisma.service.js";
import type { SetTeacherDto } from "../Model/DTO/SetTeacherDto.js";
import { Student } from "../Model/Student.js";

@Injectable()
export class PostStudentRepository implements IStudentRepository {
    constructor(private readonly prisma: PrismaService) { }
    getAllStudents(): Promise<Student[]> {
        return this.prisma.student.findMany({
            select: { id: true, name: true }
        });
    }

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

    async getStudentWithTeacher(studentId: string, teacherId: string): Promise<boolean> {
        const student = await this.prisma.student.findFirst({
            where: {
                id: studentId,
                teacherId: teacherId,
            },
            select: { id: true },
        });

        if (student) {
            return true;
        }
        return false;
    }
}