import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global/exception.filter';
import { TransfromInterceptor } from './global/transfrom.Interceptor';
import * as express from 'express'
import * as path from "path"
import { SwaggerConfig } from './global/swagger.config';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**配置swagger */
  SwaggerConfig(app)
  /**全局管道 */
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransfromInterceptor())
  /**  http://localhost:3000/swiper/swiper1.webp */
  app.use(express.static(path.resolve(__dirname,"..","public")))
  console.log("http://localhost:3000");
  
  await app.listen(3000);
}
bootstrap();
