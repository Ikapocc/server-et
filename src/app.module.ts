import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodataModule } from './mongodata/mongodata.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
/* import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { TokenGuard } from './auth/guard/token.guard';
import { RolesGuard } from './auth/guard/roles.guard'; */
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    /* MongooseModule.forRoot('mongodb://localhost:27017/prueba_tecnica'),  */
    MongooseModule.forRoot('mongodb+srv://santiagoarciv:s0UKkv06hWm0RKAK@cluster0.qpcav.mongodb.net/prueba_tecnica'), 
    MongodataModule, 
    UserModule, 
    AdminModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : '.env'
    }),
  ],
  controllers: [],
/*   providers: [
    {
      provide : APP_GUARD,
      useClass : TokenGuard
    },
    {
      provide : APP_GUARD,
      useClass : RolesGuard
    }
  ], */
}) 
export class AppModule {}
