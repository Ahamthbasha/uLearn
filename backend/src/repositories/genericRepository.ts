import { Model, Document, SortOrder , PopulateOptions } from "mongoose";

type PopulateArg = PopulateOptions | PopulateOptions[] | string[];

export interface IGenericRepository<T extends Document> {
  create(payload: Partial<T>): Promise<T>;
  findOne(filter: object): Promise<T | null>;
  findById(id: string): Promise<T | null>;
  findAll(filter?: object, populate?: PopulateArg,sort?:Record<string,SortOrder>): Promise<T[] | null>;
  update(id: string, data: Partial<T>): Promise<T | null>;
  updateOne(filter: object, data: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
  findByIdWithPopulate(id:string,populate?:PopulateArg):Promise<T | null>

  paginate(
    filter: object,
    page: number,
    limit: number,
    sort?: Record<string, SortOrder>,
    populate?:PopulateArg
  ): Promise<{ data: T[]; total: number }>;
}

export class GenericRepository<T extends Document> implements IGenericRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(payload: Partial<T>): Promise<T> {
    return await this.model.create(payload);
  }

  async findOne(filter: object): Promise<T | null> {
    return await this.model.findOne(filter);
  }

  async findAll(
  filter: object = {},
  populate?: PopulateArg,
  sort: Record<string, SortOrder> = {}
): Promise<T[] | null> {
  let query = this.model.find(filter);

  if (populate) {
    query = query.populate(populate);
  }

  if (sort && Object.keys(sort).length > 0) {
    query = query.sort(sort);
  }

  return await query;
}


  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async updateOne(filter: object, data: Partial<T>): Promise<T | null> {
    const updatedDoc = await this.model.findOneAndUpdate(filter, data, {
      new: true,
      upsert: false,
    });

    if (!updatedDoc) {
      console.warn("No document found to update with filter:", filter);
    }

    return updatedDoc;
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async paginate(
  filter: object,
  page: number,
  limit: number,
  sort: Record<string, SortOrder> = { createdAt: -1 },
  populate?: PopulateArg
): Promise<{ data: T[]; total: number }> {
  const total = await this.model.countDocuments(filter);

  let query = this.model.find(filter).sort(sort);
  if (populate) {
    query = query.populate(populate); // ✅ Add this
  }

  const data = await query
    .skip((page - 1) * limit)
    .limit(limit);

  return { data, total };
}

  async findByIdWithPopulate(id: string, populate?: PopulateArg): Promise<T | null> {
  let query = this.model.findById(id);
  if (populate) {
    query = query.populate(populate);
  }
  return await query;
}

}
