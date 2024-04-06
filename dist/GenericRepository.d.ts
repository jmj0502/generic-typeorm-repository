import { DecoratedEntity } from './DecoratedEntity';
import { DeepPartial, EntityManager, FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, SaveOptions, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export declare abstract class GenericRepository<T extends DecoratedEntity> {
    protected readonly repository: Repository<T>;
    constructor(repository: Repository<T>);
    get manager(): EntityManager;
    findOne(options: FindOneOptions<T>): Promise<T | null>;
    findMany(options: FindManyOptions<T>): Promise<Array<T>>;
    findManyAndCount(options: FindManyOptions<T>): Promise<[Array<T>, number]>;
    create(data: DeepPartial<T>, saveOptions?: SaveOptions): Promise<T>;
    createMany(data: Array<DeepPartial<T>>, saveOptions?: SaveOptions): Promise<Array<T>>;
    update(data: DeepPartial<T>, saveOptions?: FindOneOptions<T>): Promise<T>;
    updateMany(updateQuery: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<UpdateResult>;
    rawQuery(query: string, parameters: any[]): Promise<Array<any>>;
    delete(query: FindOptionsWhere<T>): Promise<UpdateResult>;
    count(options?: FindManyOptions<T>): Promise<{
        count: number;
    }>;
}
export default GenericRepository;
