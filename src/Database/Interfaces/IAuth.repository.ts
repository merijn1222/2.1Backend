export const AUTH_REPO = Symbol('AUTH_REPOSITORY');

export interface IAuthRepository {
    getUsers(): string;
}