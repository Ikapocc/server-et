import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.enableCors({
    origin: '*', 
    methods: 'POST, GET, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',

  });
  const config = new DocumentBuilder()
    .setTitle('ET Endpoins')
    .setDescription('ET description')
    .setVersion('1.0')
    .addTag('ET')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT);  
}
bootstrap();
