import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntities } from 'src/entities/mall/product.entities'
import { Repository } from 'typeorm'
import { CreateProductDto, orderProductDto } from './product.dto'
import { Between } from 'typeorm'
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntities)
    private productRepository: Repository<ProductEntities>,
  ) {}
  /**
   * 新增一个产品
   */
  async create(dto: CreateProductDto) {
    const res = await this.productRepository.insert([dto])
    console.log(dto);
    return '新增成功'
  }
  /**
   * 查找所有产品
   * 分页查找
   */
  async find(skip, take,priceOrderType,startPrice,endPrice) {

    if(!(priceOrderType === 0 || priceOrderType === 1 || priceOrderType === 2)){
      priceOrderType = 0
    }
    if(!startPrice){ startPrice = 0}
    if(!endPrice){endPrice = 9999999999}
    let productList:null|ProductEntities[] = null 
    let count:null | number = null
if(priceOrderType===0){
  productList = await this.productRepository.find({
    skip,
    take,
    order: {
      type: 'asc',
      // price:"desc"
      // id:"desc",
    },
    //在什么区间进行取值Between
    //MoreThanOrEqual大于或等于
    where: {
      price: Between(startPrice , endPrice),
    },
  })
  count = await this.productRepository.count({
    skip,
    take,
    order: {
      type: 'asc',
    },
    where: {
      price: Between(startPrice , endPrice),
    },
  })
}else if(priceOrderType===1){
  productList = await this.productRepository.find({
    skip,
    take,
    order: {
      type: 'asc',
      price:"asc"
      // id:"desc",
    },
    //在什么区间进行取值Between
    //MoreThanOrEqual大于或等于
    where: {
      price: Between(startPrice , endPrice),
    },
  })
  count = await this.productRepository.count({
    skip,
    take,
    order: {
      type: 'asc',
      price:"asc"
    },
    where: {
      price: Between(startPrice , endPrice),
    },
  })
}else{
  productList = await this.productRepository.find({
    skip,
    take,
    order: {
      type: 'asc',
      price:"desc"
      // id:"desc",
    },
    //在什么区间进行取值Between
    //MoreThanOrEqual大于或等于
    where: {
      price: Between(startPrice , endPrice),
    },
  })
  count = await this.productRepository.count({
    skip,
    take,
    order: {
      type: 'asc',
      price:"desc"
    },
    where: {
      price: Between(startPrice , endPrice),
    },
  })
}
    
    return {
      productList,
      count,
    }
  }
  /**
   * 查找1个产品
   */
  findOne() {}
}
