import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { MallService } from './mall.service';
import { LoginModule } from './login/login.module';
import { ServiceModule } from './service/service.module';


@Module({
  controllers: [],
  providers: [MallService],
  imports: [HomeModule, AuthModule, UserModule, LoginModule,ServiceModule],
  exports:[]
})
export class MallModule {}
