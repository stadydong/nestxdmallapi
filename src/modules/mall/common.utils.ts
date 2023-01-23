import { ApiException } from "../common/exception";
import { FindList } from "./common.types";
import { orderProductDto } from "./home/product/product.dto";
/**
 * 初始化分页的参数
 * @param request 
 * @param take  默认取多少条数据
 */
export function handler_paginnation(request:any,take:number = 40):void{
  //如果没有传跳过多少条数据那默认就是0即不跳过
  if(!request.skip) request.skip = 0
  //如果没有传取多少条数据那默认就是取40条
  if(!request.take || request.take > take || request.take <= 0){
     request.take = take
  }
}

export function illegalId (id:string){
  if(isNaN(parseInt(id))){
    throw new ApiException(10008)
  }
}