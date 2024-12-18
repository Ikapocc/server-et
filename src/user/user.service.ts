import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductSchema } from './schema/product.schema';
import { Model } from 'mongoose';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { NewUser } from './schema/newUserSchema';
import { CreateNewOrder } from './dto/create-new-order.dto';
import { UserOrder } from './schema/newUserOrderSchema';
import { CreateNewSell } from 'src/admin/dto/create-new-sell.dto';
import { AdminSell } from 'src/admin/schemas/adminNewSell.chema';
import { AdminService } from 'src/admin/admin.service';
import { totalmem } from 'os';

@Injectable()
export class UserService {
  
  constructor(
  private adminService : AdminService,
  @InjectModel(ProductSchema.name) private userCollection : Model<ProductSchema>,
  @InjectModel(NewUser.name) private newUser : Model<NewUser>,
  @InjectModel(UserOrder.name) private newOrder : Model<UserOrder>,
  ) {}

  async createNewUser(newUserData : CreateNewUserDto) {
    try {
      const fullNewUserData = {
        ...newUserData,
        rol : "user",
        level : 0
      }
      
      return await this.newUser.create(fullNewUserData)

    } catch (error) {

      throw new InternalServerErrorException("Error creating new user")
    }
  }

  async findUser(mail : string) : Promise<CreateNewUserDto>{    
    try {
      return await this.newUser.findOne({email : mail})
    } catch (error) {
      throw new InternalServerErrorException("Error trying to find the request resource")
    }
  }

  getAllProducts() {
    return this.userCollection.find()
  }

  async findSelectProduct(id: string) {
    return await this.userCollection.findOne({sku : id})
  }

  async findByCategory(category : string){
    return await this.userCollection.find({category : category})
  }

  async findProductByInput(filters : any){
    
    const {q, lowPrice, highPrice, hasStock, category} = filters  
    const filts: any = {}

    if (lowPrice || highPrice) {
      filts.price = {}

      if (lowPrice) filts.price.$gte = parseFloat(lowPrice)
      if (highPrice) filts.price.$lte = parseFloat(highPrice)
    }

    if (q) {
      filts.$and = [{
        product_name : {
          $regex: q,
          $options: 'i'
        }
      }]
    }

    if (hasStock) {
      filts.stock = {}
      filts.stock.$gte = 1
    }

    if (category) {
      filts.category = {}
      filts.category = category
    }

    return await this.userCollection.find(filts).exec()
  }

  async createNewOrder(data: CreateNewOrder) {
    try {
      const { user_id, orders } = data;
  
      if (!user_id || !orders || !Array.isArray(orders) || orders.length === 0) {
        throw new BadRequestException('Invalid user_id or orders data');
      }
  
      for (const items of orders) {
        const isInBd = await this.newOrder.findOne({
          user_id: user_id,
          'orders.sku': items.sku,
        });
  
        if (!isInBd) {
          const userBuy = {
            user_id,
            ...data,
            createdAt: new Date(),
            total: orders.reduce((acc, cur) => {
             
              if (!cur.price || !cur.quantity) {
                throw new BadRequestException('Invalid price or quantity in order item');
              }
              return acc + cur.price * cur.quantity;
            }, 0),
          };
  
          const dataToSendToTheBd = orders.map(items => ({
            user_id: user_id,
            ...items,
          }));
  
          const adminSell = dataToSendToTheBd.map(items => ({
            productId: items.id,
            product_name: items.product_name,
            quantity: items.quantity,
            total: items.price,
            createdBy: items.createBy,
          }));
  
          await this.adminService.createNewSell(adminSell);
  
          return await this.newOrder.create(userBuy);
        } else {
          const product = isInBd.orders.find(data => data.sku === items.sku)?.quantity;
          if (product === undefined) {
            throw new NotFoundException('Product SKU not found in existing order');
          }
          const exQuantity = product + items.quantity;
          const newTotal = items.price * exQuantity;
  
          await this.newOrder.updateOne(
            {
              user_id: user_id,
              'orders.sku': items.sku,
            },
            {
              $set: {
                'orders.$.quantity': exQuantity,
                'orders.$.total': newTotal,
              },
            }
          );
  
          const adminSell = [
            {
              productId: items.id,
              product_name: items.product_name,
              quantity: items.quantity,
              total: items.price,
              createdBy: items.createBy,
            },
          ];
  
          await this.adminService.createNewSell(adminSell);
        }
      }
    } catch (error) {
      
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error; 
      }

      console.error('Unexpected error during order creation:', error);
  
      throw new InternalServerErrorException('Error creating new order');
    }
  }
  
}
