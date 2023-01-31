import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarShoppinginfoEntities } from 'src/entities/mall/car-shopping-info.entities';
import { CarEntities } from 'src/entities/mall/car.entities';
import { DataSource, Repository } from 'typeorm';
import { ApiException } from 'src/modules/common/exception'
import { CreateCarDto, UpdateCarDto, UpdateCheckedDto } from './car.dto';
import { ProductService } from '../product/product.service';
import { IDList } from './types';

@Injectable()
export class CarService {

  constructor(
    // private readonly 
    @InjectRepository(CarEntities) private readonly carReposity:Repository<CarEntities>,
    @InjectRepository(CarShoppinginfoEntities) private readonly carShoppingInfoReposity:Repository<CarShoppinginfoEntities>,
    private readonly productService:ProductService,
    private readonly dataSource:DataSource
  ){}
  /**
   * 新增购物车数据
   */
  async create(dto:CreateCarDto){
    let car = await this.carReposity.findOne({relations:{
      carshoppinginfo:{
        product:true
      }
    },
    where:{
    }
    })
    if(!car) throw new ApiException(10006)
    console.log(car);

    let existProduct = car.carshoppinginfo.find((item=>item.product?.id===dto.productId))
    // console.log(existProduct);
    
    if(existProduct) throw new ApiException(10007)

    
    let carShoppingInfo = new CarShoppinginfoEntities()
    Object.assign(carShoppingInfo,dto)

    let product = await this.productService.findOne(dto.productId)
    /**
     * car已经存在了不需要进行重复保存manager.save
     */
    await this.dataSource.manager.transaction(async manager=>{
      carShoppingInfo.car = car
      carShoppingInfo.product = product
      await manager.save(carShoppingInfo)
    })
  
    return new ApiException(100000)
  }
  find() {
    throw new Error('Method not implemented.');
  }
  /**
   * 查询整个购物车里所有数据
   */
  async findOne(id:number):Promise<CarEntities> {
    const car = await this.carReposity.findOne({
      relations:{carshoppinginfo:{
        product:{
          productDetail:true
        }
      }},
      where:{id},
    })
    /**
     * 判断是否有该购物车的id
     */
    if(!car) throw new ApiException(10006)
    return car
  }
  /**查询购物车里单独一个购物车信息的数据 */
  async findOneCarShoppingInfo(id:number){
    let shoppingInfo = await this.carShoppingInfoReposity.findOne({where:{id}})
    if(!shoppingInfo) throw new ApiException(10011)
    return shoppingInfo
  }
  /**更新购物车当前商品的数量 */
  async update(id:number,dto:UpdateCarDto) {
    const shoppingInfo = await this.carShoppingInfoReposity.findOne({where:{
      id
    },relations:{product:{
      productDetail:true
    }}})
    if(!shoppingInfo) throw new ApiException(10011)

    if(dto.num > shoppingInfo.product.productDetail.limitNum){
      throw new ApiException(10012)
    }

    shoppingInfo.num = dto.num
    console.log(shoppingInfo);
    await this.carShoppingInfoReposity.update({id,car:{id:dto.carId}},shoppingInfo)
    return new ApiException(100002)
  }
  /**更新购物车商品的选择状态 */
  async updateChecked(dto: UpdateCheckedDto) {
    // let idList:IDList[]  = []
    // for (const id of dto.id) {
    //   idList.push({id})
    // }
    // this.carShoppingInfoReposity.update(dto.id,)
    // this.carShoppingInfoReposity.update()
    let result = await this.carShoppingInfoReposity.createQueryBuilder().update().set({checked:dto.checked})
    .orWhere("id IN( :...ids)",{ids:dto.id}).execute()

    
    return new ApiException(100002)
  }
  async deleteCarShopping(ids:number[]) {
    if(ids.length===0) throw new ApiException(10013)
    await this.carShoppingInfoReposity.delete(ids)
    return new ApiException(100001);
  }
  async findCarShoppingInfo(carId:number,checkedWhere:0 | 1){
    return await this.carReposity.findOne({relations:{
      carshoppinginfo:{
        product:true
      },
    },where:{id:carId,carshoppinginfo:{
      checked:checkedWhere
    }}})
    
  }
}
