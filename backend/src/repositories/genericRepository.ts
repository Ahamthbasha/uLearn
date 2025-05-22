import { Model,Document } from "mongoose";

export interface IGenericRepository <T extends Document>{
    create(payload : Partial<T>):Promise<T>
    findOne(filter:object):Promise<T|null>
}

export class GenericRepository <T extends Document> implements IGenericRepository<T>{
    private model:Model<T>

    constructor(model:Model<T>){
        this.model = model
    }

    async create(payload:Partial<T>):Promise<T>{
        return await this.model.create(payload)
    }

    async findOne(filter:object):Promise<T | null>{
        return await this.model.findOne(filter)
    }
}