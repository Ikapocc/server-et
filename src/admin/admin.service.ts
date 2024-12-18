import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateProductAdminDto } from './dto/create-product-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AdminProducts } from './schemas/adminProduct.schema';
import { Model } from 'mongoose';
import { CreateNewSell } from './dto/create-new-sell.dto';
import { AdminSell } from './schemas/adminNewSell.chema';
import { JWTGuard } from 'src/auth/guards/auth-jwt2.guard';
import { RolesGuard } from 'src/auth/guards/auth-roles.guard';
import { Roles } from 'src/auth/decorator/auth-roles.decorator';

@Injectable()
export class AdminService {
  
  constructor(
    @InjectModel(AdminProducts.name) private adminProducts : Model<AdminProducts>, 
    @InjectModel(AdminSell.name) private adminSells : Model<AdminSell>
) {}
  
  @UseGuards(JWTGuard, RolesGuard)
  @Roles("admin")
  async createNewProductByAdmin(createAdminDto: CreateProductAdminDto) {
    
    const data = {
      ...createAdminDto,
      createdAt : new Date()
    }
    
    try {
      return await this.adminProducts.create(data)
    } catch (error) {
      throw new InternalServerErrorException("Error trying to create the product")
    }
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles("admin")
  async updateProduct(updateAdminDto: UpdateAdminDto) {
    const {id, ...data} = updateAdminDto

    try {

      if (!id) throw new BadRequestException("Not id founded")

      const findProduct = await this.adminProducts.findByIdAndUpdate(id, data)
  
      if (!findProduct) throw new NotFoundException("Not product found")

      return findProduct

    } catch (error) {
      throw new InternalServerErrorException('Error trying to update the product');
    }
  }

  async remove(id: number) {
    return await this.adminProducts.findByIdAndDelete(id)
  }

  @UseGuards(JWTGuard, RolesGuard)
  @Roles("admin")
  async createNewSell(newSell: CreateNewSell[]) {
    try {
      for (const items of newSell) {
        const { productId, ...data } = items;
    
        const isInBd = await this.adminSells.findOne({ productId: productId });
    
        if (!isInBd) {
          await this.adminSells.create({
            productId,
            ...data
          });
        } else {
          const newUpdateData = {
            quantity: isInBd.quantity + data.quantity,
            total: isInBd.total + data.total
          };
    
          await this.adminSells.updateOne({ productId }, newUpdateData);
        }
      }
    } catch (error) {
      throw new InternalServerErrorException('Error trying to update or create the resource');
    }
  }

  async checkAdminsSales(id : string) {

    return await this.adminSells.find({createdBy : id})
  }
  
}
