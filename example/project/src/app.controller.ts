import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Dog } from './DogsModule/entities/Dogs'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/create')
  async createDog(): Promise<Dog> {
    return await this.appService.insertDog();
  }

  @Get()
  async getHello(): Promise<Dog[]> {
    return await this.appService.getDogs();
  }
}
