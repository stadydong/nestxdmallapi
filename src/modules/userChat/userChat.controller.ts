import { Controller, Get, Query, } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { handler_paginnation } from "../mall/common.utils";
import { UserChatService } from "./userChat.service";

@Controller("userChat")
export class UserChatController{
  constructor(private readonly userChatService:UserChatService){}

  @Get()
  @ApiOperation({summary:"查找聊天信息"})
  find(@Query() query){
    handler_paginnation(query,5)
    return this.userChatService.find(+query.skip,+query.take)
  }
  /**查找当前有多少条聊天记录 */
  @Get("total")
  @ApiOperation({summary:"查找聊天记录总数"})
  findTotal(){
    return this.userChatService.findTotal()
  }
}