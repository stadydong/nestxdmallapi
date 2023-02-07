import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserChatEntities } from "src/entities/mall/user-chat.entities";
import { UserChatController } from "./userChat.controller";
import { UserChatService } from "./userChat.service";

@Module({
  controllers:[UserChatController],
  providers:[UserChatService],
  imports:[TypeOrmModule.forFeature([UserChatEntities])],
  exports:[UserChatService]
})
export class UserChatModule{

}
