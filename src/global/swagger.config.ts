import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function SwaggerConfig(app:INestApplication){

  const options = new DocumentBuilder()
    .setTitle('XDMall后台api界面')
    .setDescription('基于nest开发的')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
