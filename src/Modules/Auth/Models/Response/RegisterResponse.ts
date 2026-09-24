export interface RegisterResponse {
    username: string;
    id: string;
    role: string;
    studentId?: string | null;
    teacherId?: string | null;
}