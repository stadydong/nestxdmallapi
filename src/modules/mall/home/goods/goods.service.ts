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
    @InjectRepository(GoodsEntities) private repositoryGoods:Repository<GoodsEntities>,
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
  findOne(id:number):Promise<GoodsEntities>{
    return this.repositoryGoods.findOneBy({id})
  }
  /** 查找所有模块*/
  find(){
    return this.repositoryGoods.find({relations:{panel:true}})
  }
  /**更新一个模块 */
  async update(id:number,dto:UpdateCoodsDto){
    const goods = await this.findOne(id)
    if(!goods) throw new ApiException(10001)
    return this.repositoryGoods.update({id},dto)
  }
}
