import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntities } from 'src/entities/mall/users.entities';
import { HomeModule } from '../home/home.module';
import { CarService } from '../home/car/car.service';
import { OrderListController } from './order-list/order-list.controller';
import { OrderListService } from './order-list/order-list.service';
import { UserOrderListEntities } from 'src/entities/mall/user-orderList.entities';
import { UserOrderListItemEntities } from 'src/entities/mall/user-orderListItem.entities';


@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntities,UserOrderListEntities,UserOrderListItemEntities]),
    HomeModule,
  ],
  providers: [UserService,CarService, OrderListService],
  controllers: [UserController, OrderListController],
  exports:[TypeOrmModule,UserService,OrderListService]
})
export class UserModule {}
