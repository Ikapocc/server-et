import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema, ProductSchema } from './schema/product.schema';
import { newUser, NewUser } from './schema/newUserSchema';
import { newOrderSchema, UserOrder } from './schema/newUserOrderSchema';
import { Orders, ordersSchema } from './schema/orderSchema';
import { adminSell, AdminSell } from 'src/admin/schemas/adminNewSell.chema';
import { AdminService } from 'src/admin/admin.service';
import { adminProduct, AdminProducts } from 'src/admin/schemas/adminProduct.schema';

@Module({
  imports : [
    MongooseModule.forFeature(
      [{name : ProductSchema.name, schema : productSchema}, 
        {name : NewUser.name, schema : newUser}, 
        {name : UserOrder.name, schema : newOrderSchema},
        {name : Orders.name, schema : ordersSchema},
        {name : AdminProducts.name, schema: adminProduct}, 
        {name : AdminSell.name, schema : adminSell}
      ])],
  controllers: [UserController],
  providers: [UserService, AdminService],
  exports : [UserService]
})
export class UserModule {}
