import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { adminProduct, AdminProducts } from './schemas/adminProduct.schema';
import { adminSell, AdminSell } from './schemas/adminNewSell.chema';

@Module({
  imports : [MongooseModule.forFeature([
    {name : AdminProducts.name, schema: adminProduct}, 
    {name : AdminSell.name, schema : adminSell}])],
  controllers: [AdminController],
  providers: [AdminService],
  exports : [AdminService]
})
export class AdminModule {}
