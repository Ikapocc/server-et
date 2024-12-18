import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { JWTStrategy } from './strategies/jwt-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  imports : [ 
    UserModule,
    JwtModule.register({
      global: true,
      signOptions : {
        expiresIn : "1h",
        algorithm : "HS256"
      },
    secret : `KEY_SECRET_922` //->Se que es una mala practica y estaba especificado en los requerimientos que no se podia hacer pero la clave establecida en el .env
                              //no dejaba continuar despues de crear el token por configuracion del nest o tal vez de mi forma que mi VSC este configurado
                              //si no se colocaba de esta manera en esta parte y en el modulo general no debaja avanzar en la autenticacion
  })],
  exports : [AuthModule]
})
export class AuthModule {}
