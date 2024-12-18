import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateProductAdminDto } from './dto/create-product-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CreateNewSell } from './dto/create-new-sell.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("Admin")
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Crear un nuevo producto por administrador' })
  @ApiBody({ description: 'Datos del nuevo producto', type: CreateProductAdminDto })
  @Post('create')
  create(@Body() createAdminDto: CreateProductAdminDto) {
    return this.adminService.createNewProductByAdmin(createAdminDto)
  }

  @ApiOperation({ summary: 'Actualizar un producto por administrador' })
  @ApiBody({ description: 'Datos para actualizar el producto' })
  @Patch('updateproduct')
  update(@Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateProduct(updateAdminDto)
  }

  @ApiOperation({ summary: 'Crear una nueva venta' })
  @ApiBody({ description: 'Datos de la nueva venta', type: [CreateNewSell] })
  @Post('create-new-sell')
  createNewSell(@Body() newSell : CreateNewSell[]){
    return this.adminService.createNewSell(newSell)
  }

  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  @ApiBody({ description: 'ID del producto a eliminar', type: Number })
  @Delete()
  remove(@Body('id') id: number) {
    return this.adminService.remove(id);
  }

  @Get("check")
  adminSells(@Body("id") id : string){
    console.log(id);
    
    return this.adminService.checkAdminsSales(id)
  }
}
