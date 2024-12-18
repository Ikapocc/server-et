import { Injectable } from '@nestjs/common';
import { UpdateMongodatumDto } from './dto/update-mongodatum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PopulateUsers } from './schema/populatedbusers.schema';
import { Model } from 'mongoose';
import { PopulateProduct } from './schema/populatedbproducts.schema';
import { HttpService } from '@nestjs/axios';
import { PopulateDataBase } from 'src/utils/functions';


@Injectable()
export class MongodataService {
  
  constructor(
    @InjectModel(PopulateUsers.name) private populateUsers : Model<PopulateUsers>,
    @InjectModel(PopulateProduct.name) private populateProducts : Model<PopulateProduct>,
    private fetchingData : HttpService
  ) {}
  
  async create(typeOfData : "user" | "product") {
    const data = await PopulateDataBase(typeOfData, this.fetchingData)
    
    if (typeOfData === "product") {
      return data.map(async items => await this.populateProducts.insertMany(items))
    }

    if (typeOfData === "user") {
      return await this.populateUsers.insertMany(data)
    }
  }

  findAll() {
    return `This action returns all mongodata`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mongodatum`;
  }

  update(id: number, updateMongodatumDto: UpdateMongodatumDto) {
    return `This action updates a #${id} mongodatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} mongodatum`;
  }
}
