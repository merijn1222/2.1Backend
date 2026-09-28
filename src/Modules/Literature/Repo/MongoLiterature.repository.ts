import { Injectable } from "@nestjs/common";
import { ILiteratureRepository } from "./ILiterature.repository.js";
import { InjectModel } from "@nestjs/mongoose";
import { Literature, LiteratureDocument } from "../Models/Literature.schema.js";
import { Model } from "mongoose";

@Injectable()
export class MongoLiteratureRepository implements ILiteratureRepository {
    constructor(
        @InjectModel(Literature.name)
        private readonly literatureModel: Model<LiteratureDocument>,
    ) {}

    async getLiterature(): Promise<LiteratureDocument[]> {
        return await this.literatureModel.find().exec();
    }
}