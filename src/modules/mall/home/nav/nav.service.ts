import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NavEntities } from 'src/entities/mall/nav.entities';
import { Repository } from 'typeorm';

@Injectable()
export class NavService {
  constructor(
    @InjectRepository(NavEntities) private navRepository:Repository<NavEntities> 
  ){}
  create(){
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
    return "新增成功"
  }
  find(){
    return this.navRepository.find({order:{orderNum:"asc"}})
  }
}
