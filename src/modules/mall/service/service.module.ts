import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderListService } from '../user/order-list/order-list.service';
import { UserModule } from '../user/user.module';
import { PayController } from './pay/pay.controller';
import { PayService } from './pay/pay.service';

@Module({
  providers:[PayService],
  controllers:[PayController],
  imports:[UserModule]
})
export class ServiceModule {
  
}
