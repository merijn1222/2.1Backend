import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { AuthenticatedRequest } from './AuthenticatedRequest.js';
import { type IStudentRepository, STUDENT_REPO } from '../../Student/Repo/IStudent.repository.js';

@Injectable()
export class StudentAccessGuard implements CanActivate {
  constructor(
    @Inject(STUDENT_REPO)
    private readonly repo: IStudentRepository
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request =
      context.switchToHttp().getRequest<AuthenticatedRequest>();
    const { studentId } = request.params as { studentId?: string };
    const user = request.user;

    if (!studentId) {
      throw new ForbiddenException('StudentId niet meegekregen');
    }

    if (user.role === 'ADMIN') {
      return true;
    }

    if (user.role === 'STUDENT') {
      if (user.studentId === studentId) {
        return true;
      }
    }

    if (user.role === 'TEACHER') {
      const checkStudentOfTeacher = await this.repo.getStudentWithTeacher(studentId, user.teacherId!)
      if(checkStudentOfTeacher) {
        return true;
      }
    }
    
    throw new ForbiddenException(
      'Geen toegang tot dit materiaal',
    );
  }
}
