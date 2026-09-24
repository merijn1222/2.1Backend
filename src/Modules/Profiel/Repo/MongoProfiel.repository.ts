import { Injectable } from "@nestjs/common";
import { IProfielRepository } from "./IProfiel.repository.js";

@Injectable()
export class MongoProfielRepository implements IProfielRepository {
    getProfielen(): string {
        return "Online";
    }
}