import { Injectable } from '@nestjs/common';
import { DogsRepository } from './DogsModule/repositories/dog.repository';


@Injectable()
export class AppService {
  public constructor(
    private readonly dogsRepository: DogsRepository
  ) {}

  async insertDog() {
    return await this.dogsRepository.create({name: 'fiddo', age: 3});
  }

  async findDogByName(name: string) {
    return await this.dogsRepository.findOne({
      where: {
        name
      }
    })
  }

  async getDogs() {
    return await this.dogsRepository.findMany({})
  }
}
