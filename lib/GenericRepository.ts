import { DecoratedEntity } from './DecoratedEntity';
import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

/**
 * @description This class is a generic repository that provides basic CRUD operations for a given entity to avoid boilerplate 
 * @param repository {Repository<T>} The entity that the repository will work with.
 */
export abstract class GenericRepository<T extends DecoratedEntity> {
    public constructor(protected readonly repository: Repository<T>) {}

    /**
     * @description Returns the entity manager for the repository.
     * @returns {EntityManager}
     */
    get manager(): EntityManager {
        return this.repository.manager;
    }


    /**
     * @description Finds first entity by a given find options. If entity was not found in the database - returns null.
     * @param options {FindOneOptions<T>}
     * @returns {Promise<T | null>}
     */
    public async findOne(options: FindOneOptions<T>): Promise<T | null> {
        return await this.repository.findOne(options);
    }



    /**
     * @description Finds entities that match given find options.
     * @param options {FindManyOptions<T>}
     * @returns {Promise<Array<T>>}
     */
    public async findMany(options: FindManyOptions<T>): Promise<Array<T>> {
        return await this.repository.find(options);
    }

    /**
     * @description Finds entities that match given find options and returns the count.
     * @param options {FindManyOptions<T>}
     * @returns {Promise<[Array<T>, number]>}
     */
    public async findManyAndCount(
        options: FindManyOptions<T>,
    ): Promise<[Array<T>, number]> {
        return await this.repository.findAndCount(options);
    }

    /**
     * @description Creates a new entity instance and saves it into the database.
     * @returns {Promise<[Array<T>, number]>}
     * @param data {DeepPartial<T>}
     * @param saveOptions {SaveOptions}
     */
    public async create(
        data: DeepPartial<T>,
        saveOptions: SaveOptions = {},
    ): Promise<T> {
      const baseRecord = this.repository.create(data);
      return await this.repository.save(baseRecord, saveOptions);
    }

    /**
     * @description Creates a new list of entity instances and saves them into the database.
     * @param data {Array<DeepPartial<T>>}
     * @param saveOptions {SaveOptions}
     * @returns {Promise<Array<T>>}
     */
    public async createMany(
        data: Array<DeepPartial<T>>,
        saveOptions: SaveOptions = {},
    ): Promise<Array<T>> {
        const records = this.repository.create(data);
        return await this.repository.save(records, saveOptions);
    }


    /**
     * @description Updates the given entity partially and saves it into the database.
     * @param data {DeepPartial<T>}
     * @param saveOptions {FindOneOptions<T>}
     * @returns {Promise<T>}
     */
    public async update(
        data: DeepPartial<T>,
        saveOptions: FindOneOptions<T> = {},
    ): Promise<T> {
        return await this.repository.save(data, saveOptions);
    }

    /**
     * @description Updates entities that match given find options partially and saves them into the database.
     * @param updateQuery {FindOptionsWhere<T>}
     * @param data {QueryDeepPartialEntity<T>}
     * @returns {Promise<UpdateResult>}
     */
    public async updateMany(
        updateQuery: FindOptionsWhere<T>,
        data: QueryDeepPartialEntity<T>,
    ): Promise<UpdateResult> {
        return await this.repository.update(updateQuery, data);
    }


    /**
     * @description Performs a raw SQL query and returns the result.
     * @param query {string}
     * @param parameters {any[]}
     * @returns {Promise<Array<any>>}
     */
    public async rawQuery(query: string, parameters: any[]): Promise<Array<any>> {
        return await this.repository.query(query, parameters);
    }

    /**
     * @description Soft-deletes the entity by a given options.
     * @param query {FindOptionsWhere<T>}
     * @returns {Promise<UpdateResult>}
     */
    public async delete(query: FindOptionsWhere<T>): Promise<UpdateResult> {
        return await this.repository.softDelete(query);
    }

    /**
     * @description Deletes the entity by a given options.
     * @param query {FindOptionsWhere<T>}
     * @returns {Promise<DeleteResult>}
     */
    public async hardDelete(query: FindOptionsWhere<T>): Promise<DeleteResult> {
        return await this.repository.delete(query);
    }

    /**
     * @description This method returns the count of entities that match the given options.
     * @param query {FindOptionsWhere<T>}
     * @returns {Promise<{ count: number }>}
     */
    public async count(options?: FindManyOptions<T>): Promise<{ count: number }> {
        const count: number = await this.repository.count(options);
        return { count };
    }
}

export default GenericRepository;