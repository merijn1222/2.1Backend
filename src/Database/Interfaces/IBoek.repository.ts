export const BOEK_REPO = Symbol('BOEK_REPOSITORY');

export interface IBoekRepository {
    getBoeken(): string;
}