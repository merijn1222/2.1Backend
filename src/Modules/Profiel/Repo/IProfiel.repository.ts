export const PROFIEL_REPO = Symbol('PROFIEL_REPOSITORY');

export interface IProfielRepository {
    getProfielen(): string;
}