import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsEntities } from 'src/entities/mall/home-goods.entities';
import { ApiException } from 'src/modules/common/exception';
import { DataSource, Repository } from 'typeorm';
import { CreateGoodsDto, UpdateCoodsDto } from './goods.dto';

//首页板块
@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntities) private goodsRepository:Repository<GoodsEntities>,
    private dataSource:DataSource
  ){}
  /**创建商品模块 */
  create(dto:CreateGoodsDto){
    // this.repositoryGoods.insert([dto])
    const Good = new GoodsEntities()
    Object.assign(Good,dto)
    console.log(Good);
    
    this.dataSource.transaction(async manager=>{
      await manager.save(Good)
    })
    return "service"
  }
  /**查找一条商品模块 */
  async findOne(id:number):Promise<GoodsEntities>{
    console.log("ssasa");
    
    console.log(id);
    
    // const goods = await this.repositoryGoods.findOne({where:{id}})
    // const goods = await this.goodsRepository.findOne({where:{
    //   id
    // }})
    const goods = await this.goodsRepository.findOne({where:{
      id:1
    }})
    if (!goods) throw new ApiException(10000);
    return goods
  }
  /** 查找所有模块*/
  find(){
    return this.goodsRepository.find({relations:{panel:{
      productId:{
        productDetail:true
      }
    }}})
  }
  /**更新一个模块 */
  async update(id:number,dto:UpdateCoodsDto){
    const goods = await this.findOne(id)
    if(!goods) throw new ApiException(10001)
    return this.goodsRepository.update({id},dto)
  }
}
