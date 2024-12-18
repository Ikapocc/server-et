import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ 
    description: 'Datos de inicio de sesión', 
    type: Object, 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Inicio de sesión exitoso',
    schema: {
      example: {
        token: 'jwt_token_here',
        user: {
          id: 1,
          email: 'user@example.com',
          rol: 'user'
        }
      }
    }
  })
  @Post("login")
  async Login(@Body() data : {userMail : string, password : string}){
    const user = await this.authService.validateUser(data.userMail, data.password)

    const payload = {
      id : user.id,
      email : user.email,
      rol: user.rol
    }
    
    const token = await this.authService.Login(payload)
    return {
      token,
      user
    }
  }
}
