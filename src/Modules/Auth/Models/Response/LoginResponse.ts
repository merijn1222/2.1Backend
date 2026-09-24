export interface LoginResponse {
    username: string;
    passwordHash: string;
    id: string;
    role: string;
    studentId?: string | null;
    teacherId?: string | null;
}