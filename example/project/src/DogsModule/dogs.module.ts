import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsRepository } from './repositories/dog.repository';
import { Dog } from './entities/Dogs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Dog])
  ],
  controllers: [],
  providers: [DogsRepository],
  exports: [DogsRepository],
})
export class DogsModule {}
