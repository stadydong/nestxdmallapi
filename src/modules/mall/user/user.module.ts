import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntities } from 'src/entities/mall/users.entities';
import { HomeModule } from '../home/home.module';
import { CarService } from '../home/car/car.service';


@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntities]),
    HomeModule,
  ],
  providers: [UserService,CarService],
  controllers: [UserController],
  exports:[TypeOrmModule,UserService]
})
export class UserModule {}
