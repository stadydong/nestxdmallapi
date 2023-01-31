import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntities } from "../base.entities";
import { UserOrderListItemEntities } from "./user-orderListItem.entities";
import { UserEntities } from "./users.entities";

/**用户订单实体 */
@Entity({name:"user_order_list"})
export class UserOrderListEntities extends BaseEntities{
  @PrimaryGeneratedColumn()
  id:number
  /**订单当前的状态
   * 如已付款，支付失败
  */
  @Column({type:"varchar"})
  order_status:string
  
  @ManyToOne(()=>UserEntities,(user)=>user.orderList)
  user:UserEntities
  @OneToMany(()=>UserOrderListItemEntities,(orderListItem)=>orderListItem.orderList)
  orderListItem:UserOrderListItemEntities[]
}