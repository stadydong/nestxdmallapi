import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntities } from "../base.entities";
import { CarEntities } from "./car.entities";
import { UserChatEntities } from "./user-chat.entities";
import { UserOrderListEntities } from "./user-orderList.entities";

@Entity({name:"user"})
export class UserEntities extends BaseEntities{
  @PrimaryGeneratedColumn()
  id:number
  @Column({unique:true})
  username:string
  @Column()
  password:string
  @Column({type:"varchar",default:"http://localhost:3000/uimg/uimg1.png"})
  imgUrl:string
  /**虚拟名称用于展示聊天上的名称 */
  @Column({type:"varchar"})
  virtualName:string

  @OneToOne(()=>CarEntities)
  @JoinColumn()
  car:CarEntities

  @OneToMany(()=>UserOrderListEntities,(orderList)=>orderList.user)
  orderList:UserOrderListEntities[]

  @OneToMany(()=>UserChatEntities,(userChat)=>userChat.userInfo)
  @JoinColumn()
  userChat:UserChatEntities[]
}