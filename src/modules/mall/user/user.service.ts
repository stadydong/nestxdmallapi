import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarEntities } from 'src/entities/mall/car.entities';
import { UserEntities } from 'src/entities/mall/users.entities';
import { ApiException } from 'src/modules/common/exception';
import { DataSource, Repository } from 'typeorm';
import { CarService } from '../home/car/car.service';

import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntities) private readonly userReposity:Repository<UserEntities>,
    private readonly carService:CarService,
    private readonly dateSouce:DataSource
  ){

  }
  async create(user:CreateUserDto){
    console.log(user);
    let UniqueUsername =  await this.findUserName(user.username)
    if(UniqueUsername) throw new ApiException(10002)
    
    let users = new UserEntities()
    Object.assign(users,user)
    let car = new CarEntities()
    users.car = car
    car.user = users
    this.dateSouce.manager.transaction(async (manager)=>{
      await manager.save(users)
      await manager.save(car)
    })
    // await this.userReposity.insert(user)
    return new ApiException(100000)
  }
  /**
   * 根据用户名查找用户信息
   */
  async findUserName(username:string) :Promise<UserEntities | null>{
    return this.userReposity.findOneBy({username})
  }
    /**
   * 查找当前用户信息
   */
     async findOne(id: number) {
      const userInfo = await this.userReposity.findOne({relations:{car:true},where:{id}})
      if(userInfo){
        const { password,...user } = userInfo        
        return user
      }else{
        throw new ApiException(10003)
      }
    }
}
