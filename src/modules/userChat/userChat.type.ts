import { ShowMessage } from "src/entities/common.types";
import { UserEntities } from "src/entities/mall/users.entities";

export interface UserChatCreateDto {
  userInfo:UserEntities
  message:string
  showMessage:ShowMessage
}