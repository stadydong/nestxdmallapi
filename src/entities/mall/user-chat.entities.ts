import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntities } from "../base.entities";
import { ShowMessage } from "../common.types";
import { UserEntities } from "./users.entities";

@Entity({name:"user-chat"})
export class UserChatEntities extends BaseEntities{
  @PrimaryGeneratedColumn()
  id:number
  @Column({type:"text"})
  message:string
  @ManyToOne(()=>UserEntities)
  userInfo:UserEntities
  @Column({type:"enum",enum:ShowMessage,enumName:"Show"})
  showMessage:ShowMessage
}