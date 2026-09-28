import type { LiteratureDocument } from '../Models/Literature.schema.js';

export const LITERATURE_REPO = Symbol('BOEK_REPOSITORY');

export interface ILiteratureRepository {
    getLiterature(): Promise<LiteratureDocument[]>;
}