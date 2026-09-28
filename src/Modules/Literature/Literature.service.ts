import { Injectable, Inject } from '@nestjs/common';
import { LITERATURE_REPO } from './Repo/ILiterature.repository.js';
import type { ILiteratureRepository } from './Repo/ILiterature.repository.js';
import type { LiteratureDocument } from './Models/Literature.schema.js';

@Injectable()
export class LiteratureService {
  constructor (
    @Inject(LITERATURE_REPO)
    private readonly repo: ILiteratureRepository,
  ){}

  async getLiterature(): Promise<LiteratureDocument[]> {
    return await this.repo.getLiterature();
  }
}
