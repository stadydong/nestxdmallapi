import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ShowMessage } from "src/entities/common.types";
import { UserChatEntities } from "src/entities/mall/user-chat.entities";
import { Repository } from "typeorm";
import { ApiException } from "../common/exception";
import { UserService } from "../mall/user/user.service";
import { UserChatService } from "../userChat/userChat.service";
import { GetMessageDto } from "./ws.dto";

@Injectable()
export class WsService{
  constructor(
    private readonly userService:UserService,
    private readonly userChatService:UserChatService
  ){}
  async handlerEvent(uid:number,payload:GetMessageDto){

    let user = await this.userService.findUserInfo(uid)

    
    /**创建用户信息 */
    return await this.userChatService.create({
      showMessage:ShowMessage.Show,
      message:payload.message,
      userInfo:user
    })
  }
}