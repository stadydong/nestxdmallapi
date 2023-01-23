import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDetailEntities } from 'src/entities/mall/product-detail.entities';
import { ApiException } from 'src/modules/common/exception';
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
  async findOne(id:number){
    const productDetail = await this.productDetailRepository.findOneBy({id})
    if(!productDetail) throw new ApiException(10010)
    return productDetail
  }
}
