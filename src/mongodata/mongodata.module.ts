import { Module } from '@nestjs/common';
import { MongodataService } from './mongodata.service';
import { MongodataController } from './mongodata.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PopulateUsers, PopulateSchema } from './schema/populatedbusers.schema';
import { PopulateProduct, populateProductSchema } from './schema/populatedbproducts.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports : [MongooseModule.forFeature([{ name: PopulateUsers.name ,schema : PopulateSchema}, 
    {name : PopulateProduct.name, schema : populateProductSchema}]), HttpModule, ],
  controllers: [MongodataController],
  providers: [MongodataService],
})
export class MongodataModule {}
