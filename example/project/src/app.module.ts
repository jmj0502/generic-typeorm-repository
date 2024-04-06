import 'reflect-metadata'
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsRepository } from './DogsModule/repositories/dog.repository';
import { Dog } from './DogsModule/entities/Dogs';
import { DogsModule } from './DogsModule/dogs.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "sqlite",
        database: ":memory:",
        entities: [Dog],
        logging: false,
        synchronize: true, // Don't use in production.
      }),
    }),
    DogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
