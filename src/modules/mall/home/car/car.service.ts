import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarShoppinginfoEntitiess } from 'src/entities/mall/car-shopping-info.entities';
import { CarEntities } from 'src/entities/mall/car.entities';
import { DataSource, Repository } from 'typeorm';
import { ApiException } from 'src/modules/common/exception'
import { CreateCarDto, UpdateCarDto } from './car.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class CarService {
  constructor(
    // private readonly 
    @InjectRepository(CarEntities) private readonly carReposity:Repository<CarEntities>,
    @InjectRepository(CarShoppinginfoEntitiess) private readonly carShoppingInfoReposity:Repository<CarShoppinginfoEntitiess>,
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

    
    let carShoppingInfo = new CarShoppinginfoEntitiess()
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
  async delete(id:number) {
    throw new Error('Method not implemented.');
  }
}
