import type { Teacher } from '../Models/Teacher.js';
import type { CreateTeacherDto } from '../Models/DTO/CreateTeacherDto.js';

export const TEACHER_REPO = Symbol('TEACHER_REPOSITORY');

export interface ITeacherRepository {
	getTeachers(): Promise<Teacher[]>;
	createTeacher(dto: CreateTeacherDto): Promise<Teacher>;
	getTeacherForStudent(userId: string): Promise<Teacher | null>;
}
