import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateNewUserDto } from './dto/create-new-user.dto';
import { ConfigService } from '@nestjs/config';
import { JWTGuard } from 'src/auth/guards/auth-jwt2.guard';
import { RolesGuard } from 'src/auth/guards/auth-roles.guard';
import { Roles } from 'src/auth/decorator/auth-roles.decorator';
import { CreateNewOrder } from './dto/create-new-order.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("user")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private config : ConfigService) {}
  
  @ApiOperation({summary : "Crear un nuevo usuario"})
  @ApiBody({ description: 'Datos del nuevo usuario', type: CreateNewUserDto })
  @Post("create-user")
  createNewUser(@Body() newUserData : CreateNewUserDto) {
    return this.userService.createNewUser(newUserData)
  }
  
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @Get()
  findAll() {    
    return this.userService.getAllProducts()
  }

  @ApiOperation({ summary: 'Buscar productos por término' })
  @ApiQuery({ name: 'searchTerm', description: 'Término de búsqueda', type: String })
  @UseGuards(JWTGuard, RolesGuard)
  @Roles("admin", "user")
  @Get("search")
  findByInput(@Query() searchTerm: string){    
    return this.userService.findProductByInput(searchTerm)
  }


  @ApiOperation({ summary: 'Obtener productos por categoría' })
  @ApiParam({ name: 'category', description: 'Nombre de la categoría', type: String })
  @UseGuards(JWTGuard, RolesGuard)
  @Roles("admin", "user")
  @Get("/:category")
  findByCategory(@Param("category") category : string){
    return this.userService.findByCategory(category)
  }

  @ApiOperation({ summary: 'Obtener producto por categoría y ID' })
  @ApiParam({ name: 'category', description: 'Nombre de la categoría', type: String })
  @ApiParam({ name: 'id', description: 'ID del producto', type: String })
  @UseGuards(JWTGuard, RolesGuard)
  @Roles("admin", "user")
  @Get('/:category/:id')
  findOne(@Param('id') id: string) {    
    return this.userService.findSelectProduct(id);
  }

  @ApiOperation({ summary: 'Buscar si un usuario está en la página' })
  @ApiQuery({ name: 'userName', description: 'Nombre del usuario', type: String })
  @Get('is-in-page')
  isUserInPage(userName : string){
    return this.userService.findUser(userName)
    
  }

  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiBody({ description: 'Datos de la orden', type: CreateNewOrder })
  @UseGuards(JWTGuard, RolesGuard)
  @Roles('admin', 'user')
  @Post("create-new-order") 
  createNewOrder(@Body("data") data : CreateNewOrder) {
    
    return this.userService.createNewOrder(data)
  }
}
