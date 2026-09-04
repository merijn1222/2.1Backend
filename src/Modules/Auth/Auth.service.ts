import { Injectable, Inject } from '@nestjs/common';
import { AUTH_REPO } from '../../Database/Interfaces/IAuth.repository.js';
import type { IAuthRepository } from '../../Database/Interfaces/IAuth.repository.js';

@Injectable()
export class AuthService {
  constructor (
    @Inject(AUTH_REPO)
    private readonly repo: IAuthRepository,
  ){}

  getUsers(): string {
    return this.repo.getUsers();
  }
}
