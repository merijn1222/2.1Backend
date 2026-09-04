import { Injectable, Inject } from '@nestjs/common';
import { BOEK_REPO } from '../../Database/Interfaces/IBoek.repository.js';
import type { IBoekRepository } from '../../Database/Interfaces/IBoek.repository.js';

@Injectable()
export class BoekService {
  constructor (
    @Inject(BOEK_REPO)
    private readonly repo: IBoekRepository,
  ){}

  getBoeken(): string {
    return this.repo.getBoeken();
  }
}
