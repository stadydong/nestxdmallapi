import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NavEntities } from 'src/entities/mall/nav.entities';
import { ApiException } from 'src/modules/common/exception';
import { Repository } from 'typeorm';
import { CreateNavDto } from './nav.dto';

@Injectable()
export class NavService {
  constructor(
    @InjectRepository(NavEntities) private navRepository:Repository<NavEntities> 
  ){}
  async create(dto:CreateNavDto){
    // this.navRepository.insert(
    // [
    //   {
    //     title:"首页",
    //     orderNum:0,
    //     toUrl:"www.baidu.com"
    //   },
    //   {
    //     title:"后台管理系统",
    //     orderNum:1,
    //     toUrl:"www.baidu.com"
    //   },
    //   {
    //     title:"Github",
    //     orderNum:2,
    //     toUrl:"www.baidu.com"
    //   },
    //   {
    //     title:"商用授权",
    //     orderNum:3,
    //     toUrl:"www.baidu.com"
    //   },
    // ])
    await this.navRepository.insert(dto)
    return new ApiException(100000)
  }
  find(){
    return this.navRepository.find({order:{orderNum:"asc"}})
  }
}
