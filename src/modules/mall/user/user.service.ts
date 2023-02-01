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
    
    // car.user = users
    this.dateSouce.manager.transaction(async (manager)=>{
      car = await manager.save(car)
      users.car = car
      await manager.save(users)
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
    /**查找用户全部属性 */
    async findUserInfo(id:number){
      const userInfo = await this.userReposity.findOne({where:{id}})
      if(!userInfo){  throw new ApiException(10003)  }
      return userInfo
    }
    /** 提供给orderList接口调用 */
    async findUserOrderList(userId:number,skip:number,take:number){
      const user = await this.userReposity.findAndCount({
        skip,
        take,
        where:{
        id:userId
        },
        relations:{
          orderList:{
            orderListItem:{
              product:true
            }
          }
        },
        select:{
          password:true
        },
      })
      console.log(user);
      
      return user
    }
}
