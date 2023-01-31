import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrderListEntities } from 'src/entities/mall/user-orderList.entities';
import { UserOrderListItemEntities } from 'src/entities/mall/user-orderListItem.entities';
import { ApiException } from 'src/modules/common/exception';
import { DataSource, Repository } from 'typeorm';
import { paginnation_params_dto } from '../../common.dto';
import { illegalId } from '../../common.utils';
import { CarService } from '../../home/car/car.service';
import { UserService } from '../user.service';
import { CreateOrderListDto } from './order-list.dto';

/**创建订单 */
@Injectable()
export class OrderListService {
  constructor(
    @InjectRepository(UserOrderListEntities) private readonly orderListRepository:Repository<UserOrderListEntities>,
    @InjectRepository(UserOrderListItemEntities) private readonly orderListItemRepository:Repository<UserOrderListItemEntities>,
    private readonly dataSource:DataSource,
    private readonly userService:UserService,
    private readonly carService:CarService,

  ){}
  async create(dto:CreateOrderListDto){
    const orderList = new UserOrderListEntities()
    const user = await this.userService.findUserInfo(dto.userId)
    /**存放在购物车的id要进行删除 */
    const ids:number[] = []
      orderList.user = user
      orderList.order_status = dto.order_status

    const orderListItemS:UserOrderListItemEntities[] = []
    /*** 添加购物车商品*/
    const carInfo = await this.carService.findCarShoppingInfo(dto.carId,1)
    carInfo.carshoppinginfo.map(item=>{
    const orderListItem = new UserOrderListItemEntities()
      orderListItem.orderList = orderList
      orderListItem.num = item.num
      orderListItem.product = item.product
      
      orderListItemS.push(orderListItem)
      ids.push(item.id)
    })
    await this.dataSource.transaction(async manager=>{
      await manager.save(orderList)
      await manager.save(orderListItemS)
      /**删除该商品 */
      await this.carService.deleteCarShopping(ids)
    })
    return new ApiException(100000)
    // this.orderListRepository.insert()
  }
  async find(userId:number,skip:number,take:number){
    const findResult = await this.orderListRepository.findAndCount({
      skip,
      take,
      where:{
        user:{
          id:userId
        },
      },
      relations:{
        orderListItem:{
          product:true
        }
      },
      order:{
        orderListItem:{
          id:"desc"
        }
      }
    })
    return {
      orderList:findResult[0],
      count:findResult[1]
    }
    // return this.userService.findUserOrderList(userId,skip,take)
  }
  async delete(id:number){
    const findResult = await this.orderListRepository.findOne({where:{
      id
    },relations:{
      orderListItem:true
    }})
    if(!findResult) throw new ApiException(10014)
    const ids = []
    findResult.orderListItem.map(item=>{
      ids.push(item.id)
    })
    /**删除2个表格的订单详细 */
    await this.orderListItemRepository.delete(ids)
    await this.orderListRepository.delete(id)
    return new ApiException(100001)
  }
}
