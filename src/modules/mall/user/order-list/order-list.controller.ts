import { Body, Controller, Delete, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { paginnation_params_dto } from '../../common.dto';
import { handler_paginnation, illegalId } from '../../common.utils';
import { OrderListService } from './order-list.service';

@Controller('order-list')
@ApiTags("OrderList 用户订单")
export class OrderListController {
  constructor(
    private readonly orderListService:OrderListService
  ){}
  @Get()
  create(){
    // this.orderListService.create()
    return "该接口不开放手动创建测试"
  }
  /**根据用户id进行分页查询用户订单 */
  @Get(":userId")
  @ApiOperation({description:"根据用户id进行分页查询用户订单"})
  @ApiParam({name:"userId"})
  find(@Query() query:paginnation_params_dto,@Param("userId") userId:string){
    handler_paginnation(query,10)
    illegalId(userId)
    return this.orderListService.find(+userId,+query.skip,+query.take)
  }
  @ApiOperation({description:"删除用户订单"})
  @ApiParam({name:"id"})
  @Delete(":id")
  delete(@Param("id") id){
    illegalId(id)
    return this.orderListService.delete(+id)
  }

}
