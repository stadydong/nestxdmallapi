import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetailEntities } from 'src/entities/mall/product-detail.entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(ProductDetailEntities) private productDetailRepository:Repository<ProductDetailEntities>
  ){}
  async create(dto){
    const result = await this.productDetailRepository.insert(dto)
    return "添加成功"
  }
  find(){
    return this.productDetailRepository.find()
  }
  findOne(id:number){
    return this.productDetailRepository.findOneBy({id})
  }
}
