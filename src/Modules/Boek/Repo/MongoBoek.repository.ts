import { Injectable } from "@nestjs/common";
import { IBoekRepository } from "./IBoek.repository.js";

@Injectable()
export class MongoBoekRepository implements IBoekRepository {
    getBoeken(): string {
        return "Online";
    }
}