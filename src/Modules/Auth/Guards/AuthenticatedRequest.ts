import type { Request } from 'express';

export type AuthenticatedRequest = Request & {
  user: {
    sub: string;
    username: string;
    role: string;
    studentId: string | null;
    teacherId: string | null;
  };
};