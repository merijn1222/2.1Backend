import { Injectable } from "@nestjs/common";
import { IAuthRepository } from "../Interfaces/IAuth.repository.js";

@Injectable()
export class OnlineAuthRepository implements IAuthRepository {
    getUsers(): string {
        return "Online";
    }
}