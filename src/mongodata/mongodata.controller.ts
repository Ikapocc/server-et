import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MongodataService } from './mongodata.service';

@Controller('populate')
export class MongodataController {
  constructor(private readonly mongodataService: MongodataService) {}

  @Get("/product")
  PopulateDataProduct(){
    return this.mongodataService.create("product")
  }

  @Get("/user")
  async PopulateDataUser(){
    return this.mongodataService.create("user")
  }

}
