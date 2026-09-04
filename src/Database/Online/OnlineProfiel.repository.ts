import { Injectable } from "@nestjs/common";
import { IProfielRepository } from "../Interfaces/IProfiel.repository.js";

@Injectable()
export class OnlineProfielRepository implements IProfielRepository {
    getProfielen(): string {
        return "Online";
    }
}