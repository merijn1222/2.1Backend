import { SetTeacherDto } from "../Model/DTO/SetTeacherDto.js";
import { Student } from "../Model/Student.js";

export const STUDENT_REPO = Symbol('STUDENT_REPOSITORY');

export interface IStudentRepository {
    setTeacher(dto: SetTeacherDto): Promise<string>
    getMyStudents(teacherId: string): Promise<Student[]>
    getStudentWithTeacher(studentId: string, teacherId: string): Promise<boolean>
    getAllStudents(): Promise<Student[]>
}