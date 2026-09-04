import { Injectable, Inject } from '@nestjs/common';
import { PROFIEL_REPO } from '../../Database/Interfaces/IProfiel.repository.js';
import type { IProfielRepository } from '../../Database/Interfaces/IProfiel.repository.js';

@Injectable()
export class ProfielService {
  constructor (
    @Inject(PROFIEL_REPO)
    private readonly repo: IProfielRepository,
  ){}

  getProfielen(): string {
    return this.repo.getProfielen();
  }
}
