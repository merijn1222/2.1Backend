import { Injectable } from "@nestjs/common";
import { IBoekRepository } from "../Interfaces/IBoek.repository.js";

@Injectable()
export class LocalBoekRepository implements IBoekRepository {
	getBoeken(): string {
		return "Lokaal";
	}
}