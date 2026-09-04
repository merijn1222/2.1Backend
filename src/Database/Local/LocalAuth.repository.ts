import { Injectable } from "@nestjs/common";
import { IAuthRepository } from "../Interfaces/IAuth.repository.js";

@Injectable()
export class LocalAuthRepository implements IAuthRepository {
    getUsers(): string {
        return "Lokaal";
    }
}