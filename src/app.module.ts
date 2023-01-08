import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MallModule } from './modules/mall/mall.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root', 
    database: 'xdmall',
    synchronize: true,  //是否将实体自动保存到数据库
    autoLoadEntities:true,  //自动加载实体
    retryDelay:500, //两次重试连接的间隔
    retryAttempts:5 //重试连接数据库的次数
  }), MallModule],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
