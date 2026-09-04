import { Injectable } from "@nestjs/common";
import { IProfielRepository } from "../Interfaces/IProfiel.repository.js";

@Injectable()
export class LocalProfielRepository implements IProfielRepository {
    getProfielen(): string {
        return "Lokaal";
    }
}