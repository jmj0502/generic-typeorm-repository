import { DecoratedEntity } from './DecoratedEntity';
import {
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class GenericRepository<T extends DecoratedEntity> {
    public constructor(protected readonly repository: Repository<T>) {}

    get manager(): EntityManager {
        return this.repository.manager;
    }

    public async findOne(options: FindOneOptions<T>): Promise<T | null> {
        return await this.repository.findOne(options);
    }

    public async findMany(options: FindManyOptions<T>): Promise<Array<T>> {
        return await this.repository.find(options);
    }

    public async findManyAndCount(
        options: FindManyOptions<T>,
    ): Promise<[Array<T>, number]> {
        return await this.repository.findAndCount(options);
    }

    public async create(
        data: DeepPartial<T>,
        saveOptions: SaveOptions = {},
    ): Promise<T> {
      const baseRecord = this.repository.create(data);
      return await this.repository.save(baseRecord, saveOptions);
    }

    public async createMany(
        data: Array<DeepPartial<T>>,
        saveOptions: SaveOptions = {},
    ): Promise<Array<T>> {
        const records = this.repository.create(data);
        return await this.repository.save(records, saveOptions);
    }

    public async update(
        data: DeepPartial<T>,
        saveOptions: FindOneOptions<T> = {},
    ): Promise<T> {
        return await this.repository.save(data, saveOptions);
    }

    public async updateMany(
        updateQuery: FindOptionsWhere<T>,
        data: QueryDeepPartialEntity<T>,
    ): Promise<UpdateResult> {
        return await this.repository.update(updateQuery, data);
    }

    public async rawQuery(query: string, parameters: any[]): Promise<Array<any>> {
        return await this.repository.query(query, parameters);
    }

    public async delete(query: FindOptionsWhere<T>): Promise<UpdateResult> {
        return await this.repository.softDelete(query);
    }

    public async count(options?: FindManyOptions<T>): Promise<{ count: number }> {
        const count: number = await this.repository.count(options);
        return { count };
    }
}

export default GenericRepository;