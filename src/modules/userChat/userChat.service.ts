import { Injectable } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { UserChatEntities } from "src/entities/mall/user-chat.entities";
import { Repository } from "typeorm";
import { UserChatCreateDto } from "./userChat.type";

@ApiTags("UserChat")
@Injectable()
export class UserChatService{
  constructor(
    @InjectRepository(UserChatEntities) private readonly userChatRepository:Repository<UserChatEntities>,
  ){}
  async create(dto:UserChatCreateDto){
    const userChat = await this.userChatRepository.save(dto)
    const { id,message,createdAt,userInfo } = userChat
    return {
      message,
      id,
      createdAt,
      userInfo:{
        virtualName:userInfo.virtualName,
        imgUrl:userInfo.imgUrl,
      }
    }
  }
  async find (skip,take){
    const UserChats = await this.userChatRepository.find({
      skip,
      take,
      relations:{
        userInfo:true
      },
      select:{
        userInfo:{
          imgUrl:true,
          virtualName:true
        }
      },
      order:{
        createdAt:"asc"
      }
    })
    return UserChats.map((item:any)=>{
      /**对时间进行转换 */
      item.createdAt = (item.createdAt.toLocaleDateString() + " " + item.createdAt.toLocaleTimeString())
      return item
    })
    
  }
  /**查找聊天记录总数 */
  async findTotal() {
    return {chatTotal:await this.userChatRepository.count()}
  }
}


