# Generic TypeORM Repository
This is a little convenience package that allows for abstracting away a lot of boilerplate by simplifying
the way in which you can create repositories for your [TypeORM](https://typeorm.io/) database entities in [NestJS](https://nestjs.com/).


## Install

Install with [npm](https://www.npmjs.com/):

```sh
npm install generic-typeorm-repository --save
```
Install with [yarn](https://yarnpkg.com/en/):

```sh
yarn add generic-typeorm-repository
```


## Available methods
- findOne
- findMany
- findManyAndCount
- create 
- createMany
- update
- updateMany
- rawQuery
- delete
- count

Is important to notice that this package has a direct dependency from typeorm, so most of the parameters
and return types of its methods are types exposed by typeorm.

## Use Case

The following example sums up the whole purpose of the package fairly well:

## Instead of doing this for each entity in your project
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityOne } from './entities';

@Injectable()
export class EntityOneRepository {
    public constructor(@InjectRepository(EntityOne) repository: Repository<EntityOne>) {}

    public async create(
        parameters // Your expected params
    ) {
        // Your logic
    }

    // And so on...
}
```

## You can simply use this package and end-up with
```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericRepository } from 'generic-typeorm-repository';
import { Repository } from 'typeorm';
import { EntityOne } from './entities';

@Injectable()
export class EntityOneRepository extends GenericRepository<EntityOne> {
    public constructor(@InjectRepository(EntityOne) repository: Repository<EntityOne>) {
        super(repository);
    }
    
    // Now you you have access to all the boilerplate methods defined on the GenericRepository
    // and you don't have to repeat yourself extensively each time you define a repository for your
    // entities.

    // If you happen to need extended or custom logic, you can simply override any of the methods available
    // on the GenericRepository (check the contents of the example directory for a more contextual example).
    override async findOne(options: FindOneOptions<EntityOne>): Promise<EntityOne> {
        // Your custom logic.
    }
}
```
## Collaborators

<!-- readme: collaborators -start -->
<!-- readme: collaborators -end -->