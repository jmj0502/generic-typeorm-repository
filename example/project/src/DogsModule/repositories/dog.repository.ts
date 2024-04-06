import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOneOptions, Repository, SaveOptions } from 'typeorm';
import { GenericRepository } from 'generic-typeorm-repository';
import { Dog } from '../entities/Dogs';

@Injectable()
export class DogsRepository extends GenericRepository<Dog> {
    public constructor( @InjectRepository(Dog) repository:  Repository<Dog>) {
        super(repository);
    }

    override async create(data: DeepPartial<Dog>, saveOptions?: SaveOptions): Promise<Dog> {
        console.log("Doggo data inserted! whoof! whoof!")
        // You can add any custom logic here. This is just a simple example
        // but you are not even required to call super.
        return await super.create(data, saveOptions);
    }

    override async findOne(options: FindOneOptions<Dog>): Promise<Dog> {
        // You can do the same thing here!
        const result = await this.repository.findOne(options);
        if (!result) {
            throw new NotFoundException("Dog not found :'v");
        }
        return result;
    }
}