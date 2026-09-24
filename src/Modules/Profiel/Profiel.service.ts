import { Injectable, Inject } from '@nestjs/common';
import { PROFIEL_REPO } from './Repo/IProfiel.repository.js';
import type { IProfielRepository } from './Repo/IProfiel.repository.js';

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
