import { UserDto } from "../Models/DTO/UserDto.js";
import { LoginResponse } from "../Models/Response/LoginResponse.js";
import { RegisterResponse } from "../Models/Response/RegisterResponse.js";

export const AUTH_REPO = Symbol('AUTH_REPOSITORY');

export interface IAuthRepository {

    createUser(dto: UserDto): Promise<RegisterResponse>;

    login(username: string): Promise<LoginResponse>;
}